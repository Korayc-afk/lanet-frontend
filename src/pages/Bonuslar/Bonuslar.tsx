import { useEffect, useState } from "react";
import BonuslarTitle from "../../components/ui/menuBasliklar/BonuslarTitle";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import Footer from "../../components/footer/Footer";
import MarketeGit from "../../assets/images/bonus-market_bg.png";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import SponsorCard from "../../components/ui/sponsorCard/SponsorCard";
import UnifiedBonusCard from "../../components/ui/UnifiedBonusCard/UnifiedBonusCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const BASE_URL = "/api";

interface Sponsor {
  id: number;
  logoUrl: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isMain: boolean;
}

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

function Bonuslar() {
  const [activeTab, setActiveTab] = useState("En Son Eklenen Bonuslar");
  const [sliderSponsors, setSliderSponsors] = useState<Sponsor[]>([]);
  const [promotionCards, setPromotionCards] = useState<PromotionCard[]>([]);

  const tabs = ["En Son Eklenen Bonuslar", "Deneme Bonusları"];

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/sponsors`);
        const json = await res.json();
        if (json.success) {
          const nonMain = json.data.filter((s: Sponsor) => !s.isMain);
          setSliderSponsors(nonMain);
        }
      } catch (err) {
        console.error("Sponsorlar alınamadı", err);
      }
    };

    const fetchPromotionCards = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/promotion-cards`);
        const json = await res.json();
        if (json.success) {
          setPromotionCards(json.data);
        }
      } catch (err) {
        console.error("Bonus kartları alınamadı", err);
      }
    };

    fetchSponsors();
    fetchPromotionCards();
  }, []);

  const bonusTypeCards = promotionCards.filter((card) => card.type === "BONUS");
  const miniTypeCards = promotionCards.filter((card) => card.type === "MINI");

  return (
    <section className="mb-10 xl:mb-10 relative">
      <BonuslarTitle
        title="Bonuslar"
        description="Tüm bonusları keşfedin ve size en uygun olanı hemen kullanın"
      />

      <div className="mt-8">
        <div className="flex gap-4 border-b border-gray-800 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-3 cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-gray-100"
                  : "border-b-2 border-transparent text-slate-500"
              }`}
            >
              <span className="text-sm font-medium hover:text-gray-100">{tab}</span>
            </div>
          ))}
        </div>

        {activeTab === "En Son Eklenen Bonuslar" && (
          <>
            <div className="mb-10">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                spaceBetween={20}
                slidesPerView={1}
                loop
              >
                {sliderSponsors.map((sponsor) => (
                  <SwiperSlide key={sponsor.id}>
                    <SponsorCard
                      logo={`${BASE_URL}${sponsor.logoUrl}`}
                      background={`${BASE_URL}${sponsor.imageUrl}`}
                      title={sponsor.title}
                      description={sponsor.description}
                      buttonText={sponsor.buttonText}
                      buttonLink={sponsor.buttonUrl}
                      rightImage={`${BASE_URL}${sponsor.logoUrl}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <UnifiedBonusCard cards={bonusTypeCards} />
          </>
        )}

        {activeTab === "Deneme Bonusları" && <UnifiedBonusCard cards={miniTypeCards} />}

        <SponsorCard
          background={MarketeGit}
          title="Bol Bol Harca, Gönlünce Eğlen!"
          description="Kazandığın puanlarla birbirinden keyifli ödüller markette seni bekliyor!"
          buttonText="Markete Git →"
          buttonLink="/market"
        />

        <BonuslarTitle
          title="Görmeye Değer Bonuslar"
          description="İncelemen gereken yeni ve popüler casino bonusları"
        />
            <UnifiedBonusCard cards={bonusTypeCards} />

        <VideoCard />
        <SocialMediaCard />
        <Footer />
      </div>
    </section>
  );
}

export default Bonuslar;
