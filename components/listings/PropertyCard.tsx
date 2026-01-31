
import React from 'react';
import Link from 'next/link';

import Card from '../ui/Card';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath } from 'react-icons/fa';

interface PropertyDoc {
  _id: string;
  title: string;
  type?: string;
  purpose?: string; // للبيع | للإيجار
  price?: number;
  area?: number;
  rooms?: number;
  baths?: number;
  location?: string;
  images?: string[];
  imageUrl?: string;
  featured?: boolean;
  slug?: string;
}

interface PropertyCardProps {
  property: PropertyDoc;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [imgError, setImgError] = React.useState(false);
  const isSale = property.purpose === 'للبيع';
  const img = (property.images && property.images[0]) || property.imageUrl || `https://picsum.photos/seed/${property._id || 'property'}/640/480`;
  const imgSrc = imgError ? 'https://placehold.co/600x400?text=Property' : img;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={imgSrc} 
          alt={property.title} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
        {property.featured && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">مميز</span>
        )}
        {property.purpose && (
          <span className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm ${isSale ? 'bg-secondary' : 'bg-green-600'}`}>
            {property.purpose}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FaMapMarkerAlt className="me-1 text-primary"/>
          <span className="truncate">{property.location || '-'}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
        {typeof property.price === 'number' && (
          <p className="text-2xl font-bold text-primary mb-4">{formatCurrency(property.price)}</p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex flex-col items-center gap-1">
            <FaRulerCombined className="text-gray-400"/>
            <span>{formatNumber(property.area || 0)} م²</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-l border-gray-100">
            <FaBed className="text-gray-400"/>
            <span>{property.rooms ?? '-'}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaBath className="text-gray-400"/>
            <span>{property.baths ?? '-'}</span>
          </div>
        </div>
        
        <Link 
          href={`/properties/${property.slug || property._id}`} 
          className="block w-full text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover hover:text-white transition-all duration-300"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
