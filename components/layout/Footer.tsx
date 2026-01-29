
import React from 'react';
import { FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import Logo from '../ui/Logo';
import Link from 'next/link';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { settings } = useSiteSettings();
  const phone = settings.phone || '011500978111';
  const email = settings.email || 'clutchzone97@gmail.com';
  const facebook = settings.socialLinks?.facebook || '#';
  const twitter = settings.socialLinks?.twitter || 'https://x.com/';
  const instagram = settings.socialLinks?.instagram || '#';
  const youtube = settings.socialLinks?.youtube || '#';
  const tiktok = (settings.socialLinks as any)?.tiktok || '#';
  const hours = (settings as any).businessHours || 'السبت - الخميس: 9:00 - 18:00';
  
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer_desc', 'ClutchZone هو وجهتك الأولى لشراء وبيع السيارات الفاخرة والعقارات المميزة في مصر. نوفر لك تجربة استثنائية تجمع بين الفخامة والثقة.')}
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">{t('quick_links_title', 'روابط سريعة')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cars" className="text-gray-400 hover:text-brand-gold transition-colors">{t('nav_cars', 'سيارات')}</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-brand-gold transition-colors">{t('nav_properties', 'عقارات')}</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-brand-gold transition-colors">{t('nav_about', 'من نحن')}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-gold transition-colors">{t('nav_contact', 'تواصل معنا')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">{t('contact_title', 'معلومات التواصل')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center text-gray-400 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center me-3 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                  <FaPhone />
                </div>
                <span dir="ltr">{phone}</span>
              </li>
              <li className="flex items-center text-gray-400 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center me-3 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                  <FaEnvelope />
                </div>
                <span>{email}</span>
              </li>
              <li className="flex items-center text-gray-400 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center me-3 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                  <FaClock />
                </div>
                <span>{hours}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">{t('follow_us_title', 'تابعنا')}</h3>
            <div className="flex gap-3">
              <a href={facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-navy transition-all">
                <FaFacebook size={18} />
              </a>
              <a href={instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-navy transition-all">
                <FaInstagram size={18} />
              </a>
              <a href={twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-navy transition-all">
                <FaXTwitter size={18} />
              </a>
              <a href={youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-navy transition-all">
                <FaYoutube size={18} />
              </a>
              <a href={tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-navy transition-all">
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ClutchZone. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
