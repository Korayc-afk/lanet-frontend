// Market.tsx
import  { useState } from "react";
import MarketTitle from "../../components/ui/menuBasliklar/MarketTitle";
import MarketCard from "../../components/ui/MarketCard/MarketCard";
import Footer from "../../components/footer/Footer";

const tabs = [
  { id: "urunler", label: "Ürünler" },
  { id: "fiziksel", label: "Fiziksel Ürünler" },
  { id: "satinalinanlar", label: "Satın Alınanlar" },
  { id: "carklar", label: "Çarklar" },
];

const allItems = [
  {
    id: 1,
    name: "50 Freespin(2₺Bet)",
    type: "dijital",
    image:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/MW8K0KpziUqI3c6aVwPE7.png",
    priceValue: "50",
    priceUnit: "Freespin(2₺Bet)",
    ecoCoin: 500,
    company: "Betcell",
    stock: null,
    sponsored: false,
    showGameSelect: true,
    gameOptions: ["RIP CITY", "LE BANDIT", "GLADIATOR LEGENDS"], // Oyun seçenekleri
  },
  {
    id: 2,
    name: "50$ USDT",
    type: "dijital",
    image:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/grcr8D7nISig5ZjMvg-x-.png",
    priceValue: "50$",
    priceUnit: "USDT",
    ecoCoin: 75000,
    currencyIcon:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/fd28l1d8EJ3Rx5iWPzI_u.png",
    currencyType: "usdt(trc20)",
    stock: { current: 30, total: 100 },
    sponsored: true,
    showGameSelect: false,
  },
  {
    id: 3,
    name: "20$ USDT",
    type: "dijital",
    image:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/gWW7zspsqVh0Uk4qsWALB.png",
    priceValue: "20$",
    priceUnit: "USDT",
    ecoCoin: 3000,
    currencyIcon:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/fd28l1d8EJ3Rx5iWPzI_u.png",
    currencyType: "usdt(trc20)",
    stock: null,
    sponsored: false,
    showGameSelect: false,
  },
  { id: 5, name: "Satın Alınan Ürün 1", type: "satinalinan", ecoCoin: 2000, showGameSelect: false },
  { id: 6, name: "Çark 1", type: "cark", ecoCoin: 50, showGameSelect: false },
];

function Market() {
  const [activeTab, setActiveTab] = useState("urunler");

  const filteredItems = allItems.filter((item) => {
    if (activeTab === "urunler")
      return item.type === "dijital" || item.type === "fiziksel";
    if (activeTab === "fiziksel") return item.type === "fiziksel";
    if (activeTab === "satinalinanlar") return item.type === "satinalinan";
    if (activeTab === "carklar") return item.type === "cark";
    return true;
  });

  return (
    <section className="mb-10 xl:mb-10 relative">
      <MarketTitle
        title="Market"
        description="Puanlarınızı toplayarak ödüller kazanabilirsiniz"
      />

      <div className="mt-8">
        <div className="flex items-center gap-3 z-10 relative mb-10">
          <div className="grid grid-cols-3 sm:flex lg:gap-3 border-b border-gray-800 w-full">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 justify-center items-center gap-3 flex overflow-hidden cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "border-b-2 border-red-600"
                      : "border-b-2 border-transparent"
                  }`}
              >
                <div
                  className={`text-xs lg:text-sm font-medium leading-tight hover:text-gray-100
                    ${activeTab === tab.id ? "text-gray-100" : "text-slate-500"}`}
                >
                  {tab.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MarketCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Gösterilecek içerik bulunamadı.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Market;