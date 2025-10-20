import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Menu } from "@headlessui/react";
import Avatar from "react-avatar";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "../components/header/NotificationDropdown";
import ChatButton from "../components/ui/ChatButton/ChatButton";
import Button from "../components/ui/button/Button";
import { toast } from "react-toastify";

interface Settings {
  siteTitle: string | null;
  siteLogoUrl: string | null;
  faviconUrl: string | null;
}

interface AppHeaderProps {
  settings: Settings;
}

const AppHeader: React.FC<AppHeaderProps> = ({ settings }) => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSettings = settings || {
    siteTitle: "Lanet kel title",
    siteLogoUrl: null,
    faviconUrl: null,
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    toast.error("Çıkış yapıldı.");
    navigate("/");
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex items-center justify-between w-full px-3 py-3 sm:gap-4 lg:px-6 lg:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={() =>
              window.innerWidth >= 1024
                ? toggleSidebar()
                : toggleMobileSidebar()
            }
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <Link to="/" className="lg:hidden">
            {currentSettings.siteLogoUrl ? (
              <>
                <img
                  className="dark:hidden h-8"
                  src={`/api${currentSettings.siteLogoUrl}`}
                  alt={currentSettings.siteTitle || "Site Logosu"}
                />
                <img
                  className="hidden dark:block h-8"
                  src={`/api${currentSettings.siteLogoUrl}`}
                  alt={currentSettings.siteTitle || "Site Logosu"}
                />
              </>
            ) : (
              <>
                <img
                  className="dark:hidden h-8"
                  src="./images/logo/logo.svg"
                  alt="Logo"
                />
                <img
                  className="hidden dark:block h-8"
                  src="./images/logo/logo-dark.svg"
                  alt="Logo"
                />
              </>
            )}
          </Link>

          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  🔍
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="X sitesi arama..."
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-2 2xsm:gap-3">
          <NotificationDropdown />

          {isAuthenticated ? (
            <Menu as="div" className="relative z-10">
              <Menu.Button className="focus:outline-none">
                <Avatar
                  name={
                    user?.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.username || user?.email || "Kullanıcı"
                  }
                  size="43"
                  round
                  color="#98A2B3"
                  fgColor="#fff"
                  className="cursor-pointer z-0 hover:bg-gray-500"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-black shadow-lg rounded-md ring-1 ring-black/5 focus:outline-none text-sm z-50 dark:bg-gray-100 dark:text-black">
                <div className="py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/profile")}
                        className={`w-full px-4 py-2 text-left ${
                          active ? "bg-gray-400 dark:bg-gray-300" : ""
                        }`}
                      >
                        Profilim
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-2 text-left ${
                          active ? "bg-gray-100 dark:bg-gray-300" : ""
                        }`}
                      >
                        Çıkış Yap
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <Button
                children="Giriş Yap"
                onClick={() => {
                  toast.info("Giriş sayfasına yönlendiriliyorsunuz");
                  navigate("/signin");
                }}
              />
              <Button
                children="Kayıt Ol"
                variant="green"
                onClick={() => {
                  toast.info("Kayıt sayfasına yönlendiriliyorsunuz");
                  navigate("/signup");
                }}
              />
            </>
          )}

          <ChatButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
