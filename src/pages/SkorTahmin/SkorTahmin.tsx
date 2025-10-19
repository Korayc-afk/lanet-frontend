import { useState } from "react";
import SkorTahminTitle from "../../components/ui/menuBasliklar/SkorTahminTitle";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import Footer from "../../components/footer/Footer";
import TextAreaCard from "../../components/ui/TextAreaCard/TextAreaCard";
import TahminCard from "../../components/ui/TahminCard/TahminCard";
import BlankIMG from "../../assets/images/blank-image-CFOICi9A.png";

function SkorTahmin() {
  const [activeTab, setActiveTab] = useState("Aktif");

  const tabs = ["Aktif", "Tamamlanan", "Katıldığım"];

  // Örnek tahminler
  const aktifTahminler = [
    {
      leagueLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/tigXZ6TmVR4EUBAmjaVw2.png",
      homeLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/QxDt96atNyLv0T3YbH_l3.png",
      awayLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/-x4m35v3Xhx65GKUaQb7H.png",
      matchName: "Fenerbahçe - Beşiktaş",
      matchDate: "13.07.2025 | 21:00",
      status: "Aktif" as "Aktif" | "Tamamlanan",
    },
    {
      leagueLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/jWq172h61Xa8c-73zuP_E.png",
      homeLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/P1X8zNVQ8lNt9AzRP91C2.png",
      awayLogo:
        "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/YGFEhTKdSlLkOXuJ0hgg3.png",
      matchName: "Barcelona - Real Madrid",
      matchDate: "15.07.2025 | 22:00",
      status: "Aktif" as "Aktif" | "Tamamlanan",
    },
  ];

  const tamamlananTahminler = [
    {
      leagueLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png",
      homeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
      awayLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
      matchName: "Manchester City - Bayern München",
      homeScore: 3,
      awayScore: 1,
      status: "Tamamlanan" as "Aktif" | "Tamamlanan",
    },
    {
      leagueLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Europa_League_logo_2021.svg/1200px-Europa_League_logo_2021.svg.png",
      homeLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
      awayLogo:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/AS_Roma_logo_%282017%29.svg/1200px-AS_Roma_logo_%282017%29.svg.png",
      matchName: "Arsenal - Roma",
      homeScore: 2,
      awayScore: 2,
      status: "Tamamlanan" as "Aktif" | "Tamamlanan",
    },
  ];

  return (
    <section className="mb-10 xl:mb-10 relative">
      {/* Sayfa Başlığı */}
      <SkorTahminTitle
        title="Skor Tahmin"
        description="Her hafta sizin için özel seçilen maçlara skor tahmini yaparak kazanın!"
      />

      {/* Tab Menüsü */}
      <div className="mt-8">
        <div className="grid grid-cols-3 sm:flex lg:gap-3 border-b border-gray-800 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-3 justify-center items-center gap-3 flex overflow-hidden cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-red-600"
                  : "border-b-2 border-transparent"
              }`}
            >
              <div
                className={`text-xs lg:text-sm font-medium leading-tight hover:text-gray-100 ${
                  activeTab === tab ? "text-gray-100" : "text-slate-500"
                }`}
              >
                {tab}
              </div>
            </div>
          ))}
        </div>

        {/* Aktif Sekmesi */}
        {activeTab === "Aktif" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            {aktifTahminler.map((tahmin, index) => (
              <TahminCard key={index} {...tahmin} />
            ))}
          </div>
        )}

        {/* Tamamlanan Sekmesi */}
        {activeTab === "Tamamlanan" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            {tamamlananTahminler.map((tahmin, index) => (
              <TahminCard key={index} {...tahmin} />
            ))}
          </div>
        )}

        {/* Katıldığım Sekmesi */}
        {activeTab === "Katıldığım" && (
          <div className="flex flex-col justify-center items-center gap-4 mb-10">
            <span className="text-stone-50 text-center">
              Katıldığın skor tahmin etkinlikleri burada listelenecek.
            </span>

            <img
              src={BlankIMG}
              alt="Boş içerik"
              className="w-60 h-auto object-contain"
            />

            <a href="/" className="text-blue-500 underline text-sm text-center">
              Anasayfaya dönmek için tıklayın.
            </a>
          </div>
        )}

        <TextAreaCard
          title="Skor Tahmin ile Şampiyonluğa Adım At!"
          content={[
            "Ekrem Abi sitesi olarak sunduğumuz bahis deneyimini daha adil, şeffaf ve eğlenceli hale getirmek amacıyla bilet sistemini hizmetinize sunduk.",
            "Bilet Etkinliği Hakkında",
            "Aşağıda, bilet etkinlikleri ile ilgili sıkça sorulan sorulara ve detaylara ulaşabilirsiniz:",
            "Bilet Çevrim Etkinliği: Her 1000 TL’lik çevrim için 1 bilet kazanırsınız.",
            "Bilet Yatırım Etkinliği: Her 500 TL’lik yatırım için 1 bilet kazanırsınız.",
            "Yukarı kısımdan istediğiniz sitenin etkinliğine tıklayarak bilet etkinliğine katılım sağlayabilirsiniz.",
            "Çekiliş Tarihi ve Sonuçlar",
            "Çekiliş sonuçları ilk olarak sitemizin menüsündeki canlı yayın bölümünde açıklanır, ardından bilet detay sayfasına eklenir.",
            "Aşağıda, bilet etkinlikleri ile ilgili sıkça sorulan sorulara ve detaylara ulaşabilirsiniz:",
            "Bilet Çevrim Etkinliği: Her 1000 TL’lik çevrim için 1 bilet kazanırsınız.",
            "Bilet Yatırım Etkinliği: Her 500 TL’lik yatırım için 1 bilet kazanırsınız.",
            "Etkinliklere Nasıl Katılabilirim?",
            "Yukarı kısımdan istediğiniz sitenin etkinliğine tıklayarak bilet etkinliğine katılım sağlayabilirsiniz.",
            "Çekiliş Tarihi ve Sonuçlar",
            "Çekiliş sonuçları ilk olarak sitemizin menüsündeki canlı yayın bölümünde açıklanır, ardından bilet detay sayfasına eklenir.",
            "Aşağıda, bilet etkinlikleri ile ilgili sıkça sorulan sorulara ve detaylara ulaşabilirsiniz:",
            "Bilet Çevrim Etkinliği: Her 1000 TL’lik çevrim için 1 bilet kazanırsınız.",
            "Bilet Yatırım Etkinliği: Her 500 TL’lik yatırım için 1 bilet kazanırsınız.",
            "Etkinliklere Nasıl Katılabilirim?",
            "Yukarı kısımdan istediğiniz sitenin etkinliğine tıklayarak bilet etkinliğine katılım sağlayabilirsiniz.",
            "Çekiliş Tarihi ve Sonuçlar",
            "Çekiliş sonuçları ilk olarak sitemizin menüsündeki canlı yayın bölümünde açıklanır, ardından bilet detay sayfasına eklenir.",
          ]}
        />
        {/* Sosyal Medya & Footer */}
        <SocialMediaCard />
        <Footer />
      </div>
    </section>
  );
}

export default SkorTahmin;
