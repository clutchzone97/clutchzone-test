export function buildCanonical(pathname: string, host?: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (host ? `https://${host}` : '');
  if (!base) return '';
  if (pathname.startsWith('http')) return pathname;
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return `${base}${pathname}`;
}

export function metaDescriptionFromText(text?: string, fallback = 'Clutch Zone') {
  if (!text) return fallback;
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 300 ? clean.slice(0, 297) + '...' : clean;
}
