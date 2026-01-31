
import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CarCard from '../components/listings/CarCard';
import PropertyCard from '../components/listings/PropertyCard';
import SmartSearch from '../components/ui/SmartSearch';
import HeroSlider, { HeroSlide } from '../components/ui/HeroSlider';
import SEO from '../components/SEO';
import { FaCheckCircle, FaShieldAlt, FaHandshake, FaCamera, FaCar, FaBuilding } from 'react-icons/fa';
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
        fetch('https://clutchzone-backend.onrender.com/api/properties?featured=true&limit=3').then(r => r.json()).catch(() => [])
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
    { _id: '3', title: 'Modern Office in Capital Business Park', price: 4200000, area: 120, rooms: 2, baths: 1, location: 'Sheikh Zayed', purpose: 'للبيع', featured: true, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  ];

  // Prepare Hero Slides
  const heroSlides: HeroSlide[] = [
    // Priority: Cars first
    ...cars.slice(0, 3).map(c => ({
      image: (c.images && c.images[0]) || c.imageUrl,
      title: c.title,
      price: c.price,
      subtitle: `${c.year} • ${c.km} KM`,
      link: `/cars/${c.slug || c._id}`,
      type: 'car' as const
    })),
    // Then Properties
    ...properties.slice(0, 2).map(p => ({
      image: (p.images && p.images[0]) || p.imageUrl,
      title: p.title,
      price: p.price,
      subtitle: `${p.location} • ${p.area} m²`,
      link: `/properties/${p.slug || p._id}`,
      type: 'property' as const
    }))
  ];

  // If no slides, add a default fallback
  if (heroSlides.length === 0) {
    heroSlides.push({
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
      title: t('hero_headline', 'انطلق بخياراتك الأفضل'),
      subtitle: t('hero_subheadline', 'سيارات فاخرة وعقارات مميزة في مكان واحد'),
      link: '/cars',
      ctaText: t('cta_cars', 'تصفح السيارات'),
    });
  }

  return (
    <>
      <SEO 
        title={t('home_title', 'ClutchZone - سوق السيارات والعقارات الفاخرة في مصر')}
        description={t('home_desc', 'اكتشف أفضل السيارات والعقارات في مصر مع ClutchZone. سوق متميز يجمع بين الفخامة والثقة.')}
      />
      <Header />
      
      <main className="bg-gray-50 min-h-screen pb-20">
        {/* 1. Hero Section (Dynamic Slider) */}
        <section className="relative">
          <HeroSlider slides={heroSlides} intervalMs={5000} />
          
          {/* Smart Search - Overlapping Hero Bottom */}
          <div className="container mx-auto px-4 relative z-20 -mt-24 md:-mt-32 mb-12">
            <SmartSearch />
          </div>
        </section>

        {/* 2. Featured Cars Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                  <FaCar />
                </div>
                <h2 className="text-3xl font-bold text-secondary">{t('featured_cars', 'سيارات مميزة')}</h2>
              </div>
              <Link href="/cars" className="text-primary font-bold hover:text-secondary transition-colors">
                {t('view_all', 'عرض الكل')} &larr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Featured Properties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-2xl">
                  <FaBuilding />
                </div>
                <h2 className="text-3xl font-bold text-secondary">{t('featured_properties', 'عقارات مميزة')}</h2>
              </div>
              <Link href="/properties" className="text-secondary font-bold hover:text-primary transition-colors">
                {t('view_all', 'عرض الكل')} &larr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Most Searched Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                  <FaSearch />
                </div>
                <h2 className="text-3xl font-bold text-secondary">{t('most_searched', 'الأكثر بحثًا')}</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Mock Most Searched Items - Mix of Cars and Properties */}
              {[
                { type: 'car', title: 'Mercedes-Benz C180', subtitle: '2024 • 0 KM', price: '4,200,000 EGP', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
                { type: 'property', title: 'فيلا في مراسي', subtitle: 'الساحل الشمالي • 350 م²', price: '25,000,000 EGP', img: 'https://images.unsplash.com/photo-1613490493576-2f045a129208?auto=format&fit=crop&q=80&w=600' },
                { type: 'car', title: 'Range Rover Velar', subtitle: '2023 • 15,000 KM', price: '6,800,000 EGP', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
                { type: 'property', title: 'شقة فندقية', subtitle: 'العاصمة الإدارية • 120 م²', price: '4,500,000 EGP', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600' },
              ].map((item, idx) => (
                <div key={idx} className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <span className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full ${item.type === 'car' ? 'bg-secondary' : 'bg-primary'}`}>
                      {item.type === 'car' ? 'سيارة' : 'عقار'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{item.subtitle}</p>
                    <p className="text-xl font-bold text-primary">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why ClutchZone */}
        <section className="py-20 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-16">{t('why_us', 'لماذا تختار ClutchZone؟')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <FaCheckCircle />, title: 'وسطاء معتمدين', desc: 'نتعامل فقط مع وكلاء ومطورين موثوقين' },
                { icon: <FaShieldAlt />, title: 'بيانات موثوقة', desc: 'مراجعة دقيقة لكل تفاصيل الإعلانات' },
                { icon: <FaHandshake />, title: 'بدون عمولات خفية', desc: 'شفافية كاملة في الأسعار والرسوم' },
                { icon: <FaCamera />, title: 'صور حقيقية', desc: 'نضمن لك تطابق الصور مع الواقع' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-4xl text-primary mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Trust Partners */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400 font-bold mb-8 uppercase tracking-widest text-sm">شركاء النجاح</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholders for logos */}
              {['BMW', 'Mercedes', 'Emaar', 'SODIC', 'Porsche'].map((brand) => (
                <span key={brand} className="text-2xl font-bold text-gray-300 hover:text-secondary cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 6. SEO Content Block */}
        <section className="py-12 bg-gray-50 text-gray-500 text-sm">
          <div className="container mx-auto px-4 max-w-4xl text-center leading-relaxed">
            <h3 className="font-bold text-gray-700 mb-4">سوق السيارات والعقارات الأول في مصر</h3>
            <p className="mb-4">
              يعتبر ClutchZone المنصة الرائدة لبيع وشراء السيارات الفاخرة والعقارات الراقية في مصر. 
              سواء كنت تبحث عن سيارة مرسيدس أو بي إم دبليو مستعملة بحالة الزيرو، أو تبحث عن فيلا في التجمع الخامس أو شقة في العاصمة الإدارية، 
              نحن نوفر لك أحدث العروض من أكبر المعارض والمطورين العقاريين.
            </p>
            <p>
              تصفح آلاف الإعلانات الموثقة بالصور والأسعار الحقيقية. خدمة عملاء متميزة وتجربة مستخدم سهلة وآمنة تضمن لك الوصول لما تبحث عنه بأسرع وقت.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HomePage;
