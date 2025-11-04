// src/routes/projects/+page.ts
import type { PageLoad } from './$types';

const SITE_URL = 'https://pecuk.dev';

export const load: PageLoad = async () => {
  const title = 'Projects | pecuk.dev';
  const description = 'Projects made by Tomas Pecukevicius.';
  const canonical = `${SITE_URL}/projects`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects | pecuk.dev',
    description,
    url: canonical
  };

  return {
    seo: {
      title,
      description,
      canonical,
      og: {
        title,
        description,
        url: canonical,
        type: 'website',
        siteName: 'pecuk.dev',
        locale: 'en_GB'
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description
      },
      jsonLd
    }
  };
};