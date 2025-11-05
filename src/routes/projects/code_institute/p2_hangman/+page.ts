// src/routes/projects/code_institute/p2_hangman/+page.ts
import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';

export const _indexEntry = {
  type: 'project',
  title: 'HangMan — Word Guessing Game',
  description:
    'A browser-based hangman-style game built to practice JavaScript DOM manipulation, game state management, and responsive UI.',
  tags: ['HTML', 'CSS', 'JavaScript', 'Game'],
  image: '/images/projects/code_institute/p2_hangman_small.jpg'
};

const TITLE = 'HangMan — Word Guessing Game';
const DESCRIPTION =
  'A browser-based hangman-style game built to practice JavaScript DOM manipulation, game state management, and responsive UI.';
const CANONICAL = 'https://pecuk.dev/projects/code_institute/p2_hangman';
const IMAGE = 'https://pecuk.dev/images/projects/code_institute/p2_hangman.jpg';

export const load: PageLoad = async ({ parent }) => {
  const { metaTags: baseMeta } = await parent();

  const pageMetaTags: MetaTags = {
    ...baseMeta,
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    openGraph: {
      ...(baseMeta.openGraph ?? {}),
      type: 'website',
      title: TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      image: IMAGE,
      site_name: 'pecuk.dev'
    },
    twitter: {
      ...(baseMeta.twitter ?? {}),
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
      image: IMAGE
    }
  };

  const pageJsonLd = [
    // 1) the project itself
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      headline: TITLE,
      alternativeHeadline: 'JavaScript Hangman Game',
      description: DESCRIPTION,
      image: IMAGE,
      author: {
        '@type': 'Person',
        name: 'Tomas Pecukevicius',
        url: 'https://pecuk.dev/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'pecuk.dev',
        url: 'https://pecuk.dev',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pecuk.dev/brand/logo.png'
        }
      },
      // update these once you have real dates
      datePublished: '2025-10-15',
      dateModified: '2025-10-20',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': CANONICAL
      }
    },
    // 2) breadcrumb all the way down
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Projects',
          item: 'https://pecuk.dev/projects'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Code Institute Projects',
          item: 'https://pecuk.dev/projects/code_institute'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: TITLE,
          item: CANONICAL
        }
      ]
    }
  ];

  return { pageMetaTags, pageJsonLd };
};