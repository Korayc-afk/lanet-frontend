// src/components/Icons/TwitterIcon.tsx (Küçük ikon için ayrı bir dosya olmalı)
import React from 'react';
import { FaTwitter } from 'react-icons/fa'; // Veya FaXTwitter

interface IconProps {
  className?: string;
}

const TwitterIcon: React.FC<IconProps> = ({ className }) => {
  // Varsayılan olarak Tailwind'in text rengini kullanır, üzerine bir sınıf eklenebilir
  return <FaTwitter className={className} />;
};

export default TwitterIcon;