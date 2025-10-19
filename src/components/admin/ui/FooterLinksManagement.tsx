import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { PlusIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from '@headlessui/react';

// FooterLink modeline uygun TypeScript interface'i
interface FooterLink {
  id: number;
  widget: number; // Hangi widget'a ait (1, 2, 3 vb.)
  title: string;
  url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  readOnly?: boolean; // Sadece okunur linkler için
}

// Widget numaralarına göre başlıkları eşleme
const widgetTitles: { [key: number]: string } = {
  1: "Lanet Kel Siteler",
  2: "Ödüller",
  3: "Topluluk (Sosyal Medya)", // Başlığı biraz kısalttım
};

// Settings interface'i (Backend'deki tüm alanları içermeli)
// App.tsx'teki Settings interface'iyle TAM UYUMLU OLMALI.
interface Settings {
  id?: number;
  siteTitle: string | null;
  seoDescription: string | null;
  footerText: string | null;
  siteLogoUrl: string | null;
  faviconUrl: string | null;
  facebookLink: string | null;
  facebookText: string | null;
  instagramLink: string | null;
  instagramText: string | null;
  telegramLink: string | null;
  telegramText: string | null;
  youtubeLink: string | null;
  youtubeText: string | null;
  whatsappLink: string | null;
  whatsappText: string | null;
  skypeLink: string | null;
  skypeText: string | null;
  helpLink: string | null;
  helpText: string | null;
  twitterLink: string | null;
  twitterText: string | null;
  maintenanceMode?: boolean;
  popupText?: string | null;
  googleAnalyticsId?: string | null;
  allowSearchEngines?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// FooterWidget bileşeni (Sizin verdiğiniz kod, şimdi readOnly'ye göre davranacak)
interface FooterWidgetProps {
  title: string;
  links: FooterLink[];
  onEdit: (link: FooterLink) => void;
  onDelete: (id: number) => void;
  onReorder: (link: FooterLink, direction: "up" | "down") => void;
  onAddNew: (widgetId: number) => void;
}

const FooterWidget: React.FC<FooterWidgetProps> = ({
  title,
  links,
  onEdit,
  onDelete,
  onReorder,
  onAddNew,
}) => {
  return (
    <div className="bg-w p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li
            key={link.id || `social-${link.title}-${index}`}
            className="flex justify-between items-center bg-gray-100 rounded p-3 opacity-90"
          >
            <div>
              <p className="font-medium text-gray-700">{link.title}</p>
              <p className="text-sm text-gray-500">{link.url}</p>
              {link.readOnly && (
                <p className="text-xs text-blue-500 mt-1">
                  (Site Ayarları'ndan yönetilir)
                </p>
              )}
              {!link.readOnly && (
                <p className="text-xs text-gray-400">Sıra: {link.order}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onReorder(link, "up")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                disabled={index === 0 || link.readOnly}
              >
                ↑
              </button>
              <button
                onClick={() => onReorder(link, "down")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                disabled={index === links.length - 1 || link.readOnly}
              >
                ↓
              </button>
              <button
                onClick={() => onEdit(link)}
                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                disabled={link.readOnly}
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(link.id)}
                className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                disabled={link.readOnly}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
        {links.length === 0 && ( // Widget 3 için bu mesajı gösterme koşulunu düzenledim
          <li className="text-gray-500 text-sm text-center p-3">
            {title === "Topluluk (Sosyal Medya)" ? "Sosyal Medya linkleri Site Ayarları'ndan yönetilir." : "Bu widget'a henüz link eklenmemiş."}
          </li>
        )}
      </ul>
      <button
        onClick={() => onAddNew(links.length > 0 && !links[0].readOnly ? links[0].widget : 1)} // Yeni ekle butonu için widgetId'yi doğru al
        className={`mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2
          ${(links.length > 0 && links[0].readOnly) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={links.length > 0 && links[0].readOnly} // readOnly ise disable
      >
        <PlusIcon className="w-5 h-5" /> Yeni Link Ekle
      </button>
    </div>
  );
};


// Ana yönetim bileşeni
const FooterLinksManagement: React.FC = () => {
  // State tanımlamalarını fonksiyonun en başına aldım
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<FooterLink | null>(null);
  const [modalWidgetId, setModalWidgetId] = useState<number>(1); // Bu değişken artık tam kapsamda


  const fetchAllData = async () => {
    try {
      setLoading(true);
      const linksResponse = await axios.get<FooterLink[]>('/api/footer-links');
      setLinks(linksResponse.data);

      const settingsResponse = await axios.get<Settings>('/api/settings');
      setSettings(settingsResponse.data);
    } catch (err) {
      console.error("Veriler çekilirken hata:", err);
      setError("Veriler yüklenirken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddNewLink = (widgetId: number) => {
    if (widgetId === 3) return;
    setCurrentLink(null);
    setModalWidgetId(widgetId); // modalWidgetId'yi burada set ediyoruz
    setIsModalOpen(true);
  };

  const handleEditLink = (link: FooterLink) => {
    if (link.readOnly) return;
    setCurrentLink(link);
    setModalWidgetId(link.widget); // modalWidgetId'yi burada set ediyoruz
    setIsModalOpen(true);
  };

  const handleDeleteLink = async (id: number) => {
    const linkToDelete = links.find(l => l.id === id);
    if (linkToDelete?.readOnly) return;

    if (!window.confirm("Bu linki silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`/api/footer-links/${id}`);
      fetchAllData();
    } catch (err) {
      console.error("Link silinirken hata:", err);
      setError("Link silinemedi.");
    }
  };

  const handleSaveLink = async (linkData: { id?: number; title: string; url: string; order: number; widget: number }) => {
    if (currentLink?.readOnly && linkData.id) return;
    try {
      if (linkData.id) {
        await axios.put(`/api/footer-links/${linkData.id}`, linkData);
      } else {
        await axios.post('/api/footer-links', linkData);
      }
      setIsModalOpen(false);
      fetchAllData();
    } catch (err) {
      console.error("Link kaydedilirken hata:", err);
      setError("Link kaydedilemedi.");
    }
  };

  const handleReorderLink = async (link: FooterLink, direction: "up" | "down") => {
    if (link.readOnly) return;

    const currentOrder = link.order;
    let newOrder = currentOrder;

    const relatedLinks = links.filter(l => l.widget === link.widget && !l.readOnly).sort((a, b) => a.order - b.order);
    const currentIndex = relatedLinks.findIndex(l => l.id === link.id);

    if (direction === "up" && currentIndex > 0) {
        const prevLink = relatedLinks[currentIndex - 1];
        newOrder = prevLink.order;
        await axios.put(`/api/footer-links/${prevLink.id}`, { order: currentOrder });
    } else if (direction === "down" && currentIndex < relatedLinks.length - 1) {
        const nextLink = relatedLinks[currentIndex + 1];
        newOrder = nextLink.order;
        await axios.put(`/api/footer-links/${nextLink.id}`, { order: currentOrder });
    } else {
        return;
    }

    await axios.put(`/api/footer-links/${link.id}`, { order: newOrder });
    fetchAllData();
  };


  // Linkleri widget ID'ye göre grupla
  const groupedLinks = links.reduce((acc, link) => {
    acc[link.widget] = acc[link.widget] || [];
    acc[link.widget].push(link);
    return acc;
  }, {} as { [key: number]: FooterLink[] });

  // Widget 3 için sosyal medya linklerini Settings objesinden oluştur
  const socialMediaLinksForWidget3: FooterLink[] = [];
  if (settings) {
    const socialMediaMapping = [
      { linkField: settings.facebookLink, textField: settings.facebookText, title: "Facebook", id: 101, order: 1 },
      { linkField: settings.instagramLink, textField: settings.instagramText, title: "Instagram", id: 102, order: 2 },
      { linkField: settings.telegramLink, textField: settings.telegramText, title: "Telegram", id: 103, order: 3 },
      { linkField: settings.youtubeLink, textField: settings.youtubeText, title: "YouTube", id: 104, order: 4 },
      { linkField: settings.whatsappLink, textField: settings.whatsappText, title: "WhatsApp", id: 105, order: 5 },
      { linkField: settings.skypeLink, textField: settings.skypeText, title: "Skype", id: 106, order: 6 },
      { linkField: settings.twitterLink, textField: settings.twitterText, title: "Twitter (X)", id: 107, order: 7 },
      { linkField: settings.helpLink, textField: settings.helpText, title: "Yardım Alın", id: 108, order: 8 },
    ];

    socialMediaMapping.forEach(item => {
      if (item.linkField || item.textField) {
        socialMediaLinksForWidget3.push({
          id: item.id,
          widget: 3,
          title: item.textField || item.title,
          url: item.linkField || '#',
          order: item.order,
          readOnly: true, // BU LİNK SADECE GÖRÜNTÜLENİR
          createdAt: new Date().toISOString(), // Placeholder
          updatedAt: new Date().toISOString(), // Placeholder
        });
      }
    });
  }
  groupedLinks[3] = socialMediaLinksForWidget3;


  if (loading) return <div className="text-gray-700 p-6">Footer linkleri yükleniyor...</div>;
  if (error) return <div className="text-red-600 p-6">Hata: {error}</div>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-8">Footer Link Yönetimi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(widgetTitles).map(widgetId => (
          <FooterWidget
            key={widgetId}
            title={widgetTitles[parseInt(widgetId)]}
            links={groupedLinks[parseInt(widgetId)] || []}
            onEdit={handleEditLink}
            onDelete={handleDeleteLink}
            onReorder={handleReorderLink}
            onAddNew={handleAddNewLink}
          />
        ))}
      </div>

      {/* Link Ekle/Düzenle Modalı */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {currentLink ? "Link Düzenle" : "Yeni Link Ekle"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const title = formData.get('title') as string;
                        const url = formData.get('url') as string;
                        const order = parseInt(formData.get('order') as string);
                        const widget = parseInt(formData.get('widget') as string);
                        handleSaveLink({ id: currentLink?.id, title, url, order, widget });
                    }}>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlık</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          defaultValue={currentLink?.title || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                          type="url"
                          id="url"
                          name="url"
                          defaultValue={currentLink?.url || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="order" className="block text-sm font-medium text-gray-700">Sıra</label>
                        <input
                          type="number"
                          id="order"
                          name="order"
                          defaultValue={currentLink?.order || (links.length > 0 ? links[links.length - 1].order + 1 : 0)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="widget" className="block text-sm font-medium text-gray-700">Widget</label>
                        <select
                          id="widget"
                          name="widget"
                          defaultValue={currentLink?.widget || modalWidgetId}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                            {Object.keys(widgetTitles).map(id => (
                                <option key={id} value={parseInt(id)}>{widgetTitles[parseInt(id)]}</option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                          onClick={() => setIsModalOpen(false)}
                        >
                          İptal
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {currentLink ? "Kaydet" : "Ekle"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FooterLinksManagement;