import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./context/SettingsContext";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import axios from "axios";

// 📌 Auth Pages
import AdminLogin from "./components/admin/AuthPages/AdminLogin";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";


// 📌 Other Pages
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import DBTest from "./components/admin/pages/db-test";

// 📌 Frontend Layout & Pages
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Ozel from "./pages/ozel/Ozel";
import Yayinda from "./pages/yayinda/Yayinda";
import Topluluk from "./pages/topluluk/Topluluk";
import Cekilisler from "./pages/Cekilisler/Cekilisler";
import Biletler from "./pages/Biletler/Biletler";
import SkorTahmin from "./pages/SkorTahmin/SkorTahmin";
import Bonuslar from "./pages/Bonuslar/Bonuslar";
import Gunluk from "./pages/Gunluk/Gunluk";
import Puanlar from "./pages/Puanlar/Puanlar";
import Cark from "./pages/Cark/Cark";
import Market from "./pages/Market/Market";

// 📌 UI Elements & Others
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";

// 📌 Admin Layout & Pages
import AdminRoute from "./components/admin/guards/AdminRoute";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AdminDashboard from "./components/admin/pages/DashboardPage";
import Ayarlar from "./components/admin/pages/ayarlar";
import Kullanicilar from "./components/admin/pages/kullanicilar";
import UsersManagement from "../src/components/admin/pages/UsersManagement"; // YENİ: UsersManagement importu
import FooterLinksManagement from "./components/admin/ui/FooterLinksManagement"; //

// 📌 Global Components
import { ScrollToTop } from "./components/common/ScrollToTop";
import Loading from "../public/images/logo/logo-dark.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🛠 Custom Components
import MaintenanceCard from "./components/common/MaintenanceCard";
import PopupBanner from "./components/common/PopupBanner";

// robots.txt-google api
import AnalyticsScripts from "./components/AnalyticsScripts";
import NotificationsManagement from "./components/admin/pages/NotificationsManagement";
import ContentManagement from "./components/admin/pages/ContentManagement";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// ✅ Settings tipi
interface SettingsData {
  siteTitle?: string | null;
  seoDescription?: string | null;
  footerText?: string | null;
  siteLogoUrl?: string | null;
  faviconUrl?: string | null;
  maintenanceMode?: boolean;
  popupText?: string | null;
  googleAnalyticsId?: string | null;
  allowSearchEngines?: boolean;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsData | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Ayarlar çekilirken hata:", error);
      }
    };

    fetchSettings();

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1e293b] flex flex-col items-center justify-center z-50">
        <img src={Loading} alt="Logo" className="w-78 h-38 animate-pulse" />
        <p className="text-white text-lg mt-4 animate-bounce">Yükleniyor...</p>
      </div>
    );
  }

  // 🛑 Bakım modu aktifse sadece MaintenanceCard göster
  if (settings?.maintenanceMode) {
    return <MaintenanceCard />;
  }

  return (
    <HelmetProvider>
      <SettingsProvider>
            <AuthProvider> {/* 🟢 Normal kullanıcı context */}
        <AdminAuthProvider> 
        <Router>
          <ScrollToTop />

          {/* toast  */}

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className={"-mb-10"}
          />

          {/* 🟢 Popup Banner */}
          {settings?.popupText && <PopupBanner text={settings.popupText} />}
          <AnalyticsScripts
            googleAnalyticsId={settings?.googleAnalyticsId ?? undefined}
          />

          <Routes>
            {/* 🌐 PUBLIC ROUTES */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* 🛡 Admin Panel */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="ayarlar" element={<Ayarlar />} />
              <Route
                path="footer-linkleri"
                element={<FooterLinksManagement />}
              />
              <Route path="kullanicilar" element={<UsersManagement />} />
              <Route path="bildirim" element={<NotificationsManagement />} />
              <Route
                path="/admin/icerik-yonetimi"
                element={<ContentManagement />}
              />
              <Route path="kullanicilar" element={<Kullanicilar />} />
            </Route>

            {/* 🖥️ FRONTEND LAYOUT ROUTES */}
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<UserProfiles />} />
              <Route path="blank" element={<Blank />} />
              <Route path="db-test" element={<DBTest />} />
              <Route path="ozel" element={<Ozel />} />
              <Route path="yayinda" element={<Yayinda />} />
              <Route path="topluluk" element={<Topluluk />} />
              <Route path="cekilisler" element={<Cekilisler />} />
              <Route path="biletler" element={<Biletler />} />
              <Route path="tahmin" element={<SkorTahmin />} />
              <Route path="bonuslar" element={<Bonuslar />} />
              <Route path="gunluk" element={<Gunluk />} />
              <Route path="puanlar" element={<Puanlar />} />
              <Route path="cark" element={<Cark />} />
              <Route path="market" element={<Market />} />
              <Route path="form-elements" element={<FormElements />} />
              <Route path="basic-tables" element={<BasicTables />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="avatars" element={<Avatars />} />
              <Route path="badge" element={<Badges />} />
              <Route path="buttons" element={<Buttons />} />
              <Route path="images" element={<Images />} />
              <Route path="videos" element={<Videos />} />
              <Route path="line-chart" element={<LineChart />} />
              <Route path="bar-chart" element={<BarChart />} />
            </Route>

            {/* ❌ NOT FOUND */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </AdminAuthProvider>
            </AuthProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}
