import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Toast mesajları için
import { useAuth } from "../../context/AuthContext"; // useAuth hook'unuzun yolu

// 🎉 AuthContext'teki User interface'inin birebir aynısı (sadece bu alanlar var)

// Bu, formda kullanılacak tüm alanları içerir.
// AuthContext'teki User'dan farklı olarak, formda şifre alanları da bulunur.
interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  telegram: string;
  level: number;
  password?: string; // Mevcut şifre (opsiyonel olabilir, sadece form için)
  newPassword?: string;
  confirmNewPassword?: string;
  referralCode: string;
  joinedReferralOwner: string;
  isEmailVerified?: boolean; // 🔹 Ekle
  isPhoneVerified?: boolean; // 🔹 Ekl
}

// Dummy user (FormData interface'i ile uyumlu)
// AuthContext'ten gelmeyen alanları burada da varsayılan olarak tanımlamadık, çünkü görünmeyecekler.
const dummyUser: FormData = {
  username: "koraykoray",
  firstName: "Koray",
  lastName: "Demir",
  email: "dummy@example.com",
  phone: "0543 767 83 92",
  telegram: "ekremabi_user_123",
  level: 1,
  referralCode: "ABCD1234",
  joinedReferralOwner: "AdminUser",
};

export default function UserProfileScreen() {
  const { user, refreshUser } = useAuth(); // AuthContext'ten user ve refreshUser'ı al

  // formData state'i artık direkt User tipinden değil, FormData tipinden türetildi
  const [formData, setFormData] = useState<FormData>(dummyUser);
  const [, setValidationError] = useState<string | null>(null);

  // `user` objesi değiştiğinde `formData`'yı doldur
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        telegram: user.telegram || "",
        level: user.level || 0, // Level number olduğu için varsayılan 0
        referralCode: user.referralCode || "",
        joinedReferralOwner: user.joinedReferralOwner || "",
        // Şifre alanlarını sıfırla (bunlar User interface'inde yok)
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [user]); // user objesi bağımlılık olarak eklendi

  // Input değişikliklerini yönet
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form gönderildiğinde
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null); // Her gönderimde hata mesajını temizle

    const token = localStorage.getItem("token");
    console.log("📦 [UserProfileScreen] localStorage token:", token); // ← buraya

    if (!token) {
      toast.error("Giriş yapılmamış veya token yok.");
      return;
    }

    // Şifre doğrulama
    if (formData.newPassword || formData.password) {
      // Yeni şifre veya mevcut şifre alanı doluysa
      if (
        !formData.password ||
        !formData.newPassword ||
        !formData.confirmNewPassword
      ) {
        setValidationError(
          "Şifre değişimi için tüm şifre alanları doldurulmalıdır."
        );
        toast.error("Şifre değişimi için tüm şifre alanları doldurulmalıdır.");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setValidationError("Yeni şifreler uyuşmuyor!");
        toast.error("Yeni şifreler uyuşmuyor!");
        return;
      }
      if (formData.newPassword.length < 8) {
        // Minimum şifre uzunluğu
        setValidationError("Yeni şifre en az 8 karakter olmalıdır.");
        toast.error("Yeni şifre en az 8 karakter olmalıdır.");
        return;
      }
    }

    try {
      // 📌 Profil bilgilerini güncelle API çağrısı
      const profileUpdatePayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        telegram: formData.telegram,
        // Yalnızca AuthContext User'da ve schema'da olan alanları gönderin
        // avatarUrl, bio, ekoCoin, isEmailVerified, isPhoneVerified, sosyal medya, adres bilgileri
        // AuthContext User'da olmadığı için burada GÖNDERİLMEZ.
      };

      const res = await fetch(`/api/users/${user!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileUpdatePayload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend'den gelen hata mesajını kullan
        setValidationError(data.message || "Profil güncelleme başarısız.");
        toast.error(data.message || "Güncelleme başarısız.");
        return;
      }

      toast.success("✅ Bilgiler güncellendi.");

      // 📌 Şifre güncelle (opsiyonel)
      if (formData.password && formData.newPassword) {
        const passRes = await fetch(
          `/api/users/${user!.id}/password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword: formData.password,
              newPassword: formData.newPassword,
            }),
          }
        );

        const passData = await passRes.json();

        if (!passRes.ok) {
          setValidationError(
            `Şifre değiştirilemedi: ${passData.message || "Hata oluştu."}`
          );
          toast.error(
            `Şifre değiştirilemedi: ${passData.message || "Hata oluştu."}`
          );
        } else {
          toast.success("🔐 Şifre değiştirildi!");
          setFormData((prev) => ({
            ...prev,
            password: "",
            newPassword: "",
            confirmNewPassword: "",
          }));
        }
      }

      // Tüm işlemler başarılı olduktan sonra AuthContext'teki user objesini yenile
      await refreshUser(); // AuthContext'ten user'ın en güncel halini çeker
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Bilinmeyen hata.";
      console.error("Hata:", errorMessage);
      toast.error("❌ Bir hata oluştu: " + errorMessage);
    }
  };

  const getInitials = () => {
    // formData.firstName ve lastName string olduğu için direkt kullanabiliriz
    const first = formData.firstName.charAt(0) || "";
    const last = formData.lastName.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  // Eğer user objesi henüz yüklenmediyse veya null ise yükleniyor mesajı göster
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-lg">
          Profil bilgileri yükleniyor veya oturum açılmamış...
        </p>
      </div>
    );
  }

  // Profil Sayfası JSX'i (Verdiğin EkremAbi tasarımına göre, sade ve HTML elementleriyle)
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-4xl mx-auto mt-8">
      {/* Profil Başlığı ve Kullanıcı Bilgileri */}
      <div className="flex items-center gap-4 mb-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {getInitials()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Seviye {formData.level}
            </p>
          </div>
        </div>
        <div className="text-sm text-right text-gray-600 dark:text-gray-300">
          Kullanıcı Adı:{" "}
          <span className="font-semibold">{formData.username}</span>
        </div>
      </div>

      {/* Ana Form Alanı */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ad ve Soyad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Ad
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Soyad
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Email, Telefon, Telegram */}
        {/* Bu alanlar için dinamik oluşturma yerine doğrudan yazma, sadeleştirme isteğine daha uygun */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            // isEmailVerified doğrudan formData içinde.
            // NOT: isEmailVerified AuthContext'teki User interface'inde yok, bu yüzden burada bir hata alabilirsin.
            // Eğer bu alan backend'den gelmiyorsa, bu satırı kaldırmalısın.
            disabled={formData.isEmailVerified} // frontend'de varsa kullan
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              formData.isEmailVerified ? "cursor-not-allowed opacity-70" : ""
            }`}
          />
          {formData.isEmailVerified && ( // frontend'de varsa kullan
            <p className="text-green-500 text-xs mt-1">
              E-posta adresiniz doğrulandı.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            // isPhoneVerified doğrudan formData içinde.
            // NOT: isPhoneVerified AuthContext'teki User interface'inde yok, bu yüzden burada bir hata alabilirsin.
            // Eğer bu alan backend'den gelmiyorsa, bu satırı kaldırmalısın.
            disabled={formData.isPhoneVerified} // frontend'de varsa kullan
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              formData.isPhoneVerified ? "cursor-not-allowed opacity-70" : ""
            }`}
          />
          {formData.isPhoneVerified && ( // frontend'de varsa kullan
            <p className="text-green-500 text-xs mt-1">
              Telefon numaranız doğrulandı.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telegram"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Telegram
          </label>
          <input
            id="telegram"
            name="telegram"
            type="text"
            value={formData.telegram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Şifre Alanları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Yeni Şifre
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={formData.newPassword || ""} // undefined kontrolü
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Yeni Şifre (Tekrar)
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword || ""} // undefined kontrolü
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mevcut Şifre
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password || ""} // undefined kontrolü
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Referans Bilgileri */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Referans Bilgilerin
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Referans Kodun:</strong> {formData.referralCode || "-"}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Sahibi:</strong> {formData.joinedReferralOwner || "-"}
          </p>
        </div>

        <div className="pt-4 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
