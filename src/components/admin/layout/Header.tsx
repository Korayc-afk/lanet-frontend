import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "react-feather";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  siteLogo: string | null; 
};

export default function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      {/* Hamburger (mobile) */}
      <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Başlık */}
      <h1 className="text-xl font-bold">Admin Panel</h1>

      {/* Sağ bölüm: Kullanıcı, Saat, Siteyi Görüntüle */}
      <div className="flex items-center gap-4">
        <span className="hidden md:block font-semibold">👤 Admin</span>
        <span className="hidden md:block text-gray-500 whitespace-nowrap">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </span>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          <ExternalLink size={16} />
          <span className="hidden md:inline">Siteyi Görüntüle</span>
        </a>
      </div>
    </header>
  );
}
