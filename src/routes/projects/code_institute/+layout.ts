// src/routes/projects/code_institute/+layout.ts
import type { LayoutLoad } from './$types';
import { SITE_URL, type MetaTags } from '$lib';

const SECTION_URL = `${SITE_URL}/projects/code_institute`;

export const load: LayoutLoad = async ({ parent }) => {
  const {
    metaTags: parentMeta = {},
    seoMetaStack = [],
    seoJsonLdStack = []
  } = await parent();

  const metaOverrides: Partial<MetaTags> = {
    title: 'Code Institute Projects | pecuk.dev',
    description: 'Projects completed as part of Code Institute.',
    canonical: SECTION_URL,
    openGraph: {
      ...(parentMeta.openGraph ?? {}),
      title: 'Code Institute Projects | pecuk.dev',
      description: 'Projects completed as part of Code Institute.',
      url: SECTION_URL
    },
    twitter: {
      ...(parentMeta.twitter ?? {}),
      title: 'Code Institute Projects | pecuk.dev',
      description: 'Projects completed as part of Code Institute.'
    }
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Code Institute Projects',
      description: 'Projects completed as part of Code Institute.',
      url: SECTION_URL
    }
  ];

  return {
    metaTags: {
      ...parentMeta,
      ...metaOverrides,
      openGraph: {
        ...(parentMeta.openGraph ?? {}),
        ...(metaOverrides.openGraph ?? {})
      },
      twitter: {
        ...(parentMeta.twitter ?? {}),
        ...(metaOverrides.twitter ?? {})
      }
    },
    seoMetaStack: [...seoMetaStack, metaOverrides],
    seoJsonLdStack: [...seoJsonLdStack, ...jsonLd]
  };
};