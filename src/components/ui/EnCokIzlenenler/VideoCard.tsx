import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import EnCokIzlenenTitle from "../../ui/menuBasliklar/EnCokIzlenenTitle";
import "swiper/css";
import "swiper/css/pagination";

const BASE_URL = "/api-uploads";

interface VideoItem {
  id: number;
  title: string;
  videoUrl: string;
  imageUrl: string;
  isActive: boolean;
}

const VideoCard = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/videos`);
        const json = await res.json();
        if (json.success) {
          const filtered = json.data.filter((v: VideoItem) => v.isActive);
          setVideos(filtered);
        }
      } catch (err) {
        console.error("Videolar alınamadı", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section>
      <div className="relative">
        <EnCokIzlenenTitle
          title="En Çok İzlenenler"
          description="LanetKel’nin en çok izlenen videolarına göz atın"
        />
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={"auto"}
          pagination={{ clickable: true }}
          className="!px-0"
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
          {videos.map((video) => (
            <SwiperSlide key={video.id} style={{ width: "415px" }}>
              <div className="col-span-1 flex flex-col gap-2 relative rounded-lg xl:rounded-xl p-[1px] h-full">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative z-50 h-full rounded-lg xl:rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  <div className="rounded-lg xl:rounded-xl relative">
                    <img
                      src={
                        video.imageUrl.startsWith("http")
                          ? video.imageUrl
                          : `${BASE_URL}${video.imageUrl}`
                      }
                      alt={video.title}
                      className="block w-full h-64 object-cover transition-all duration-200 group-hover:scale-105"
                    />
                    <div className="w-full h-full left-0 top-0 absolute bg-gradient-to-b from-slate-910/0 to-slate-900 group-hover:to-purple-900" />
                    <span className="inline-block p-3 absolute bottom-0 left-0 w-full">
                      <p className="font-medium text-gray-100">{video.title}</p>
                    </span>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VideoCard;
