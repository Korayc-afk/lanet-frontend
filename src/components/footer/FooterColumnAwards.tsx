import React from 'react';

interface FooterColumnProps {
  titleStyle: React.CSSProperties;
}

const FooterColumnAwards: React.FC<FooterColumnProps> = ({ titleStyle }) => {
  return (
    <div className="col-span-1 flex flex-col gap-2">
      <p className="font-medium mb-1" style={titleStyle}>
        Ödüller
      </p>
      <a
        href="/canli-yayin"
        className="text-slate-400 text-sm hover:underline"
      >
        Yayınlar
      </a>
    </div>
  );
};

export default FooterColumnAwards;