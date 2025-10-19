// admin/ui/SosyalMedyaAyarlar.tsx
import React from 'react';

interface SettingsData {
  facebookLink?: string | null;
  facebookText?: string | null;
  instagramLink?: string | null;
  instagramText?: string | null;
  telegramLink?: string | null;
  telegramText?: string | null;
  youtubeLink?: string | null;
  youtubeText?: string | null;
  whatsappLink?: string | null;
  whatsappText?: string | null;
  skypeLink?: string | null;
  skypeText?: string | null;
  helpLink?: string | null;
  helpText?: string | null;
  twitterLink?: string | null;
  twitterText?: string | null;
}

interface SosyalMedyaAyarlarProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SosyalMedyaAyarlar: React.FC<SosyalMedyaAyarlarProps> = ({ settings, handleChange }) => {
  const getInputValue = (key: keyof SettingsData) => (settings[key] as string) || '';

  const inputClasses = "mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-500 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 shadow-sm transition-colors duration-200";

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Sosyal Medya Ayarları</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Facebook */}
        <div>
          <label htmlFor="facebookText" className="block text-lg font-medium text-gray-700 mb-2">
            Facebook Metni
          </label>
          <input
            type="text"
            id="facebookText"
            name="facebookText"
            value={getInputValue('facebookText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Facebook sayfanızın metni"
          />
        </div>
        <div>
          <label htmlFor="facebookLink" className="block text-lg font-medium text-gray-700 mb-2">
            Facebook Linki
          </label>
          <input
            type="url"
            id="facebookLink"
            name="facebookLink"
            value={getInputValue('facebookLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://facebook.com/kullaniciadi"
          />
        </div>

        {/* Instagram */}
        <div>
          <label htmlFor="instagramText" className="block text-lg font-medium text-gray-700 mb-2">
            Instagram Metni
          </label>
          <input
            type="text"
            id="instagramText"
            name="instagramText"
            value={getInputValue('instagramText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Instagram hesabınızın metni"
          />
        </div>
        <div>
          <label htmlFor="instagramLink" className="block text-lg font-medium text-gray-700 mb-2">
            Instagram Linki
          </label>
          <input
            type="url"
            id="instagramLink"
            name="instagramLink"
            value={getInputValue('instagramLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://instagram.com/kullaniciadi"
          />
        </div>

        {/* Telegram */}
        <div>
          <label htmlFor="telegramText" className="block text-lg font-medium text-gray-700 mb-2">
            Telegram Metni
          </label>
          <input
            type="text"
            id="telegramText"
            name="telegramText"
            value={getInputValue('telegramText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Telegram kanalınızın metni"
          />
        </div>
        <div>
          <label htmlFor="telegramLink" className="block text-lg font-medium text-gray-700 mb-2">
            Telegram Linki
          </label>
          <input
            type="url"
            id="telegramLink"
            name="telegramLink"
            value={getInputValue('telegramLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://t.me/kanaladi"
          />
        </div>

        {/* Youtube */}
        <div>
          <label htmlFor="youtubeText" className="block text-lg font-medium text-gray-700 mb-2">
            Youtube Metni
          </label>
          <input
            type="text"
            id="youtubeText"
            name="youtubeText"
            value={getInputValue('youtubeText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Youtube kanalınızın metni"
          />
        </div>
        <div>
          <label htmlFor="youtubeLink" className="block text-lg font-medium text-gray-700 mb-2">
            Youtube Linki
          </label>
          <input
            type="url"
            id="youtubeLink"
            name="youtubeLink"
            value={getInputValue('youtubeLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://youtube.com/kanaladi"
          />
        </div>

        {/* Whatsapp */}
        <div>
          <label htmlFor="whatsappText" className="block text-lg font-medium text-gray-700 mb-2">
            Whatsapp Metni
          </label>
          <input
            type="text"
            id="whatsappText"
            name="whatsappText"
            value={getInputValue('whatsappText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Whatsapp kanalınızın metni"
          />
        </div>
        <div>
          <label htmlFor="whatsappLink" className="block text-lg font-medium text-gray-700 mb-2">
            Whatsapp Linki
          </label>
          <input
            type="url"
            id="whatsappLink"
            name="whatsappLink"
            value={getInputValue('whatsappLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://wa.me/numara"
          />
        </div>

        {/* Skype */}
        <div>
          <label htmlFor="skypeText" className="block text-lg font-medium text-gray-700 mb-2">
            Skype Metni
          </label>
          <input
            type="text"
            id="skypeText"
            name="skypeText"
            value={getInputValue('skypeText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Skype iletişim metni"
          />
        </div>
        <div>
          <label htmlFor="skypeLink" className="block text-lg font-medium text-gray-700 mb-2">
            Skype Linki
          </label>
          <input
            type="url"
            id="skypeLink"
            name="skypeLink"
            value={getInputValue('skypeLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="skype:kullaniciadi?chat"
          />
        </div>

        {/* Yardım Alın */}
        <div>
          <label htmlFor="helpText" className="block text-lg font-medium text-gray-700 mb-2">
            Yardım Alın Metni
          </label>
          <input
            type="text"
            id="helpText"
            name="helpText"
            value={getInputValue('helpText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Yardım için metin"
          />
        </div>
        <div>
          <label htmlFor="helpLink" className="block text-lg font-medium text-gray-700 mb-2">
            Yardım Alın Linki
          </label>
          <input
            type="url"
            id="helpLink"
            name="helpLink"
            value={getInputValue('helpLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://yardim-linki.com"
          />
        </div>

        {/* Twitter */}
        <div>
          <label htmlFor="twitterText" className="block text-lg font-medium text-gray-700 mb-2">
            Twitter (X) Metni
          </label>
          <input
            type="text"
            id="twitterText"
            name="twitterText"
            value={getInputValue('twitterText')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Twitter hesabınızın metni"
          />
        </div>
        <div>
          <label htmlFor="twitterLink" className="block text-lg font-medium text-gray-700 mb-2">
            Twitter (X) Linki
          </label>
          <input
            type="url"
            id="twitterLink"
            name="twitterLink"
            value={getInputValue('twitterLink')}
            onChange={handleChange}
            className={inputClasses}
            placeholder="https://twitter.com/kullaniciadi"
          />
        </div>

      </div>
    </div>
  );
};

export default SosyalMedyaAyarlar;