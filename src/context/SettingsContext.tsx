// src/context/SettingsContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface SettingsData {
  siteTitle?: string | null;
  siteLogoUrl?: string | null; // <-- EKLENDİ
  seoDescription?: string | null;
  faviconUrl?: string | null;
  
  // diğer ayarlar istersen eklenebilir
}

interface SettingsContextType {
  settings: SettingsData;
  refreshSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  refreshSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsData>({});

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Settings çekilemedi", err);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
