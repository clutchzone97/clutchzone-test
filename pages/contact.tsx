import React from 'react';
import type { GetStaticProps } from 'next';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

type Props = { ok: boolean };

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { ok: true } };
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { settings } = useSiteSettings();
  
  const phone = settings.phone || '011500978111';
  const email = settings.email || 'clutchzone97@gmail.com';
  const address = 'مصر'; // You can update this if there is a specific address
  const hours = (settings as any).businessHours || 'السبت - الخميس: 9:00 - 18:00';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO 
        title="اتصل بنا"
        description="تواصل مع فريق Clutch Zone للاستفسارات والدعم."
        canonical="/contact"
      />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-12">{t('contact_us')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6 text-primary border-b pb-4">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-primary ml-4">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">الهاتف</h3>
                    <p className="text-gray-600 dir-ltr text-right">{phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 ml-4">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600 ml-4">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">{hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-full text-red-600 ml-4">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">العنوان</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Message Form (Placeholder for now) */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6 text-secondary border-b pb-4">أرسل لنا رسالة</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">الاسم</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary" placeholder="اسمك" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني</label>
                  <input type="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary" placeholder="بريدك الإلكتروني" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">الرسالة</label>
                  <textarea className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary h-32" placeholder="اكتب رسالتك هنا..."></textarea>
                </div>
                <button className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary-dark transition duration-300">
                  إرسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
