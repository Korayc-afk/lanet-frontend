import React from "react";
import { useLocation, useNavigate } from "react-router"; // ✨ react-router-dom olarak güncellendi
import ToplulukTitle from "../../components/ui/menuBasliklar/ToplulukTitle";
import Footer from "../../components/footer/Footer";
import Button from "../../components/ui/button/Button"; // Reusable button
import communityCircles from "../../assets/images/titleBG/community-circles.png"; // Arka plan görseli
import VideoDetayCard from "../../components/ui/EnCokIzlenenler/VideoDetayCard";
import sweetBonanza from "../../assets/images/videoDetay/c-YLubZG89O2P8UHbBDFA.jpg"; // ✨ sweetBonanza import edildi

// ✅ Reusable Navigation Button (değişiklik yok)
const NavigationButton = ({
  active = false,
  icon,
  text,
  onClick,
}: {
  active?: boolean;
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-sm rounded-full px-3 py-2 whitespace-nowrap transition-colors duration-200
        ${
          active
            ? "bg-pink-100 text-pink-700"
            : "text-slate-500 hover:bg-pink-50"
        }`}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

const Topluluk = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="mb-10 xl:mb-10 relative">


      {/* Sayfa Başlığı */}
      <ToplulukTitle
        title="Topluluk"
        description="Topluluğa katılın, etkileşime geçin ve puan kazanın"
      />

      {/* Topluluğa Katıl Kartı */}
      <div
        className="p-6 rounded-xl bg-slate-900 border border-slate-800 bg-no-repeat bg-right-top mt-6 mb-6"
        style={{ backgroundImage: `url(${communityCircles})` }}
      >
        <p className="text-2xl font-bold mb-3 text-gray-100">Topluluğa Katıl</p>
        <p className="text-slate-400 mb-4">
          Şimdi kaydol, gönderilere yorum yap,
          <br /> gündemi sen belirle
        </p>
        <div className="flex items-center gap-3">
          <Button
            children="Kayıt Ol"
            bgColor="bg-emerald-500"
            textColor="text-white"
            onClick={() => navigate("/signup")} // ✅ Signup sayfasına yönlendir
          />
          <Button
            children="Giriş Yap"
            bgColor="bg-yellow-500"
            textColor="text-black"
            onClick={() => navigate("/signin")} // ✅ Signin sayfasına yönlendir
          />
        </div>
      </div>

      {/* Alt Menü */}
      <div className="flex items-center gap-2 mt-5 overflow-auto">
        <NavigationButton
          active={location.pathname === "#"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M6.88094 2.42274C7.07594 2.24024 7.37844 2.24274 7.57344 2.42524C8.26344 3.07274 8.91094 3.77024 9.51594 4.52524C9.79094 4.16524 10.1034 3.77274 10.4409 3.45274C10.6384 3.26774 10.9434 3.26774 11.1409 3.45524C12.0059 4.28024 12.7384 5.37024 13.2534 6.40524C13.7609 7.42524 14.0984 8.46774 14.0984 9.20274C14.0984 12.3927 11.6034 15.0877 8.49844 15.0877C5.35844 15.0877 2.89844 12.3902 2.89844 9.20024C2.89844 8.24024 3.34344 7.06774 4.03344 5.90774C4.73094 4.73024 5.71594 3.50274 6.88094 2.42274ZM8.54094 12.6877C9.17344 12.6877 9.73344 12.5127 10.2609 12.1627C11.3134 11.4277 11.5959 9.95774 10.9634 8.80274C10.8509 8.57774 10.5634 8.56274 10.4009 8.75274L9.77094 9.48524C9.60594 9.67524 9.30844 9.67024 9.15344 9.47274C8.74094 8.94774 8.00344 8.01024 7.58344 7.47774C7.42594 7.27774 7.12594 7.27524 6.96594 7.47524C6.12094 8.53774 5.69594 9.20774 5.69594 9.96024C5.69844 11.6727 6.96344 12.6877 8.54094 12.6877Z"
                fill="currentColor"
              />
            </svg>
          }
          text="En yeni gönderiler"
          onClick={() => navigate("#")}
        />
        <NavigationButton
          active={location.pathname === "/topluluk/Kesfet"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M3.40567 13.9719L10.5017 11.9344C10.9701 11.7939 11.3743 11.5536 11.7144 11.2136C12.0544 10.8735 12.2942 10.4698 12.4338 10.0023L14.4713 2.90631C14.5415 2.64869 14.4774 2.42012 14.2788 2.22059C14.0802 2.02106 13.8516 1.95689 13.5931 2.02808L6.49701 4.06556C6.02863 4.20608 5.62488 4.44636 5.28577 4.78641C4.94666 5.12645 4.70637 5.5302 4.56492 5.99765L2.52744 13.0937C2.45719 13.3513 2.52182 13.5799 2.72136 13.7794C2.92089 13.9789 3.14899 14.0431 3.40567 13.9719ZM8.49936 10.1077C7.91388 10.1077 7.41645 9.90305 7.00708 9.49368C6.59771 9.08431 6.39256 8.58642 6.39162 8C6.39069 7.41358 6.59584 6.91615 7.00708 6.50772C7.41832 6.09929 7.91575 5.89414 8.49936 5.89226C9.08297 5.89039 9.58086 6.09554 9.99304 6.50772C10.4052 6.9199 10.6099 7.41733 10.6071 8C10.6043 8.58267 10.3996 9.08056 9.99304 9.49368C9.58648 9.9068 9.08859 10.1115 8.49936 10.1077Z"
                fill="currentColor"
              />
            </svg>
          }
          text="Keşfet"
          onClick={() => navigate("/topluluk/Kesfet")}
        />
        <NavigationButton
          active={location.pathname === "/topluluk/gonderilerim"}
          text="Gönderilerim"
          onClick={() => navigate("/topluluk/gonderilerim")}
        />
      </div>

      {/* Video Kartı */}
      <VideoDetayCard
        username="koray"
        createdAt="5 saat önce"
        description="Harika bir video!"
        likes={94923}
        comments={1235}
        gradientFrom="from-yellow-400"
        gradientTo="to-red-500"
        imageUrl="https://i.ytimg.com/vi/EVJYD_e0Vjw/maxresdefault.jpg" // ✨ sweetBonanza resmini imageUrl olarak veriyoruz
        uploadTime="1 gün önce"
        videoUrl={
          "https://www.youtube.com/embed/u2Noc_gEZGk?si=JKhLOY6T5IN5Rj54"
        } // ✨ Lütfen geçerli bir YouTube video linki girin!
        isUserPost={false}
      />
      <VideoDetayCard
        username="Padi"
        createdAt="15 saat önce"
        description="Harika bir video!"
        likes={94923}
        comments={1235}
        gradientFrom="from-yellow-400"
        gradientTo="to-red-500"
        imageUrl="https://via.placeholder.com/1280x720.png?text=Test+Resim" // ✨ sweetBonanza resmini imageUrl olarak veriyoruz
        uploadTime="8 saat önce"
        videoUrl={
          "https://www.youtube.com/embed/u2Noc_gEZGk?si=JKhLOY6T5IN5Rj54"
        } // ✨ Lütfen geçerli bir YouTube video linki girin!
        isUserPost={false}
      />
      <VideoDetayCard
        username="koray"
        createdAt="5 saat önce"
        description="Harika bir video!"
        likes={94923}
        comments={1235}
        gradientFrom="from-yellow-400"
        gradientTo="to-red-500"
        imageUrl={sweetBonanza} // ✨ sweetBonanza resmini imageUrl olarak veriyoruz
        uploadTime="1 gün önce"
        videoUrl={
          "https://www.youtube.com/embed/u2Noc_gEZGk?si=JKhLOY6T5IN5Rj54"
        } // ✨ Lütfen geçerli bir YouTube video linki girin!
        isUserPost={false}
      />

      {/* Footer */}
      <div className="mt-8">
        <Footer />
      </div>
    </section>
  );
};

export default Topluluk;
