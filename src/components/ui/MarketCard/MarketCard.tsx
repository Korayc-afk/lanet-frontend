// MarketCard.tsx
import React, { useState } from "react"; // useState'i import ettik

interface Product {
  id: number;
  name: string;
  type: string;
  image?: string;
  priceValue?: string;
  priceUnit?: string;
  ecoCoin?: number;
  company?: string;
  currencyIcon?: string;
  currencyType?: string;
  stock?: { current: number; total: number } | null;
  sponsored?: boolean;
  showGameSelect?: boolean;
  gameOptions?: string[]; // Oyun seçenekleri için yeni prop
}

interface MarketCardProps {
  item: Product;
}

const MarketCard: React.FC<MarketCardProps> = ({ item }) => {
  const [selectedGame, setSelectedGame] = useState<string>(item.gameOptions?.[0] || ""); // Oyun seçimi state'i

  const isPurchaseDisabled = item.stock === null || !item.sponsored;

  const stockBarWidth = item.stock
    ? `${(item.stock.current / item.stock.total) * 100}%`
    : "0%";

  const remainingEcoCoin =
    item.stock && item.ecoCoin
      ? item.ecoCoin - (item.ecoCoin * item.stock.current) / item.stock.total
      : null;

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  return (
    // Kartın ana div'i: Yeni arka plan rengi, border ve gölge ile
    <div className="grid-cols-1 flex flex-col bg-bg-card hover:bg-bg-card-hover  rounded-xl h-full shadow-card-glow hover:shadow-card-glow-hover transition-all duration-300 ease-in-out">
      <div className="p-2 relative">
        <span className="rounded-md block overflow-hidden gradient-border-image">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="block w-full h-40 object-cover filter brightness-100 blur-xs"
            />
          )}
          {(item.priceValue || item.priceUnit) && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-kanit text-white">
              {item.priceValue && (
                <span className="text-[40px] font-bold italic block leading-8 -tracking-[0.4px]">
                  {item.priceValue}
                </span>
              )}
              {item.priceUnit && (
                <span className="block italic font-medium">
                  {item.priceUnit}
                </span>
              )}
            </span>
          )}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2 z-10 relative">
        <div className="flex items-center gap-1">
          <p className="text-white">{item.name}</p>
          {/* Bilgi ikonu SVG'si - Sarı renk eklendi */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer text-primary-yellow"
          >
            <path
              d="M9.99854 2.77295C6.00415 2.77295 2.77148 6.00525 2.77148 10C2.77148 13.9943 6.00378 17.2271 9.99854 17.2271C13.9929 17.2271 17.2256 13.9948 17.2256 10C17.2256 6.00567 13.9933 2.77295 9.99854 2.77295ZM9.99854 16.2186C6.56958 16.2186 3.77991 13.429 3.77991 10C3.77991 6.57102 6.56958 3.78138 9.99854 3.78138C13.4275 3.78138 16.2172 6.57102 16.2172 10C16.2172 13.429 13.4275 16.2186 9.99854 16.2186Z"
              fill="currentColor"
            ></path>
            <path
              d="M10.0001 8.79736C9.57199 8.79736 9.26758 8.97815 9.26758 9.24451V12.8689C9.26758 13.0973 9.57199 13.3255 10.0001 13.3255C10.4091 13.3255 10.7421 13.0973 10.7421 12.8689V9.24445C10.7421 8.97812 10.4091 8.79736 10.0001 8.79736Z"
              fill="currentColor"
            ></path>
            <path
              d="M10.0007 6.56152C9.56314 6.56152 9.2207 6.87545 9.2207 7.23694C9.2207 7.59846 9.56317 7.9219 10.0007 7.9219C10.4288 7.9219 10.7713 7.59846 10.7713 7.23694C10.7713 6.87545 10.4288 6.56152 10.0007 6.56152Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
          {item.ecoCoin && (
            <span className="flex items-center gap-1">
              {/* Star ikonu SVG'si - Sarı renk eklendi */}
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-yellow"
              >
                <g id="Star Icon">
                  <path
                    id="Primary"
                    d="M9.05329 2.0501C8.92079 1.7751 8.64079 1.6001 8.33329 1.6001C8.02579 1.6001 7.74829 1.7751 7.61329 2.0501L6.00579 5.3576L2.41579 5.8876C2.11579 5.9326 1.86579 6.1426 1.77329 6.4301C1.68079 6.7176 1.75579 7.0351 1.97079 7.2476L4.57579 9.8251L3.96079 13.4676C3.91079 13.7676 4.03579 14.0726 4.28329 14.2501C4.53079 14.4276 4.85829 14.4501 5.12829 14.3076L8.33579 12.5951L11.5433 14.3076C11.8133 14.4501 12.1408 14.4301 12.3883 14.2501C12.6358 14.0701 12.7608 13.7676 12.7108 13.4676L12.0933 9.8251L14.6983 7.2476C14.9133 7.0351 14.9908 6.7176 14.8958 6.4301C14.8008 6.1426 14.5533 5.9326 14.2533 5.8876L10.6608 5.3576L9.05329 2.0501Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
              <span className="text-gray-300 text-sm font-medium">
                {item.ecoCoin} EkoCoin
              </span>
            </span>
          )}

          {(item.company || (item.currencyIcon && item.currencyType)) && (
            <>
              <span className="hidden lg:inline-block w-1 h-1 rounded-full bg-slate-600"></span>
              {item.company && (
                <span className="flex items-center gap-1">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <span className="text-gray-300 text-sm font-medium">
                      {item.company}
                    </span>
                  </a>
                </span>
              )}
              {item.currencyIcon && item.currencyType && (
                <span className="flex items-center gap-1">
                  <img
                    src={item.currencyIcon}
                    alt={item.currencyType}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-gray-300 text-sm font-medium">
                    {item.currencyType}
                  </span>
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="p-3 relative mt-auto">
        {/* Oyun Seçin Alanı - select etiketi ile etkileşimli hale getirildi */}
        {item.showGameSelect && (
          <div className="h-10 flex items-center gap-4 justify-between mb-3">
            <div className="w-full relative">
              <div className="h-10 px-3 py-2 bg-slate-950 w-full rounded-lg shadow-[0px_1px_2px_0px_rgba(9,28,66,0.04)] border justify-start items-center gap-2 flex overflow-hidden border-slate-800">
                <select 
                  id="game" 
                  name="game" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" // Select'i görünmez ama etkileşimli yaptık
                  onChange={handleGameChange}
                  value={selectedGame}
                >
                  {item.gameOptions?.map((game, index) => (
                    <option key={index} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
                <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
                  <div className="grow shrink basis-0 text-slate-100 text-base font-normal font-inter leading-normal">
                    {selectedGame || "Oyun Seçin"} {/* Seçilen oyunu göster */}
                  </div>
                </div>
                <div className="w-5 h-5 relative pointer-events-none"> {/* İkonun select ile çakışmasını engelle */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary-yellow" // Sarı ikon
                  >
                    <g id="Selector">
                      <path
                        id="Icon"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 3C10.2652 3 10.5196 3.10536 10.7071 3.29289L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L10 5.41421L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289L9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929L10 14.5858L12.2929 12.2929C12.6834 11.9024 13.3166 11.9024 13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {item.stock && (
          <div className="h-10 flex items-center gap-4 justify-between mb-3">
            <span className="bg-slate-700 h-2 rounded-full w-full relative">
              <span
                className="bg-primary-red h-2 rounded-full absolute top-0 left-0" // Progress bar rengi
                style={{ width: stockBarWidth }}
              ></span>
            </span>
            <p className="text-gray-400 text-xs font-medium shrink-0">
              {remainingEcoCoin !== null &&
                `${remainingEcoCoin.toFixed(0)} EkoCoin kaldı`}
            </p>
          </div>
        )}

        {/* Satın Alma Butonu */}
        <button
          className={` min-h-[36px] gradient-border bg-gradient-buy-button hover:bg-gradient-buy-button-hover rounded-md justify-center items-center gap-2 overflow-hidden flex px-2 py-4 w-full mb-2 ${
            isPurchaseDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPurchaseDisabled}
        >
          <div className="text-slate-100 text-sm font-medium leading-none">
            Satın Al
          </div>
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          {item.stock === null && (
            <span className="text-red-300 text-xs font-medium whitespace-nowrap">
              Stokta yok
            </span>
          )}
          {item.sponsored === false && (
            <span className="text-red-300 text-xs font-medium whitespace-nowrap cursor-pointer">
              Sponsor Kaydınız yok
            </span>
          )}

          {item.stock && (
            <span className="flex items-center gap-1">
              <span
                className="circular-progress"
                style={
                  {
                    // Circular progress bar için sarı renk
                    "--progress": `${
                      (item.stock.current / item.stock.total) * 360
                    }deg`,
                    "--progress-color": "var(--tw-colors-primary-yellow)",
                    "--track-color": "var(--tw-colors-slate-700)",
                  } as React.CSSProperties
                }
              ></span>
              <p className="text-gray-400 text-xs font-semibold flex-1">
                <span className="font-medium text-slate-500">Stok: </span>{" "}
                {item.stock.current}/{item.stock.total}
              </p>
            </span>
          )}

          <button className="block w-full text-gray-400 text-xs font-medium text-center cursor-pointer">
            Nasıl puan kazanırım?
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;