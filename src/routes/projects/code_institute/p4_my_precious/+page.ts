// src/routes/projects/code_institute/my_precious/+page.ts
import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';

export const _indexEntry = {
  type: 'project',
  title: 'My Precious — Collection Tracker',
  description:
    'Django-based CRUD app for managing a personal collection, with login required before accessing entries.',
  tags: ['Python', 'Django', 'CRUD', 'Auth', 'Responsive'],
  image: '/images/projects/code_institute/p4_my_precious.jpg'
};

const TITLE = 'My Precious — Collection Tracker';
const DESCRIPTION =
  'Django-based CRUD app for managing a personal or valuable collection. Includes authentication, item creation, editing, deletion, and a responsive UI.';
const CANONICAL = 'https://pecuk.dev/projects/code_institute/my_precious';
const IMAGE = 'https://pecuk.dev/images/projects/code_institute/my_precious.jpg';
const LIVE_URL =
  'https://project-4-django-my-precious-180ebe0871af.herokuapp.com/users/user_login/?next=/';
const GITHUB_URL = 'https://github.com/Tomosius/My_Precious';

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
      alternativeHeadline: 'Django CRUD collection app',
      description: DESCRIPTION,
      image: IMAGE,
      url: CANONICAL,
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
      // placeholders — adjust if you have real dates
      datePublished: '2025-10-15',
      dateModified: '2025-10-20',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': CANONICAL
      },
      potentialAction: [
        {
          '@type': 'ViewAction',
          target: [LIVE_URL],
          name: 'View live app'
        },
        {
          '@type': 'ViewAction',
          target: [GITHUB_URL],
          name: 'View source'
        }
      ]
    },
    // 2) breadcrumb: projects → code institute → this project
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