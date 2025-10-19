import React, { useState, useRef, useEffect } from "react";
import cevirBTN from "../../../assets/images/cark/cevirBTN.png";

// SVG ikonları

const NextArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M16.7063 11.2467C17.0969 10.8561 17.0969 10.2217 16.7063 9.83105L11.7063 4.83105C11.3156 4.44043 10.6813 4.44043 10.2906 4.83105C9.9 5.22168 9.9 5.85605 10.2906 6.24668L13.5875 9.54043H4C3.44687 9.54043 3 9.9873 3 10.5404C3 11.0936 3.44687 11.5404 4 11.5404H13.5844L10.2937 14.8342C9.90312 15.2248 9.90312 15.8592 10.2937 16.2498C10.6844 16.6404 11.3188 16.6404 11.7094 16.2498L16.7094 11.2498L16.7063 11.2467Z"
      fill="currentColor"
    ></path>
  </svg>
);

interface WheelItem {
  id: number;
  value: string;
  subValue: string;
  background: string;
}

interface LastSpin {
  date: string;
  award: string;
}

const wheelItems: WheelItem[] = [
  {
    id: 1,
    value: "1000",
    subValue: "Ekocoin",
    background:
      "linear-gradient(0deg, rgb(203, 25, 0) 0%, rgb(253, 75, 24) 100%)",
  },
  {
    id: 2,
    value: "750",
    subValue: "Ekocoin",
    background:
      "linear-gradient(45deg, rgb(201, 65, 0) 0%, rgb(251, 115, 29) 100%)",
  },
  {
    id: 3,
    value: "500",
    subValue: "Ekocoin",
    background:
      "linear-gradient(90deg, rgb(203, 135, 0) 0%, rgb(253, 185, 40) 100%)",
  },
  {
    id: 4,
    value: "250",
    subValue: "Ekocoin",
    background:
      "linear-gradient(135deg, rgb(54, 104, 22) 0%, rgb(104, 154, 72) 100%)",
  },
  {
    id: 5,
    value: "150",
    subValue: "Ekocoin",
    background: "linear-gradient(rgb(203, 128, 0) 0%, rgb(253, 178, 39) 100%)",
  },
  {
    id: 6,
    value: "100",
    subValue: "Ekocoin",
    background:
      "linear-gradient(225deg, rgb(0, 7, 39) 0%, rgb(30, 57, 89) 100%)",
  },
  {
    id: 7,
    value: "75",
    subValue: "Ekocoin",
    background:
      "linear-gradient(270deg, rgb(0, 0, 20) 0%, rgb(43, 45, 70) 100%)",
  },
  {
    id: 8,
    value: "50",
    subValue: "Ekocoin",
    background:
      "linear-gradient(315deg, rgb(0, 0, 0) 0%, rgb(23, 25, 38) 100%)",
  },
];

const categories = [
  { id: 1, name: "Ekrem Abi", isActive: true },
  { id: 2, name: "Cenabet", isActive: false },
  { id: 3, name: "Betcell", isActive: false },
];

const WheelOfFortune: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastSpins, setLastSpins] = useState<LastSpin[]>([]);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Örnek son çevirimler (gerçekte backend'den gelir)
  useEffect(() => {
    setLastSpins([
      { date: "Bugün", award: "100 Ekocoin" },
      { date: "Dün", award: "250 Ekocoin" },
      { date: "01.07.2025", award: "50 Ekocoin" },
    ]);
  }, []);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);

    const numberOfSections = wheelItems.length;
    const degreesPerSection = 360 / numberOfSections;

    // Rastgele bir kazanacak dilim seç (örnek olarak)
    const winningIndex = Math.floor(Math.random() * numberOfSections);
    const winningItem = wheelItems[winningIndex];

    // Döndürme için gerekli dereceler:
    // Birkaç tam tur (360 * X) + kazanacak dilimin ortasına denk gelecek açı
    // Dilimlerin döndürme transformu tersine olduğu için açıyı hesaplarken dikkatli olunmalı.
    // Her dilim 45 derece. 0'dan başlayıp saat yönünde artıyor.
    // İlk dilim 0-45, ikinci 45-90...
    // İşaretçi hep üstte olduğu için, işaretçinin kazanması için dilimin açısının işaretçinin altına gelmesi lazım.
    // Yani, kazanan dilimin başlangıç açısının 22.5 derece gerisine gitmeliyiz (ortalamak için).
    // Varsayılan olarak 8 dilim ve her dilim 45 derece. Her dilimin ortası 22.5, 67.5 vb.
    // Dönüş açısı pozitif olmalı, bu yüzden 360'ın katlarını ekliyoruz.
    const targetAngleForWinningItem =
      winningIndex * degreesPerSection + degreesPerSection / 2; // Kazanacak dilimin merkezi açısı

    // Çarkın en üstündeki göstergenin işaret ettiği açı 0 derece (veya 360) varsayılır.
    // Kazanacak dilimin merkezi açısını bu 0 derecenin altına getirmeliyiz.
    // Bunun için 360'ın katlarını ve rastgele ek bir tur ekliyoruz ki yeterince dönsün.
    // Basit bir örnek için: 5 tam tur + kazanacak dilimi işaretçinin altına getirecek açı
    const extraTurns = 5; // En az 5 tam tur dönsün
    const newRotation = 360 * extraTurns - targetAngleForWinningItem;

    // Negatif açılardan kaçınmak için 360'ın katlarını ekle
    // newRotation += 360 - (newRotation % 360); // Bunu yapmaya gerek yok, çünkü zaten 360 * extraTurns var

    setRotation(newRotation);

    // Animasyon süresi sonunda sonucu göster
    setTimeout(() => {
      setSpinning(false);
      alert(
        `Tebrikler! ${winningItem.value} ${winningItem.subValue} kazandınız!`
      );
      // Son çevirimleri güncelle
      setLastSpins((prevSpins) => [
        {
          date: "Şimdi",
          award: `${winningItem.value} ${winningItem.subValue}`,
        },
        ...prevSpins.slice(0, 4), // Sadece son 5'i tutmak için
      ]);
    }, 4000); // CSS transition süresi ile eşleşmeli
  };

  return (
    <div className=" relative bg-slate-80 rounded-xl p-2 flex flex-col-reverse xl:flex-row mb-10">
      {/* Sol Panel: Son Çevirimler */}
      <div className=" bg-slate-800 w-full xl:w-1/4 rounded-md">
        <div className="p-4 font-bold text-foundation-white-70% text-center border-b border-slate-700">
          {" "}
          Şans Çarkı{" "}
        </div>
        <div className="p-4 border-b border-slate-700 text-center">
          {/* Buraya çark çevirme hakkı veya sayacı gelebilir */}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-sm font-medium"> Son Çevirimler </p>
            <NextArrowIcon /> {/* Ok ikonu */}
          </div>
        </div>
        {/* Son Çevirimler Listesi */}
        <div className="px-4 py-1 flex items-center justify-between text-slate-600 text-sm font-medium">
          <p>Tarih</p>
          <p>Ödül</p>
        </div>
        {lastSpins.length > 0 ? (
          <div className="px-4 py-2">
            {lastSpins.map((spin, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-gray-400 text-sm py-1"
              >
                <p>{spin.date}</p>
                <p>{spin.award}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xs py-4">
            Henüz çevirim yapılmadı.
          </p>
        )}
      </div>

      {/* Orta Kısım: Çark ve Kategori Seçimi */}
      <div className="wheel-content flex-grow flex flex-col items-center justify-center p-4">
        {/* Kategori Seçim Butonları */}
        <div className="w-full flex justify-center mb-4 flex-wrap gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-md p-[1px] bg-gradient-to-r from-foundation-white-2% to-foundation-white-4% hover:from-foundation-white-4% hover:to-foundation-white-6% transition-all duration-300 cursor-pointer group ${
                cat.isActive
                  ? "bg-gradient-to-r from-slate-500 to-slate-600 text-gray-100"
                  : ""
              }`}
            >
              <div
                className={` w-full gradient-bg-gray-500 rounded-md gap-3 flex overflow-hidden justify-center items-center h-9 pl-3 pr-2 py-2 group-hover:bg-gradient-to-r group-hover:from-foundation-white-4% group-hover:to-foundation-white-6% ${
                  cat.isActive
                    ? "bg-gradient-to-r from-slate-500 to-slate-600"
                    : ""
                }`}
              >
                <div
                  className={`text-sm font-medium leading-tight ${
                    cat.isActive ? "text-gray-100" : "text-slate-500"
                  }`}
                >
                  {cat.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Çark ve Gösterge */}
        <div className="wheel-container_2 relative">
          <div className="wheel-indicator absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <img
              className="indicator"
              src="/data:image/png;base64,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"
              alt="Wheel Indicator"
            />
          </div>
          <div className="wheel-container">
            <div
              ref={wheelRef}
              className={`wheel ${spinning ? "easing-ease" : ""}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: spinning ? "4s" : "0s",
              }}
            >
              {wheelItems.map((item, index) => {
                const degrees = index * (360 / wheelItems.length);
                // Her dilim 45 derecedir (360 / 8). content'i ters çevirmek için 45 derece,
                // metni ortaya hizalamak için 22.5 derece çeviriyoruz.
                const contentRotate = 360 / wheelItems.length / 2; // Dilim içeriğinin dönüşü için
                return (
                  <div
                    key={item.id}
                    className="wheel-item"
                    style={{
                      transform: `rotate(${degrees}deg) skewY(-${
                        360 / wheelItems.length / 2
                      }deg)`, // Dilimlerin görünümünü ayarla
                      background: item.background,
                    }}
                  >
                    <div
                      className="content"
                      style={{
                        transform: `skewY(${
                          360 / wheelItems.length / 2
                        }deg) rotate(${contentRotate}deg)`,
                      }}
                    >
                      <span>
                        <span className="first">
                          <p>{item.value}</p>
                          <span>{item.value}</span>
                        </span>
                        <span className="other">
                          <p>{item.subValue}</p>
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Çark Butonu */}
        <button
          onClick={spinWheel}
          disabled={spinning} // Çark dönerken butonu devre dışı bırak
          className=" bg-slate-700 hover:gradient-bg-2-hover rounded-full flex justify-center items-center w-32 h-32 cursor-pointer transition-all duration-300 transform scale-100 hover:scale-105 mt-4"
          style={{
            backgroundImage:cevirBTN,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Buton içeriği (Eğer buton görselinde yazı yoksa buraya eklenebilir) */}
          <span className="text-white font-bold text-lg">Çevir!</span>
        </button>
      </div>
    </div>
  );
};

export default WheelOfFortune;
