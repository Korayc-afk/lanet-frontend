// src/components/Footer/FooterColumnCommunity.tsx
import React from 'react';

interface SocialMediaLink {
  href: string | null ;
  text: string;
  icon: React.ReactNode; // İkonlar React elementi (JSX) olarak alınacak
}

interface FooterColumnCommunityProps {
  titleStyle: React.CSSProperties;
  socialMediaLinks: SocialMediaLink[];
}

const FooterColumnCommunity: React.FC<FooterColumnCommunityProps> = ({
  titleStyle,
  socialMediaLinks,
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-2">
      <p className="font-medium mb-1" style={titleStyle}>
        Topluluk
      </p>
      {socialMediaLinks.map((link, index) => (
        <a
          key={index} // Liste elemanları için 'key' prop'u önemlidir
           href={link.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 text-sm hover:underline flex items-center gap-1"
        >
          <span>{link.icon}</span>{" "} {/* İkonu burada render ediyoruz */}
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default FooterColumnCommunity;