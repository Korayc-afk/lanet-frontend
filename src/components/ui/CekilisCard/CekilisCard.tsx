// components/ui/CekilisCard/CekilisCard.tsx

import React from "react";
import CekilisBG from "../../../assets/images/CekilisBG.png";

interface CekilisCardProps {
  link: string;
  background: string;
  logo: string;
  tag?: string;
  prize: string;
  // Change participants to allow either string or number
  participants: string | number;
  price: number;
  progress: number; // yüzde (örn. 38)
  remainingTime: string; // örn. "6g 8s 31d"
  buttonText?: string;
}

const CekilisCard: React.FC<CekilisCardProps> = ({
  link,
  background,
  logo,
  tag = "Herkese Açık",
  prize,
  participants, // This will now accept string or number
  progress,
  remainingTime,
  buttonText = "Katıl",
}) => {
  return (
    <a href={link} className="group overflow-hidden w-full mb-6">
      <div
        className="relative rounded-xl shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
        style={{
          background: `url(${background}), url(${CekilisBG}) center center / cover no-repeat`,
        }}
      >
        {/* Arka Plan Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-indigo-500/30 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500"></div>

        <div className="relative z-10 px-4 py-3 flex flex-col gap-4">
          {/* Top Glow Bar */}
          <div>
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-pink-500 to-yellow-400 animate-pulse shadow-[0px_0px_80px_10px_#f472b6] rounded-full"></span>
          </div>

          {/* Logo */}
          <div className="w-auto h-20 flex justify-center items-center">
            <img
              src={logo}
              alt="Raffle Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(255,255,255,0.3)]"
            />
          </div>

          {/* Tag + Prize Info */}
          <div className="flex flex-col justify-start items-center gap-1">
            <span className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <p className="text-white text-xs font-medium">{tag}</p>
            </span>
            <div className="text-center text-md font-medium leading-tight text-slate-100">
              {prize}
            </div>
            <div className="flex items-center gap-1">
              <div className="gradient-text text-white text-4xl font-bold leading-tight">
                {participants} {/* This will now correctly display string or number */}
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-600 text-white text-xs font-bold shadow-inner">
                ₺
              </div>
            </div>
          </div>

          {/* Progress and Remaining Time */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-200 font-medium">
                {progress === 100 || remainingTime === "Bitti"
                  ? "Sonlandı"
                  : "Devam ediyor..."}
              </p>

              <span className="text-xs text-slate-200 font-medium text-right">
                {remainingTime} kaldı
              </span>
            </div>
            <div className="relative w-full h-3 rounded-full bg-slate-700/50 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 animate-pulse"
                style={{ width: `${progress}%` }}
              ></div>
              {/* Sparkle Effect */}
              <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent animate-gradient-x"></div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300">
              {buttonText} - <span>{remainingTime}</span>
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CekilisCard;