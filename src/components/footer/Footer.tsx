// src/components/footer/Footer.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FooterDynamicColumn from './FooterDynamicColumn'; // Dinamik sütun bileşeni
import FooterColumnCommunity from './FooterColumnCommunity';
import FooterSocialLinks from './FooterSocialLinks';

// Küçük ikonları import edin (FooterColumnCommunity için)
import FacebookIcon from '../Icons/FacebookIcon';
import InstagramIcon from '../Icons/InstagramIcon';
import TelegramIcon from '../Icons/TelegramIcon';
import YoutubeIcon from '../Icons/YoutubeIcon';
import WhatsappIcon from '../Icons/WhatsappIcon';
import SkypeIcon from '../Icons/SkypeIcon';
import HelpIcon from '../Icons/HelpIcon';
import TwitterIconSmall from '../Icons/TwitterIcon'; // Küçük Twitter ikonunuz varsa

// Büyük ikonları import edin (FooterSocialLinks için)
// import FacebookSocialLargeIcon from '../Icons/FacebookSocialLargeIcon';
// import InstagramSocialLargeIcon from '../Icons/InstagramSocialLargeIcon';
// import TelegramSocialLargeIcon from '../Icons/TelegramSocialLargeIcon';
// import YoutubeSocialLargeIcon from '../Icons/YoutubeSocialLargeIcon';
// import WhatsappSocialLargeIcon from '../Icons/WhatsappSocialLargeIcon';
// import SkypeSocialLargeIcon from '../Icons/SkypeSocialLargeIcon';
// import TwitterSocialLargeIcon from '../Icons/TwitterSocialLargeIcon';

// Backend Settings modeline tam uyumlu interface
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

// Backend FooterLink modeline uygun TypeScript interface'i
interface FooterLink {
  id: number;
  widget: number;
  title: string;
  url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFooterData = async () => { // Fonksiyon adı daha açıklayıcı
      try {
        setLoading(true);
        // Ayarlar çekilirken hata oluştu, settings null kaldıysa olabilir.
        const settingsResponse = await axios.get<Settings>('/api/settings');
        setSettings(settingsResponse.data);

        // FooterLinkleri de çek
        const linksResponse = await axios.get<FooterLink[]>('/api/footer-links');
        setFooterLinks(linksResponse.data);
      } catch (error) {
        console.error("Footer tüm verileri çekilirken hata oluştu:", error);
        setSettings(null); // Hata durumunda settings'i null bırak, varsayılanlar devreye girsin
        setFooterLinks([]); // Hata durumunda linkleri boş yap
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
    fetchAllFooterData();
  }, []);

  const gradientTextStyle = {
    background: 'linear-gradient(rgb(247, 250, 252) 0%, rgb(208, 209, 210) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } as React.CSSProperties;

  if (loading) {
    return (
      <footer className="py-8 text-center text-slate-400">
        Footer yükleniyor...
      </footer>
    );
  }

  // settings null ise varsayılan değerleri kullan (tüm alanlar dahil)
  const currentSettings = settings || {
    id: 0, // id de varsayılan olabilir
    siteTitle: '', seoDescription: '', footerText: '', siteLogoUrl: '', faviconUrl: '',
    facebookLink: '', facebookText: '', instagramLink: '', instagramText: '',
    telegramLink: '', telegramText: '', youtubeLink: '', youtubeText: '',
    whatsappLink: '', whatsappText: '', skypeLink: '', skypeText: '',
    helpLink: '', helpText: '', twitterLink: '', twitterText: '',
    createdAt: '', updatedAt: '',
    // footerText: 'LanetKel Casino © 2022–2025',
  };

  const socialMediaLinksForCommunityColumn = [
    {
      href: currentSettings.facebookLink,
      text: currentSettings.facebookText || 'Facebook Sayfamız',
      icon: <FacebookIcon className="w-5 h-5 " />,
    },
    {
      href: currentSettings.instagramLink,
      text: currentSettings.instagramText || 'İnstagram Linki',
      icon: <InstagramIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.telegramLink,
      text: currentSettings.telegramText || 'Telegram Linki',
      icon: <TelegramIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.youtubeLink,
      text: currentSettings.youtubeText || 'Youtube Linki',
      icon: <YoutubeIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.whatsappLink,
      text: currentSettings.whatsappText || 'Whatsapp Linki',
      icon: <WhatsappIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.skypeLink,
      text: currentSettings.skypeText || 'Skype Linki',
      icon: <SkypeIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.helpLink,
      text: currentSettings.helpText || 'Yardım Alın Linki',
      icon: <HelpIcon className="w-5 h-5" />,
    },
    {
      href: currentSettings.twitterLink,
      text: currentSettings.twitterText || 'Twitter (X) Linki',
      icon: <TwitterIconSmall className="w-5 h-5" />,
    },
  ].filter(link => link.href && link.href !== '#');

  return (
    <footer className="py-8 flex flex-col gap-4">
      <div className="py-10 border-y border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Widget ID 1: Lanet Kel Siteler (FooterLink verisinden) */}
        <FooterDynamicColumn
          title="Lanet Kel Siteler"
          links={footerLinks.filter(link => link.widget === 1)}
          titleStyle={gradientTextStyle} />
        {/* Widget ID 2: Ödüller (FooterLink verisinden) */}
        <FooterDynamicColumn
          title="Ödüller"
          links={footerLinks.filter(link => link.widget === 2)}
          titleStyle={gradientTextStyle} />
        {/* Widget ID 3: Topluluk (Settings verisinden) */}
        <FooterColumnCommunity
          titleStyle={gradientTextStyle}
          socialMediaLinks={socialMediaLinksForCommunityColumn}
        />
      </div>

      <div className="py-3 flex flex-col lg:flex-row gap-3 justify-between items-center">
        <p className="text-slate-400 text-sm">
          {currentSettings.footerText}
        </p>
        <div className="flex gap-3">
          {/* ALT KISIM SOSYAL MEDYA LİNKLERİ - Artık dinamik */}
          {/* FooterSocialLinks da kendi içinde settings çekeceği için prop geçmeye gerek yok */}
          {/* Ancak şimdi settings'i burada çekip ona prop olarak geçireceğiz, daha verimli. */}
          <FooterSocialLinks settings={currentSettings} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;