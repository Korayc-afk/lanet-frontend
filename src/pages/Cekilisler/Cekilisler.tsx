import { useState } from "react";
import CekilislerTitle from "../../components/ui/menuBasliklar/CekilislerTitle";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import Footer from "../../components/footer/Footer";
import SponsorCard from "../../components/ui/sponsorCard/SponsorCard";
import TahminPNG from "../../assets/images/score-title-CgwmyF-6.png";
import TahminBG from "../../assets/images/score_bg.png";
import CekilisCard from "../../components/ui/CekilisCard/CekilisCard";
import CekilisTabs from "./CekilisTab";

function Cekilisler() {
  const [activeTab, setActiveTab] = useState("Aktif");

  // 🎯 Aktif Çekilişler
  const aktifCekilisler = [
    {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "300 kişiye",
      participants: 5000,
      price: 0,
      progress: 38,
      remainingTime: "6g 8s 31d",
      buttonText: "Katıl",
    },
    {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-1.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "300 kişiye",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: Math.floor(Math.random() * 90) + 5,
      remainingTime: `${Math.floor(Math.random() * 10)}g ${Math.floor(
        Math.random() * 24
      )}s ${Math.floor(Math.random() * 60)}d`,
      buttonText: "Katıl",
    },
      {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-1.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "300 kişiye",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: Math.floor(Math.random() * 90) + 5,
      remainingTime: `${Math.floor(Math.random() * 10)}g ${Math.floor(
        Math.random() * 24
      )}s ${Math.floor(Math.random() * 60)}d`,
      buttonText: "Katıl",
    },
      {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-1.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "300 kişiye",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: Math.floor(Math.random() * 90) + 5,
      remainingTime: `${Math.floor(Math.random() * 10)}g ${Math.floor(
        Math.random() * 24
      )}s ${Math.floor(Math.random() * 60)}d`,
      buttonText: "Katıl",
    },  {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-1.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "300 kişiye",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: Math.floor(Math.random() * 90) + 5,
      remainingTime: `${Math.floor(Math.random() * 10)}g ${Math.floor(
        Math.random() * 24
      )}s ${Math.floor(Math.random() * 60)}d`,
      buttonText: "Katıl",
    },
    // Diğer aktif çekilişler...
  ];

  // ✅ Tamamlanan Çekilişler (progress %100 ve “Bitti” etiketi)
  const tamamlananCekilisler = [
    {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-2.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "100 Kazandı",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: 100, // Full
      remainingTime: "Bitti",
      buttonText: "Görüntüle",
    },
    {
      link: "/cekilisler/J8mrKfurkz-hBwobvPMqg",
      background: "/assets/raffle-bg-3.png",
      logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/f1k-S2GuUx22S0D38K6Rz.png",
      tag: "Herkese Açık",
      prize: "50 Kazandı",
      participants: Math.floor(Math.random() * 4000) + 1000,
      price: 0,
      progress: 100,
      remainingTime: "Bitti",
      buttonText: "Görüntüle",
    },
    // Diğer tamamlanan çekilişler...
  ];

  const cekilisListesi =
    activeTab === "Aktif" ? aktifCekilisler : tamamlananCekilisler;

  return (
    <section className="mb-10 xl:mb-10 relative">
      {/* Çekilişler Title Header */}
      <CekilislerTitle
        title="Çekilişler"
        description="Ekrem Abi’ye özel çekilişlere katıl, hemen kazan"
      />

      <div className="mt-8">
        {/* Tabs */}
        <CekilisTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Çekiliş Kartları */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {cekilisListesi.map((cekilis, index) => (
            <CekilisCard key={index} {...cekilis} />
          ))}
        </div>

        {/* Sponsor ve Alt Bileşenler */}
        <SponsorCard
          logo={TahminPNG}
          background={TahminBG}
          title="Skoru Bil, Ödülü Kap"
          description="Her hafta sizin için özel seçilen maçlara skor tahmini yaparak kazanın!"
          buttonText="İncele"
          buttonLink="#"
          className="mb-6"
        />
        <SocialMediaCard />
        <VideoCard />
        <Footer />
      </div>
    </section>
  );
}

export default Cekilisler;
