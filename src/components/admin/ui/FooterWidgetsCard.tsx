import React from "react";

interface FooterWidgetProps {
  title: string;
  links: { id: number; title: string; url: string }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReorder: (id: number, direction: "up" | "down") => void;
}

const FooterWidget: React.FC<FooterWidgetProps> = ({
  title,
  links,
  onEdit,
  onDelete,
  onReorder,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-2">
        {links.map((link) => ( 
          <li
            key={link.id}
            className="flex justify-between items-center bg-gray-100 rounded p-3"
          >
            <div>
              <p className="font-medium text-gray-700">{link.title}</p>
              <p className="text-sm text-gray-500">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onReorder(link.id, "up")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                ↑
              </button>
              <button
                onClick={() => onReorder(link.id, "down")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                ↓
              </button>
              <button
                onClick={() => onEdit(link.id)}
                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(link.id)}
                className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
        ➕ Yeni Link Ekle
      </button>
    </div>
  );
};

const FooterWidgetsSection: React.FC = () => {
  const dummyLinks = [
    { id: 1, title: "Hakkımızda", url: "/hakkimizda" },
    { id: 2, title: "Gizlilik Politikası", url: "/gizlilik" },
    { id: 3, title: "İletişim", url: "/iletisim" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FooterWidget
        title="Footer Menü 1"
        links={dummyLinks}
        onEdit={(id) => console.log("Düzenle", id)}
        onDelete={(id) => console.log("Sil", id)}
        onReorder={(id, dir) => console.log("Sırala", id, dir)}
      />
      <FooterWidget
        title="Footer Menü  2"
        links={dummyLinks}
        onEdit={(id) => console.log("Düzenle", id)}
        onDelete={(id) => console.log("Sil", id)}
        onReorder={(id, dir) => console.log("Sırala", id, dir)}
      />
      <FooterWidget
        title="Footer Menü 3"
        links={dummyLinks}
        onEdit={(id) => console.log("Düzenle", id)}
        onDelete={(id) => console.log("Sil", id)}
        onReorder={(id, dir) => console.log("Sırala", id, dir)}
      />
    </div>
  );
};

export default FooterWidgetsSection;
