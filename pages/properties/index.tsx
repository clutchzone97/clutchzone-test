
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/listings/PropertyCard';

type PropertyDoc = {
  _id: string;
  title: string;
  type?: string;
  purpose?: string;
  price?: number;
  area?: number;
  rooms?: number;
  baths?: number;
  location?: string;
  images?: string[];
  imageUrl?: string;
  featured?: boolean;
  slug?: string;
};

type Props = {
  properties: PropertyDoc[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch('https://clutchzone-backend.onrender.com/api/properties', {
      headers: { 'Accept': 'application/json' }
    });
    const data = res.ok ? await res.json() : [];
    return {
      props: { properties: Array.isArray(data) ? data : [] },
      revalidate: 60
    };
  } catch {
    return { props: { properties: [] }, revalidate: 60 };
  }
};

export default function PropertiesIndex({ properties }: Props) {
  const title = 'عقارات للبيع والإيجار | ClutchZone';
  const description = metaDescriptionFromText('اكتشف أفضل العقارات في مصر. فلل، شقق، ومحلات تجارية.');
  const canonical = buildCanonical('/properties');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
      </Head>
      <Header />
      <main className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-secondary mb-8 border-r-4 border-primary pr-4">عقارات مميزة</h1>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>لا توجد عقارات متاحة حالياً.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
