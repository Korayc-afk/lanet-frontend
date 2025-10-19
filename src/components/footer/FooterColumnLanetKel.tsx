import React from 'react';

interface FooterColumnProps {
  titleStyle: React.CSSProperties;
}

const FooterColumnLanetKel: React.FC<FooterColumnProps> = ({ titleStyle }) => {
  return (
    <div className="col-span-1 flex flex-col gap-2">
      <p className="font-medium mb-1" style={titleStyle}>
        Lanet Kel Siteler
      </p>
      <a
        href="/"
        className="router-link-active router-link-exact-active text-slate-400 text-sm hover:underline"
      >
        Güvenilir Siteler
      </a>
    </div>
  );
};

export default FooterColumnLanetKel;