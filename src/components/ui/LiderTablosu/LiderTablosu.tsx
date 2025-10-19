import Level1 from "../../../assets/images/level/rank-1-DnIZumQM.png";
import Level2 from "../../../assets/images/level/rank-2-C7uN0b8o.png";
import Level3 from "../../../assets/images/level/rank-3-D7XgJUFj.png";

import Avatar1 from "../../../assets/images/avatar/7pd4WYGaeHOwaoWagK8w1.jpg";
import Avatar2 from "../../../assets/images/avatar/pRhwo4UPYfyFybn6r-Kne.jpg";

import rankBG from "../../../assets/images/level/ranking-bg.png";

const LeaderboardCards = () => {
  const data = [
    {
      id: 1,
      username: "Koray",
      avatar: Avatar1,
      rankImage: Level1,
      points: "999,523 P",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      fallback: "E",
    },
    {
      id: 2,
      username: "garagablo",
      avatar: Avatar2,
      rankImage: Level2,
      points: "266,292 P",
      color: "bg-gradient-to-br from-orange-400 to-pink-500",
      fallback: "G",
    },
    {
      id: 3,
      username: "levobey",
      avatar: Avatar1,
      rankImage: Level3,
      points: "245,537 P",
      color: "bg-gradient-to-br from-purple-400 to-fuchsia-500",
      fallback: "L",
    },
  ];

  // Sıralamayı 2 - 1 - 3 yapmak için sıralama dizisi
  const order = [2, 1, 3];
  // order dizisi, index’leri değil id’leri barındırıyor, onu indexe çevirelim
  const orderedData = order.map(id => data.find(u => u.id === id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-10 items-end">
      {orderedData.map((user, idx) => {
         if (!user) return null;
        // Dinamik margin-bottom değerleri:
        // Ortadaki 1. sıradakini biraz yukarı çekeceğiz (mb-10 gibi)
        // Diğerleri daha az margin
        let mbClass = "";
        if (user.id === 1) mbClass = "mb-10";  // 1. sıradaki büyük yukarıda
        else if (user.id === 2) mbClass = "mb-5";
        else if (user.id === 3) mbClass = "mb-3";

        return (
          <div
            key={user.id}
            className={`relative flex flex-col items-center justify-start rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${mbClass}`}
            style={{
              backgroundImage: `url(${rankBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Avatar */}
            <div className="relative -top-8 mt-10">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className={`w-24 h-24 rounded-full border-4 border-white ${user.color} shadow-lg`}
                />
              ) : (
                <div
                  className={`w-24 h-24 flex items-center justify-center rounded-full border-4 border-white ${user.color} text-2xl text-white font-bold shadow-lg`}
                >
                  {user.fallback}
                </div>
              )}
            </div>

            {/* Username */}
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="10"
                viewBox="0 0 37 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.976562 0.6875L18.5 8.47607L36.0234 0.6875L18.5 17.7249L0.976562 0.6875Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="18.5"
                    y1="17.7249"
                    x2="18.5"
                    y2="1.66087"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#1E1B4B" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-gray-100 text-lg font-semibold tracking-wide drop-shadow">
                {user.username}
              </span>
            </div>

            {/* Rank and Points */}
            <div className="flex flex-col items-center justify-center p-4 rounded-t-3xl mt-4">
              {user.rankImage ? (
                <img
                  src={user.rankImage}
                  alt={`Rank ${idx + 1}`}
                  className="w-16 h-16 rounded-full shadow-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-gray-600 font-medium">
                  Rank {idx + 1}
                </div>
              )}
              <span className="text-gray-100 text-base font-semibold mt-2 drop-shadow">
                {user.points}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardCards;
