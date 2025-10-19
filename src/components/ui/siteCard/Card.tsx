export default function Card({
  href,
  imageSrc,
  logoSrc,
  badgeText,
  badgeColor,
}: {
  href: string;
  imageSrc: string;
  logoSrc: string;
  badgeText: string;
  badgeColor?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-lg overflow-hidden group border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer shadow-lg"
      >
        <img
          alt="Site Görseli"
          className="w-full h-32 sm:h-36 md:h-105 object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageSrc}
        />

        <div className="h-15 absolute top-3 left-3 right-3 flex items-center justify-center z-20 transition-all duration-300 group-hover:top-1/2 group-hover:-translate-y-1/2">
          <img
            alt="logo"
            className="inline-block max-h-12 sm:max-h-14 md:max-h-16 object-contain"
            src={logoSrc}
          />
        </div>
      </a>
      <span className="mt-5 lg:px-2 flex items-start lg:items-center gap-1 lg:gap-2">
        <span
          className={`relative rounded-full overflow-hidden p-0.5 lg:p-1 shrink-0 after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-${
            badgeColor || "green"
          }-500/60 after:animate-pulse`}
        >
          <svg
            className="svg-inline--fa fa-circle-check text-green-500 w-2 h-2 lg:w-3 lg:h-3 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            ></path>
          </svg>
        </span>
        <p className="text-[9px] lg:text-xs text-gray-500">
          <span className="text-[#A0A6C0]">{badgeText}</span>
        </p>
      </span>
    </div>
  );
}
