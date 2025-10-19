import React from "react";

interface SectionHeaderCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

const SectionHeaderCard: React.FC<SectionHeaderCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-2 mb-4 ">
      {/* başlığı beğenmezsek buna geçiyoruz 
      bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-md
      flex gap-2 mb-4 yanına ekle geç babba 
      */}
      <div className="flex items-center justify-center w-10 h-10 bg-slate-700 border border-slate-600 rounded-md">
        {icon ? (
          icon
        ) : (
          // Default Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-slate-400"
          >
            <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
          </svg>
        )}
      </div>
      <div>
        <h2 className="font-medium text-gray-100 md:text-2xl">{title}</h2>
        {description && (
          <p className="text-sm font-light text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionHeaderCard;
