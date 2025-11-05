// src/routes/projects/+page.ts
import type { PageLoad } from './$types';
import { SITE_URL, type MetaTags } from '$lib';

const CANONICAL = `${SITE_URL}/projects`;
const TITLE = 'Projects | pecuk.dev';
const DESCRIPTION = 'Projects made by Tomas Pecukevicius.';

export const load: PageLoad = async ({ parent }) => {
  const { metaTags: parentMeta } = await parent();

  const pageMetaTags: MetaTags = {
    ...parentMeta,
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    openGraph: {
      ...(parentMeta.openGraph ?? {}),
      title: TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      type: 'website',
      site_name: 'pecuk.dev',
      locale: 'en_GB'
    },
    twitter: {
      ...(parentMeta.twitter ?? {}),
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION
    }
  };

  // optional — layout already added a CollectionPage
  const pageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESCRIPTION,
      url: CANONICAL
    }
  ];

  return {
    pageMetaTags,
    pageJsonLd
  };
};