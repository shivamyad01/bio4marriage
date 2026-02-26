import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bio4marriage.com';

  const staticPages = [
    '', '/templates', '/create', '/about',
    '/contact', '/faq', '/blog', '/privacy', '/terms',
    '/help', '/support', '/mission', '/careers',
  ];

  const religions = ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain'];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : path === '/templates' ? 0.9 : 0.7,
    })),
    ...religions.map((religion) => ({
      url: `${baseUrl}/templates?religion=${religion}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
