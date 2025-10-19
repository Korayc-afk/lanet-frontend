import React from "react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { label: "Aktif", count: 5 },
  { label: "Tamamlanan" },
  { label: "Katıldığım" },
];

const CekilisTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-3 sm:flex lg:gap-3 border-b border-gray-800 mb-4">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`p-3 justify-center items-center gap-3 flex overflow-hidden cursor-pointer
            ${
              activeTab === tab.label
                ? "border-b-2 border-red-600"
                : "border-b-2 border-transparent"
            }`}
        >
          <div
            className={`text-xs lg:text-sm font-medium leading-tight hover:text-gray-100
            ${activeTab === tab.label ? "text-gray-100" : "text-slate-500"}`}
          >
            {tab.label}
          </div>
          {tab.count && activeTab === tab.label && (
            <div className="p-0.5 min-w-[18px] bg-gradient-to-b from-red-400 to-red-500 rounded flex-col justify-center items-center gap-2.5 inline-flex overflow-hidden">
              <div className="text-neutral-50 text-sm font-medium leading-tight">
                {tab.count}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CekilisTabs;
