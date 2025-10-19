import React from 'react';

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 5.33398C4 4.27312 4.42143 3.2557 5.17157 2.50556C5.92172 1.75541 6.93913 1.33398 8 1.33398C9.06087 1.33398 10.0783 1.75541 10.8284 2.50556C11.5786 3.2557 12 4.27312 12 5.33398H12.6667C13.0203 5.33398 13.3594 5.47446 13.6095 5.72451C13.8595 5.97456 14 6.3137 14 6.66732V13.334C14 13.6876 13.8595 14.0267 13.6095 14.2768C13.3594 14.5268 13.0203 14.6673 12.6667 14.6673H3.33333C2.97971 14.6673 2.64057 14.5268 2.39052 14.2768C2.14048 14.0267 2%2013.6876%202%2013.334V6.66732C2%206.3137%202.14048%205.97456%202.39052%205.72451C2.64057%205.47446%202.97971%205.33398%203.33333%205.33398H4ZM8%202.66732C8.70724%202.66732%209.38552%202.94827%209.88562%203.44837C10.3857%203.94846%2010.6667%204.62674%2010.6667%205.33398H5.33333C5.33333%204.62674%205.61428%203.94846%206.11438%203.44837C6.61448%202.94827%207.29276%202.66732%208%202.66732ZM9.33333%209.33398C9.33333%209.56803%209.27172%209.79795%209.15469%2010.0006C9.03767%2010.2033%208.86935%2010.3716%208.66667%2010.4887V11.334C8.66667%2011.5108%208.59643%2011.6804%208.4714%2011.8054C8.34638%2011.9304%208.17681%2012.0007%208%2012.0007C7.82319%2012.0007%207.65362%2011.9304%207.5286%2011.8054C7.40357%2011.6804%207.33333%2011.5108%207.33333%2011.334V10.4887C7.07916%2010.3419%206.88052%2010.1154%206.76821%209.8442C6.65589%209.57303%206.63619%209.27239%206.71216%208.98889C6.78812%208.70539%206.95551%208.45487%207.18836%208.2762C7.4212%208.09752%207.7065%208.00066%208%208.00065C8.35362%208.00065%208.69276%208.14113%208.94281%208.39118C9.19286%208.64122%209.33333%208.98036%209.33333%209.33398Z"
      fill="#717796"
    ></path>
  </svg>
);
interface AwardData {
  id: number;
  level: string; // "Seviye" yerine "Ödül" veya "Puan" gibi daha genel bir ifade olabilir
  reward: string;
  imageUrl: string;
  progress: number; // İlerleme çubuğu için
}
const awards: AwardData[] = [
  {
    id: 1,
    level: '1.Seviye', // Ödül adı yerine seviye bilgisi olarak tuttum
    reward: '1 Çark Hakkı',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/s76_ob6Q5ghH3rM882ccS.png',
    progress: 100, // Örnek ilerleme
  },
  {
    id: 2,
    level: '2.Seviye',
    reward: '5 Çark Hakkı',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/0k6VUkoSN3JZ2LwiaEEZ5.png',
    progress: 90,
  },
  {
    id: 3,
    level: '3.Seviye',
    reward: '10 Çark Hakkı',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/Yg_UUmzC0zIZXH-TQnWvr.png',
    progress: 80,
  },
  {
    id: 4,
    level: '4.Seviye',
    reward: '5000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/sGbqhh4MJ1U-gPgvTM32p.png',
    progress: 70,
  },
  {
    id: 5,
    level: '5.Seviye',
    reward: '8000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/Qg036V_Hs1F4sHDNR73pt.png',
    progress: 60,
  },
  {
    id: 6,
    level: '6.Seviye',
    reward: '12000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/o8ZueeRwPrReMm4kvTcrV.png',
    progress: 2,
  },
  {
    id: 7,
    level: '7.Seviye',
    reward: '15000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/QQYidIJAF6YWCs2sHPDUP.png',
    progress: 2,
  },
  {
    id: 8,
    level: '8.Seviye',
    reward: '25000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/iVZoZcIIDKDKyd_PvlRjT.png',
    progress: 2,
  },
  {
    id: 9,
    level: '9.Seviye',
    reward: '40000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/sH3lX4GMSe7WoerhVDLmu.png',
    progress: 2,
  },
  {
    id: 10,
    level: '10.Seviye',
    reward: '50000 Puan',
    imageUrl: 'https://streamer-dev-s3-bucket.s3.eu-central-1.amazonaws.com/EHB_zSJK3czoEKtGlnfmu.png',
    progress: 2,
  },
];

const Seviye: React.FC = () => {
  return (
    <div className="gradient-shadow relative p-4"> {/* Swiper'a özel sınıfları kaldırdım, genel bir padding ekledim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> {/* grid yapısı */}
        {awards.map((award) => (
          <div key={award.id} className="mt-[-50px] pb-[90px] w-full"> {/* width: 310.25px; margin-right: 12px; kaldırıldı, grid kendi yönetir */}
            <img
              src={award.imageUrl}
              className="mx-auto h-24 translate-y-[60%] filter grayscale(100%) brightness(0.7)"
              alt={`Level ${award.id}`}
            />
            <div className="bg-[#171926] border border-slate-700 rounded-lg p-4 pt-3 flex flex-col items-center gap-2 h-full mb-[-120px]">
              <p className="text-[#EDF0F7] font-medium mt-[40px]">{award.level}</p>
              <p className="bg-slate-700 text-green-400 text-xs font-medium px-2 py-1 rounded-full mb-5">
                {award.reward}
              </p>
              <div className="w-full">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium w-full"></p>
                  </div>
                  <div className="w-full h-2 my-2 rounded-2xl overflow-hidden relative progress-bg">
                    <div
                      className="relative z-10 brighten-effect bg-green-600"
                      style={{ width: `${award.progress}%`, height: '100%' }}
                    ></div>
                  </div>
                </div>
                <button
                  className="text-gray-600 font-medium text-sm block w-full px-3 py-2 mt-2 rounded-lg gradient-border mt-4 mb-4"
                  style={{
                    background:
                      'radial-gradient(50% 45.69% at 50% 54.31%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.00) 100%), var(--Gray-bg-bg-slate-700, #2B2D46)',
                    boxShadow: 'rgb(19, 19, 32) 0px 1px 3px 0px',
                  }}
                >
                  <div className="flex items-center justify-center">
                    <LockIcon />
                    <span className="text-gray-500">Kilitli</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seviye;