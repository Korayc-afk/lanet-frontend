import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "/api"; // Backend adresin

type PartnerBrand = {
  id: number;
  name: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
};

const BannerSection = () => {
  const [banners, setBanners] = useState<PartnerBrand[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/api/partnerbrands");
        const data = response.data.data || []; // burayı kontrol et
        const activeBrands = data.filter(
          (brand: PartnerBrand) => brand.isActive
        );
        setBanners(activeBrands);
      } catch (error) {
        console.error("Partner brand verisi alınamadı:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <section className="mb-10 xl:mb-10 relative z-10 magical-borders">
      <div className="flex flex-wrap gap-2 xl:gap-4 magical-borders-content justify-center relative z-10">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="col-span-1 flex flex-col gap-2 relative rounded-lg xl:rounded-xl p-[1px] h-full w-[calc(25%-0.375rem)] xl:w-[calc(25%-0.75rem)]"
          >
            <a
              href={banner.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden transition-all duration-300 cursor-pointer gradient-border gradient-bg-1 hover:gradient-bg-1-hover p-3 h-full"
            >
              <div className="flex items-center justify-center h-[100px] w-full">
                <img
                  src={`${BASE_URL}${banner.imageUrl}`}
                  alt={banner.name}
                  className="max-h-[80px] w-auto object-contain mx-auto transition-all duration-200 group-hover:scale-105"
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
