import React, { useState, useEffect, useRef } from "react";

interface VideoDetayCardProps {
  username: string;
  userAvatar?: string;
  uploadTime: string;
  imageUrl?: string; // ✨ imageUrl prop'unu geri ekledik (opsiyonel)
  videoUrl: string;
  likes: number;
  comments: number;
  createdAt: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  isUserPost: boolean;
}

const VideoDetayCard: React.FC<VideoDetayCardProps> = ({
  username,
  userAvatar,
  uploadTime,
  imageUrl, // ✨ imageUrl prop'unu geri aldık
  videoUrl,
  likes,
  comments,
  description,
  gradientFrom,
  gradientTo,
  isUserPost,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState<"comments" | "all-videos">(
    "comments"
  );

  const modalContentRef = useRef<HTMLDivElement>(null);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;

    console.log("Yorum gönderildi:", commentText);
    setCommentText("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVideoModalOpen]);

  // Yardımcı fonksiyon: videoUrl'den önizleme resmini türetir (önceki haliyle kalıyor)
  const getThumbnailUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      let videoId: string | null = null;

      // Standart YouTube izleme URL'leri
      if (
        urlObj.hostname.includes("youtube.com") &&
        urlObj.searchParams.has("v")
      ) {
        videoId = urlObj.searchParams.get("v");
      }
      // YouTube kısaltılmış URL'ler
      else if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.substring(1);
      }
      // YouTube Embed URL'leri
      else if (
        urlObj.hostname.includes("youtube.com") &&
        urlObj.pathname.includes("/embed/")
      ) {
        const match = urlObj.pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
          videoId = match[1];
        }
      }

      if (videoId) {
        return `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error(
        "Geçersiz video URL'si formatı veya önizleme alınamadı:",
        url,
        e
      );
    }
    return "https://via.placeholder.com/1280x720.png?text=Video+Onizleme+Yok";
  };

  const derivedThumbnailUrl = getThumbnailUrl(videoUrl); // videoUrl'den türetilen önizleme URL'si

  const gradientBorderClasses = isUserPost
    ? `gradient-border`
    : `border border-slate-700`;
  const gradientBgClasses = isUserPost
    ? `gradient-bg-slate-900`
    : `bg-slate-800`;

  const getUserAvatarClasses = () => {
    if (isUserPost) {
      return `w-12 h-12 flex rounded-full justify-center items-center overflow-hidden relative
              before:absolute before:inset-0 before:p-[2px] before:rounded-full before:bg-gradient-to-r 
              before:from-${gradientFrom} before:to-${gradientTo} before:z-0`;
    }
    return "w-12 h-12 rounded-full bg-purple-500 flex justify-center items-center overflow-hidden";
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      {/* Ana Video Kartı */}
      <div
        className={`flex flex-col gap-3 px-4 py-6 rounded-xl ${gradientBorderClasses} bg-slate-800`}
        data-is-user-post={isUserPost}
      >
        {/* User Info */}
        <div className="flex gap-3">
          <div className={getUserAvatarClasses()}>
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={username}
                className="w-full h-full rounded-full object-cover z-10"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-purple-500 flex justify-center items-center z-10">
                <span className="text-white font-bold text-lg uppercase">
                  {username.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-white">{username}</p>
            <p className="text-xs text-slate-500">{uploadTime}</p>
          </div>
        </div>

        {/* Video/Image Thumbnail - Tıklandığında modalı açar */}
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={openVideoModal}
        >
          <img
            src={imageUrl || derivedThumbnailUrl} // ✨ Önizleme resmi burada kullanılıyor
            alt="Video Thumbnail"
            className="w-full h-full aspect-video align-middle rounded-lg object-cover"
          />
          {/* Play Icon (Ortadaki büyük) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-90"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.83L9.75 8.67v6.66l6.496-3.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Likes & Comments Section */}
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-2 relative">
          <div className="flex-1 flex items-center gap-2 text-slate-500">
            {/* Likes Button */}
            <div className="flex items-center gap-1">
              <button className="flex items-center">
                <span className="text-slate-500 hover:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M16.6973 6.18765C15.4753 6.12765 14.0183 6.69765 12.8073 8.34765L12.0023 9.43765L11.1963 8.34765C9.98431 6.69765 8.52631 6.12765 7.30431 6.18765C6.06131 6.25765 4.95531 6.96765 4.39431 8.09765C3.84231 9.21765 3.76131 10.8776 4.87331 12.9176C5.94731 14.8876 8.13031 17.1876 12.0023 19.5276C15.8723 17.1876 18.0543 14.8876 19.1283 12.9176C20.2393 10.8776 20.1583 9.21765 19.6053 8.09765C19.0443 6.96765 17.9393 6.25765 16.6973 6.18765ZM20.8843 13.8776C19.5333 16.3576 16.8833 18.9976 12.5053 21.5476L12.0023 21.8476L11.4983 21.5476C7.11931 18.9976 4.46931 16.3576 3.11631 13.8776C1.75631 11.3776 1.70631 9.01765 2.60231 7.20765C3.48931 5.41765 5.24931 4.29765 7.20331 4.19765C8.85431 4.10765 10.5713 4.75765 12.0013 6.20765C13.4303 4.75765 15.1473 4.10765 16.7973 4.19765C18.7513 4.29765 20.5113 5.41765 21.3983 7.20765C22.2943 9.01765 22.2443 11.3776 20.8843 13.8776Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </button>
              <p className="text-sm">{likes}</p>
            </div>
            {/* Comments Button */}
            <div className="flex items-center gap-1">
              <button className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  className="w-6 h-6 text-slate-500 hover:text-gray-100"
                >
                  <path
                    d="M10.002 2.86719C5.06562 2.86719 1.06482 6.1174 1.06482 10.1287C1.06482 11.7904 1.75955 13.3126 2.91161 14.5379C2.39144 15.9134 1.30919 17.0795 1.29174 17.0934C1.06133 17.3378 0.998486 17.6939 1.13115 18.0011C1.26381 18.3083 1.56754 18.5073 1.90268 18.5073C4.04971 18.5073 5.74289 17.6101 6.75880 16.8909C7.76773 17.2086 8.85696 17.3902 10.002 17.3902C14.9385 17.3902 18.9393 14.14 18.9393 10.1287C18.9393 6.1174 14.9385 2.86719 10.002 2.86719ZM10.002 15.7144C9.06991 15.7144 8.14826 15.5713 7.26501 15.292L6.47253 15.0407L5.79177 15.5224C5.29254 15.875 4.60829 16.2695 3.78439 16.5349C4.03924 16.1124 4.28710 15.6376 4.47911 15.1314L4.84917 14.1504L4.13000 13.3894C3.49812 12.7156 2.74055 11.6019 2.74055 10.1287C2.74055 7.04953 5.99774 4.54292 10.002 4.54292C14.0063 4.54292 17.2635 7.04953 17.2635 10.1287C17.2635 13.2078 14.0063 15.7144 10.002 15.7144Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <p className="text-sm">{comments}</p>
            </div>
          </div>
          {/* Description or extra content area */}
          <div className="text-sm text-gray-100 mt-2">
            <p>{description}</p>
          </div>
        </div>

        {/* Comment Input Area */}
        <div className="flex flex-col gap-3 mt-auto relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 w-full border border-slate-700 px-4 py-2 bg-black/20 rounded-full h-full">
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  className="text-slate-500 hover:text-gray-100"
                >
                  <path
                    d="M10 18.6875C12.1217 18.6875 14.1566 17.8446 15.6569 16.3444C17.1571 14.8441 18 12.8092 18 10.6875C18 8.56577 17.1571 6.53094 15.6569 5.03065C14.1566 3.53035 12.1217 2.6875 10 2.6875C7.87827 2.6875 5.84344 3.53035 4.34315 5.03065C2.84285 6.53094 2 8.56577 2 10.6875C2 12.8092 2.84285 14.8441 4.34315 16.3444C5.84344 17.8446 7.87827 18.6875 10 18.6875ZM7.12813 12.8594C7.6875 13.5063 8.64375 14.1875 10 14.1875C11.3562 14.1875 12.3125 13.5063 12.8719 12.8594C13.0531 12.65 13.3687 12.6281 13.5781 12.8094C13.7875 12.9906 13.8094 13.3062 13.6281 13.5156C12.9313 14.3156 11.7219 15.1875 10 15.1875C8.27812 15.1875 7.06875 14.3156 6.37187 13.5156C6.19062 13.3062 6.21250 12.9906 6.42188 12.8094C6.63125 12.6281 6.94688 12.65 7.12813 12.8594ZM6.5125 9.1875C6.5125 8.92228 6.61786 8.66793 6.80539 8.48039C6.99293 8.29286 7.24728 8.1875 7.5125 8.1875C7.77772 8.1875 8.03207 8.29286 8.21961 8.48039C8.40714 8.66793 8.51250 8.92228 8.51250 9.1875C8.51250 9.45272 8.40714 9.70707 8.21961 9.89461C8.03207 10.0821 7.77772 10.1875 7.51250 10.1875C7.24728 10.1875 6.99293 10.0821 6.80539 9.89461C6.61786 9.70707 6.51250 9.45272 6.51250 9.1875Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <textarea
                placeholder="Yorum ekle..."
                className="bg-transparent outline-none placeholder:text-slate-600 text-gray-100 text-sm basis-full resize-none"
                rows={1}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <button onClick={handleCommentSubmit} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  fill="none"
                  className="text-slate-500 hover:text-gray-100"
                >
                  <path
                    d="M0.5 10.6875H7.5V4.6875H4.5V6.6875H5.5V8.6875H2.5V2.6875H7.5V0.6875H0.5V10.6875Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M9.5 0.6875H11.5V10.6875H9.5V0.6875Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.5 2.6875V0.6875H13.5V10.6875H15.5V6.6875H18.5V4.6875H15.5V2.6875H19.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={handleCommentSubmit}
            className={`gradient-border gradient-bg-slate-700 hover:gradient-bg-2-hover !px-4 !py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap shadow shadow-slate-910 ${
              commentText.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={commentText.trim() === ""}
          >
            Yorum Yap
          </button>
        </div>
      </div>

      {/* Video Detay Modalı - Updated */}
      {isVideoModalOpen && (
        <div
          className="vfm fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-90 p-4 sm:p-6 lg:p-8"
          onClick={(e) => {
            // Modal arka planına tıklanırsa kapat
            if (e.target === e.currentTarget) {
              closeVideoModal();
            }
          }}
        >
          {/* Modal içeriği kapsayıcısı */}
          <div
            className={`vfm__content vfm--outline-none qr-modal-content confirm-modal-content rounded-lg ${gradientBgClasses} w-full h-full max-w-full max-h-full
                       sm:max-w-4xl sm:max-h-[90vh]
                       lg:max-w-6xl lg:max-h-[90vh]`}
            tabIndex={0}
            ref={modalContentRef}
          >
            <div className="confirm-modal-body relative h-full">
              {/* Kapatma butonu */}
              <button
                onClick={closeVideoModal}
                className="absolute top-6 right-4 z-20 text-slate-500 hover:text-gray-100 w-6 h-6"
                aria-label="Kapat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-6 h-6"
                >
                  <path
                    d="M15.88 5.88461C16.3681 5.39659 16.3681 4.60404 15.88 4.11602C15.392 3.62799 14.5995 3.62799 14.1114 4.11602L10.0003 8.23102L5.88534 4.11992C5.39732 3.6319 4.60477 3.6319 4.11675 4.11992C3.62873 4.60794 3.62873 5.40049 4.11675 5.88851L8.23175 9.99961L4.12065 14.1146C3.63263 14.6026 3.63263 15.3952 4.12065 15.8832C4.60868 16.3712 5.40122 16.3712 5.88924 15.8832L10.0003 11.7682L14.1153 15.8793C14.6034 16.3673 15.3959 16.3673 15.8839 15.8793C16.372 15.3913 16.372 14.5987 15.8839 14.1107L11.7689 9.99961L15.88 5.88461Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>

              {/* Ana Grid Yapısı */}
              <div
                className={`grid grid-cols-1 rounded-lg overflow-hidden ${gradientBorderClasses} ${gradientBgClasses} max-w-full h-[740px] max-h-full md:grid-cols-[2fr_1fr]`}
              >
                {/* Video Oynatıcı Alanı */}
                <div className="relative w-full flex flex-col items-center justify-center p-4">
                  <iframe
                    src={videoUrl}
                    frameBorder={0}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Sağ Taraf - Kullanıcı Bilgisi, Yorumlar/Diğer Videolar ve Yorum Input */}
                <div className="flex flex-col relative">
                  <div className="flex flex-col gap-4 p-4">
                    {/* User Info (Modal içi) */}
                    <div className="flex gap-3">
                      <div className={getUserAvatarClasses()}>
                        {userAvatar ? (
                          <img
                            src={userAvatar}
                            alt={username}
                            className="w-full h-full rounded-full object-cover z-10"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-purple-500 flex justify-center items-center z-10">
                            <span className="text-white font-bold text-xl uppercase">
                              {username.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-white">{username}</p>
                        <p className="text-xs text-slate-400">{uploadTime}</p>
                      </div>
                    </div>
                    {/* Video Description */}
                    <p className="text-sm text-gray-100 mt-2">{description}</p>
                  </div>

                  {/* Tabs: Yorumlar / Tüm Videoları */}
                  <div className="flex items-center w-full text-center border-b border-slate-700">
                    <div
                      className={`px-4 py-2 text-sm text-slate-400 hover:text-gray-100 w-1/2 cursor-pointer
                      ${
                        activeTab === "comments"
                          ? "!text-slate-100 font-medium border-b border-tred-600"
                          : ""
                      }`}
                      onClick={() => setActiveTab("comments")}
                    >
                      Yorumlar
                    </div>
                    <div
                      className={`px-4 py-2 text-sm text-slate-400 hover:text-gray-100 w-1/2 cursor-pointer
                      ${
                        activeTab === "all-videos"
                          ? "!text-slate-100 font-medium border-b border-tred-600"
                          : ""
                      }`}
                      onClick={() => setActiveTab("all-videos")}
                    >
                      Tüm Videoları
                    </div>
                  </div>

                  {/* Tab İçerikleri */}
                  <div className="basis-0 p-4 overflow-auto flex-1 no-scrollbar">
                    {activeTab === "comments" && (
                      <div>
                        {/* Buraya yorum listesi gelecek */}Yorumlar burada
                        listelenecek...
                      </div>
                    )}
                    {activeTab === "all-videos" && (
                      <div>
                        {/* Buraya tüm videolar listesi gelecek */}Tüm videolar
                        burada listelenecek...
                      </div>
                    )}
                  </div>

                  {/* Yorum Yapma Alanı (Modal İçi) */}
                  <div className="p-4">
                    <div className="flex flex-col gap-3 mt-auto relative pt-4 border-t border-slate-700">
                      <div className="flex flex-row justify-between items-center gap-2 relative">
                        <div className="flex items-center gap-2 w-full border border-slate-700 px-4 py-2 bg-black/20 rounded-full h-full">
                          <button type="button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              className="text-slate-500 hover:text-gray-100"
                            >
                              <path
                                d="M10 18.6875C12.1217 18.6875 14.1566 17.8446 15.6569 16.3444C17.1571 14.8441 18 12.8092 18 10.6875C18 8.56577 17.1571 6.53094 15.6569 5.03065C14.1566 3.53035 12.1217 2.6875 10 2.6875C7.87827 2.6875 5.84344 3.53035 4.34315 5.03065C2.84285 6.53094 2 8.56577 2 10.6875C2 12.8092 2.84285 14.8441 4.34315 16.3444C5.84344 17.8446 7.87827 18.6875 10 18.6875ZM7.12813 12.8594C7.6875 13.5063 8.64375 14.1875 10 14.1875C11.3562 14.1875 12.3125 13.5063 12.8719 12.8594C13.0531 12.65 13.3687 12.6281 13.5781 12.8094C13.7875 12.9906 13.8094 13.3062 13.6281 13.5156C12.9313 14.3156 11.7219 15.1875 10 15.1875C8.27812 15.1875 7.06875 14.3156 6.37187 13.5156C6.19062 13.3062 6.21250 12.9906 6.42188 12.8094C6.63125 12.6281 6.94688 12.65 7.12813 12.8594ZM6.5125 9.1875C6.5125 8.92228 6.61786 8.66793 6.80539 8.48039C6.99293 8.29286 7.24728 8.1875 7.5125 8.1875C7.77772 8.1875 8.03207 8.29286 8.21961 8.48039C8.40714 8.66793 8.51250 8.92228 8.51250 9.1875C8.51250 9.45272 8.40714 9.70707 8.21961 9.89461C8.03207 10.0821 7.77772 10.1875 7.51250 10.1875C7.24728 10.1875 6.99293 10.0821 6.80539 9.89461C6.61786 9.70707 6.51250 9.45272 6.51250 9.1875Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                          <textarea
                            placeholder="Yorum ekle..."
                            className="bg-transparent outline-none placeholder:text-slate-600 text-gray-100 text-sm basis-full resize-none"
                            rows={1}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          ></textarea>
                          <button onClick={handleCommentSubmit} type="button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="11"
                              viewBox="0 0 20 11"
                              fill="none"
                              className="text-slate-500 hover:text-gray-100"
                            >
                              <path
                                d="M0.5 10.6875H7.5V4.6875H4.5V6.6875H5.5V8.6875H2.5V2.6875H7.5V0.6875H0.5V10.6875Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M9.5 0.6875H11.5V10.6875H9.5V0.6875Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M19.5 2.6875V0.6875H13.5V10.6875H15.5V6.6875H18.5V4.6875H15.5V2.6875H19.5Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleCommentSubmit}
                        className={`gradient-border gradient-bg-slate-700 hover:gradient-bg-2-hover !px-4 !py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap shadow shadow-slate-910 ${
                          commentText.trim() === ""
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={commentText.trim() === ""}
                      >
                        Yorum Yap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetayCard;
