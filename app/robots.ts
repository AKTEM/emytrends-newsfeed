import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin/',
          '/wp-content/',
          '/wp-includes/',
          '/api/',
          '/dashboard/',
          '/auth/',
          '/admin/',
          '/*.json',
          '/*?*utm_*',
          '/*?*fbclid*',
          '/*?*gclid*'
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      }
    ],
    sitemap: [
      'https://www.mapleepoch.com/sitemap.xml',
      'https://www.mapleepoch.com/sitemap-news'
    ],
    host: 'https://www.mapleepoch.com'
  };
}