import React from "react";
import FileUpload from "../../FileUpload"; // Yol doğruysa sorun olmaz

interface SettingsData {
  siteTitle?: string | null;
  seoDescription?: string | null;
  footerText?: string | null;
  siteLogoUrl?: string | null;
  faviconUrl?: string | null;
  maintenanceMode?: boolean;
  popupText?: string | null;
  googleAnalyticsId?: string | null;
  allowSearchEngines?: boolean;
}

interface GenelAyarlarProps {
  settings: SettingsData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckboxChange: (name: string, value: boolean) => void; // checkbox için ayrı handler
  handleLogoUploadSuccess: (url: string) => void;
  handleFaviconUploadSuccess: (url: string) => void;
}

const GenelAyarlar: React.FC<GenelAyarlarProps> = ({
  settings,
  handleChange,
  handleCheckboxChange,
  handleLogoUploadSuccess,
  handleFaviconUploadSuccess,
}) => {
  const getInputValue = (key: keyof SettingsData) =>
    (settings[key] as string) || "";

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        📄 Site Genel Ayarları
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Site Başlığı */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Site Başlığı (Title)
          </label>
          <input
            type="text"
            name="siteTitle"
            value={getInputValue("siteTitle")}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-gray-50 placeholder-gray-400 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 shadow-sm transition-colors duration-200"
            placeholder="Web Sitenizin Başlığı"
          />
        </div>
        {/* SEO Açıklaması */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            SEO Meta Açıklaması
          </label>
          <textarea
            name="seoDescription"
            value={getInputValue("seoDescription")}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-gray-50 placeholder-gray-400 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 shadow-sm transition-colors duration-200"
            placeholder="Sitenizin kısa açıklaması..."
          ></textarea>
        </div>
        {/* Footer Metni */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Footer Metni
          </label>
          <textarea
            name="footerText"
            value={getInputValue("footerText")}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-gray-50 placeholder-gray-400 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 shadow-sm transition-colors duration-200"
            placeholder="© 2025 Benim Sitem. Tüm hakları saklıdır."
          ></textarea>
        </div>
        {/* Site Logosu yükleme */}
        <div className="col-span-full md:col-span-1">
          <FileUpload
            label="Site Logosu Yükle"
            onUploadSuccess={handleLogoUploadSuccess}
            uploadUrl="/api/upload/logo"
          />
          {settings.siteLogoUrl && (
            <div className="mt-2 p-2 bg-gray-100 rounded-md border border-gray-300">
              <span className="block font-medium text-gray-700 mb-2">
                Mevcut Logo:
              </span>
              <img
                src={`/api-uploads${settings.siteLogoUrl}`}
                alt="Site Logosu"
                className="max-h-24 rounded border border-gray-400 mt-1 object-contain mx-auto"
              />
            </div>
          )}
        </div>
        {/* Favicon yükleme */}
        <div className="col-span-full md:col-span-1">
          <FileUpload
            label="Favicon Yükle"
            onUploadSuccess={handleFaviconUploadSuccess}
            uploadUrl="/api/upload/favicon"
          />
          {settings.faviconUrl && (
            <div className="mt-2 p-2 bg-gray-100 rounded-md border border-gray-300">
              <span className="block font-medium text-gray-700 mb-2">
                Mevcut Favicon:
              </span>
              <img
                src={`/api-uploads${settings.faviconUrl}`}
                alt="Favicon"
                className="h-16 w-16 rounded border border-gray-400 mt-1 object-contain mx-auto"
              />
            </div>
          )}
        </div>

        {/* Popup Mesajı */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            📢 Popup Mesajı
          </label>
          <input
            type="text"
            name="popupText"
            value={getInputValue("popupText")}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-gray-50 placeholder-gray-400 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Sitenin üst kısmında çıkacak kısa mesaj"
          />
        </div>
        {/* Google Analytics ID */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Google Analytics ID
          </label>
          <input
            type="text"
            name="googleAnalyticsId"
            value={settings.googleAnalyticsId || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-gray-50 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="G-XXXXXXXXXX"
          />
        </div>
        {/* Arama Motorlarına İzin Toggle */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="allowSearchEngines"
              checked={settings.allowSearchEngines ?? true}
              onChange={(e) =>
                handleCheckboxChange("allowSearchEngines", e.target.checked)
              }
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-lg font-medium text-gray-700">
              🔎 Arama Motorlarına İzin Ver
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-1">
            Site arama motorlarında görünsün mü?
          </p>
        </div>
        {/* Bakım Modu Toggle */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode || false}
              onChange={(e) =>
                handleCheckboxChange("maintenanceMode", e.target.checked)
              }
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-lg font-medium text-gray-700">
              🔧 Bakım Modu
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-1">
            Siteyi ziyaretçilere kapatır ve bakım ekranı gösterir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenelAyarlar;
