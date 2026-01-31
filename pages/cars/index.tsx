
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/listings/CarCard';

type CarDoc = {
  _id: string;
  title?: string;
  brand?: string;
  model?: string;
  slug?: string;
  images?: string[];
  imageUrl?: string;
  price?: number;
  year?: number;
  km?: number;
  transmission?: string;
  fuel?: string;
  featured?: boolean;
};

type Props = {
  cars: CarDoc[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch('https://clutchzone-backend.onrender.com/api/cars', {
      headers: { 'Accept': 'application/json' }
    });
    const data = res.ok ? await res.json() : [];
    return {
      props: { cars: Array.isArray(data) ? data : [] },
      revalidate: 60
    };
  } catch {
    return { props: { cars: [] }, revalidate: 60 };
  }
};

export default function CarsIndex({ cars }: Props) {
  const title = 'سيارات للبيع | ClutchZone';
  const description = metaDescriptionFromText('اكتشف أفخم السيارات المستعملة والجديدة في مصر.');
  const canonical = buildCanonical('/cars');

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
          <h1 className="text-3xl font-bold text-secondary mb-8 border-r-4 border-primary pr-4">سيارات للبيع</h1>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((c) => (
                <CarCard key={c._id} car={c} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>لا توجد سيارات متاحة حالياً.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
