import { useState } from "react";
import MarqueeManagerCard from "../ui/MarqueeManagerCard";
import MainCardManagerCard from "../ui/MainCardManagerCard";
import PartnerBrandManagerCard from "../ui/PartnerBrandManagerCard";
import MainSponsorCard from "../ui/MainSponsorCard";
import PromotionCardManager from "../ui/PromotionCardManager";
import VideoCardManager from "../ui/VideoCardManager";
import FeaturedVideoManager from "../ui/FeaturedVideoManager"; // 🎉 Yeni bileşeni import ettik

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "marquee" | "mainCard" | "partner" | "mainSponsor" | "promotionCard" | "video" | "featuredVideo" // 🎉 Yeni sekmeyi ekledik
  >("marquee");

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">İçerik Yönetimi</h2>

      {/* Sekme Butonları */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "marquee"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("marquee")}
            >
              Marquee Yönetimi
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "mainCard"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("mainCard")}
            >
              Ana Card Yönetimi
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "partner"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("partner")}
            >
              Partner Markalar
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "mainSponsor"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("mainSponsor")}
            >
              Ana Sponsor
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "promotionCard"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("promotionCard")}
            >
              Bonus Kartlar
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "video"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("video")}
            >
              Video Kartlar
            </button>
          </li>
          {/* 🎉 Yeni sekme butonu */}
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "featuredVideo"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("featuredVideo")}
            >
              Öne Çıkan Video Yönetimi
            </button>
          </li>
        </ul>
      </div>

      {/* Sekme İçerikleri */}
      <div className="mt-4">
        {activeTab === "marquee" && <MarqueeManagerCard />}
        {activeTab === "mainCard" && <MainCardManagerCard />}
        {activeTab === "partner" && <PartnerBrandManagerCard />}
        {activeTab === "mainSponsor" && <MainSponsorCard />}
        {activeTab === "promotionCard" && <PromotionCardManager />}
        {activeTab === "video" && <VideoCardManager />}
        {/* 🎉 Yeni sekme içeriği */}
        {activeTab === "featuredVideo" && <FeaturedVideoManager />}
      </div>
    </div>
  );
};

export default ContentManagement;