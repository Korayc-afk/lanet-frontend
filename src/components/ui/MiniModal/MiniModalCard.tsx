import React, { useState } from "react";

interface CardItem {
  href: string;
  imgSrc: string;
  title: string;
  description: string;
}

interface MiniModalCardProps {
  cards: CardItem[];
}

const MiniModalCard: React.FC<MiniModalCardProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const openModal = (card: CardItem) => {
    setSelectedCard(card);
    document.body.style.overflow = "hidden"; // Arka plan scroll'u engelle
  };

  const closeModal = () => {
    setSelectedCard(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Grid of Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="col-span-1 flex flex-col gap-2 relative rounded-xl p-[1px] h-full"
          >
            <div
              onClick={() => openModal(card)}
              className="group flex flex-col relative h-full rounded-xl overflow-hidden transition-all duration-300 cursor-pointer bg-slate-800 hover:bg-slate-700"
            >
              <div className="flex flex-col transition-all duration-200 overflow-hidden">
                <div className="h-12 p-2 bg-slate-700 flex gap-3">
                  <img
                    src={card.imgSrc}
                    className="h-full object-contain"
                    alt={card.title}
                  />
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <p className="line-clamp-2 self-stretch text-base font-semibold text-slate-100">
                    {card.title}
                  </p>
                  <p className="text-slate-100 text-sm mb-8 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="w-[90%] max-w-md bg-slate-900 text-slate-100 rounded-xl shadow-lg transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()} // Modal dışına tıklayınca kapanmasın
          >
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{selectedCard.title}</h3>
              <p className="text-sm leading-relaxed">
                {selectedCard.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={closeModal}
                  className="w-1/2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors duration-200 text-sm font-medium"
                >
                  Kapat
                </button>
                <a
                  href={selectedCard.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors duration-200 text-sm font-medium text-center"
                >
                  Promosyonu Al
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiniModalCard;
