// src/components/Icons/TelegramSocialLargeIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const TelegramSocialLargeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none" // SVG'nin dışarıdan fill almasını engeller
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 32C24.8365 32 32 24.8365 32 16C32 7.16347 24.8365 0 16 0C7.16347 0 0 7.16347 0 16C0 24.8365 7.16347 32 16 32Z"
      fill="url(#telegramGradient)"
    ></path>
    <path
      d="M5.95973 16.7826C7.83012 15.7523 9.91798 14.8924 11.8688 14.0282C15.2249 12.6126 18.5944 11.2215 21.9979 9.92645C22.66 9.70578 23.8498 9.48998 23.9665 10.4713C23.9026 11.8604 23.6399 13.2413 23.4596 14.6222C23.0021 17.659 22.4732 20.6854 21.9576 23.7122C21.7799 24.7204 20.5169 25.2424 19.7088 24.5972C17.7666 23.2853 15.8096 21.9862 13.8923 20.644C13.2642 20.0058 13.8466 19.0893 14.4075 18.6336C16.0071 17.0572 17.7035 15.7178 19.2195 14.06C19.6284 13.0724 18.4202 13.9047 18.0217 14.1597C15.8318 15.6688 13.6955 17.27 11.3867 18.5962C10.2074 19.2454 8.83285 18.6906 7.65405 18.3284C6.5971 17.8908 5.04829 17.4499 5.95962 16.7826L5.95973 16.7826Z"
      fill="white"
    ></path>
    <defs>
      <linearGradient
        id="telegramGradient"
        x1="12.0019"
        y1="1.3344"
        x2="4.00187"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#37AEE2"></stop>
        <stop offset="1" stopColor="#1E96C8"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default TelegramSocialLargeIcon;