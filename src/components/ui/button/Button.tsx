import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;           // children zorunlu yapıldı, istersen opsiyonel de olabilir
  onClick?: () => void;
  variant?: "green" | "slate" | "red";
  bgColor?: string;
  textColor?: string;
  fullWidth?: boolean;
   size?: "sm" | "md" | "lg";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  bgColor,
  textColor,
  fullWidth = false,  
}) => {
  const baseClasses =
    "min-h-[36px] rounded-md justify-center items-center gap-2 overflow-hidden flex px-4 py-2 text-sm font-medium leading-none transition-all duration-200";

  const variantClasses = {
    green: "gradient-border2 bg-green-600 hover:bg-green-700",
    slate: "gradient-border2 bg-slate-800 hover:bg-slate-700",
    red: "gradient-border2 bg-red-600 hover:bg-red-700",
  };

  const backgroundClass = bgColor
    ? `${bgColor} hover:opacity-90`
    : variant
    ? variantClasses[variant]
    : "bg-slate-700 hover:bg-slate-600";

  const textClass = textColor ? `${textColor}` : "text-slate-100";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${backgroundClass} ${
        fullWidth ? "w-full" : "!w-auto"
      } ${textClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
