import { useRef, useEffect } from "react";
import { Menu, X, Home, Users, Settings, LogOut, Bell, FileText } from "react-feather";
import SidebarLink from "./layout/SidebarLink";

type SidebarProps = {
  isSidebarMinimized: boolean;
  setIsSidebarMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  isSidebarMinimized,
  setIsSidebarMinimized,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin-login";
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed z-50 inset-y-0 left-0 bg-gray-800 text-white ${
        isSidebarMinimized ? "w-16" : "w-64"
      } transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:relative md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isSidebarMinimized && (
          <span className="text-2xl font-bold">Menüler</span>
        )}
        <button
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
          className="hidden md:block"
          aria-label="Toggle sidebar"
        >
          {isSidebarMinimized ? <Menu /> : <X />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          to="/admin/dashboard"
          text="Dashboard"
          icon={<Home size={20} />}
          minimized={isSidebarMinimized}
        />
        <SidebarLink
          to="/admin/kullanicilar"
          text="Kullanıcılar"
          icon={<Users size={20} />}
          minimized={isSidebarMinimized}
        />
        {/* burası iptal büyük ihtimalle  genel sayfa olarak*/}

        <SidebarLink
          to="/admin/icerik-yonetimi"
          text="İçerik Yönetimi"
          icon={<FileText size={20} />}
          minimized={isSidebarMinimized}
        />
        {/* burası iptal büyük ihtimalle  genel sayfa olarak*/}
        <SidebarLink
          to="/admin/ayarlar"
          text="Ayarlar"
          icon={<Settings size={20} />}
          minimized={isSidebarMinimized}
        />
        {/* burası iptal büyük ihtimalle  genel sayfa olarak*/}

        <SidebarLink
          to="/admin/bildirim"
          text="Bildirim Yönetimi"
          icon={<Bell size={20} />}
          minimized={isSidebarMinimized}
        />
        <SidebarLink
          to="/admin/settings"
          text="Y menü"
          icon={<Settings size={20} />}
          minimized={isSidebarMinimized}
        />
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 px-3 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          {!isSidebarMinimized && "Çıkış Yap"}
        </button>
      </div>
    </aside>
  );
}
