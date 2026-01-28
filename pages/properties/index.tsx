import Head from 'next/head';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';

type PropertyDoc = {
  _id: string;
  title?: string;
  type?: string;
  location?: string;
  slug?: string;
  images?: string[];
  imageUrl?: string;
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
  const title = 'العقارات';
  const description = metaDescriptionFromText('قائمة العقارات المتاحة لدى Clutch Zone.');
  const canonical = buildCanonical('/properties');

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
          {properties.map((p) => {
            const t = p.title || `${p.type || ''} - ${p.location || ''}`.trim() || 'عقار';
            const img = (p.images && p.images[0]) || p.imageUrl || '';
            const href = `/properties/${p.slug || p._id}`;
            return (
              <li key={p._id} style={{ marginBottom: 16 }}>
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
