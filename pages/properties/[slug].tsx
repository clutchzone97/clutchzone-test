import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { buildCanonical, metaDescriptionFromText } from '@/utils/seo';

type PropertyDoc = {
  _id: string;
  title?: string;
  type?: string;
  location?: string;
  description?: string;
  price?: number;
  images?: string[];
  imageUrl?: string;
  slug?: string;
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
  const title = property.title || `${property.type || ''} - ${property.location || ''}`.trim() || 'عقار';
  const description = metaDescriptionFromText(property.description, `تفاصيل ${title}`);
  const img = (property.images && property.images[0]) || property.imageUrl || '';
  const canonical = buildCanonical(`/properties/${property.slug || property._id}`, host);

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
        {typeof property.price === 'number' && <p>السعر: {property.price}</p>}
        {property.location && <p>الموقع: {property.location}</p>}
        {property.description && <p>{property.description}</p>}
      </main>
    </>
  );
}
