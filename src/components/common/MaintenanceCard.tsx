
export default function MaintenanceCard() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center flex-col p-8 z-50 overflow-hidden">
      {/* Arka plan için soyut desen veya efekt (isteğe bağlı, CSS ile daha karmaşık olabilir) */}
      <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none"></div> {/* Opsiyonel: Varsayımsal bir arka plan deseni, CSS'de tanımlanması gerekir */}

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 animate-pulse tracking-tight drop-shadow-lg">
          {/* Gölge efekti ve harf aralığı eklendi */}
          🛠️ Site Bakımda
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
          {/* Metin rengi, boyutu ve satır aralığı ayarlandı */}
          Sitemizde şu anda planlı bakım çalışması yapılmaktadır. En iyi deneyimi sunabilmek için sistemlerimizi güncelliyoruz. Lütfen kısa bir süre sonra tekrar deneyin. Anlayışınız için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
}