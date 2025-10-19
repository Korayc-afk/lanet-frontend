import { useEffect, useState } from "react";
import axios from "axios";
import GuvenilirSiteTitle from "../../components/ui/menuBasliklar/GuvenilirSiteTitle";
import Card from "../../components/ui/siteCard/Card";

interface MainCard {
  id: number;
  href: string;
  imageSrc: string;
  logoSrc: string;
  badgeText: string;
  isActive: boolean;
}

const BASE_URL = "/api-uploads";

export default function Guvenilir() {
  const [cards, setCards] = useState<MainCard[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/maincards`);

        if (res.data.success) {
          const activeCards = res.data.data
            .filter((card: MainCard) => card.isActive)
            .slice(0, 4); // 🔥 4 aktif kart
          setCards(activeCards);
          setError(null);
        } else {
          setError("Kartlar alınamadı: Başarısız cevap.");
        }
      } catch (err) {
        setError("Kartlar alınamadı: Sunucu hatası.");
        console.error("Kartlar alınamadı:", err);
      }
    };

    fetchCards();
  }, []);

  if (error)
    return (
      <div className="text-red-500 font-semibold text-center ">{error}</div>
    );

  return (
    <div className="space-y-6 px-4 mt-6">
      {/* Başlık ve Açıklama */}
      <div className="flex gap-2 items-start">
        <GuvenilirSiteTitle
          title="İffetsiz Umut'un önerdiği siteler."
          description="En çok önerilen ve güvenle tavsiye edilen casino sitelerini burada bulabilirsiniz."
        />
      </div>

      {/* Dinamik Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 -mt-10">
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
    </div>
  );
}
