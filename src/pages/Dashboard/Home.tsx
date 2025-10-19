import { useEffect, useState } from "react";
import Guvenilir from "../../pages/guvenilir/Guvenilir";
import PageMeta from "../../components/common/PageMeta";
import Marquee from "../../components/ui/KayanSlider/Marquee";
import BannerSection from "../../components/ui/brands/BannerSection";
import SanaOzel from "../../components/ui/SanaOzel/SanaOzel";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import Footer from "../../components/footer/Footer";
import UnifiedBonusCard from "../../components/ui/UnifiedBonusCard/UnifiedBonusCard";
import { useSettings } from "../../context/SettingsContext"; // 🌟 burada

const BASE_URL = "/api-uploads";

interface PromotionCard {
  id: number;
  type: "BONUS" | "MINI";
  title: string;
  description: string;
  image: string;
  modalTitle: string;
  modalDescription: string;
  modalImage: string;
  promotionLink?: string;
  order: number;
  isActive: boolean;
}

export default function Home() {
  const [bonusCards, setBonusCards] = useState<PromotionCard[]>([]);
  const { settings } = useSettings(); // 🌟 burada

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/promotion-cards`);
        const json = await res.json();
        if (json.success) {
          const filtered = json.data.filter((item: PromotionCard) => item.type === "BONUS");
          setBonusCards(filtered);
        }
      } catch (err) {
        console.error("Bonus kartları alınamadı", err);
      }
    };

    fetchCards();
  }, []);

  const unifiedCards = bonusCards.map((card) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    image: card.image,
    modalTitle: card.modalTitle,
    modalDescription: card.modalDescription,
    modalImage: card.modalImage,
    promotionLink: card.promotionLink,
  }));

  return (
    <>
      <Marquee />

      <PageMeta
        title={settings.siteTitle || "LanetKel Casino"}
        description={settings.seoDescription || "Varsayılan açıklama..."}
      />

      <div className="grid grid-cols-4 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <Guvenilir />
        </div>
      </div>

      <BannerSection />
      <SanaOzel />
      <SocialMediaCard />
      <UnifiedBonusCard cards={unifiedCards} />
      <VideoCard />
      <Footer />
    </>
  );
}
