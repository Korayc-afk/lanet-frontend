// src/components/footer/FooterSocialLinks.tsx
import React from 'react';
// Büyük sosyal medya ikonlarını import edin
import FacebookSocialLargeIcon from '../Icons/FacebookSocialLargeIcon';
import InstagramSocialLargeIcon from '../Icons/InstagramSocialLargeIcon';
import TelegramSocialLargeIcon from '../Icons/TelegramSocialLargeIcon';
import YoutubeSocialLargeIcon from '../Icons/YoutubeSocialLargeIcon';
import WhatsappSocialLargeIcon from '../Icons/WhatsappSocialLargeIcon';
import SkypeSocialLargeIcon from '../Icons/SkypeSocialLargeIcon';
import TwitterSocialLargeIcon from '../Icons/TwitterSocialLargeIcon'; // YENİ: TwitterSocialLargeIcon'u import edin

// Settings objesinin sadece sosyal medya linklerini içeren kısmının tipi
interface SocialMediaSettings {
  facebookLink?: string | null;
  instagramLink?: string | null;
  telegramLink?: string | null;
  youtubeLink?: string | null;
  whatsappLink?: string | null;
  skypeLink?: string | null;
  // YENİ ALANLAR (Sadece Twitter)
  twitterLink?: string | null;
}

interface FooterSocialLinksProps {
  settings: SocialMediaSettings;
}

const FooterSocialLinks: React.FC<FooterSocialLinksProps> = ({ settings }) => {
  // Dinamik olarak oluşturulacak sosyal medya linkleri dizisi
  const bottomSocialLinks = [
    {
      href: settings.facebookLink,
      icon: <FacebookSocialLargeIcon className="w-6 h-6" />,
      name: "Facebook"
    },
    {
      href: settings.instagramLink,
      icon: <InstagramSocialLargeIcon className="w-6 h-6" />,
      name: "Instagram"
    },
    {
      href: settings.telegramLink,
      icon: <TelegramSocialLargeIcon className="w-6 h-6" />,
      name: "Telegram"
    },
    {
      href: settings.youtubeLink,
      icon: <YoutubeSocialLargeIcon className="w-6 h-6" />,
      name: "Youtube"
    },
    {
      href: settings.whatsappLink,
      icon: <WhatsappSocialLargeIcon className="w-6 h-6" />,
      name: "Whatsapp"
    },
    {
      href: settings.skypeLink,
      icon: <SkypeSocialLargeIcon className="w-6 h-6" />,
      name: "Skype"
    },
    { // YENİ: Twitter
      href: settings.twitterLink,
      icon: <TwitterSocialLargeIcon className="w-6 h-6" />,
      name: "Twitter (X)"
    },
  ].filter(link => link.href && link.href !== '#'); // Geçerli bir linke sahip olanları filtrele

  return (
    <>
      {bottomSocialLinks.map((item, index) => (
        <a
          key={index}
          href={item.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name} Sayfası`}
        >
          <span>
            {item.icon}
          </span>
        </a>
      ))}
    </>
  );
};

export default FooterSocialLinks;