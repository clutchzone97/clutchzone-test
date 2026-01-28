import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';

type CarDoc = {
  _id: string;
  title?: string;
  brand?: string;
  model?: string;
  description?: string;
  price?: number;
  year?: number;
  km?: number;
  transmission?: string;
  fuel?: string;
  images?: string[];
  imageUrl?: string;
  slug?: string;
};

type Props = {
  car: CarDoc;
  host?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug || '');
  const host = ctx.req.headers['host'] || undefined;
  const url = `https://clutchzone-backend.onrender.com/api/cars/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) {
      return { notFound: true };
    }
    const data = await res.json();
    if (!data || data.message === 'Car not found') {
      return { notFound: true };
    }
    return { props: { car: data, host } };
  } catch {
    return { notFound: true };
  }
};

export default function CarPage({ car, host }: Props) {
  const title =
    car.title ||
    `${car.brand || ''} ${car.model || ''}`.trim() ||
    'سيارة';
  const description = metaDescriptionFromText(car.description, `تفاصيل ${title}`);
  const img = (car.images && car.images[0]) || car.imageUrl || '';
  const canonical = buildCanonical(`/cars/${car.slug || car._id}`, host);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {img && <meta property="og:image" content={img} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <main>
        <h1>{title}</h1>
        {img && <img src={img} alt={title} />}
        {typeof car.price === 'number' && <p>السعر: {car.price}</p>}
        {car.year && <p>الموديل: {car.year}</p>}
        {car.km && <p>عدد الكيلومترات: {car.km}</p>}
        {car.transmission && <p>ناقل الحركة: {car.transmission}</p>}
        {car.fuel && <p>نوع الوقود: {car.fuel}</p>}
        {car.description && <p>{car.description}</p>}
      </main>
    </>
  );
}
