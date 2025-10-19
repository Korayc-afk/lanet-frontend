import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PlayCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface Settings {
  heroVideoUrl: string | null;
  heroVideoThumbnail: string | null;
}

const FeaturedVideoManager = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Settings>('/api/settings');
      setVideoUrl(response.data.heroVideoUrl || '');
      setVideoThumbnail(response.data.heroVideoThumbnail || '');
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError('Ayarlar yüklenirken bir hata oluştu.');
      const errorMessage =
        typeof axiosError.response?.data === 'object' && axiosError.response?.data && 'message' in axiosError.response.data
          ? (axiosError.response.data as { message?: string }).message
          : undefined;
      toast.error(errorMessage || 'Öne çıkan video ayarları yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);

    const videoId = getYouTubeId(url);
    if (videoId) {
      setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
      setVideoThumbnail(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
      setVideoThumbnail('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        heroVideoUrl: videoUrl,
        heroVideoThumbnail: videoThumbnail,
      };
      
      await axios.post('/api/settings', dataToSave);
      
      toast.success('Öne çıkan video ayarları başarıyla kaydedildi!', { position: "bottom-right" });
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      const errorMessage =
        typeof axiosError.response?.data === 'object' &&
        axiosError.response?.data &&
        'message' in axiosError.response.data
          ? (axiosError.response.data as { message?: string }).message
          : undefined;
      toast.error(errorMessage || 'Ayarlar kaydedilirken bir hata oluştu.', { position: "bottom-right" });
    }
  };

  if (loading) {
    return <div className="text-center py-6 text-gray-900">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">{error}</div>;
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg text-gray-900 shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-center">Öne Çıkan Video Yönetimi</h3><br></br>
        <p className="text-gray-600 mb-6">Sitenin yayınlar sayfasında görünen öne çıkan video için ayarları buradan yapabilirsiniz.</p>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">YouTube Embed URL</label>
              <input
                type="text"
                id="videoUrl"
                value={videoUrl}
                onChange={handleLinkChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label htmlFor="videoThumbnail" className="block text-sm font-medium text-gray-700 mb-1">Video Önizleme Resmi URL</label>
              <input
                type="text"
                id="videoThumbnail"
                value={videoThumbnail}
                readOnly
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Önizleme resmi URL'si"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={fetchSettings}
              className="px-4 py-2 flex items-center gap-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              <ArrowPathIcon className="size-5" />
              Yenile
            </button>
            <button
              type="submit"
              className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlayCircleIcon className="size-5" />
              Ayarları Kaydet
            </button>
          </div>
        </form>
        
        {videoUrl && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Canlı Önizleme</h4>
            <div className="relative aspect-video w-full rounded-md overflow-hidden shadow-lg">
              <iframe
                src={videoUrl}
                title="Video Önizleme"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default FeaturedVideoManager;