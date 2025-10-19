// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay süresi dolduğunda debouncedValue'yu güncelle
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Her 'value' veya 'delay' değiştiğinde önceki zamanlayıcıyı temizle
    // Bu, önceki gecikmeli çağrının iptal edilmesini sağlar
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 'value' veya 'delay' değiştiğinde tekrar çalıştır

  return debouncedValue;
}

export default useDebounce;