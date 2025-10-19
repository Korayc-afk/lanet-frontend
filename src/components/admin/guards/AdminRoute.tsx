import { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { useAdminAuth } from "../../../context/AdminAuthContext";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { user, isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  const isAuthorized =
    isAuthenticated &&
    user &&
    ["admin", "moderator"].includes(user.role.toLowerCase()); // 👈 FIX BURASI

  if (!isAuthorized) {
    console.warn("🚫 AdminRoute engellendi:", {
      isAuthenticated,
      user,
      role: user?.role,
    });

    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
