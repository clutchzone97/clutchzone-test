import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../ui/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation Links
  const navLinks = [
    { label: t('nav_home', 'الرئيسية'), path: '/' },
    { label: t('nav_cars', 'سيارات'), path: '/cars' },
    { label: t('nav_properties', 'عقارات'), path: '/properties' },
    { label: t('nav_about', 'من نحن'), path: '/about' },
    { label: t('nav_contact', 'تواصل معنا'), path: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-secondary shadow-lg transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-lg font-medium transition-colors ${
                router.pathname === link.path
                  ? 'text-accent-2'
                  : 'text-white hover:text-accent-2'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions (Lang + CTA) */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <LanguageSwitcher />
          {/* Optional CTA */}
          {/* <Link
            href="/list-item"
            className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-primary-hover transition-all"
          >
            {t('list_your_item', 'أضف إعلانك')}
          </Link> */}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary shadow-xl border-t border-white/10 p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block text-lg font-medium ${
                router.pathname === link.path ? 'text-accent-2' : 'text-white'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
