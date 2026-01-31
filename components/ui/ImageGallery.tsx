
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt = 'Gallery Image' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imgSrc: string) => {
    setFailedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imgSrc);
      return newSet;
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
        No Images
      </div>
    );
  }

  const currentImg = images[selectedIndex];
  const isCurrentFailed = failedImages.has(currentImg);
  const fallbackImage = 'https://placehold.co/600x400?text=Image+Not+Found';

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 border border-gray-100 shadow-sm group">
        <img
          src={isCurrentFailed ? fallbackImage : currentImg}
          alt={`${alt} - ${selectedIndex + 1}`}
          onError={() => handleImageError(currentImg)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => {
            const isFailed = failedImages.has(img);
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative min-w-[80px] w-20 h-16 md:w-24 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === selectedIndex ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={isFailed ? fallbackImage : img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={() => handleImageError(img)}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
