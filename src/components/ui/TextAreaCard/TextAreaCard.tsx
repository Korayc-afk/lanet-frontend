import React, { useState } from "react";

type TextAreaCardProps = {
  title: string;
  content: string[];
  previewCount?: number;
  buttonText?: string;
};

const TextAreaCard: React.FC<TextAreaCardProps> = ({
  title,
  content,
  previewCount = 5,
  buttonText = "Daha Fazla Göster",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleContent = isExpanded ? content : content.slice(0, previewCount);

  return (
    <div className="p-4 mt-5 mb-5 bg-slate-800 rounded-lg shadow transition-all duration-300">
      {/* Başlık */}
      <div className="pb-4 mb-4 border-b border-slate-700">
        <p className="text-white text-lg font-semibold">{title}</p>
      </div>

      {/* İçerik */}
      <div
        className={`text-slate-400 text-sm flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-40 opacity-80"
        }`}
      >
        {visibleContent.map((item, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {item}
          </p>
        ))}
      </div>

      {/* Daha Fazla Göster Butonu */}
      {content.length > previewCount && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center cursor-pointer border rounded-lg transition-colors duration-200 bg-green-600 text-white text-sm px-3 py-2 mt-4 hover:bg-green-700"
          >
            {isExpanded ? "Daha Az Göster" : buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default TextAreaCard;
