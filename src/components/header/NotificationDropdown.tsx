import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { BellIcon, XCircleIcon } from "@heroicons/react/24/solid";

// Backend ile uyumlu Notification tipi
interface Notification {
  id: number;
  title: string;
  message: string;
  targetUserId: number | null;
  isRead: boolean;
  createdAt: string;
  user?: { id: number; username: string }; // Admin bilgisi
}

const DUMMY_USER_ID = 1; // Test için, production'da gerçek kullanıcı ID'siyle değiştir

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Notification[]>(
        `/api/notifications/user/${DUMMY_USER_ID}`
      );
      setNotifications(response.data);
      setUnreadCount(response.data.filter((n) => !n.isRead).length);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(
        "Bildirimler çekilirken hata:",
        error.response?.data?.message
      );
      setError(error.response?.data?.message || "Bildirimler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      await axios.put(
        `/api/notifications/${notificationId}/read`
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(
        `Bildirim (ID: ${notificationId}) okundu olarak işaretlenirken hata:`,
        error.response?.data?.message
      );
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    try {
      await Promise.all(
        unreadIds.map((id) =>
          axios.put(`/api/notifications/${id}/read`)
        )
      );
      await fetchNotifications();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(
        "Tüm bildirimler okundu olarak işaretlenirken hata:",
        error.response?.data?.message
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleDropdown = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (unreadCount > 0) {
      await fetchNotifications();
    }

    setIsOpen(true);
  };

  return (
    <div className="relative ">
      {/* Bildirim simgesi */}
      <button
        type="button"
        className="relative flex items-center justify-center text-gray-900 transition-colors rounded-full h-11 w-11 hover:bg-gray-100 bg-gray-50/50 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation(); // 🔒 dışa tıklama ile çakışmayı engeller
          toggleDropdown(); // ✅ sadece kendi içinde toggle eder
        }}
      >
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
          </span>
        )}
        <BellIcon className="w-5 h-5" />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="-ml-16 absolute mt-2 w-80 max-w-[90vw] rounded-lg border border-gray-200 bg-white p-3 shadow-lg !right-auto !left-1/2 !-translate-x-1/2"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h5 className="text-lg font-semibold text-white">
            Bildirimler ({unreadCount})
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>

        <ul className="max-h-90 overflow-y-auto">
          {loading ? (
            <li className="text-center text-gray-500 py-2">Yükleniyor...</li>
          ) : error ? (
            <li className="text-center text-red-500 py-2">{error}</li>
          ) : notifications.length === 0 ? (
            <li className="text-center text-gray-500 py-2">
              Henüz bildirim yok.
            </li>
          ) : (
            notifications.map((n) => (
              <DropdownItem
                key={n.id}
                onItemClick={() => markNotificationAsRead(n.id)}
                className={`flex items-start gap-2 p-3 rounded-md transition-colors duration-150 ${
                  n.isRead
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate text-gray-200">{n.title}</div>
                  <div className="text-xs text-gray-300 group-hover:text-gray-300 truncate">
                    {n.message}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              </DropdownItem>
            ))
          )}
        </ul>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="w-full mt-2 px-3 py-1.5 text-sm text-center text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Tümünü Okundu Olarak İşaretle
          </button>
        )}
      </Dropdown>
    </div>
  );
}
