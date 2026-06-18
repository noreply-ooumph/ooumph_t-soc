import { useEffect } from 'react';

interface HelmetProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function Helmet({
  title,
  description = "T-SOC is New Delhi's premier Trust School of Communications. We reject consumer-grade corporate fluff to equip executives with rigid, jargon-free strategic frameworks.",
  canonicalUrl,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogImage = 'https://tsoc.com/og-image.jpg',
  ogUrl,
}: HelmetProps) {
  
  const fullTitle = `${title} | T-SOC Communications New Delhi`;
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgUrl = ogUrl || canonicalUrl || 'https://tsoc.com';

  useEffect(() => {
    // 1. Title Update
    document.title = fullTitle;

    // Helper to get or create meta tags by attribute (e.g. name or property)
    const updateOrCreateMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    updateOrCreateMeta('name', 'description', description);
    updateOrCreateMeta('name', 'robots', 'index, follow');

    // 3. Open Graph Tags
    updateOrCreateMeta('property', 'og:title', resolvedOgTitle);
    updateOrCreateMeta('property', 'og:description', resolvedOgDescription);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:url', resolvedOgUrl);
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:site_name', 'T-SOC DELHI');

    // 4. Twitter Card Tags
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', resolvedOgTitle);
    updateOrCreateMeta('name', 'twitter:description', resolvedOgDescription);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

    // 5. Canonical URL
    if (canonicalUrl) {
      let linkCan = document.querySelector('link[rel="canonical"]');
      if (!linkCan) {
        linkCan = document.createElement('link');
        linkCan.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCan);
      }
      linkCan.setAttribute('href', canonicalUrl);
    }
  }, [fullTitle, description, canonicalUrl, ogType, resolvedOgTitle, resolvedOgDescription, ogImage, resolvedOgUrl]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={resolvedOgUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="T-SOC DELHI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </>
  );
}
