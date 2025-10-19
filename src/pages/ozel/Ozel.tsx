import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import Card from "../../components/ui/siteCard/Card";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import BonusCardGrid from "../../components/ui/TekliCard/BonusCardGrid";
import GuvenilirSiteTitle from "../../components/ui/menuBasliklar/GuvenilirSiteTitle";

interface MainCard {
  id: number;
  href: string;
  imageSrc: string;
  logoSrc: string;
  badgeText: string;
  isActive: boolean;
}

const BASE_URL = "/api-uploads";

export default function Ozel() {
  const [cards, setCards] = useState<MainCard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/maincards`);
        const data = await res.json();

        if (data.success) {
          const activeCards = data.data
            .filter((card: MainCard) => card.isActive)
            .slice(0, 2); // 🔥 sadece ilk 2 kart
          setCards(activeCards);
        }
      } catch (error) {
        console.error("Kartlar alınamadı:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="mb-6">
      {/* Başlık */}
      <GuvenilirSiteTitle
        title="Özel Önerilen Siteler"
        description="En çok önerilen ve güvenle tavsiye edilen casino sitelerini burada bulabilirsiniz."
      />

      {/* Kartlar (Dinamik 2 adet) */}
<div className="flex flex-wrap gap-6 mb-6 justify-between px-2">
        {cards.map((card) => (
          <Card
            key={card.id}
            href={card.href}
            imageSrc={`${BASE_URL}${card.imageSrc}`}
            logoSrc={`${BASE_URL}${card.logoSrc}`}
            badgeText={card.badgeText}
          />
        ))}
      </div>

      {/* Sosyal Medya Kartları */}
      <SocialMediaCard />

      {/* Bonus Card */}
      <BonusCardGrid />

      {/* En Çok İzlenenler */}
      <VideoCard />
      <VideoCard />

      {/* Footer */}
      <Footer />
    </div>
  );
}
