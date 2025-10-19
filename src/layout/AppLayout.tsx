import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Helmet } from "react-helmet-async";
import { useSettings } from "../context/SettingsContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const navigate = useNavigate();
  const { settings } = useSettings(); 

 

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue === null) {
        console.log("🚨 Kullanıcı token silindi, logout ediliyor...");
        navigate("/");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  return (
    <>
      {/* 🌍 Global Head bilgisi */}
      <Helmet>
        <title>{settings.siteTitle || "Lanet Kel Casino"}</title>
        <meta
          name="description"
          content={settings.seoDescription || "Varsayılan açıklama"}
        />
        {settings.faviconUrl && (
          <link
            rel="icon"
            type="image/png"
            href={`/api-uploads${settings.faviconUrl}`}
          />
        )}
      </Helmet>

      <div className="min-h-screen xl:flex overflow-x-hidden">
        <div>
          <AppSidebar isSidebarMinimized={false} setIsSidebarMinimized={function (): void {
            throw new Error("Function not implemented.");
          } } isSidebarOpen={false} setIsSidebarOpen={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <Backdrop />
        </div>

        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
        >
          <AppHeader
            settings={{
              ...settings,
              siteTitle: settings.siteTitle ?? null,
              faviconUrl: settings.faviconUrl ?? null,
              siteLogoUrl: settings.siteLogoUrl ?? null,
            }}
          />
          <div className="p-4 md:p-6 mx-auto max-w-screen-2xl w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
