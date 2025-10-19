import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import arkaplan from "../../../../src/assets/images/sanaozel/bg2-D_R7BIxj.svg";
import SanaOzelTitle from "../menuBasliklar/SanaOzelTitle";
import SanaOzelCard from "./SanaOzelCard";

const etkinlikler = [
  {
    backgroundImage: arkaplan,
    logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/s7iOuPUxIrOyWpMn8F6Qs.png",
    title: "ANADOLUSLOT'TA %15 ÇEVRİMSİZ SPOR BONUS",
    description: "ANADOLUSLOT'TA %15 ÇEVRİMSİZ SPOR BONUSU",
    buttonText: "Bonusu Al",
    buttonLink: "#",
  },
  {
    backgroundImage: arkaplan,
    logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/DTJH0So9_D5kefHfixo7c.png",
    title: "Rulobet Çevrim Etkinliği",
    description: "500.000₺ ödüllü Çevrim Etkinliği",
    buttonText: "Bilete Katıl",
    buttonLink: "#",
  },
  {
    backgroundImage: arkaplan,
    logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/s7iOuPUxIrOyWpMn8F6Qs.png",
    title: "Özel Bonus!",
    description: "Gizli bonuslar ve fırsatlar",
    buttonText: "Çekilişe Katıl",
    buttonLink: "#",
  },
  {
    backgroundImage: arkaplan,
    logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/s7iOuPUxIrOyWpMn8F6Qs.png",
    title: "ANADOLUSLOT'TA %15 ÇEVRİMSİZ SPOR BONUS",
    description: "ANADOLUSLOT'TA %15 ÇEVRİMSİZ SPOR BONUSU",
    buttonText: "Bonusu Al",
    buttonLink: "#",
  },
  {
    backgroundImage: arkaplan,
    logo: "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/DTJH0So9_D5kefHfixo7c.png",
    title: "Rulobet Çevrim Etkinliği",
    description: "500.000₺ ödüllü Çevrim Etkinliği",
    buttonText: "Bilete Katıl",
    buttonLink: "#",
  },
];

const SanaOzel = () => {
  return (
    <section className="mb-10 xl:mb-20 relative hidden md:block">
      <SanaOzelTitle
        title="Sana özel seçilen etkinlikler"
        description="Etkinlikleri kaçırma, çekiliş ve bonuslardan haberdar ol"
      />

      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={
          {
            paddingBottom: "40px",
            "--swiper-pagination-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-color": "#777777",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-pagination-bullet-size": "8px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          } as React.CSSProperties
        }
      >
        {etkinlikler.map((etkinlik, index) => (
          <SwiperSlide key={index}>
            <SanaOzelCard {...etkinlik} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SanaOzel;
