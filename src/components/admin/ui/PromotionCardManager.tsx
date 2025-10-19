import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "/api-uploads";

interface PromotionCard {
  id: number;
  type: string;
  title: string;
  description: string;
  image: string;
  modalTitle: string;
  modalDescription: string;
  modalImage: string;
  promotionLink?: string;
  order: number;
  isActive: boolean;
}

export default function PromotionCardManager() {
  const [cards, setCards] = useState<PromotionCard[]>([]);
  const [editCard, setEditCard] = useState<PromotionCard | null>(null);

  const [formData, setFormData] = useState({
    type: "BONUS",
    title: "",
    description: "",
    modalTitle: "",
    modalDescription: "",
    promotionLink: "",
    order: 0,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalImageFile, setModalImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/promotion-cards`);
      if (res.data.success) setCards(res.data.data);
    } catch (err) {
      console.error("Kartlar alınamadı", err);
      toast.error("Kartlar alınamadı");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      if (name === "image") setImageFile(files[0]);
      if (name === "modalImage") setModalImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !editCard) {
      return toast.error("Ana görsel seçilmedi!");
    }

    if (!modalImageFile && !editCard) {
      return toast.error("Modal görsel seçilmedi!");
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) =>
        data.append(key, String(val))
      );
      if (imageFile) data.append("image", imageFile);
      if (modalImageFile) data.append("modalImage", modalImageFile);

      if (editCard) {
        // Güncelleme
        const res = await axios.put(
          `${BASE_URL}/api/promotion-cards/${editCard.id}`,
          data
        );
        if (res.data.success) {
          toast.success("Kart güncellendi!");
        }
      } else {
        // Ekleme
        const res = await axios.post(`${BASE_URL}/api/promotion-cards`, data);
        if (res.data.success) {
          toast.success("Yeni kart eklendi!");
        }
      }

      fetchCards();
      resetForm();
    } catch (err) {
      console.error("Hata:", err);
      toast.error("Bir hata oluştu!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu kart silinsin mi?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/promotion-cards/${id}`);
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.success("Kart silindi!");
    } catch (err) {
      console.error("Silme hatası:", err);
      toast.error("Kart silinemedi!");
    }
  };

  const handleEdit = (card: PromotionCard) => {
    setEditCard(card);
    setFormData({
      type: card.type,
      title: card.title,
      description: card.description,
      modalTitle: card.modalTitle,
      modalDescription: card.modalDescription,
      promotionLink: card.promotionLink || "",
      order: card.order,
      isActive: card.isActive,
    });
    setImageFile(null);
    setModalImageFile(null);
    toast("Kart düzenleniyor...");
  };

  const resetForm = () => {
    setFormData({
      type: "BONUS",
      title: "",
      description: "",
      modalTitle: "",
      modalDescription: "",
      promotionLink: "",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setModalImageFile(null);
    setEditCard(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Toaster />
      <h2 className="text-3xl font-bold mb-8 text-center">
        🎁 Bonus Kart Yönetimi
      </h2>

      {/* Kart Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-4 rounded shadow">
            <img
              src={`${BASE_URL}${card.image}`}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <img
              src={`${BASE_URL}${card.modalImage}`}
              className="w-full h-20 object-cover rounded mb-2"
            />
            <h4 className="font-semibold">{card.title}</h4>
            <p className="text-sm text-gray-600">{card.description}</p>
            <p className="text-xs text-gray-500">
              Tür: {card.type} | Sıra: {card.order}
            </p>
            <div className="flex justify-between items-center mt-3 text-sm">
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
          {editCard ? "✏️ Kartı Güncelle" : "➕ Yeni Bonus Kart"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Başlık"
            value={formData.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Açıklama"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="modalTitle"
            placeholder="Modal Başlık"
            value={formData.modalTitle}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="modalDescription"
            placeholder="Modal Açıklama"
            value={formData.modalDescription}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="promotionLink"
            placeholder="Promosyon Linki"
            value={formData.promotionLink}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="BONUS">BONUS</option>
            <option value="MINI">DENEME</option>
          </select>
          <input
            type="number"
            name="order"
            placeholder="Sıra"
            value={formData.order}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Görsel Seçim */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              📷 Ana Görsel
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
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              🖼️ Modal Görsel
            </label>
            <input
              type="file"
              name="modalImage"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {modalImageFile && (
              <img
                src={URL.createObjectURL(modalImageFile)}
                className="w-32 mt-2 rounded"
              />
            )}
          </div>
        </div>

        {/* Aktiflik */}
        <label className="inline-flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
          Aktif mi?
        </label>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {editCard ? "Güncelle" : "Kaydet"}
          </button>
          {editCard && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-gray-400 text-white p-3 rounded hover:bg-gray-500"
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
