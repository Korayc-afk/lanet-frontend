// src/components/Icons/FacebookSocialLargeIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const FacebookSocialLargeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none" // SVG'nin dışarıdan fill almasını engeller
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Bu SVG içeriği Facebook'un orijinal SVG'sinden alınmalıdır. */}
    {/* Eğer tek bir renkteyse, fill="blue" veya fill="#1877F2" gibi doğrudan renk kodu kullanın. */}
    <path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.163 0 0 7.163 0 16c0 7.94 5.764 14.546 13.333 15.82V20.5H9.4V16h3.937v-2.93c0-3.9 2.368-6.02 5.857-6.02 1.666 0 3.107.124 3.535.18v4.062h-2.316c-1.812 0-2.164.86-2.164 2.126V16h4.31l-.696 4.5H18.67V31.82C26.236 30.546 32 23.94 32 16c0-8.837-7.163-16-16-16z" fill="#1877F2"/> {/* Facebook Mavi */}
  </svg>
);

export default FacebookSocialLargeIcon;