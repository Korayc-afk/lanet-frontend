import  { useEffect, useState } from "react";

type MarqueeItem = {
  id: number;
  imageUrl: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
};

const Marquee = () => {
  const [banners, setBanners] = useState<MarqueeItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/marquee")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const activeBanners = data.data.filter((b: MarqueeItem) => b.isActive);
          setBanners(activeBanners);
        } else {
          setError("Marquee verisi alınamadı.");
        }
      })
      .catch(() => setError("Marquee verisi alınamadı."));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="relative mb-5 overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-content flex items-center">
          {banners.concat(banners).map((banner, index) => (
            <a
              key={index}
              href={banner.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-3"
            >
              <img
                src={`/api${banner.imageUrl}`}
                alt={`Banner ${banner.id}`}
                className="h-14 md:h-20 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
