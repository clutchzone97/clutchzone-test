
import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CarCard from '../components/listings/CarCard';
import PropertyCard from '../components/listings/PropertyCard';
import SmartSearch from '../components/ui/SmartSearch';
import SEO from '../components/SEO';
import { FaCheckCircle, FaShieldAlt, FaHandshake, FaCamera } from 'react-icons/fa';
import Link from 'next/link';

interface HomeProps {
  initialFeaturedCars?: any[];
  initialFeaturedProperties?: any[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let initialFeaturedCars = [];
  let initialFeaturedProperties = [];

  try {
     const [carsRes, propsRes] = await Promise.all([
        fetch('https://clutchzone-backend.onrender.com/api/cars?featured=true&sort=newest&limit=3').then(r => r.json()).catch(() => []),
        fetch('https://clutchzone-backend.onrender.com/api/properties?featured=true&limit=2').then(r => r.json()).catch(() => [])
     ]);
     initialFeaturedCars = Array.isArray(carsRes) ? carsRes : (carsRes?.data || []);
     initialFeaturedProperties = Array.isArray(propsRes) ? propsRes : (propsRes?.data || []);
  } catch (e) {
    console.error("Failed to fetch initial data for home:", e);
  }

  return {
    props: {
      initialFeaturedCars,
      initialFeaturedProperties
    },
    revalidate: 60
  };
};

const HomePage: React.FC<HomeProps> = ({ initialFeaturedCars, initialFeaturedProperties }) => {
  const { t } = useTranslation();
  
  // Fallback data for design if empty
  const cars = initialFeaturedCars?.length ? initialFeaturedCars : [
    { _id: '1', title: 'BMW X6 M Competition', price: 5500000, year: 2024, km: 5000, transmission: 'Automatic', fuel: 'Petrol', featured: true, imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800' },
    { _id: '2', title: 'Mercedes-Benz G-Class', price: 8200000, year: 2023, km: 12000, transmission: 'Automatic', fuel: 'Petrol', featured: true, imageUrl: 'https://images.unsplash.com/photo-1520050206274-2dc33f0ca8a8?auto=format&fit=crop&q=80&w=800' },
    { _id: '3', title: 'Porsche 911 GT3', price: 9500000, year: 2024, km: 1500, transmission: 'Automatic', fuel: 'Petrol', featured: true, imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800' },
  ];

  const properties = initialFeaturedProperties?.length ? initialFeaturedProperties : [
    { _id: '1', title: 'Luxury Villa in New Cairo', price: 15000000, area: 450, rooms: 5, baths: 6, location: 'New Cairo', purpose: 'للبيع', featured: true, imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800' },
    { _id: '2', title: 'Sea View Apartment in North Coast', price: 8500000, area: 180, rooms: 3, baths: 2, location: 'North Coast', purpose: 'للبيع', featured: true, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <>
      <SEO 
        title={t('home_title', 'ClutchZone - سوق السيارات والعقارات الفاخرة في مصر')}
        description={t('home_desc', 'اكتشف أفضل السيارات والعقارات في مصر مع ClutchZone. سوق متميز يجمع بين الفخامة والثقة.')}
      />
      <Header />
      
      <main className="bg-brand-light min-h-screen pb-20">
        {/* 1. Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
             {/* Dual Marketplace Concept: Split or Blend */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-brand-navy/60" /> 
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/30" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center text-white mt-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero_headline', 'انطلق بخياراتك الأفضل')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
              {t('hero_subheadline', 'سيارات فاخرة وعقارات مميزة في مكان واحد')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/cars" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-navy font-bold rounded-full hover:bg-white transition-all shadow-lg text-lg"
              >
                {t('cta_cars', 'تصفح السيارات')}
              </Link>
              <Link 
                href="/properties" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-brand-navy transition-all shadow-lg text-lg"
              >
                {t('cta_properties', 'تصفح العقارات')}
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Smart Search */}
        <SmartSearch />

        {/* 3. Featured Cars Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-brand-navy border-r-4 border-brand-gold pr-4">
              {t('featured_cars_title', 'سيارات مميزة')}
            </h2>
            <Link href="/cars" className="text-brand-gold font-bold hover:underline">
              {t('view_all', 'عرض الكل')} &larr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car: any) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </section>

        {/* 4. Featured Properties Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-brand-navy border-r-4 border-brand-gold pr-4">
                {t('featured_props_title', 'عقارات مميزة')}
              </h2>
              <Link href="/properties" className="text-brand-gold font-bold hover:underline">
                {t('view_all', 'عرض الكل')} &larr;
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {properties.map((prop: any) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why ClutchZone Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">{t('why_us_title', 'لماذا ClutchZone؟')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">نقدم لك تجربة بيع وشراء استثنائية تجمع بين الأمان والسرعة والسهولة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: 'وسطاء معتمدين', desc: 'نتعامل فقط مع شركاء موثوقين لضمان جودة المعروضات.' },
              { icon: FaCheckCircle, title: 'بيانات موثوقة', desc: 'كل سيارة وعقار يتم فحصه والتأكد من صحة بياناته.' },
              { icon: FaHandshake, title: 'بدون عمولات خفية', desc: 'تعامل بشفافية تامة دون أي مصاريف غير متوقعة.' },
              { icon: FaCamera, title: 'صور حقيقية', desc: 'صور عالية الجودة تعكس الواقع بدقة ووضوح.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow border border-gray-50 group">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-navy transition-colors">
                  <item.icon className="text-3xl text-brand-navy group-hover:text-brand-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Trust & Partners */}
        <section className="bg-gray-50 py-16 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400 font-bold uppercase tracking-widest mb-8 text-sm">
              {t('trusted_by', 'شركاء النجاح')}
            </p>
            <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
              {/* Placeholders for logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 flex items-center font-bold text-2xl text-gray-400">
                  PARTNER {i}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SEO Content Block */}
        <section className="container mx-auto px-4 py-20">
          <div className="prose max-w-4xl mx-auto text-gray-600">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">سوق السيارات والعقارات الأول في مصر</h3>
            <p className="mb-4">
              تعتبر ClutchZone المنصة الرائدة في مصر لبيع وشراء السيارات الفاخرة والعقارات المميزة. سواء كنت تبحث عن سيارة أحلامك أو منزلك الجديد، نوفر لك مجموعة واسعة من الخيارات التي تناسب احتياجاتك.
            </p>
            <p>
              نغطي جميع مناطق مصر بما في ذلك القاهرة الجديدة، التجمع الخامس، الشيخ زايد، والساحل الشمالي. تصفح أحدث الموديلات من بي إم دبليو، مرسيدس، وبورش، أو اكتشف الفلل والشقق الفاخرة بأفضل الأسعار.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
