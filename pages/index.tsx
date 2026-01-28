import React, { useEffect, useMemo, useState } from 'react';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import WakeServerOverlay from "../components/ui/WakeServerOverlay";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CarCard from '../components/listings/CarCard';
import PropertyCard from '../components/listings/PropertyCard';
import { FaCar, FaBuilding, FaTags, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';
import api from '../utils/api';
import { useSiteSettings } from '../context/SiteSettingsContext';
import HeroSlider from '../components/ui/HeroSlider';
import SEO from '../components/SEO';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Define interface for data props if you want to pre-fetch for SSR/SSG
interface HomeProps {
  // We can choose to pre-fetch or keep it client-side. 
  // Since the original was CSR, let's keep it CSR for dynamic data or switch to ISR.
  // Let's use ISR for featured items for better SEO and performance.
  initialFeaturedCars?: any[];
  initialFeaturedProperties?: any[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // Optional: Fetch initial data at build time (ISR)
  // If backend is not available at build time, we can return empty arrays and fetch client-side.
  // For now, let's try to fetch, but fallback gracefully.
  let initialFeaturedCars = [];
  let initialFeaturedProperties = [];

  try {
     // Note: In build time, localhost might not be reachable if backend is external or not running.
     // If backend is external (Render), it should work.
     const [carsRes, propsRes] = await Promise.all([
        fetch('https://clutchzone-backend.onrender.com/api/cars?featured=true&sort=newest').then(r => r.json()),
        fetch('https://clutchzone-backend.onrender.com/api/properties?featured=true').then(r => r.json())
     ]);
     initialFeaturedCars = carsRes || [];
     initialFeaturedProperties = propsRes || [];
  } catch (e) {
    console.error("Failed to fetch initial data for home:", e);
  }

  return {
    props: {
      initialFeaturedCars,
      initialFeaturedProperties
    },
    revalidate: 60 // Revalidate every minute
  };
};

const HomePage: React.FC<HomeProps> = ({ initialFeaturedCars, initialFeaturedProperties }) => {
  const { t } = useTranslation();
  const [featuredCars, setFeaturedCars] = useState<any[]>(initialFeaturedCars || []);
  const [featuredProperties, setFeaturedProperties] = useState<any[]>(initialFeaturedProperties || []);
  const { settings } = useSiteSettings();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pulse, setPulse] = useState(false);

  const slides = useMemo(() => {
    const carImgs = (featuredCars || []).map((c:any) => (c.images && c.images[0]) || c.imageUrl).filter(Boolean);
    const propImgs = (featuredProperties || []).map((p:any) => (p.images && p.images[0]) || p.imageUrl).filter(Boolean);
    const mix: string[] = [];
    const max = Math.max(carImgs.length, propImgs.length);
    for (let i=0;i<max;i++) {
      if (carImgs[i]) mix.push(carImgs[i]);
      if (propImgs[i]) mix.push(propImgs[i]);
    }
    return mix.length ? mix : ["https://picsum.photos/seed/hero/1920/1080"];
  }, [featuredCars, featuredProperties]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [slides]);

  useEffect(() => {
    if (!slides.length) return;
    const ms = settings.heroSlideIntervalMs ?? 3000;
    const timer = setInterval(() => {
      setCurrentSlide((i) => {
        const next = (i + 1) % slides.length;
        setPulse(true);
        setTimeout(() => setPulse(false), 250);
        return next;
      });
    }, ms);
    return () => clearInterval(timer);
  }, [slides, settings.heroSlideIntervalMs]);

  useEffect(() => {
    // Client-side refresh (optional, if we want fresh data on mount)
    // Or if initial props were empty.
    if (!initialFeaturedCars?.length && !initialFeaturedProperties?.length) {
        const load = async () => {
        try {
            const [carsRes, propsRes] = await Promise.all([
            api.get('/cars', { params: { featured: true, sort: 'newest' } }),
            api.get('/properties', { params: { featured: true } }),
            ]);
            setFeaturedCars(carsRes.data || []);
            setFeaturedProperties(propsRes.data || []);
        } catch {}
        };
        load();
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Clutch Zone",
    "url": "https://clutchzone.co",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://clutchzone.co/cars?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="bg-light">
      <SEO 
        title="سوق السيارات والعقارات في مصر"
        description="منصة مصرية موثوقة لشراء وبيع السيارات والعقارات. اكتشف أفضل العروض بأسعار تنافسية وخدمة دعم متميزة للمستخدمين في مصر."
        canonical="/"
        keywords="سيارات للبيع في مصر, عقارات للبيع في مصر, شقق للبيع, سيارات مستعملة"
        structuredData={structuredData}
      />
      <WakeServerOverlay />
      <Header />

      {/* Hero Section */}
      <div className="hide-hero-dots-mobile">
      <style>{`.hide-hero-dots-mobile .pointer-events-none.absolute.inset-x-0.bottom-3, .hide-hero-dots-mobile .pointer-events-none.absolute.inset-x-0.bottom-5 { display: none !important; }`}</style>
      <HeroSlider images={slides} heightClass="h-[500px] md:h-[600px]">
        <div className="flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in-up">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-md animate-fade-in-up delay-100">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Link href="/cars" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 flex items-center justify-center gap-2">
              <FaCar /> {t('browse_cars')}
            </Link>
            <Link href="/properties" className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 flex items-center justify-center gap-2">
              <FaBuilding /> {t('browse_properties')}
            </Link>
          </div>
        </div>
      </HeroSlider>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('why_choose_us')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <FaTags size={30} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('best_prices')}</h3>
              <p className="text-gray-600">{t('best_prices_desc')}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                <FaBuilding size={30} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('trusted_listings')}</h3>
              <p className="text-gray-600">{t('trusted_listings_desc')}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <FaHeadset size={30} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('support_24_7')}</h3>
              <p className="text-gray-600">{t('support_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('featured_cars')}</h2>
            <Link href="/cars" className="text-primary font-semibold hover:underline">
              {t('view_all')}
            </Link>
          </div>
          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCars.slice(0, 4).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">{t('no_cars_found')}</p>
          )}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('featured_properties')}</h2>
            <Link href="/properties" className="text-secondary font-semibold hover:underline">
              {t('view_all')}
            </Link>
          </div>
          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.slice(0, 4).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">{t('no_properties_found')}</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ready_to_start')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">{t('cta_desc')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              {t('contact_us')}
            </Link>
            <Link href="/about" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
              {t('nav_about')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
