import React from "react";

interface SanaOzelCardProps {
  backgroundImage: string;
  logo: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

const SanaOzelCard: React.FC<SanaOzelCardProps> = ({
  backgroundImage,
  logo,
  title,
  description,
  buttonText,
  buttonLink = "#",
}) => {
  return (
    <a
      href={buttonLink}
      className="flex flex-col items-center rounded-lg shadow-md overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full h-32 flex justify-center items-center">
        <img src={logo} alt={title} className="object-contain h-full" />
      </div>
      <div className="px-4 py-2 text-center">
        <p className="text-lg font-semibold text-gray-100">{title}</p>
        <p className="text-sm text-gray-100">{description}</p>
      </div>
      <button className="w-full bg-green-600 text-white py-2 mt-auto rounded-md">
        {buttonText}
      </button>
    </a>
  );
};

export default SanaOzelCard;
