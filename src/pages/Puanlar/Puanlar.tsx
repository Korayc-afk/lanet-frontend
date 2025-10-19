import PuanTitle from "../../components/ui/menuBasliklar/PuanTitle";
import SocialMediaCard from "../../components/ui/sosyal/SosyalMedya";
import Footer from "../../components/footer/Footer";
import MarketBonus from "../../assets/images/bonus-slider_bg-SJUmAXSl.png";
import SponsorCard from "../../components/ui/sponsorCard/SponsorCard";
import BrandCenabet from "../../assets/images/partners/cenabet/jWq172h61Xa8c-73zuP_E.png";
import BrandCenabetRight from "../../assets/images/partners/cenabet/cenabetRight.jpg";
import BrandHasBet from "../../assets/images/partners/HasBet/ZNfKgAMasG6EiCj4--DB4.png";
import BrandHasBetRight from "../../assets/images/partners/HasBet/hasBetRight.jpg";
import BiletTitle from "../../components/ui/menuBasliklar/BiletTitle";

// Swiper importları
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Pagination, Autoplay } from "swiper/modules";
import PuanTablosu from "../../components/ui/PuanTablosu/PuanTablosu";
import RewardCard from "../../components/ui/KodGir/KodGir";
import SkorUstalariTitle from "../../components/ui/menuBasliklar/SkorUstalariTitle";
import LeaderboardCards from "../../components/ui/LiderTablosu/LiderTablosu";
import RankTablosu from "../../components/ui/RankTablosu/RankTablosu";

function Puanlar() {
  // 🎯 Swiper için örnek SponsorCard verileri
  const sponsorCardsData = [
    {
      background: MarketBonus,
      title: "  slider 1 Bol Bol Harca, Gönlünce Eğlen!",
      description:
        "Kazandığın puanlarla birbirinden keyifli ödüller markette seni bekliyor!",
      logo: BrandCenabet,
      rightImage: BrandCenabetRight,
      buttonText: "Bonusu Al →",
      buttonLink: "#",
    },
    {
      background: MarketBonus,
      title: "Slider 2 Yeni Bonus Fırsatları!",
      description: "Sadece bu ay geçerli, kaçırmayın!",
      buttonText: "Bonusu Al →",
      buttonLink: "#",
      logo: BrandHasBet,
      rightImage: BrandHasBetRight,
    },
    {
      background: MarketBonus,
      title: "  slider 3 Bol Bol Harca, Gönlünce Eğlen!",
      description:
        "Kazandığın puanlarla birbirinden keyifli ödüller markette seni bekliyor!",
      logo: BrandCenabet,
      rightImage: BrandCenabetRight,
      buttonText: "Bonusu Al →",
      buttonLink: "#",
    },
  ];
  // 🎯 BonusCardGrid için örnek data
  return (
    <section className="mb-10 xl:mb-10 relative">
      {/* Sayfa Başlığı */}
      <PuanTitle
        title="Puan"
        description="Puanlarınızı toplayarak ödüller kazanabilirsiniz"
      />
      <div className="mt-8">
        {/* En Son Eklenen Bonuslar (Swiper Slider) */}
        <div className="mb-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            spaceBetween={20}
            slidesPerView={1} // 🎯 Ekranda sadece 1 kart
            loop
          >
            {sponsorCardsData.map((card, index) => (
              <SwiperSlide key={index}>
                <SponsorCard
                  logo={card.logo}
                  rightImage={card.rightImage}
                  background={card.background}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  buttonLink={card.buttonLink}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <BiletTitle
          title={"Son Dağıtılan Kodlar"}
          description="En güncel promosyon kodlarını burada keşfedin ve avantajları yakalayın!"
        />
        <PuanTablosu />
        <RewardCard />
        <SkorUstalariTitle
          title="Skor Ustaları"
          description="Zirvedeki kullanıcıları keşfedin"
        />
        <LeaderboardCards />
        <RankTablosu />
        <SocialMediaCard />
        <Footer />
      </div>
    </section>
  );
}
export default Puanlar;
