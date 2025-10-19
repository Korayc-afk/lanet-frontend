import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaInstagram, FaTelegram, FaYoutube, FaWhatsapp, FaFacebook, FaSkype, FaTwitter } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SosyalAglarTitle from "../../ui/menuBasliklar/SosyalAglarTitle";

// Settings interface'i (Bu dosyada lokal olarak tanımlandı)
interface Settings {
  id?: number;
  siteTitle: string | null;
  seoDescription: string | null;
  footerText: string | null;
  siteLogoUrl: string | null;
  faviconUrl: string | null;
  facebookLink: string | null;
  facebookText: string | null;
  instagramLink: string | null;
  instagramText: string | null;
  telegramLink: string | null;
  telegramText: string | null;
  youtubeLink: string | null;
  youtubeText: string | null;
  whatsappLink: string | null;
  whatsappText: string | null;
  skypeLink: string | null;
  skypeText: string | null;
  helpLink: string | null;
  helpText: string | null;
  twitterLink: string | null;
  twitterText: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Tüm özellikleri boş string/null içeren bir başlangıç Settings objesi
const defaultSettings: Settings = {
  siteTitle: '',
  seoDescription: '',
  footerText: '',
  siteLogoUrl: '',
  faviconUrl: '',
  facebookLink: '',
  facebookText: '',
  instagramLink: '',
  instagramText: '',
  telegramLink: '',
  telegramText: '',
  youtubeLink: '',
  youtubeText: '',
  whatsappLink: '',
  whatsappText: '',
  skypeLink: '',
  skypeText: '',
  helpLink: '',
  helpText: '',
  twitterLink: '',
  twitterText: '',
};

type CSSWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

const swiperStyles: CSSWithVars = {
  paddingBottom: "40px",
  "--swiper-pagination-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-color": "#777777",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
  "--swiper-pagination-bullet-size": "8px",
  "--swiper-pagination-bullet-horizontal-gap": "6px",
};

const SocialMediaCard: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get<Settings>('/api/settings');
        // API'den gelen veriyi defaultSettings ile birleştirerek tüm alanların olmasını garanti et
        setSettings({ ...defaultSettings, ...(response.data || {}) });
      } catch (error) {
        console.error("Sosyal Medya Kartları ayarları çekilirken hata oluştu:", error);
        // Hata durumunda da defaultSettings'i kullan
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-5">Sosyal Medya Kartları yükleniyor...</div>;
  }

  // settings'in null olmadığından emin ol (loading false olduğunda settings ya dolu ya da defaultSettings olacak)
  const currentSettings: Settings = settings || defaultSettings;

  const dynamicSocialLinks = [
    {
      name: "@Facebook",
      title: currentSettings.facebookText || "Facebook Sayfamız",
      link: currentSettings.facebookLink,
      svg: <FaFacebook className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "@Instagram",
      title: currentSettings.instagramText || "Instagram: LanetKel",
      link: currentSettings.instagramLink,
      svg: <FaInstagram className="w-8 h-8 text-pink-500" />,
    },
    {
      name: "@Telegram",
      title: currentSettings.telegramText || "Telegram kanalımız",
      link: currentSettings.telegramLink,
      svg: <FaTelegram className="w-8 h-8 text-blue-500" />,
    },
    {
      name: "@Youtube",
      title: currentSettings.youtubeText || "YouTube: Tüm Videolar",
      link: currentSettings.youtubeLink,
      svg: <FaYoutube className="w-8 h-8 text-red-500" />,
    },
    {
      name: "Whatsapp Kanal",
      title: currentSettings.whatsappText || "WhatsApp Kanalı",
      link: currentSettings.whatsappLink,
      svg: <FaWhatsapp className="w-8 h-8 text-green-500" />,
    },
    {
      name: "@Skype",
      title: currentSettings.skypeText || "Skype",
      link: currentSettings.skypeLink,
      svg: <FaSkype className="w-8 h-8 text-cyan-500" />,
    },
    {
      name: "@Twitter",
      title: currentSettings.twitterText || "Twitter (X) Hesabı",
      link: currentSettings.twitterLink,
      svg: <FaTwitter className="w-8 h-8 text-blue-400" />,
    },
  ].filter(item => item.link);

  return (
    <div className="mb-6">
      <SosyalAglarTitle
        title="LanetKel Sosyal Ağlar"
        description="LanetKel Telegram ve diğer resmi sosyal ağları takip edin"
      />

      <div className="relative">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className="!px-0"
          style={swiperStyles}
        >
          {dynamicSocialLinks.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ width: 280 }}
              className="group bg-slate-800/80 border border-slate-700 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <a
                href={item.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 items-center"
              >
                <div className="flex justify-center items-center bg-slate-700 rounded-full w-16 h-16 group-hover:rotate-6 transition-transform duration-300">
                  {item.svg}
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{item.name}</p>
                  <p className="text-lg font-semibold text-white">
                    {item.title}
                  </p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300">
                  Takip et
                </button>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SocialMediaCard;