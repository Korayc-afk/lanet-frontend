import React, { useState, useEffect } from "react";
import axios from "axios";

interface FooterLink {
  id: number;
  title: string;
  url: string;
  order: number;
}

const FooterLinkAyarlar: React.FC = () => {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  // Footer linklerini çek
  const fetchLinks = async () => {
    try {
      const res = await axios.get("/api/footer-links");
      setLinks(res.data);
    } catch (err) {
      console.error("Footer linkleri çekilemedi:", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Yeni link ekle
  const handleAddLink = async () => {
    try {
      await axios.post("/api/footer-links", newLink);
      setNewLink({ title: "", url: "" });
      fetchLinks(); // listeyi güncelle
    } catch (err) {
      console.error("Footer linki eklenemedi:", err);
    }
  };

  // Link sil
  const handleDeleteLink = async (id: number) => {
    try {
      await axios.delete(`/api/footer-links/${id}`);
      fetchLinks();
    } catch (err) {
      console.error("Footer linki silinemedi:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">🔗 Footer Linkleri</h2>

      {/* Liste */}
      <ul className="space-y-2 mb-4">
        {links.map((link) => (
          <li
            key={link.id}
            className="flex justify-between items-center p-2 border rounded-lg"
          >
            <span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.title}
              </a>
            </span>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>

      {/* Yeni Link Ekle */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Başlık"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="border rounded px-2 py-1 w-1/3"
        />
        <input
          type="text"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="border rounded px-2 py-1 w-1/2"
        />
        <button
          onClick={handleAddLink}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default FooterLinkAyarlar;
