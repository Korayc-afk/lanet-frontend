import React from "react";
import CekilisBG from "../../../assets/images/CekilisBG.png";

interface TahminCardProps {
  leagueLogo: string;
  homeLogo: string;
  awayLogo: string;
  matchName: string;
  status: "Aktif" | "Tamamlanan";
  homeScore?: number;
  awayScore?: number;
  matchDate?: string; // 📅 Yeni: Tarih & Saat eklendi
}

const TahminCard: React.FC<TahminCardProps> = ({
  leagueLogo,
  homeLogo,
  awayLogo,
  matchName,
  status,
  homeScore,
  awayScore,
  matchDate, // 🆕 props olarak alıyoruz
}) => {
  const isActive = status === "Aktif";

  return (
    <div
      className="bg-[#1c1010] rounded-lg h-fit"
      style={{
        backgroundImage: `url(${CekilisBG})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="rounded-xl px-4 py-3 shadow-[0px_1px_3px_0px_rgba(19,19,32,1.00)] flex flex-col gap-4 w-full h-full bg-[#10131c]/80">
        <div className="flex flex-col gap-4 items-center">
          {/* Lig Logosu */}
          <div className="w-80 h-50 pb-10 flex justify-center items-center">
            <img
              src={leagueLogo}
              alt="league-logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Takım Logoları */}
          <div className="flex items-center justify-center gap-8">
            <img
              src={homeLogo}
              alt="home-team-logo"
              className="w-30 h-30 object-contain"
            />
            <span className="text-slate-400 font-bold text-xl">vs</span>
            <img
              src={awayLogo}
              alt="away-team-logo"
              className="w-30 h-30 object-contain"
            />
          </div>

          {/* Maç adı */}
          <div className="text-center text-md font-semibold text-gray-300">
            {matchName}
          </div>

          {/* 📅 Tarih ve Saat */}
          {isActive && matchDate && (
            <p className="text-sm text-slate-400 font-medium">{matchDate}</p>
          )}

          {/* Durum */}
          <p
            className={`text-sm font-medium ${
              isActive ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {isActive ? "Devam Ediyor" : "Maç Sonucu"}
          </p>

          {/* Skorlar */}
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              defaultValue={isActive ? "" : homeScore ?? ""}
              placeholder={isActive ? "0" : `${homeScore}`}
              className={`text-center bg-[#11131C] border border-slate-700 rounded p-2 w-16 text-slate-200 no-spinner ${
                isActive
                  ? "focus:outline-none focus:ring-2 focus:ring-red-500"
                  : "text-slate-400"
              }`}
              disabled={!isActive}
            />
            <span className="text-slate-400 font-bold text-lg">-</span>
            <input
              type="number"
              defaultValue={isActive ? "" : awayScore ?? ""}
              placeholder={isActive ? "0" : `${awayScore}`}
              className={`text-center bg-[#11131C] border border-slate-700 rounded p-2 w-16 text-slate-200 no-spinner ${
                isActive
                  ? "focus:outline-none focus:ring-2 focus:ring-red-500"
                  : "text-slate-400"
              }`}
              disabled={!isActive}
            />
          </div>

          {/* 🛠️ Tahmin Yap Butonu */}
          <button
            className={`w-full min-h-[40px] rounded-md font-semibold text-white transition-all duration-300 shadow-md ${
              isActive
                ? "bg-[#241f37] hover:bg-[#8f83ff] hover:shadow-lg"
                : "bg-gray-700 cursor-not-allowed"
            }`}
            disabled={!isActive}
          >
            {isActive ? "Tahmin Yap" : "Sonuçları Gör"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TahminCard;
