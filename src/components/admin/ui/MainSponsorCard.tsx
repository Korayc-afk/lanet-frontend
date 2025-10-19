import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Sponsor {
  id: number;
  name: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
  logoUrl: string;
  order: number;
  isActive: boolean;
  isMain: boolean;
}

const BASE_URL = "/api-uploads";

const PREDEFINED_BACKGROUNDS = [
  { label: "🎯 Ana Bonus BG", value: "bg-1.png" },
  { label: "⚽ Spor Bonus BG", value: "bg-2.png" },
];

export default function SponsorManagerCard() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [editSponsor, setEditSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    buttonText: "",
    buttonUrl: "",
    order: 0,
    isActive: true,
    isMain: false,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedBg, setSelectedBg] = useState<string>("");

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await axios.get("/api/sponsors");
      if (res.data.success) setSponsors(res.data.data);
    } catch (err) {
      console.error("Sponsor verisi alınamadı", err);
      toast.error("Sponsorlar yüklenemedi");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      if (name === "logoFile") setLogoFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBg && !editSponsor) return toast.error("Arka plan seçin.");
    if (!logoFile && !editSponsor) return toast.error("Logo yükleyin.");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) =>
        data.append(key, String(val))
      );
      if (selectedBg) data.append("presetBg", selectedBg);
      if (logoFile) data.append("logoFile", logoFile);

      if (editSponsor) {
        const res = await axios.put(`/api/sponsors/${editSponsor.id}`, data);
        if (res.data.success) toast.success("Sponsor güncellendi!");
      } else {
        const res = await axios.post("/api/sponsors", data);
        if (res.data.success) toast.success("Sponsor eklendi!");
      }

      fetchSponsors();
      resetForm();
    } catch (err) {
      console.error("Sponsor kaydedilemedi", err);
      toast.error("Bir hata oluştu");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu sponsor silinsin mi?")) return;
    try {
      await axios.delete(`/api/sponsors/${id}`);
      setSponsors((prev) => prev.filter((s) => s.id !== id));
      toast.success("Sponsor silindi!");
    } catch (err) {
      toast.error("Silme başarısız oldu.");
    }
  };

  const setAsMainSponsor = async (id: number) => {
    try {
      await axios.patch(`/api/sponsors/${id}/set-main`);
      fetchSponsors();
      toast.success("Ana sponsor olarak atandı!");
    } catch (err) {
      toast.error("Ana sponsor atanamadı.");
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      title: sponsor.title,
      description: sponsor.description,
      buttonText: sponsor.buttonText,
      buttonUrl: sponsor.buttonUrl,
      order: sponsor.order,
      isActive: sponsor.isActive,
      isMain: sponsor.isMain,
    });
    setSelectedBg(""); // yeniden seçilsin diye
    setLogoFile(null);
    toast("Güncelleme moduna geçildi");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      description: "",
      buttonText: "",
      buttonUrl: "",
      order: 0,
      isActive: true,
      isMain: false,
    });
    setLogoFile(null);
    setSelectedBg("");
    setEditSponsor(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Toaster />
      <h2 className="text-3xl font-bold mb-8 text-center">
        🏆 Ana Sponsor Yönetimi
      </h2>

      {/* Sponsor Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {sponsors.map((s) => (
          <div key={s.id} className="border p-4 rounded bg-white shadow">
            <img
              src={`${BASE_URL}${s.imageUrl}`}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <img
              src={`${BASE_URL}${s.logoUrl}`}
              className="w-36 h-36 object-contain mb-2"
            />
            <div className="mb-2">
              <h4 className="font-semibold">{s.name}</h4>
              <p className="text-sm text-gray-600">{s.title}</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              {!s.isMain && (
                <button
                  onClick={() => setAsMainSponsor(s.id)}
                  className="text-blue-600 hover:underline"
                >
                  🥇 Ana Sponsor Yap
                </button>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(s)}
                  className="text-yellow-600 hover:underline"
                >
                  🔁 Güncelle
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Sil
                </button>
              </div>
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
          {editSponsor ? "🔁 Sponsoru Güncelle" : "➕ Yeni Sponsor Ekle"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Marka Adı"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
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
            name="buttonText"
            placeholder="Buton Yazısı"
            value={formData.buttonText}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="buttonUrl"
            placeholder="Buton Linki"
            value={formData.buttonUrl}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="order"
            placeholder="Sıra"
            value={formData.order}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>

        <textarea
          name="description"
          placeholder="Açıklama"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-4"
          rows={3}
        />

        {/* Arka Plan Seçimi */}
        <label className="block text-sm font-medium mt-4 mb-2">
          🎴 Hazır Arka Planlar
        </label>
        <div className="flex gap-6 mb-4">
          {PREDEFINED_BACKGROUNDS.map((bg) => (
            <div
              key={bg.value}
              className="cursor-pointer"
              onClick={() => setSelectedBg(bg.value)}
            >
              <img
                src={`${BASE_URL}/uploads/sponsors/${bg.value}`}
                className={`w-110 h-48 object-cover border-2 rounded shadow ${
                  selectedBg === bg.value ? "ring-4 ring-blue-500" : ""
                }`}
              />
              <p className="text-center mt-2 text-sm font-medium">{bg.label}</p>
            </div>
          ))}
        </div>

        {/* Logo */}
        <label className="block text-sm font-medium mb-1">🎯 Logo Yükle</label>
        <input
          type="file"
          name="logoFile"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        {logoFile && (
          <img
            src={URL.createObjectURL(logoFile)}
            className="w-32 h-auto rounded mb-4"
          />
        )}

        {/* Aktiflik & Ana Sponsor */}
        <div className="flex gap-6 items-center mt-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
            />{" "}
            Aktif mi?
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isMain"
              checked={formData.isMain}
              onChange={handleInputChange}
            />{" "}
            Ana Sponsor mu?
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {editSponsor ? "Güncelle" : "Kaydet"}
          </button>
          {editSponsor && (
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
