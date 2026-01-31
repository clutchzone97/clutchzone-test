
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export interface HeroSlide {
  image: string;
  title: string;
  subtitle?: string; // or price
  price?: string | number;
  link: string;
  ctaText?: string;
  type?: 'car' | 'property';
}

interface HeroSliderProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, intervalMs = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  // Auto-rotate
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides, intervalMs]);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div 
      className="relative h-[600px] md:h-[80vh] w-full overflow-hidden bg-secondary"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[6000ms] ease-out scale-105 hover:scale-110"
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              transform: index === current ? 'scale(1.1)' : 'scale(1.0)'
            }}
          />
          
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-90" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20 px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
              {slide.type && (
                <span className="inline-block px-4 py-1 rounded-full bg-primary text-white text-sm font-bold tracking-wide uppercase mb-2">
                  {slide.type === 'car' ? 'سيارة مميزة' : 'عقار مميز'}
                </span>
              )}
              
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {slide.title}
              </h2>
              
              {slide.price && (
                <p className="text-2xl md:text-3xl text-accent-2 font-bold">
                  {typeof slide.price === 'number' 
                    ? new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(slide.price)
                    : slide.price}
                </p>
              )}

              {slide.subtitle && (
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
              )}
              
              <div className="pt-6">
                <Link
                  href={slide.link}
                  className="inline-block px-10 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-white hover:text-secondary transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1"
                >
                  {slide.ctaText || 'عرض التفاصيل'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
