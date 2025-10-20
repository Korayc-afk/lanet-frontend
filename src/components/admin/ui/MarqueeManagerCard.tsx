import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "/api"; // veya .env'den


type MarqueeItem = {
  [x: string]: unknown;
  id: number;
  logoUrl: string;
  linkUrl: string;
  isActive: boolean;
  order: number;
};

export default function MarqueeManagerCard() {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/marquee").then((res) => {
      if (res.data.success) setItems(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 300 || img.height !== 100) {
            setErrors(["Görsel 300x100 boyutunda olmalı."]);
            setPreviewUrl(null);
            setFile(null);
          } else {
            setPreviewUrl(URL.createObjectURL(file));
            setErrors([]);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = [];
    if (!file) validationErrors.push("Lütfen bir görsel seçin.");
    if (!link || !/^https?:\/\/|^www\./.test(link))
      validationErrors.push("Geçerli bir bağlantı girin.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("linkUrl", link);
    formData.append("order", (items.length + 1).toString());
    formData.append("isActive", "true");

    try {
      const res = await axios.post("/api/marquee", formData);
      if (res.data.success) {
        setItems((prev) => [...prev, res.data.data]);
        setFile(null);
        setLink("");
        setPreviewUrl(null);
        setErrors([]);
        toast.success("Başarıyla eklendi");
      } else {
        setErrors(["Kaydedilirken bir hata oluştu."]);
        toast.error("Ekleme başarısız");
      }
    } catch {
      setErrors(["Sunucu hatası oluştu."]);
      toast.error("Sunucu hatası");
    }
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      await axios.put(`/api/marquee/${id}`, { isActive: !current });
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !current } : item
        )
      );
      toast.success("Durum güncellendi");
    } catch {
      toast.error("Durum güncellenemedi");
    }
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) {
      deleteItem(id);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/marquee/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Silindi");
    } catch {
      toast.error("Silme başarısız");
    }
  };

  const changeOrder = async (id: number, value: number) => {
    if (value < 1) return;
    try {
      await axios.put(`/api/marquee/${id}`, { order: value });
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, order: value } : item))
      );
      toast.success("Sıra güncellendi");
    } catch {
      toast.error("Sıra güncellenemedi");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">🌀 Marquee Yönetimi</h2>

     <div className="space-y-4 mb-8">
  {items
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      return (
        <div
          key={item.id}
          className="flex flex-wrap justify-between items-center p-4 border rounded-lg bg-white shadow"
        >
          <div className="flex items-center gap-4 max-w-[70%] min-w-[250px]">
            <img
              src={`${BASE_URL}${item.imageUrl}`}
              className="w-50 h-auto border rounded"
              alt="logo"
            />
            <a
              href={item.linkUrl}
              target="_blank"
              className="text-sm text-blue-600 hover:underline break-words max-w-[calc(100%-120px)]"
              rel="noreferrer"
            >
              {item.linkUrl}
            </a>
          </div>

          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <input
              type="number"
              className="w-16 p-1 border rounded text-center"
              value={item.order}
              onChange={(e) => changeOrder(item.id, Number(e.target.value))}
              min={1}
            />

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={item.isActive}
                onChange={() => toggleActive(item.id, item.isActive)}
              />
              <div className="w-11 h-6  bg-red-500 rounded-full peer peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-0.5 text-white text-xs font-bold select-none">
                {item.isActive ? "AKTİF" : "PASİF"}
              </span>
            </label>

            <button
              onClick={() => handleDeleteClick(item.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Sil
            </button>
          </div>
        </div>
      );
    })}
</div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          {errors.length > 0 && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded space-y-1">
              {errors.map((err, i) => (
                <div key={i}>⚠️ {err}</div>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Logo Yükle (300x100)</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full border rounded p-2 mt-1"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-[150px] h-auto border rounded shadow"
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Link</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
}
