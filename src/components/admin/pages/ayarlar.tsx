import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import GenelAyarlar from "../../admin/ui/GenelAyarlar";
import SosyalMedyaAyarlar from "../../admin/ui/SosyalMedyaAyarlar";
import FooterLinksManagement from "../ui/FooterLinksManagement"; // FooterLinksManagement'ın yolunu kontrol edin, '../ui/' varsayıldı

// Backend Settings modelinizle tam uyumlu olmalı
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
  maintenanceMode: boolean;
  popupText: string | null;
  googleAnalyticsId: string | null;
  allowSearchEngines: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const initialSettings: Settings = {
  siteTitle: "",
  seoDescription: "",
  footerText: "",
  siteLogoUrl: "",
  faviconUrl: "",
  facebookLink: "",
  facebookText: "",
  instagramLink: "",
  instagramText: "",
  telegramLink: "",
  telegramText: "",
  youtubeLink: "",
  youtubeText: "",
  whatsappLink: "",
  whatsappText: "",
  skypeLink: "",
  skypeText: "",
  helpLink: "",
  helpText: "",
  twitterLink: "",
  twitterText: "",
  maintenanceMode: false,
  popupText: "",
  googleAnalyticsId: "",
  allowSearchEngines: true,
};

const Ayarlar: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // YENİ: Aktif sekme için state
  const [activeTab, setActiveTab] = useState<"general" | "social" | "footerLinks">("general");

  // 📥 Ayarları backend'den çek
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get<Settings>(
          "/api/settings"
        );
        // API'den gelen veriyi initialSettings üzerine yayarak tüm alanların olmasını garanti et
        setSettings({ ...initialSettings, ...(response.data || {}) });
      } catch (err) {
        console.error("Ayarlar çekilirken hata:", err);
        setError("Ayarlar yüklenirken bir hata oluştu.");
        setSettings(initialSettings); // Hata durumunda varsayılan initialSettings'i kullan
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 📝 Input/text değişiklikleri
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    },
    []
  );

  // ✅ Checkbox değişiklikleri
  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  }, []);

  // 📤 Logo yüklemesi
  const handleLogoUploadSuccess = useCallback((url: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      siteLogoUrl: url,
    }));
  }, []);

  // 📤 Favicon yüklemesi
  const handleFaviconUploadSuccess = useCallback((url: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      faviconUrl: url,
    }));
  }, []);

  // 💾 Ayarları kaydet
  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await axios.post(
        "/api/settings",
        settings
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error("Ayarlar kaydedilirken hata:", err);
      setError("Ayarlar kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
    }
  };

  if (loading) return <div className="p-6 text-gray-700">Yükleniyor...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Site Ayarları</h2>

      {message && (
        <div className="bg-green-700 text-white p-4 rounded-lg mb-4 shadow-md">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-700 text-white p-4 rounded-lg mb-4 shadow-md">
          {error}
        </div>
      )}

      {/* Tab Navigasyonu */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "general" ? "text-blue-600 border-blue-600" : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("general")}
              role="tab"
              aria-selected={activeTab === "general"}
            >
              Genel Ayarlar
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "social" ? "text-blue-600 border-blue-600" : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("social")}
              role="tab"
              aria-selected={activeTab === "social"}
            >
              Sosyal Medya
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "footerLinks" ? "text-blue-600 border-blue-600" : "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("footerLinks")}
              role="tab"
              aria-selected={activeTab === "footerLinks"}
            >
              Footer Linkleri
            </button>
          </li>
        </ul>
      </div>

      {/* Tab İçerikleri */}
      <div className="flex flex-col gap-8">
        {activeTab === "general" && (
          <GenelAyarlar
            settings={settings}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            handleLogoUploadSuccess={handleLogoUploadSuccess}
            handleFaviconUploadSuccess={handleFaviconUploadSuccess}
          />
        )}

        {activeTab === "social" && (
          <SosyalMedyaAyarlar
            settings={settings}
            handleChange={handleChange}
          />
        )}

        {activeTab === "footerLinks" && (
          <FooterLinksManagement />
        )}

        {/* Kaydet butonu her zaman görünür kalsın */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ayarlar;