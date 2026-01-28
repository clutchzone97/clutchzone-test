import Head from 'next/head';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';

type CarDoc = {
  _id: string;
  title?: string;
  brand?: string;
  model?: string;
  slug?: string;
  images?: string[];
  imageUrl?: string;
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
  const title = 'السيارات';
  const description = metaDescriptionFromText('قائمة السيارات المتاحة لدى Clutch Zone.');
  const canonical = buildCanonical('/cars');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
      </Head>
      <main>
        <h1>{title}</h1>
        <ul>
          {cars.map((c) => {
            const t = c.title || `${c.brand || ''} ${c.model || ''}`.trim() || 'سيارة';
            const img = (c.images && c.images[0]) || c.imageUrl || '';
            const href = `/cars/${c.slug || c._id}`;
            return (
              <li key={c._id} style={{ marginBottom: 16 }}>
                <Link href={href}>{t}</Link>
                {img && <img src={img} alt={t} style={{ maxWidth: 320 }} />}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
