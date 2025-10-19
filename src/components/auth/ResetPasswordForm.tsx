import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "../../icons";

export default function SignInForm() {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Ana Menüye Dön
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Şifre Sıfırla <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="E-Posta Giriniz" />
                </div>
                <div className="w-full">
                  <Button size="sm" fullWidth variant="red">Kod Gönder</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
