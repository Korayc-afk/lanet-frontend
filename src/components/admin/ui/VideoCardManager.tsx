import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "/api";

interface VideoCard {
  id: number;
  title: string;
  videoUrl: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

export default function VideoCardManager() {
  const [cards, setCards] = useState<VideoCard[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/videos`);
      if (res.data.success) setCards(res.data.data);
    } catch (err) {
      console.error("Video kartları alınamadı", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setImageFile(files[0]);
    } else if (name === "videoUrl") {
      setFormData((prev) => ({ ...prev, videoUrl: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) =>
      data.append(key, String(val))
    );
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingId) {
        const res = await axios.put(`${BASE_URL}/api/videos/${editingId}`, data);
        if (res.data.success) {
          toast.success("Video başarıyla güncellendi!");
        }
      } else {
        const res = await axios.post(`${BASE_URL}/api/videos`, data);
        if (res.data.success) {
          toast.success("Video başarıyla eklendi!");
        }
      }
      fetchCards();
      resetForm();
    } catch (err) {
      console.error("İşlem hatası", err);
      toast.error("İşlem sırasında hata oluştu!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu video silinsin mi?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/videos/${id}`);
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.success("Video silindi!");
    } catch (err) {
      console.error("Silme hatası:", err);
      toast.error("Silme sırasında hata oluştu!");
    }
  };

  const handleEdit = (card: VideoCard) => {
    setFormData({
      title: card.title,
      videoUrl: card.videoUrl,
      order: card.order,
      isActive: card.isActive,
    });
    setEditingId(card.id);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      videoUrl: "",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-8 text-center">🎥 Video Kart Yönetimi</h2>

      {/* Kart Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-4 rounded shadow">
            {card.imageUrl && (
              <img
                src={
                  card.imageUrl.startsWith("/uploads")
                    ? `${BASE_URL}${card.imageUrl}`
                    : card.imageUrl
                }
                className="w-full h-40 object-cover rounded mb-2"
                alt="thumbnail"
              />
            )}
            <h4 className="font-semibold">{card.title}</h4>
            <p className="text-sm text-gray-600 truncate">{card.videoUrl}</p>
            <p className="text-xs text-gray-500">
              Sıra: {card.order} | Aktif: {card.isActive ? "Evet" : "Hayır"}
            </p>
            <div className="flex justify-between mt-3 text-sm">
              <button
                onClick={() => handleEdit(card)}
                className="text-blue-600 hover:underline"
              >
                ✏️ Güncelle
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-red-600 hover:underline"
              >
                🗑️ Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-6">
          {editingId ? "✏️ Video Kartını Güncelle" : "➕ Yeni Video Kartı"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Video Başlığı"
            value={formData.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="videoUrl"
            placeholder="YouTube Linki"
            value={formData.videoUrl}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="order"
            placeholder="Sıra"
            value={formData.order === 0 ? "" : formData.order}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                order: Number(e.target.value) || 0,
              }))
            }
            className="p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Görsel <span className="text-gray-500 text-xs">(Opsiyonel)</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              className="w-32 mt-2 rounded"
              alt="preview"
            />
          )}
        </div>

        <label className="inline-flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
          Aktif mi?
        </label>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {editingId ? "Güncelle" : "Kaydet"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-300 text-gray-800 p-3 rounded hover:bg-gray-400"
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
