// src/components/FileUpload.tsx (Örnek Düzeltme)
import React, { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
  label: string;
  onUploadSuccess: (url: string) => void;
  // YENİ: uploadUrl prop'unu ekleyin
  uploadUrl: string; // Resimlerin yükleneceği backend endpoint'i
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onUploadSuccess, uploadUrl }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Lütfen bir dosya seçin.");
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile); // Backend'de 'file' olarak bekliyorsunuz

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage("Dosya başarıyla yüklendi!");
      onUploadSuccess(response.data.url); // Backend'den gelen URL'i üst bileşene gönder
      setSelectedFile(null); // Yükleme sonrası seçili dosyayı temizle
    } catch (err) {
      console.error("Dosya yüklenirken hata:", err);
      setError("Dosya yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
      setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {uploading ? 'Yükleniyor...' : 'Yükle'}
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;