
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCar, FaBuilding, FaSearch, FaMapMarkerAlt, FaTag, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

type SearchTab = 'cars' | 'properties';

const SmartSearch: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>('cars');

  // Car Filters
  const [carBrand, setCarBrand] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [carYear, setCarYear] = useState('');

  // Property Filters
  const [propLocation, setPropLocation] = useState('');
  const [propPrice, setPropPrice] = useState('');
  const [propType, setPropType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (activeTab === 'cars') {
      if (carBrand) query.append('brand', carBrand);
      if (carPrice) query.append('maxPrice', carPrice);
      if (carYear) query.append('minYear', carYear);
      router.push(`/cars?${query.toString()}`);
    } else {
      if (propLocation) query.append('location', propLocation);
      if (propPrice) query.append('maxPrice', propPrice);
      if (propType) query.append('type', propType);
      router.push(`/properties?${query.toString()}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-16 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-4 text-center text-lg font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'cars'
                ? 'bg-white text-brand-navy border-b-2 border-brand-gold'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('cars')}
          >
            <FaCar />
            {t('search_tab_cars', 'سيارات')}
          </button>
          <button
            className={`flex-1 py-4 text-center text-lg font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'properties'
                ? 'bg-white text-brand-navy border-b-2 border-brand-gold'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('properties')}
          >
            <FaBuilding />
            {t('search_tab_properties', 'عقارات')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSearch} className="p-6 md:p-8">
          {activeTab === 'cars' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FaTag className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('filter_brand', 'الماركة (مثال: BMW)')}
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaTag className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <select
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none"
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                >
                  <option value="">{t('filter_price_max', 'أقصى سعر')}</option>
                  <option value="500000">500,000 EGP</option>
                  <option value="1000000">1,000,000 EGP</option>
                  <option value="3000000">3,000,000 EGP</option>
                  <option value="5000000">5,000,000+ EGP</option>
                </select>
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <select
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                >
                  <option value="">{t('filter_year_min', 'السنة (من)')}</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2020">2020+</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-brand-navy text-white font-bold rounded-lg hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FaSearch />
                {t('search_btn', 'بحث')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('filter_location', 'الموقع (مثال: القاهرة الجديدة)')}
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  value={propLocation}
                  onChange={(e) => setPropLocation(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaBuilding className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <select
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none"
                  value={propType}
                  onChange={(e) => setPropType(e.target.value)}
                >
                  <option value="">{t('filter_type', 'نوع العقار')}</option>
                  <option value="apartment">{t('type_apartment', 'شقة')}</option>
                  <option value="villa">{t('type_villa', 'فيلا')}</option>
                  <option value="commercial">{t('type_commercial', 'تجارى')}</option>
                </select>
              </div>
              <div className="relative">
                <FaTag className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <select
                  className="w-full h-12 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none"
                  value={propPrice}
                  onChange={(e) => setPropPrice(e.target.value)}
                >
                  <option value="">{t('filter_price_max', 'أقصى سعر')}</option>
                  <option value="2000000">2,000,000 EGP</option>
                  <option value="5000000">5,000,000 EGP</option>
                  <option value="10000000">10,000,000 EGP</option>
                  <option value="20000000">20,000,000+ EGP</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-brand-navy text-white font-bold rounded-lg hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FaSearch />
                {t('search_btn', 'بحث')}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SmartSearch;
