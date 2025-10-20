import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // ✅ toast import

const BASE_URL = "/api";

type PartnerBrand = {
  id: number;
  name: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
};

export default function PartnerBrandManagerCard() {
  const [brands, setBrands] = useState<PartnerBrand[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/api/partnerbrands")
      .then((res) => {
        if (res.data.success) setBrands(res.data.data);
      })
      .catch(() => setBrands([]));
  }, []);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        setErrors([]);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = [];
    if (!name.trim()) validationErrors.push("Marka adı zorunlu.");
    if (!file) validationErrors.push("Resim seçmelisiniz.");
    if (!linkUrl.trim() || !/^https?:\/\/.+/.test(linkUrl.trim()))
      validationErrors.push("Geçerli bir link girin.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("name", name.trim());
    formData.append("linkUrl", linkUrl.trim());
    formData.append("order", (brands.length + 1).toString());
    formData.append("isActive", "true");

    try {
      const res = await axios.post("/api/partnerbrands", formData);
      if (res.data.success) {
        setBrands((prev) => [...prev, res.data.data]);
        setName("");
        setLinkUrl("");
        setFile(null);
        setErrors([]);
        toast.success("Marka eklendi ✅"); // ✅ toast
      } else {
        setErrors(["Ekleme sırasında hata oluştu."]);
      }
    } catch {
      setErrors(["Sunucu hatası oluştu."]);
    }
  };

const toggleActive = async (id: number, current: boolean) => {
  try {
    const res = await axios.put(`/api/partnerbrands/${id}`, {
      isActive: !current,
    });
    if (res.data.success) {
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isActive: !current } : b))
      );
      toast.success(`Marka ${!current ? "aktif" : "pasif"} yapıldı ✅`);
    }
  } catch {
    toast.error("Durum güncellenemedi ❌");
  }
};


  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bu markayı silmek istediğinize emin misiniz?")) {
      deleteBrand(id);
    }
  };

  const deleteBrand = async (id: number) => {
    try {
      await axios.delete(`/api/partnerbrands/${id}`);
      setBrands((prev) => prev.filter((b) => b.id !== id));
      toast.success("Marka silindi 🗑️"); // ✅ toast
    } catch {
      toast.error("Silme işlemi başarısız ❌");
    }
  };

  const changeOrder = async (id: number, value: number) => {
    if (value < 1) return;
    try {
      await axios.put(`/api/partnerbrands/${id}`, { order: value });
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, order: value } : b))
      );
    } catch {
      alert("Sıra güncellenemedi.");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <Toaster /> {/* ✅ toast render */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          🃏 Partner Brand Yönetimi
        </h2>

        {/* List */}
        <div className="space-y-4 mb-8">
          {brands
            .sort((a, b) => a.order - b.order)
            .map((brand) => (
              <div
                key={brand.id}
                className="flex flex-wrap justify-between items-center p-4 border rounded-lg bg-white shadow"
              >
                <div className="flex items-center gap-4 max-w-[70%] min-w-[550px]">
                  <img
                    src={`${BASE_URL}${brand.imageUrl}`}
                    alt={brand.name}
                    className="w-50 h-auto border rounded"
                  />
                  <a
                    href={brand.linkUrl}
                    target="_blank"
                    className="text-sm text-blue-600 hover:underline break-words max-w-[calc(100%-120px)]"
                    rel="noreferrer"
                  >
                    {brand.linkUrl}
                  </a>
                </div>

                <div className="flex items-center gap-6 mt-2 sm:mt-0">
                  <input
                    type="number"
                    className="w-16 p-1 border rounded text-center"
                    value={brand.order}
                    onChange={(e) =>
                      changeOrder(brand.id, Number(e.target.value))
                    }
                    min={1}
                  />

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={brand.isActive}
                      onChange={() => toggleActive(brand.id, brand.isActive)}
                    />
                    <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:bg-green-500 transition"></div>
                    <span className="absolute left-1 top-0.5 text-white text-xs font-bold select-none">
                      {brand.isActive ? "AKTİF" : "PASİF"}
                    </span>
                  </label>

                  <button
                    onClick={() => handleDeleteClick(brand.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          {errors.length > 0 && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded space-y-1">
              {errors.map((err, i) => (
                <div key={i}>⚠️ {err}</div>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Marka Adı</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="Marka adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Logo Yükle</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full border rounded p-2 mt-1"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Önizleme"
                className="mt-2 w-[150px] h-auto border rounded shadow"
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Link URL</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
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
