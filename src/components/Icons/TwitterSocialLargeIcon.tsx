// src/components/Icons/TwitterSocialLargeIcon.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

const TwitterSocialLargeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24" // Bu viewBox, X logosu için daha uygun olabilir. Original SVG'nizin viewBox'ına göre ayarlayın.
      fill="none" // Dışarıdan gelen fill renklerini engelle
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Twitter (X) Logosunun orijinal SVG path'i - Mavi renk doğrudan fill olarak verildi */}
      {/* Bu path, Twitter'ın şimdiki "X" logosudur. */}
      <path d="M18.244 2.25h3.308l-7.227 8.261L21.64 21.75h-2.906l-5.485-5.03L7.545 21.75H4.032l7.307-8.354L4.473 2.25h3.308l4.743 5.422L18.244 2.25zm-3.868 15.011L12.012 11.25l-4.743 5.422h-1.5L21.64 3.75h1.5l-6.75 14.011z" fill="#1DA1F2"/> {/* Twitter Mavi */}
    </svg>
  );
};

export default TwitterSocialLargeIcon;