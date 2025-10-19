import { useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ useNavigate için react-router-dom
import api from "../../utils/axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { AxiosError } from "axios"; // ✅ Type için

// Modal bileşeni
const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    onClose();
    navigate("/signin");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          🎉 Kayıt Başarılı!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Hesabınız başarıyla oluşturuldu. Giriş yaparak devam edebilirsiniz.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
          >
            Kapat
          </button>
          <button
            onClick={handleRedirect}
            className="px-4 py-2 text-sm rounded bg-brand-500 text-white hover:bg-brand-600"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

interface FormDataType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode: string;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isChecked) {
      setErrorMsg("Lütfen şartları kabul edin.");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);

      if (res.data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.data.message || "Kayıt başarısız");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      console.error(axiosErr);
      setErrorMsg(
        axiosErr.response?.data?.message || "Sunucu hatası. Tekrar deneyin."
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Ana Menüye Dön
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Kayıt Ol
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Kaydolmak için bilgilerinizi doldurun!
        </p>

        {errorMsg && (
          <div className="mt-4 p-3 rounded text-sm bg-red-100 text-red-600 border border-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <InputBlock label="Kullanıcı Adı" required name="username" value={formData.username} onChange={handleChange} />
          <InputBlock label="Ad" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputBlock label="Soyad" name="lastName" value={formData.lastName} onChange={handleChange} />
          <InputBlock label="Email" required type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputBlock label="Referans Kodu (Varsa)" name="referralCode" value={formData.referralCode} onChange={handleChange} />

          {/* Şifre */}
          <div>
            <Label>
              Şifre<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi Giriniz"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="size-5 fill-gray-500" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500" />
                )}
              </span>
            </div>
          </div>

          {/* Şartlar */}
          <div className="flex items-start gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hesap oluşturarak{" "}
              <span className="text-gray-800 dark:text-white font-medium">
                Şartlar ve Gizlilik Politikasını
              </span>{" "}
              kabul etmiş olursunuz.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          Zaten hesabınız var mı?{" "}
          <Link to="/signin" className="text-brand-500 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🔧 Tekrarlayan inputlar için yardımcı bileşen
interface InputBlockProps {
  label: string;
  name: keyof FormDataType;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputBlock = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: InputBlockProps) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-error-500">*</span>}
    </Label>
    <Input
      type={type}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  </div>
);
