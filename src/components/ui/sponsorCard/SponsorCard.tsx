// components/ui/sponsorCard/SponsorCard.tsx
import React from "react";

const BASE_URL = "/api-uploads";

interface SponsorCardProps {
  logo?: string;
  background: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  sponsorTag?: string;
  className?: string;
  rightImage?: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  logo,
  background,
  title,
  description,
  buttonText,
  buttonLink,
  sponsorTag,
  className,
  rightImage,
}) => {
  // Arka plan çözümlemesi
  const resolvedBackground =
    typeof background === "string" && background.startsWith("/uploads/")
      ? `${BASE_URL}${background}`
      : background;

  // Sağ görsel çözümlemesi
  const resolvedRightImage =
    typeof rightImage === "string" && rightImage.startsWith("http")
      ? rightImage
      : rightImage
      ? `${BASE_URL}${rightImage}`
      : "";

  return (
    <div
      className={`bg-slate-800 rounded-2xl px-6 py-10 md:px-14 md:py-24 flex flex-col md:flex-row justify-between items-center shadow-xl text-white relative overflow-hidden ${
        className || ""
      }`}
      style={{
        backgroundImage: `url(${resolvedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sol içerik - mobilde ortalanmış, webde sola hizalı */}
      <div className="space-y-6 w-full md:w-1/2 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          {logo && (
            <img
              src={logo}
              alt="Sponsor Logo"
              className="w-28 md:w-36 drop-shadow-lg"
            />
          )}
          {sponsorTag && (
            <>
              <span className="hidden md:inline text-slate-200 text-lg font-semibold">|</span>
              <span className="bg-black/70 text-lime-400 px-4 py-2 rounded-lg text-md font-semibold shadow-md">
                {sponsorTag}
              </span>
            </>
          )}
        </div>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
        <p className="text-sm md:text-base text-slate-200 leading-relaxed">
          {description}
        </p>

        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-lg py-3 px-6 transition-all duration-300 shadow-md"
        >
          {buttonText}
        </a>
      </div>

      {/* Sağ görsel - sadece masaüstünde gösterilir */}
      <div className="hidden md:flex md:w-1/2 justify-end z-10">
        {rightImage && (
          <img
            src={resolvedRightImage}
            alt="Sponsor Görseli"
            className="w-32 md:w-100 object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
