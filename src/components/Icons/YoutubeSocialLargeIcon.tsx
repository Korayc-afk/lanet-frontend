// src/components/Icons/YoutubeSocialLargeIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const YoutubeSocialLargeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none" // SVG'nin dışarıdan fill almasını engeller
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z"
      fill="#FF0000" // Youtube Kırmızı
    ></path>
    <path
      d="M15.9922 8.4502C15.9922 8.4502 9.24884 8.4502 7.55635 8.88999C6.65014 9.14319 5.90394 9.8894 5.65073 10.8089C5.21095 12.5014 5.21094 16.0064 5.21094 16.0064C5.21094 16.0064 5.21095 19.5248 5.65073 21.1906C5.90394 22.1101 6.63681 22.843 7.55635 23.0962C9.26217 23.5493 15.9922 23.5494 15.9922 23.5494C15.9922 23.5494 22.7489 23.5494 24.4414 23.1096C25.3609 22.8564 26.0938 22.1368 26.3336 21.2039C26.7868 19.5248 26.7868 16.0198 26.7868 16.0198C26.7868 16.0198 26.8001 12.5014 26.3336 10.8089C26.0938 9.8894 25.3609 9.15654 24.4414 8.91665C22.7489 8.45022 15.9922 8.4502 15.9922 8.4502ZM13.8466 12.7681L19.4572 16.0064L13.8466 19.2314V12.7681Z"
      fill="white"
    ></path>
  </svg>
);

export default YoutubeSocialLargeIcon;