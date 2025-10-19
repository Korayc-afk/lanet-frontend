import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import useDebounce from "../../../hooks/useDebounce"; // YENİ: useDebounce hook'unu import et
import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/solid"; // İkonlar

// Kullanıcı modeline uygun TypeScript interface'i
interface User {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "MODERATOR" | "USER"; // Enum tipleri
  isEmailVerified: boolean;
  lastLoginAt: string | null; // Date objesi olarak çekilebilir, string olarak da işlenebilir
  isBanned: boolean;
  banReason: string | null;
  bannedUntil: string | null;
  customBonus: string | null;
  createdAt: string;
  updatedAt: string;
}

// User Edit Modalı için props interface'i
interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null; // Düzenlenecek kullanıcı (yeni için null)
  onSave: (userData: User) => void;
}

// User Edit Modalı (Yeni bir component olarak ayırıyoruz)
const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState<User | null>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(user); // user prop'u değiştiğinde formu güncelle
    setError(null);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => {
      if (!prev) return null; // Should not happen if user is not null
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    setError(null);

    // Date nesnesini ISO string'e çevir
    const dataToSend = {
      ...formData,
      bannedUntil: formData.bannedUntil
        ? new Date(formData.bannedUntil).toISOString()
        : null,
      lastLoginAt: formData.lastLoginAt
        ? new Date(formData.lastLoginAt).toISOString()
        : null,
    };

    try {
      const response = await axios.put(
        `/api/users/${formData.id}`,
        dataToSend
      );
      onSave(response.data.user); // Güncellenmiş kullanıcıyı parent'a geri gönder
      onClose();
    } catch (err: any) {
      console.error("Kullanıcı kaydedilirken hata:", err);
      setError(err.response?.data?.message || "Kullanıcı kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  };

  if (!user && !isOpen) return null; // Eğer user yoksa ve kapalıysa render etme

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {user ? "Kullanıcı Düzenle" : "Yeni Kullanıcı Ekle"}
                </Dialog.Title>
                <div className="mt-2">
                  {error && <div className="text-red-600 mb-4">{error}</div>}
                  {formData && (
                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-2 gap-4"
                    >
                      {/* Username */}
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kullanıcı Adı
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          required
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          required
                        />
                      </div>
                      {/* Role */}
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Rol
                        </label>
                        <select
                          name="role"
                          id="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                          <option value="USER">User</option>
                          <option value="MODERATOR">Moderator</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                      {/* isEmailVerified */}
                      <div className="flex items-center mt-6">
                        <input
                          type="checkbox"
                          name="isEmailVerified"
                          id="isEmailVerified"
                          checked={formData.isEmailVerified}
                          onChange={handleChange}
                          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label
                          htmlFor="isEmailVerified"
                          className="ml-2 block text-sm font-medium text-gray-700"
                        >
                          Email Doğrulandı mı?
                        </label>
                      </div>
                      {/* isBanned */}
                      <div className="flex items-center mt-6">
                        <input
                          type="checkbox"
                          name="isBanned"
                          id="isBanned"
                          checked={formData.isBanned}
                          onChange={handleChange}
                          className="h-4 w-4 rounded text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        <label
                          htmlFor="isBanned"
                          className="ml-2 block text-sm font-medium text-gray-700"
                        >
                          Banlı mı?
                        </label>
                      </div>
                      {/* Ban Reason */}
                      <div>
                        <label
                          htmlFor="banReason"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ban Nedeni
                        </label>
                        <textarea
                          name="banReason"
                          id="banReason"
                          value={formData.banReason || ""}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          rows={2}
                          disabled={!formData.isBanned}
                        ></textarea>
                      </div>
                      {/* Banned Until */}
                      <div>
                        <label
                          htmlFor="bannedUntil"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ban Bitiş Tarihi
                        </label>
                        <input
                          type="datetime-local"
                          name="bannedUntil"
                          id="bannedUntil"
                          value={
                            formData.bannedUntil
                              ? new Date(formData.bannedUntil)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          disabled={!formData.isBanned}
                        />
                      </div>
                      {/* Custom Bonus */}
                      <div>
                        <label
                          htmlFor="customBonus"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Özel Bonus
                        </label>
                        <input
                          type="text"
                          name="customBonus"
                          id="customBonus"
                          value={formData.customBonus || ""}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>

                      <div className="mt-4 col-span-2 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                        >
                          İptal
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                          disabled={loading}
                        >
                          {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Ana Kullanıcı Yönetim Bileşeni
const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtreleme ve Arama State'leri
  const [searchTerm, setSearchTerm] = useState(""); // Arama kutusunun anlık değeri
  const debouncedSearchTerm = useDebounce(searchTerm, 900); // YENİ: Debounce edilmiş arama terimi (900ms gecikme)

  // Diğer filtreler (şimdilik debounce etmiyoruz, gerekirse edebiliriz)
  const [filterRole, setFilterRole] = useState("");
  const [filterBanned, setFilterBanned] = useState("");
  const [filterVerified, setFilterVerified] = useState("");

  // Sayfalama State'leri
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  // Modal State'leri
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Kullanıcıları API'den çekme fonksiyonu
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: currentPage,
        pageSize: pageSize,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }), // YENİ: debouncedSearchTerm kullanıldı
        ...(filterRole && { role: filterRole }), // filterRole varsa ekle
        ...(filterBanned && { isBanned: filterBanned }), // filterBanned varsa ekle
        ...(filterVerified && { isEmailVerified: filterVerified }), // filterVerified varsa ekle
      };
      const response = await axios.get("/api/users", {
        params,
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setTotalUsersCount(response.data.totalUsers);
    } catch (err: any) {
      console.error("Kullanıcılar getirilirken hata:", err);
      setError(err.response?.data?.message || "Kullanıcılar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  // Filtre/arama/sayfalama değiştiğinde kullanıcıları tekrar çek
  useEffect(() => {
    fetchUsers(); // Bu artık debouncedSearchTerm'e bağlı
  }, [
    currentPage,
    pageSize,
    debouncedSearchTerm,
    filterRole,
    filterBanned,
    filterVerified,
  ]); // YENİ: searchTerm yerine debouncedSearchTerm

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserSaved = (updatedUser: User) => {
    // Listeyi güncel kullanıcının yeni verileriyle yenile
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditModalOpen(false);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?"))
      return;
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Silme sonrası listeyi yenile
    } catch (err: any) {
      console.error("Kullanıcı silinirken hata:", err);
      setError(err.response?.data?.message || "Kullanıcı silinemedi.");
    }
  };

  // Input alanları ve filtreler için genel handleChange fonksiyonu
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Arama terimi değiştiğinde sayfayı 1'e sıfırla
    if (name === "searchTerm") setSearchTerm(value);
    else if (name === "filterRole") setFilterRole(value);
    else if (name === "filterBanned") setFilterBanned(value);
    else if (name === "filterVerified") setFilterVerified(value);
    setCurrentPage(1); // Filtre değiştiğinde sayfayı sıfırla
  };

  if (loading)
    return <div className="p-6 text-gray-700">Kullanıcılar yükleniyor...</div>;
  if (error) return <div className="p-6 text-red-600">Hata: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Kullanıcı Yönetimi</h1>

      {/* Arama ve Filtreleme Bölümü */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="searchTerm"
            className="block text-sm font-medium text-gray-700"
          >
            Arama (Kullanıcı Adı/Email)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={handleFilterChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="filterRole"
            className="block text-sm font-medium text-gray-700"
          >
            Role Göre Filtrele
          </label>
          <select
            id="filterRole"
            name="filterRole"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filterRole}
            onChange={handleFilterChange}
          >
            <option value="">Tümü</option>
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterBanned"
            className="block text-sm font-medium text-gray-700"
          >
            Ban Durumu
          </label>
          <select
            id="filterBanned"
            name="filterBanned"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filterBanned}
            onChange={handleFilterChange}
          >
            <option value="">Tümü</option>
            <option value="true">Banlı</option>
            <option value="false">Banlı Değil</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterVerified"
            className="block text-sm font-medium text-gray-700"
          >
            Email Doğrulama
          </label>
          <select
            id="filterVerified"
            name="filterVerified"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filterVerified}
            onChange={handleFilterChange}
          >
            <option value="">Tümü</option>
            <option value="true">Doğrulanmış</option>
            <option value="false">Doğrulanmamış</option>
          </select>
        </div>
        <button
          onClick={() => {
            setSearchTerm("");
            setFilterRole("");
            setFilterBanned("");
            setFilterVerified("");
            setCurrentPage(1);
          }}
          className="col-span-full md:col-span-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5" /> Filtreleri Temizle
        </button>
      </div>

      {/* Kullanıcı Listesi Tablosu */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Kullanıcılar ({totalUsersCount})
          </h2>
          {/* Yeni kullanıcı ekleme butonu (şimdilik ekleme API'si yok, sadece düzenleme var) */}
          {/* <button onClick={() => handleEditClick(null)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <PlusIcon className="h-5 w-5 inline-block mr-1" /> Yeni Kullanıcı
          </button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kullanıcı Adı
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doğrulandı mı?
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rol
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Banlı mı?
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Son Giriş
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kayıt Tarihi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {user.isEmailVerified ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Evet
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Hayır
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {user.isBanned ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Evet
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Hayır
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString()
                      : "Hiç"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sayfalama Kontrolleri */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Önceki
          </button>
          <span className="text-sm text-gray-700">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
      </div>

      {/* Kullanıcı Düzenleme Modalı */}
      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleUserSaved}
      />
    </div>
  );
};

export default UsersManagement;
