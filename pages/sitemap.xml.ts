import type { GetServerSideProps } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://clutchzone.co';

function toUrl(path: string) {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${BASE}${path}`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const cars = await fetch('https://clutchzone-backend.onrender.com/api/cars').then(r => r.ok ? r.json() : []).catch(() => []);
  const properties = await fetch('https://clutchzone-backend.onrender.com/api/properties').then(r => r.ok ? r.json() : []).catch(() => []);

  const carUrls: string[] = Array.isArray(cars) ? cars.map((c: any) => toUrl(`/cars/${c.slug || c._id}`)) : [];
  const propertyUrls: string[] = Array.isArray(properties) ? properties.map((p: any) => toUrl(`/properties/${p.slug || p._id}`)) : [];

  const urls = [
    toUrl('/'),
    toUrl('/cars'),
    toUrl('/properties'),
    toUrl('/about'),
    toUrl('/contact'),
    ...carUrls,
    ...propertyUrls
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=600');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
