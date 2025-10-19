// src/components/ui/BiletTab/BiletTab.tsx (or .jsx)

import React from "react";

interface Tab {
  label: string;
  count?: number; // Sayı opsiyonel
}

const tabs: Tab[] = [
  { label: "Aktif", count: 3 },
  { label: "Kontrolde" },
  { label: "İtirazda" },
  { label: "Hazır" },
  { label: "Tamamlanan", count: 25 },
];

type BiletTabProps = {
  activeTab: string; // Add activeTab prop
  setActiveTab: (tab: string) => void; // Add setActiveTab prop
  // onTabChange prop can be removed if setActiveTab is passed directly
};

const BiletTab: React.FC<BiletTabProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: string) => {
    // When a tab is clicked, call the setActiveTab function
    // passed from the parent (Biletler)
    setActiveTab(tab);
  };

  return (
    <div className="grid grid-cols-3 sm:flex lg:gap-3 border-b border-gray-800 mb-4">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          onClick={() => handleTabClick(tab.label)}
          className={`p-3 flex items-center gap-2 cursor-pointer transition-colors duration-200
            ${
              activeTab === tab.label // Now directly use the activeTab prop for styling
                ? "border-b-2 border-red-600 bg-gray-800 rounded-t"
                : "border-b-2 border-transparent hover:bg-gray-700/50 rounded-t"
            }`}
        >
          <span
            className={`text-sm font-medium ${
              activeTab === tab.label ? "text-gray-100" : "text-slate-400"
            }`}
          >
            {tab.label}
          </span>

          {tab.count !== undefined && (
            <span
              className={`ml-1 px-1.5 min-w-[18px] text-xs font-semibold text-white rounded bg-gradient-to-b from-red-400 to-red-500`}
            >
              {tab.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BiletTab;