
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/ui/ImageGallery';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaWhatsapp, FaPhoneAlt, FaCheck, FaBuilding } from 'react-icons/fa';

type PropertyDoc = {
  _id: string;
  title?: string;
  type?: string;
  location?: string;
  description?: string;
  price?: number;
  area?: number;
  rooms?: number;
  baths?: number;
  purpose?: string;
  images?: string[];
  imageUrl?: string;
  slug?: string;
  features?: string[];
  finishing?: string;
};

type Props = {
  property: PropertyDoc;
  host?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug || '');
  const host = ctx.req.headers['host'] || undefined;
  const url = `https://clutchzone-backend.onrender.com/api/properties/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) {
      return { notFound: true };
    }
    const data = await res.json();
    if (!data || data.message === 'Property not found') {
      return { notFound: true };
    }
    return { props: { property: data, host } };
  } catch {
    return { notFound: true };
  }
};

export default function PropertyPage({ property, host }: Props) {
  const title = property.title || `${property.type || ''} - ${property.location || ''}`.trim() || 'عقار مميز';
  const description = metaDescriptionFromText(property.description, `تفاصيل ${title}`);
  const images = property.images && property.images.length > 0 ? property.images : (property.imageUrl ? [property.imageUrl] : []);
  const canonical = buildCanonical(`/properties/${property.slug || property._id}`, host);

  const formatPrice = (price?: number) => {
    return price 
      ? new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(price)
      : 'السعر عند الاتصال';
  };

  const specs = [
    { icon: <FaRulerCombined />, label: 'المساحة', value: property.area ? `${property.area} م²` : null },
    { icon: <FaBed />, label: 'غرف النوم', value: property.rooms },
    { icon: <FaBath />, label: 'الحمامات', value: property.baths },
    { icon: <FaBuilding />, label: 'النوع', value: property.type },
    { icon: <FaCheck />, label: 'التشطيب', value: property.finishing },
    { icon: <FaCheck />, label: 'الغرض', value: property.purpose },
  ].filter(s => s.value);

  return (
    <>
      <Head>
        <title>{title} | ClutchZone</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {images[0] && <meta property="og:image" content={images[0]} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      
      <Header />
      
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-primary">الرئيسية</a>
            <span className="mx-2">/</span>
            <a href="/properties" className="hover:text-primary">العقارات</a>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-bold">{title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Right Column: Gallery & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                <ImageGallery images={images} alt={title} />
              </div>

              {/* Specs Grid */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-secondary mb-6 border-r-4 border-primary pr-3">تفاصيل العقار</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-primary text-xl">{spec.icon}</div>
                      <div>
                        <p className="text-xs text-gray-400">{spec.label}</p>
                        <p className="font-bold text-secondary">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-secondary mb-4 border-r-4 border-primary pr-3">الوصف</h3>
                  <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-secondary mb-4 border-r-4 border-primary pr-3">المرافق والمميزات</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <FaCheck className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Left Column: Price & Contact (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <h1 className="text-2xl font-bold text-secondary mb-2 leading-tight">{title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
                   <FaMapMarkerAlt className="text-primary" />
                   {property.location}
                </div>
                
                <div className="text-3xl font-bold text-primary mb-8">
                  {formatPrice(property.price)}
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-secondary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-lg">
                    <FaPhoneAlt />
                    <span>إظهار رقم الهاتف</span>
                  </button>
                  <button className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg">
                    <FaWhatsapp className="text-xl" />
                    <span>تواصل عبر واتساب</span>
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-400 mb-2">معرف الإعلان: {property._id.substring(0, 8)}</p>
                  <p className="text-xs text-gray-300">تم النشر عبر ClutchZone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
