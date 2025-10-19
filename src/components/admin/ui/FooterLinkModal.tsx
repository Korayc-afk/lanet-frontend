// src/admin/pages/FooterLinkModal.tsx
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// İlgili interfaceleri buraya kopyala (FooterLinksManagement.tsx'ten alınacak)
interface FooterLink {
  id?: number; // Yeni ekleme modunda ID olmayabilir
  widget: number;
  title: string;
  url: string;
  order: number;
  createdAt?: string; // Opsiyonel olabilir
  updatedAt?: string; // Opsiyonel olabilir
  readOnly?: boolean; // FooterLink interface'inde tanımlı olmalı
}

// Widget numaralarına göre başlıkları eşleme (FooterLinksManagement.tsx'ten alınacak)
const widgetTitles: { [key: number]: string } = {
  1: "Lanet Kel Siteler",
  2: "Ödüller",
  3: "Topluluk (Sosyal Medya)",
};

interface FooterLinkModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  currentLink: FooterLink | null;
  modalWidgetId: number;
  handleSaveLink: (linkData: { id?: number; title: string; url: string; order: number; widget: number }) => void;
  // Parent component'ten links'i alarak order'ı otomatik belirlemek için
  existingLinksCountForWidget: number;
  lastOrderForWidget: number;
}

const FooterLinkModal: React.FC<FooterLinkModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  currentLink,
  modalWidgetId,
  handleSaveLink,
  lastOrderForWidget
}) => {
  // Form inputları için yerel state'ler veya doğrudan defaultValue kullan
  const [formTitle, setFormTitle] = useState(currentLink?.title || '');
  const [formUrl, setFormUrl] = useState(currentLink?.url || '');
  const [formOrder, setFormOrder] = useState<number>(currentLink?.order || (lastOrderForWidget + 1));
  const [formWidget, setFormWidget] = useState<number>(currentLink?.widget || modalWidgetId);

  // currentLink veya modalWidgetId değiştiğinde formu resetle
  useEffect(() => {
    setFormTitle(currentLink?.title || '');
    setFormUrl(currentLink?.url || '');
    setFormOrder(currentLink?.order || (lastOrderForWidget + 1));
    setFormWidget(currentLink?.widget || modalWidgetId);
  }, [currentLink, modalWidgetId, lastOrderForWidget]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveLink({
      id: currentLink?.id,
      title: formTitle,
      url: formUrl,
      order: formOrder,
      widget: formWidget,
    });
  };

  return (
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
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlık</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
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
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
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
                        value={formOrder}
                        onChange={(e) => setFormOrder(parseInt(e.target.value) || 0)} // Sayıya çevir
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="widget" className="block text-sm font-medium text-gray-700">Widget</label>
                      <select
                        id="widget"
                        name="widget"
                        value={formWidget}
                        onChange={(e) => setFormWidget(parseInt(e.target.value) || 0)} // Sayıya çevir
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
  );
};

export default FooterLinkModal;