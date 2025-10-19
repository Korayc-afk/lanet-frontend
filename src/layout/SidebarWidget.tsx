import React, { useState, useEffect } from "react"; // useState ve useEffect hook'larını import et
import { FaTelegram } from "react-icons/fa"; // Telegram ikonunu react-icons'tan import et

const SidebarWidget: React.FC = () => {
  // Telegram linkini tutacak state
  const [telegramLink, setTelegramLink] = useState<string>("https://kisalimi.com/telegramsohbet"); // Varsayılan sabit link
  const [loadingLink, setLoadingLink] = useState(true); // Yükleme durumu için state
  const [errorLink, setErrorLink] = useState<string | null>(null); // Hata durumu için state

  useEffect(() => {
    // Bileşen yüklendiğinde (mount olduğunda) Telegram linkini çek
    const fetchTelegramLink = async () => {
      try {
        const response = await fetch("/api/settings"); // API'den ayarları çek
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Eğer backend'den telegramLink gelirse state'i güncelle, yoksa varsayılanı kullan
        setTelegramLink(data.telegramLink || "https://kisalimi.com/telegramsohbet");
      } catch (error: any) {
        console.error("Sidebar Telegram linki çekilirken hata:", error);
        setErrorLink(error.message || "Link yüklenirken bir sorun oluştu.");
        // Hata durumunda da varsayılan linki kullanmaya devam et
        setTelegramLink("https://kisalimi.com/telegramsohbet");
      } finally {
        setLoadingLink(false); // Yükleme bitti
      }
    };

    fetchTelegramLink(); // Fonksiyonu çağır
  }, []); // Sadece bir kere çalışmasını sağla (componentDidMount gibi)

  // Yükleme sırasında veya hata durumunda (isteğe bağlı olarak render'ı etkileyebiliriz)
  if (loadingLink) {
    // Link yüklenene kadar boş veya bir placeholder döndürebiliriz
    // Şu an için varsayılan linki kullanmaya devam etmesi için burayı atlıyorum.
    // return <div className="my-4 text-center text-gray-400">Link yükleniyor...</div>;
  }
  if (errorLink) {
    console.warn("Sidebar Telegram linkinde hata oluştu, varsayılan kullanılıyor:", errorLink);
    // return <div className="my-4 text-center text-red-500">Link hatası: {errorLink}</div>;
  }

  return (
    <div className="my-4">
      <div className="bg-slate-800 rounded-xl telegram-hover">
        <a
          // Dinamik olarak çekilen telegramLink'i kullan
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 flex gap-2 relative"
        >
          {/* Telegram Icon (react-icons ile, orijinal SVG'yi kaldırıp FaTelegram kullanıldı) */}
          <FaTelegram className="w-6 h-6 text-blue-400" /> {/* Rengi burada belirttim */}

          {/* Text Content (sabit kaldı) */}
          <div>
            <p
              className="text-sm font-medium mb-0.5"
              style={{
                background:
                  "linear-gradient(rgb(42, 171, 238) 0%, rgb(34, 158, 217) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Telegram’a Katıl!
            </p>
            <p className="text-xs font-medium text-foundation-white-60% leading-5">
              <span className="text-green-400">160B</span>{" "}
              <span className="text-white">aktif üye</span>
            </p>
          </div>

          {/* Arrow Icon (sabit kaldı) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-foundation-white ml-auto text-white"
          >
            <path
              d="M5.83398 14.1666L14.1673 5.83325M14.1673 5.83325H5.83398M14.1673 5.83325V14.1666"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SidebarWidget;