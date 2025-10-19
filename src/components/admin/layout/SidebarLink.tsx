import { Link, useLocation } from "react-router";

type SidebarLinkProps = {
  to: string;
  text: string;
  icon: React.ReactNode;
  minimized: boolean;
};

export default function SidebarLink({
  to,
  text,
  icon,
  minimized,
}: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative group flex items-center space-x-3 p-2 rounded transition-colors ${
        isActive
          ? "bg-gray-700 text-white"
          : "hover:bg-gray-700 text-gray-300"
      }`}
    >
      <span>{icon}</span>
      {!minimized && <span>{text}</span>}
      {minimized && (
        <span className="absolute left-full ml-2 px-2 py-1 text-sm rounded bg-gray-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
          {text}
        </span>
      )}
    </Link>
  );
}
