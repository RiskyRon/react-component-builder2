import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = import.meta.env.VITE_UNSPLASH_SECRET_KEY; // If needed

interface Photo {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const CarGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: 'fast car', per_page: 12 },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        setPhotos(response.data.results);
      } catch (error) {
        console.error('Error fetching photos from Unsplash API', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Fast Car Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img src={photo.urls.small} alt={photo.alt_description} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;
