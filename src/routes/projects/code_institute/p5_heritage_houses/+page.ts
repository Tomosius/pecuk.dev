// src/routes/projects/code_institute/heritage_houses_p5/+page.ts
import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';

export const _indexEntry = {
  type: 'project',
  title: 'Heritage Houses — Full-Stack Django App',
  description:
    'A full-stack Django application for showcasing and managing heritage properties, built as a Code Institute milestone project.',
  tags: ['Python', 'Django', 'Full-stack', 'CRUD', 'Responsive'],
  image: '/images/projects/code_institute/p5_heritage_housing_small.jpg'
};

const TITLE = 'Heritage Houses — Full-Stack Django App';
const DESCRIPTION =
  'A full-stack Django application for showcasing and managing heritage properties, with authentication, structured content, and responsive templates.';
const CANONICAL = 'https://pecuk.dev/projects/code_institute/heritage_houses_p5';
const IMAGE = 'https://pecuk.dev/images/projects/code_institute/heritage_houses_p5.jpg';

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
      alternativeHeadline: 'Code Institute Full-Stack Project',
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
      // put real dates once you have them
      datePublished: '2025-10-15',
      dateModified: '2025-10-20',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': CANONICAL
      }
    },
    // 2) breadcrumb chain: Projects → Code Institute Projects → This project
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

  return {
    pageMetaTags,
    pageJsonLd
  };
};