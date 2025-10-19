import { useState, useEffect } from "react";
import AppSidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { AdminAuthProvider } from "../../../context/AdminAuthContext";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSiteLogo(data.siteLogo || null);
          setFavicon(data.favicon || null);
        } else {
          console.error("Ayarlar çekilirken hata oluştu:", response.statusText);
        }
      } catch (error) {
        console.error("Ayarlar çekilirken bir bağlantı hatası oluştu:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      {/* Toast UI eklendi */}
        <AdminAuthProvider> 

      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex h-screen">
        {/* Sol Sidebar */}
        <AppSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarMinimized={isSidebarMinimized}
          setIsSidebarMinimized={setIsSidebarMinimized}
          favicon={favicon}
          siteLogo={siteLogo}
        />

        {/* Sağ İçerik */}
        <div className="flex-1 flex flex-col">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            siteLogo={siteLogo}
          />

          {/* Sayfa İçeriği */}
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <Outlet context={{ setSiteLogo, setFavicon }} />
          </main>
        </div>
      </div>
        </AdminAuthProvider>

    </>
  );
}
