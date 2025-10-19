import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 5.33398C4 4.27312 4.42143 3.2557 5.17157 2.50556C5.92172 1.75541 6.93913 1.33398 8 1.33398C9.06087 1.33398 10.0783 1.75541 10.8284 2.50556C11.5786 3.2557 12 4.27312 12 5.33398H12.6667C13.0203 5.33398 13.3594 5.47446 13.6095 5.72451C13.8595 5.97456 14 6.3137 14 6.66732V13.334C14 13.6876 13.8595 14.0267 13.6095 14.2768C13.3594 14.5268 13.0203 14.6673 12.6667 14.6673H3.33333C2.97971 14.6673 2.64057 14.5268 2.39052 14.2768C2.14048 14.0267 2 13.6876 2 13.334V6.66732C2 6.3137 2.14048 5.97456 2.39052 5.72451C2.64057 5.47446 2.97971 5.33398 3.33333 5.33398H4ZM8 2.66732C8.70724 2.66732 9.38552 2.94827 9.88562 3.44837C10.3857 3.94846 10.6667 4.62674 10.6667 5.33398H5.33333C5.33333 4.62674 5.61428 3.94846 6.11438 3.44837C6.61448 2.94827 7.29276 2.66732 8 2.66732ZM9.33333 9.33398C9.33333 9.56803 9.27172 9.79795 9.15469 10.0006C9.03767 10.2033 8.86935 10.3716 8.66667 10.4887V11.334C8.66667 11.5108 8.59643 11.6804 8.4714 11.8054C8.34638 11.9304 8.17681 12.0007 8 12.0007C7.82319 12.0007 7.65362 11.9304 7.5286 11.8054C7.40357 11.6804 7.33333 11.5108 7.33333 11.334V10.4887C7.07916 10.3419 6.88052 10.1154 6.76821 9.8442C6.65589 9.57303 6.63619 9.27239 6.71216 8.98889C6.78812 8.70539 6.95551 8.45487 7.18836 8.2762C7.4212 8.09752 7.7065 8.00066 8 8.00065C8.35362 8.00065 8.69276 8.14113 8.94281 8.39118C9.19286 8.64122 9.33333 8.98036 9.33333 9.33398Z"
      fill="#717796"
    ></path>
  </svg>
);

interface AwardItem {
  id: number;
  day: string;
  points: string;
  xp: string;
  imageUrl: string;
  disabled: boolean; // Ödülün kilitli olup olmadığını belirler
}

const dailyAwards: AwardItem[] = [
  {
    id: 1,
    day: "1. Gün",
    points: "75 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/7PvdEYar-SXxJcv5vLEIj.png",
    disabled: true,
  },
  {
    id: 2,
    day: "2. Gün",
    points: "100 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/ZUS5Mq2NS41KRHx5J_HZV.png",
    disabled: true,
  },
  {
    id: 3,
    day: "3. Gün",
    points: "150 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/uLl5QZKMXBPekFvZRaFks.png",
    disabled: true,
  },
  {
    id: 4,
    day: "4. Gün",
    points: "200 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/_NewjH8FWuxcgDFlCCpY2.png",
    disabled: true,
  },
  {
    id: 5,
    day: "5. Gün",
    points: "250 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/KEs0BbvASG2h7rCOy94RJ.png",
    disabled: true,
  },
  {
    id: 6,
    day: "6. Gün",
    points: "300 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/NIY6d0cGDT_R5kV21jV3A.png",
    disabled: true,
  },
  {
    id: 7,
    day: "7. Gün",
    points: "350 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/IAOIyiBH-3kaKVU20Uv1b.png",
    disabled: true,
  },
  {
    id: 8,
    day: "8. Gün",
    points: "400 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/WCCQedgB9sgKwHrRVuSi6.png",
    disabled: true,
  },
  {
    id: 9,
    day: "9. Gün",
    points: "450 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/ogl8c1FEPLUrTcGetP0ky.png",
    disabled: true,
  },
  {
    id: 10,
    day: "10. Gün",
    points: "2 Çark Ödülü", // Ödül metni burada değişiyor
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/IUg3Bm4NhRKW6bDdjs9v7.png",
    disabled: true,
  },
  {
    id: 11,
    day: "11. Gün",
    points: "550 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/ZMvhMRQQTZ_12Pl5flFbp.png",
    disabled: true,
  },
  {
    id: 12,
    day: "12. Gün",
    points: "600 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/1PfK1L-1O9yGxcM4vTTLC.png",
    disabled: true,
  },
  {
    id: 13,
    day: "13. Gün",
    points: "650 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/B7AifVwkiQVhgIoQ4dq9d.png",
    disabled: true,
  },
  {
    id: 14,
    day: "14. Gün",
    points: "700 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/BDwqAc7Zf9XCJ1Ru6bH_a.png",
    disabled: true,
  },
  {
    id: 15,
    day: "15. Gün",
    points: "750 Puan",
    xp: "0 XP",
    imageUrl:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/jnkUDsrEGrzu6bbwJF6si.png",
    disabled: true,
  },
];

const Oduller: React.FC = () => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={4} // 4 tane kart yanyana
        loop={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = navigationPrevRef.current;
              navigation.nextEl = navigationNextRef.current;
            }
          }
        }}
        className="oduller-swiper"
      >
        {dailyAwards.map((award) => (
          <SwiperSlide
            key={award.id}
            className="transition-transform duration-300 hover:scale-105"
          >
            <div
              className={`relative rounded-xl p-4 shadow-lg backdrop-blur-md border border-slate-700 flex flex-col items-center gap-2 ${
                award.disabled ? "opacity-50" : ""
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(43,45,70,0.9) 0%, rgba(19,19,32,0.8) 100%)",
              }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-800/40 to-purple-800/20 rounded-xl pointer-events-none" />
              <div className="relative z-10">
                <img
                  src={award.imageUrl}
                  alt={award.day}
                  className="h-24 mx-auto rounded"
                />
              </div>
              <p className="text-white font-semibold">{award.day}</p>
              <p className="text-green-400 font-semibold text-sm bg-slate-700/50 px-2 py-1 rounded">
                {award.points}
              </p>
              <p className="text-gray-400 font-medium text-xs">{award.xp}</p>
              <button
                disabled={award.disabled}
                className="mt-auto w-full text-sm flex justify-center items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
              >
                <LockIcon />
                <span>{award.disabled ? "Kilitli" : "Al"}</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Oduller;
