import { useState, useEffect } from "react";
import BiletlerTitle from "../../components/ui/menuBasliklar/BiletTitle";
import Footer from "../../components/footer/Footer";
import CekilisCard from "../../components/ui/CekilisCard/CekilisCard";
import BiletTab from "./BiletTab"; // Make sure this path is correct
import TextAreaCard from "../../components/ui/TextAreaCard/TextAreaCard";

// 🎯 Tip tanımı
interface CekilisCardProps {
  link: string;
  background: string;
  logo: string;
  tag: string;
  prize: string; // ✅ sadece string
  participants: string | number;
  price: number;
  progress: number;
  remainingTime: string;
  buttonText: string;
}

function Biletler() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const [aktifBiletler, setAktifBiletler] = useState<CekilisCardProps[]>([]);
  const [tamamlananBiletler, setTamamlananBiletler] = useState<CekilisCardProps[]>([]);

  const generateAktifBiletler = (): CekilisCardProps[] => {
    return Array.from({ length: 3 }, (_, i) => ({
      link: `/Biletler/J8mrKfurkz-hBwobvPMqg-${i}`,
      background: `/assets/raffle-bg-${i % 5}.png`,
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "TOPLAMDA",
      prize: "", // ✅ string olarak bırakıldı
      participants: "25.000.000",
      price: 0,
      progress: Math.floor(Math.random() * 90) + 5,
      remainingTime: `${Math.floor(Math.random() * 10)}g ${Math.floor(Math.random() * 24)}s ${Math.floor(Math.random() * 60)}d`,
      buttonText: "Katıl",
    }));
  };

  const generateTamamlananBiletler = (): CekilisCardProps[] => {
    return Array.from({ length: 8 }, (_, i) => ({
      link: `/Biletler/J8mrKfurkz-hBwobvPMqg-${i}`,
      background: `/assets/raffle-bg-${i % 5}.png`,
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: `${Math.floor(Math.random() * 500)} Kazandı`, // ✅ string
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: 100,
      remainingTime: "Bitti",
      buttonText: "Görüntüle",
    }));
  };

  useEffect(() => {
    setAktifBiletler(generateAktifBiletler());
    setTamamlananBiletler(generateTamamlananBiletler());
  }, []);

  const cekilisListesi = activeTab === "Aktif" ? aktifBiletler : tamamlananBiletler;

  return (
    <section className="mb-10 xl:mb-10 relative">
      <BiletlerTitle
        title="Biletler"
        description="Ekrem Abi’ye özel çekilişlere katıl, hemen kazan"
      />

      <div className="mt-8">
        {/* BiletTab component'ine activeTab ve setActiveTab prop'larını geçirin */}
        <BiletTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {cekilisListesi.map((cekilis, index) => (
            <CekilisCard key={index} {...cekilis} />
          ))}
        </div>

        <TextAreaCard
          title="Bilet Sistemi Nedir?"
          content={[
            "Ekrem Abi sitesi olarak sunduğumuz bahis deneyimini daha adil, şeffaf ve eğlenceli hale getirmek amacıyla bilet sistemini hizmetinize sunduk.",
            "Bilet Etkinliği Hakkında",
            "Bilet Çevrim Etkinliği: Her 1000 TL’lik çevrim için 1 bilet kazanırsınız.",
            "Bilet Yatırım Etkinliği: Her 500 TL’lik yatırım için 1 bilet kazanırsınız.",
            "Etkinliklere Nasıl Katılabilirim? Yukarı kısımdan istediğiniz sitenin etkinliğine tıklayarak bilet etkinliğine katılım sağlayabilirsiniz.",
            "Çekiliş Tarihi ve Sonuçlar: Çekiliş sonuçları menüdeki canlı yayın bölümünde açıklanır, ardından bilet detay sayfasına eklenir.",
          ]}
        />

        <Footer />
      </div>
    </section>
  );
}

export default Biletler;