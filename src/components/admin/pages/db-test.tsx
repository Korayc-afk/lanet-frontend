import { useEffect, useState } from "react";

const DBTest = () => {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const checkDB = async () => {
      try {
        const res = await fetch("/api/db-test");
        if (res.ok) {
          setStatus("ok");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Hata:", error);
        setStatus("error");
      }
    };

    checkDB();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Database Bağlantı Testi</h1>
      {status === "loading" && (
        <p className="text-blue-500">⏳ Test ediliyor...</p>
      )}
      {status === "ok" && (
        <p className="text-green-600 text-xl">✅ DB bağlantısı OK!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-xl">❌ DB bağlantısı HATALI!</p>
      )}
    </div>
  );
};

export default DBTest;
