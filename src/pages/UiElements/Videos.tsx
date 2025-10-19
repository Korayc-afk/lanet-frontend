import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios'; // AxiosError tipini import ettik

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Footer from "../../components/footer/Footer";
import VideoCard from "../../components/ui/EnCokIzlenenler/VideoCard";
import VideoDetayCard from "../../components/ui/EnCokIzlenenler/VideoDetayCard";
// import sweetBonanza from "../../assets/images/videoDetay/c-YLubZG89O2P8UHbBDFA.jpg"; // 🎉 Kullanılmadığı için kaldırıldı

// Settings interface'i dinamik video ve resim linkleri için güncellendi
interface VideoItem {
  videoUrl: string;
  thumbnailUrl: string;
}

interface Settings {
  youtubeLink: string | null;
  telegramLink: string | null;
  siteTitle: string | null;
  seoDescription: string | null;
  videos: VideoItem[]; // 🎉 Dinamik video listesi eklendi
}

const defaultSettings = {
  youtubeLink: "https://www.youtube.com/channel/DEFAULT_YOUTUBE_ID",
  telegramLink: "https://t.me/DEFAULT_TELEGRAM_CHANNEL",
  siteTitle: "Lanet Kel Videolar",
  seoDescription: "En çok izlenen yayınlar ve video içerikleri.",
  videos: [{
    videoUrl: "https://www.youtube.com/embed/cZ4C0QvTmG0",
    thumbnailUrl: "https://i.ytimg.com/vi/cZ4C0QvTmG0/maxresdefault.jpg"
  }]
};

export default function Videos() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [_errorSettings, setErrorSettings] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoSettings = async () => {
      try {
        setLoadingSettings(true);
        setErrorSettings(null);
        const response = await axios.get<Settings>('/api/settings');
        setSettings(response.data);
      } catch (error: unknown) { // 🎉 'any' yerine 'unknown' kullanıldı
  const axiosError = error as AxiosError<{ message: string }>; // <--- TİP BURADA GÜNCELLENMELİ
        console.error("Videos sayfası ayarları çekilirken hata oluştu:", axiosError);
        setErrorSettings(axiosError.response?.data?.message || "Ayarlar yüklenirken bir hata oluştu.");
        setSettings(null);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchVideoSettings();
  }, []);

  const currentSettings = settings || defaultSettings;

  if (loadingSettings) {
    return <div className="text-center py-10 text-white">Videolar sayfası yükleniyor...</div>;
  }
  // Eğer API'den hata geldiyse veya veri null ise, varsayılan ayarları kullanır.
  // Bu yüzden ekstra hata durum kontrolüne gerek kalmayabilir
  // if (errorSettings) {
  //   return <div className="text-red-600 text-center py-10">Hata: {errorSettings}</div>;
  // }

  // 🎉 mainVideo'yu kullanmadan önce kontrol ettik
  const mainVideo = currentSettings.videos?.[0];

  return (
    <>
      <PageMeta
        title={currentSettings.siteTitle || "Lanet Kel Videolar"}
        description={currentSettings.seoDescription || "En çok izlenen yayınlar ve video içerikleri."}
      />
      <PageBreadcrumb pageTitle="Lanet Kel En Çok İzlenen Yayınlar" />
      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-1">
        <div className="space-y-5 sm:space-y-6">
          {mainVideo && ( // 🎉 mainVideo var mı diye kontrol ettik
              <VideoDetayCard
                  username="Padi"
                  createdAt="15 saat önce"
                  description="Harika bir video!"
                  likes={94923}
                  comments={1235}
                  gradientFrom="from-yellow-400"
                  gradientTo="to-red-500"
                  // 🎉 API'den gelen önizleme resmini kullan
                  imageUrl={mainVideo.thumbnailUrl}
                  uploadTime={"5Saat Önce"}
                  // 🎉 API'den gelen video URL'sini kullan
                  videoUrl={mainVideo.videoUrl}
                  isUserPost={false}
              />
          )}
          {!mainVideo && (
            <div className="text-center text-gray-400 py-10">
                Gösterilecek video bulunamadı.
            </div>
          )}
        </div>
      </div>

      {/* Yönlendirme butonları */}
      <div className="flex flex-col xl:flex-row items-center gap-4 py-3 px-4 mb-6">
        <a
          href={currentSettings.youtubeLink || undefined} // 🎉 null yerine undefined
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button className="mt-5 w-full min-h-[36px] bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-2 px-4 py-2 transition duration-300">
            <div className="text-sm font-medium">Lanet Kel Youtube</div>
            {/* SVG ikon kodu */}
            <svg className="w-4 h-4 text-white" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg>
          </button>
        </a>

        <a
          href={currentSettings.telegramLink || undefined} // 🎉 null yerine undefined
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button className="mt-5 w-full min-h-[36px] bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 px-4 py-2 transition duration-300">
            <div className="text-sm font-medium">Lanet Kel Telegram</div>
            {/* SVG ikon kodu */}
            <svg className="w-4 h-4 text-white" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg>
          </button>
        </a>
      </div>
      <VideoCard />
      <Footer />
    </>
  );
}