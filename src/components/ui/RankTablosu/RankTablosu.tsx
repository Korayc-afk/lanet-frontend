import React from "react";

type User = {
  id: number;
  username: string;
  avatar?: string | null;
  points: number;
  fallback: string;
  bgColor: string; // arka plan rengi için Tailwind sınıfı (ör: "bg-indigo-500")
};

const users: User[] = [
  {
    id: 1,
    username: "erol8787",
    avatar:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/7pd4WYGaeHOwaoWagK8w1.jpg",
    points: 299523,
    fallback: "E",
    bgColor: "bg-indigo-500",
  },
  {
    id: 2,
    username: "garagablo",
    avatar: null,
    points: 266292,
    fallback: "G",
    bgColor: "bg-orange-500",
  },
  {
    id: 3,
    username: "levobey",
    avatar:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/pRhwo4UPYfyFybn6r-Kne.jpg",
    points: 245537,
    fallback: "L",
    bgColor: "bg-purple-500",
  },
  {
    id: 4,
    username: "hankmoody10",
    avatar:
      "https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/RRpip7KAZHNnHcDQSkrXF.png",
    points: 178129,
    fallback: "H",
    bgColor: "bg-red-500",
  },
  {
    id: 5,
    username: "justberlin",
    avatar: null,
    points: 171348,
    fallback: "J",
    bgColor: "bg-blue-500",
  },
  {
    id: 6,
    username: "ceko",
    avatar: null,
    points: 167989,
    fallback: "C",
    bgColor: "bg-purple-500",
  },
  {
    id: 7,
    username: "zeynel1940",
    avatar: null,
    points: 157070,
    fallback: "Z",
    bgColor: "bg-red-500",
  },
  {
    id: 8,
    username: "saban003",
    avatar: null,
    points: 152398,
    fallback: "S",
    bgColor: "bg-blue-500",
  },
  {
    id: 9,
    username: "ceaser9",
    avatar: null,
    points: 147516,
    fallback: "C",
    bgColor: "bg-purple-500",
  },
  {
    id: 10,
    username: "sagnakm",
    avatar: null,
    points: 128100,
    fallback: "S",
    bgColor: "bg-blue-500",
  },
];

const RankTablosu: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden mb-6 -mt-8">
      <table className="w-full relative z-10">
        <thead className="bg-gray-800 border-b border-gray-700 rounded-t-xl">
          <tr className="text-gray-500 uppercase text-xs font-medium">
            <th className="rounded-tl-xl px-1 py-3 text-center">Sıra</th>
            <th className="px-6 py-3 text-left">Kullanıcı</th>
            <th className="rounded-tr-xl px-6 py-3 text-right">Puan</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="text-center text-slate-500 text-sm font-bold hover:bg-gray-700 transition-colors"
            >
              <td className="align-middle text-center px-1 py-3">
                <div className="flex justify-center items-center">{index + 1}</div>
              </td>
              <td className="px-6 py-3 text-left">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-12 h-12 flex rounded-full justify-center items-center ${user.bgColor} text-white text-xl font-semibold leading-relaxed capitalize`}
                    style={{ minWidth: "3rem", minHeight: "3rem" }}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.fallback
                    )}
                  </div>
                  {user.username}
                </div>
              </td>
              <td className="px-6 py-3 text-right font-bold">{user.points.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankTablosu;
