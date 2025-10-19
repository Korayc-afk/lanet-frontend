import { createContext, useContext, useEffect, useState } from "react";

interface AdminUser {
  id: number;
  username: string;
  role: "admin" | "moderator";
  email: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>(
  {} as AdminAuthContextType
);
export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      console.warn("🚫 Token bulunamadı, kullanıcı null ayarlanıyor.");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        console.warn("⚠️ /me isteği başarısız.");
        setUser(null);
      }
    } catch (err) {
      console.error("❌ refreshUser hatası:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("admin_token", token);
    await refreshUser();
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
