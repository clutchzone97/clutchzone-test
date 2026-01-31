
import React from 'react';
import Link from 'next/link';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const Logo: React.FC = () => {
  const { settings } = useSiteSettings();
  const logo = settings.logoUrl || '';
  const h = typeof settings.logoHeight === 'number' ? settings.logoHeight : 40;
  const w = typeof settings.logoWidth === 'number' ? settings.logoWidth : undefined;

  if (logo) {
    return (
      <Link href="/" aria-label="الانتقال إلى الصفحة الرئيسية">
        <img
          src={logo}
          alt="Clutch Zone"
          className="object-contain"
          style={{ height: h ? `${h}px` : undefined, width: w ? `${w}px` : undefined }}
        />
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="الانتقال إلى الصفحة الرئيسية" className="inline-block">
      <div className="text-2xl font-bold tracking-wider font-cairo">
        <span className="text-white">CLUTCH</span>
        <span className="text-primary">ZONE</span>
      </div>
    </Link>
  );
};

export default Logo;
