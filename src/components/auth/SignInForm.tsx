import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { toast } from "react-toastify";
import  { AxiosError } from "axios";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Email veya kullanıcı adı
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Lütfen kullanıcı adı/e-posta ve şifre girin.");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      });

      const data = res.data;

      if (data.user.role.toLowerCase() !== "user") {
        toast.error("Bu giriş ekranı sadece kullanıcılar içindir.");
        return;
      }

      login(data.token, data.user);
      toast.success("Başarıyla oturum açıldı!");
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Giriş başarısız.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
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
          Giriş Yap
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label>
              Kullanıcı adı veya Email <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Kullanıcı adı veya E-posta"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div>
            <Label>
              Şifre <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Şifrenizi Giriniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Oturumumu açık tut
              </span>
            </div>
            <Link
              to="/reset-password"
              className="text-sm text-brand-500 hover:text-brand-600"
            >
              Şifremi Unuttum
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            Oturum Aç
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
          Hesabınız yok mu?{" "}
          <Link
            to="/signup"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
