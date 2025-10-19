import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Notification {
  id: number;
  title: string;
  message: string;
  targetUserId: number | null;
  targetRole: "ADMIN" | "MODERATOR" | "USER" | null;
  isRead: boolean;
  createdAt: string;
  user?: { id: number; username: string };
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

const roles = ["ADMIN", "MODERATOR", "USER"];

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUserId, setTargetUserId] = useState<string>("");
  const [targetRole, setTargetRole] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    if (!targetUserId) {
      setUserInfo(null);
      setUserError(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/users/${targetUserId}`);
        setUserInfo(res.data);
        setUserError(null);
      } catch (error) {
        setUserInfo(null);
        setUserError("Kullanıcı bulunamadı.");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [targetUserId]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/notifications/admin");
      const data = Array.isArray(res.data) ? res.data : res.data.notifications;
      setNotifications(data ?? []);
      setError(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Bildirimleri çekerken hata:", axiosError.message);
      setError("Bildirimler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreateNotification = async () => {
    if (!title || !message) {
      toast.error("Başlık ve mesaj zorunludur.");
      return;
    }

    try {
      await axios.post("/api/notifications", {
        title,
        message,
        targetUserId: targetUserId ? parseInt(targetUserId) : null,
        targetRole,
      });
      toast.success("Bildirim başarıyla oluşturuldu.");
      setTitle("");
      setMessage("");
      setTargetUserId("");
      setTargetRole(null);
      setUserInfo(null);
      setUserError(null);
      fetchNotifications();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Bildirim oluşturulamadı:", axiosError.message);
      toast.error("Bildirim oluşturulamadı.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu bildirimi silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/api/notifications/${id}`);
      toast.success("Bildirim silindi.");
      fetchNotifications();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Bildirim silinemedi:", axiosError.message);
      toast.error("Bildirim silinemedi.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bildirim Yönetimi</h1>
      <div className="mb-6 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-2">Yeni Bildirim Oluştur</h2>

        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Mesaj"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Kullanıcı ID (isteğe bağlı)"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        {userInfo && (
          <div className="bg-green-100 p-3 rounded mb-2 text-sm text-gray-700">
            <p><strong>Kullanıcı:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Rol:</strong> {userInfo.role}</p>
          </div>
        )}
        {userError && <p className="text-red-600 mb-2">{userError}</p>}

        <select
          value={targetRole ?? ""}
          onChange={(e) => setTargetRole(e.target.value ? e.target.value : null)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Rol Seç (Opsiyonel)</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <button
          onClick={handleCreateNotification}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Bildirim Oluştur
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Gönderilen Bildirimler</h2>
        {loading && <p>Yükleniyor...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Başlık</th>
                <th className="border border-gray-300 p-2">Mesaj</th>
                <th className="border border-gray-300 p-2">Kullanıcı ID</th>
                <th className="border border-gray-300 p-2">Rol</th>
                <th className="border border-gray-300 p-2">Tarih</th>
                <th className="border border-gray-300 p-2">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id}>
                  <td className="border border-gray-300 p-2">{n.id}</td>
                  <td className="border border-gray-300 p-2">{n.title}</td>
                  <td className="border border-gray-300 p-2">{n.message}</td>
                  <td className="border border-gray-300 p-2">{n.targetUserId ?? "-"}</td>
                  <td className="border border-gray-300 p-2">{n.targetRole ?? "-"}</td>
                  <td className="border border-gray-300 p-2">{new Date(n.createdAt).toLocaleString()}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:underline">
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    Bildirim bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}