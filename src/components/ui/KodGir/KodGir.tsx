
const RewardCard = () => {
  return (
    <div className="w-full bg-gradient-to-r from-violet-600 to-purple-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 mt-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kod Gir, Puan Kazan!</h2>
          <p className="text-sm text-violet-100 mt-1">
            Paylaşılan kodları gir, puanları topla ve kazananlar arasına adını yazdır!
          </p>
        </div>
        <div className="flex -space-x-3">
          <img
            className="w-10 h-10 rounded-full border-2 border-white"
            src="https://i.pravatar.cc/40?img=1"
            alt="Winner 1"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-white"
            src="https://i.pravatar.cc/40?img=2"
            alt="Winner 2"
          />
          <img
            className="w-10 h-10 rounded-full border-2 border-white"
            src="https://i.pravatar.cc/40?img=3"
            alt="Winner 3"
          />
        </div>
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Kodunuzu buraya girin"
          className="flex-1 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 bg-violet-100 focus:bg-white focus:border-violet-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-300 transition-colors"
        />
        <button className="bg-white text-violet-700 font-semibold px-4 py-2 rounded-lg hover:bg-violet-100 transition">
          Gönder
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
