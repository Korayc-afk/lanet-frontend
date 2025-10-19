
const tableData = [
  { durum: "active", odul: "250 Puan", kod: "250puan", kullanmaSayisi: 84 },
  { durum: "active", odul: "250 Puan", kod: "250puan", kullanmaSayisi: 107 },
  { durum: "active", odul: "500 Puan", kod: "500puan", kullanmaSayisi: 135 },
  { durum: "active", odul: "31 Puan", kod: "31", kullanmaSayisi: 7 },
  { durum: "active", odul: "100 Puan", kod: "skortahmini", kullanmaSayisi: 51 },
  { durum: "active", odul: "1 Çark", kod: "skortahmini", kullanmaSayisi: 107 },
  { durum: "active", odul: "200 Puan", kod: "200puan", kullanmaSayisi: 217 },
  { durum: "active", odul: "250 Puan", kod: "ikiyüzelli", kullanmaSayisi: 246 },
  { durum: "active", odul: "250 Puan", kod: "250puan", kullanmaSayisi: 263 },
  { durum: "active", odul: "500 Puan", kod: "moneytalks", kullanmaSayisi: 292 },
];

function PuanTablosu() {
  return (
    <div className="mt-6 mb-6 rounded-xl table-container">
      <table className="w-full z-10 relative">
        <thead className="bg-gray-800 border-b border-gray-700 rounded-t-xl">
          <tr className="text-gray-500 uppercase text-xs font-medium">
            <th className="rounded-tl-xl px-3 py-3">Durum</th>
            <th className="px-3 py-3">Ödül</th>
            <th className="px-3 py-3">Kod</th>
            <th className="rounded-tr-xl px-3 py-3 text-right">
              Kullanım Sayısı
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({  odul, kod, kullanmaSayisi }, idx) => (
            <tr
              key={idx}
              className="text-center text-slate-500 text-sm font-bold"
            >
              <td className="align-middle text-center">
                <div className="flex justify-center items-center">
                  <div className="rounded-full bg-gray-800 font-bold h-3 w-3 flex justify-center items-center">
                    <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 font-bold">{odul}</td>
              <td className="px-6 py-3">
                <div className="bg-gray-800 rounded px-2 py-1">{kod}</div>
              </td>
              <td className="px-6 py-3 text-right">{kullanmaSayisi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PuanTablosu;
