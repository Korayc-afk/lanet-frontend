import React, { useState } from "react";

const BASE_URL = "/api-uploads";

interface UnifiedBonusItem {
  id?: number;
  href?: string;
  image?: string;
  imgSrc?: string;
  title: string;
  description: string;
  date?: string;
  modalTitle?: string;
  modalImage?: string;
  modalDescription?: string;
  promotionLink?: string;
}

interface UnifiedBonusCardProps {
  cards: UnifiedBonusItem[];
}

const UnifiedBonusCard: React.FC<UnifiedBonusCardProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<UnifiedBonusItem | null>(null);

  const openModal = (card: UnifiedBonusItem) => {
    setSelectedCard(card);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCard(null);
    document.body.style.overflow = "auto";
  };

  const getImageUrl = (path?: string) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="col-span-1 flex flex-col gap-2 rounded-xl p-[1px] h-full"
          >
            <div
              onClick={() => openModal(card)}
              className="group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 cursor-pointer bg-slate-800 hover:bg-slate-700"
            >
              {/* Görsel */}
              <div className="h-20 p-2 bg-slate-700 flex justify-center items-center">
                <img
                  src={getImageUrl(card.image || card.imgSrc)}
                  className="max-h-full max-w-full object-contain"
                  alt={card.title}
                />
              </div>

              {/* Metin */}
              <div className="flex flex-col gap-2 p-3">
                <p className="text-base font-semibold text-slate-100 break-words">
                  {card.title}
                </p>
                <p className="text-slate-400 text-sm mb-8 break-words whitespace-pre-wrap">
                  {card.description}
                </p>

                {/* Tarih */}
                {card.date && (
                  <span className="absolute bottom-3 left-3 text-sm text-slate-100 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-5 h-5"
                    >
                      <path
                        fill="currentColor"
                        d="M5.59844 1.6001C6.04094 1.6001 6.39844 1.9576 6.39844 2.4001V3.2001H9.59844V2.4001C9.59844 1.9576 9.95594 1.6001 10.3984 1.6001C10.8409 1.6001 11.1984 1.9576 11.1984 2.4001V3.2001H12.3984C13.0609 3.2001 13.5984 3.7376 13.5984 4.4001V5.6001H2.39844V4.4001C2.39844 3.7376 2.93594 3.2001 3.59844 3.2001H4.79844V2.4001C4.79844 1.9576 5.15594 1.6001 5.59844 1.6001ZM2.39844 6.4001H13.5984V13.2001C13.5984 13.8626 13.0609 14.4001 12.3984 14.4001H3.59844C2.93594 14.4001 2.39844 13.8626 2.39844 13.2001V6.4001ZM3.99844 8.4001V9.2001C3.99844 9.4201 4.17844 9.6001 4.39844 9.6001H5.19844C5.41844 9.6001 5.59844 9.4201 5.59844 9.2001V8.4001C5.59844 8.1801 5.41844 8.0001 5.19844 8.0001H4.39844C4.17844 8.0001 3.99844 8.1801 3.99844 8.4001Z"
                      />
                    </svg>
                    <p>{card.date}</p>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="w-[90%] max-w-md bg-slate-900 text-slate-100 rounded-xl shadow-lg p-6 overflow-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 break-words ">
              {selectedCard.modalTitle || selectedCard.title}
            </h3>

            {(selectedCard.modalImage || selectedCard.image || selectedCard.imgSrc) && (
              <img
                src={getImageUrl(
                  selectedCard.modalImage || selectedCard.image || selectedCard.imgSrc
                )}
                alt="modal"
                className="w-full h-auto rounded-lg mb-4"
              />
            )}

            <p className="text-sm leading-relaxed mb-4 break-words whitespace-pre-wrap">
              {selectedCard.modalDescription || selectedCard.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="w-1/2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium"
              >
                Kapat
              </button>
              {(selectedCard.promotionLink || selectedCard.href) && (
                <a
                  href={selectedCard.promotionLink || selectedCard.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-sm font-medium text-center"
                >
                  Promosyonu Al
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnifiedBonusCard;
