// src/components/footer/FooterDynamicColumn.tsx
import React from 'react';

// FooterLink modeline uygun TypeScript interface'i
interface FooterLink {
  id: number;
  widget: number;
  title: string;
  url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface FooterDynamicColumnProps {
  title: string;
  links: FooterLink[];
  titleStyle: React.CSSProperties; // Gradient başlık stilini almak için
}

const FooterDynamicColumn: React.FC<FooterDynamicColumnProps> = ({ title, links, titleStyle }) => {
  // Eğer link yoksa boş döndür (opsiyonel, widget'ı tamamen gizler)
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="col-span-1 flex flex-col gap-2">
      <p className="font-medium mb-1" style={titleStyle}>
        {title}
      </p>
      <ul className="space-y-1"> {/* Linkler arasında boşluk */}
        {links
          .sort((a, b) => a.order - b.order) // Order'a göre sırala
          .map(link => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 text-sm hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterDynamicColumn;