import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  telegram: string;
  level: number;
  referralCode: string;
  joinedReferralOwner: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void; 
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    console.log("🌐 [Auth] refreshUser çağrıldı.");

    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn("❌ refreshUser başarısız:", res.status);
        setUser(null);
        return;
      }

      const resData = await res.json();
      console.log("📦 /me yanıtı:", resData);

      if (!resData || !resData.user) {
        console.warn("⚠️ user verisi yok:", resData);
        setUser(null);
        return;
      }

      console.log("✅ Kullanıcı geldi:", resData.user);
      setUser(resData.user);
    } catch (error: any) {
      console.error("❌ refreshUser hatası:", error.message);
      setUser(null);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    refreshUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
