
import React from 'react';
import Link from 'next/link';

import Card from '../ui/Card';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { FaTachometerAlt, FaCog, FaGasPump } from 'react-icons/fa';

interface CarDoc {
  _id: string;
  title?: string;
  brand?: string;
  model?: string;
  price?: number;
  year?: number;
  km?: number;
  transmission?: string;
  fuel?: string;
  images?: string[];
  imageUrl?: string;
  featured?: boolean;
  slug?: string;
}

interface CarCardProps {
  car: CarDoc;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [imgError, setImgError] = React.useState(false);
  const displayTitle = car.title || `${car.brand || ''} ${car.model || ''}`.trim() || 'سيارة';
  const img = (car.images && car.images[0]) || car.imageUrl || `https://picsum.photos/seed/${car._id || 'car'}/640/480`;
  const imgSrc = imgError ? 'https://placehold.co/600x400?text=Car' : img;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={imgSrc} 
          alt={displayTitle} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
        {car.featured && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">مميز</span>
        )}
        {car.year && (
          <span className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10">{car.year}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{displayTitle}</h3>
        {typeof car.price === 'number' && (
          <p className="text-2xl font-bold text-primary mb-4">{formatCurrency(car.price)}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 border-t border-gray-100 pt-4">
          <div className="flex flex-col items-center gap-1">
            <FaTachometerAlt className="text-gray-400"/>
            <span>{formatNumber(car.km || 0)} كم</span>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex flex-col items-center gap-1">
            <FaCog className="text-gray-400"/>
            <span>{car.transmission || '-'}</span>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex flex-col items-center gap-1">
            <FaGasPump className="text-gray-400"/>
            <span>{car.fuel || '-'}</span>
          </div>
        </div>
        <Link 
          href={`/cars/${car.slug || car._id}`} 
          className="block w-full text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover hover:text-white transition-all duration-300"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
