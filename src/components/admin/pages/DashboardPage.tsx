import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get("/api/users/count");
        setUserCount(res.data.count || 0);
      } catch (err) {
        console.error("Kullanıcı sayısı alınamadı:", err);
        setUserCount(0);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
      <p>Hoş geldiniz! Burada admin panel özet bilgilerini görebilirsiniz.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <DashboardCard title="👥 Kullanıcı Sayısı" value={userCount} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}
