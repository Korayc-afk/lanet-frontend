import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "/api-uploads";

type MainCard = {
  id: number;
  href: string;
  imageSrc: string;
  logoSrc: string;
  badgeText: string;
  order: number;
  isActive: boolean;
};

export default function MainCardManagerCard() {
  const [cards, setCards] = useState<MainCard[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingCard, setEditingCard] = useState<MainCard | null>(null);

  const [formState, setFormState] = useState({
    href: "",
    badgeText: "",
    order: 0,
    isActive: true,
  });
  


  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get("/api/maincards");
      if (res.data.success) setCards(res.data.data);
    } catch {
      setErrors(["Kartlar yüklenirken hata oluştu"]);
    }
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      await axios.put(`/api/maincards/${id}`, { isActive: !current });
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c))
      );
      toast.success("Durum güncellendi");
    } catch {
      toast.error("Durum güncellenemedi");
    }
  };

  const deleteCard = async (id: number) => {
    if (!confirm("Kartı silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`/api/maincards/${id}`);
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.success("Kart silindi");
    } catch {
      toast.error("Silme işlemi başarısız");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      if (name === "imageFile") setImageFile(files[0]);
      if (name === "logoFile") setLogoFile(files[0]);
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleEdit = (card: MainCard) => {
    setEditingCard(card);
    setFormState({
      href: card.href,
      badgeText: card.badgeText,
      order: card.order,
      isActive: card.isActive,
    });
    setImageFile(null);
    setLogoFile(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!formState.href) {
      setErrors(["Lütfen URL girin"]);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("href", formState.href);
      formData.append("badgeText", formState.badgeText);
      formData.append("order", String(formState.order));
      formData.append("isActive", String(formState.isActive));
      if (imageFile) formData.append("imageFile", imageFile);
      if (logoFile) formData.append("logoFile", logoFile);

      if (editingCard) {
        const res = await axios.put(`/api/maincards/${editingCard.id}`, formData);
        if (res.data.success) {
          toast.success("Kart güncellendi");
          fetchCards();
          setEditingCard(null);
        }
      } else {
        const res = await axios.post("/api/maincards", formData);
        if (res.data.success) {
          toast.success("Kart eklendi");
          setCards((prev) => [...prev, res.data.data]);
        }
      }

      setFormState({ href: "", badgeText: "", order: 0, isActive: true });
      setImageFile(null);
      setLogoFile(null);
    } catch {
      toast.error("İşlem başarısız oldu");
    }
  };

  const handleOrderChange = async (id: number, newOrder: number) => {
    try {
      await axios.put(`/api/maincards/${id}`, { order: newOrder });
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, order: newOrder } : c))
      );
    } catch {
      toast.error("Sıra güncellenemedi");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full max-w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">🃏 Main Card Yönetimi</h2>

      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-6 max-w-5xl mx-auto">
          {errors.map((err, i) => (
            <div key={i}>⚠️ {err}</div>
          ))}
        </div>
      )}

      {/* Kart Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        {cards
          .sort((a, b) => a.order - b.order)
          .map((card) => (
            <div
              key={card.id}
              className="flex flex-col justify-between p-4 border rounded-lg bg-white shadow"
            >
              <img
                src={`${BASE_URL}${card.imageSrc}`}
                alt="main card"
                className="w-full h-48 object-contain border rounded mb-4"
              />
              <img
                src={`${BASE_URL}${card.logoSrc}`}
                alt="logo"
                className="w-20 h-20 object-contain mb-4 self-center mx-auto"
              />

              <div className="mb-4">
                <a
                  href={card.href}
                  target="_blank"
                  className="text-blue-600 hover:underline break-words"
                  rel="noreferrer"
                >
                  {card.href}
                </a>
                <p className="text-sm text-gray-700 mt-1">{card.badgeText}</p>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm">
                <span className={card.isActive ? "text-green-600" : "text-red-500"}>
                  {card.isActive ? "Aktif" : "Pasif"}
                </span>
                <button onClick={() => toggleActive(card.id, card.isActive)} className="underline">
                  Durum Değiştir
                </button>
                <button onClick={() => deleteCard(card.id)} className="text-red-600 underline">
                  Sil
                </button>
                <button
                  onClick={() => handleEdit(card)}
                  className="text-yellow-600 underline"
                >
                  Güncelle
                </button>
              </div>

              <div className="mt-4">
                <label className="text-sm block mb-1">Sıra (order):</label>
                <input
                  type="number"
                  value={card.order}
                  min={0}
                  onChange={(e) => handleOrderChange(card.id, Number(e.target.value))}
                  className="w-full border rounded p-1 text-sm"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Ekleme / Güncelleme Formu */}
      <form
        onSubmit={handleFormSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4"
        encType="multipart/form-data"
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingCard ? "Kartı Güncelle" : "Yeni Main Card Ekle"}
        </h3>

        <input
          type="text"
          name="href"
          placeholder="URL (href)"
          value={formState.href}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Image Preview"
            className="w-24 h-auto mb-2 rounded border"
          />
        )}

        <input
          type="file"
          name="logoFile"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {logoFile && (
          <img
            src={URL.createObjectURL(logoFile)}
            alt="Logo Preview"
            className="w-24 h-auto mb-4 rounded border"
          />
        )}

        <input
          type="text"
          name="badgeText"
          placeholder="Rozet Yazısı (badgeText)"
          value={formState.badgeText}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="order"
          placeholder="Sıra (order)"
          value={formState.order}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          min={0}
        />

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formState.isActive}
            onChange={handleInputChange}
          />
          Aktif mi?
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {editingCard ? "Güncelle" : "Ekle"}
        </button>
      </form>
    </div>
  );
}