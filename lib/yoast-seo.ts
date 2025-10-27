import { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp/v2', '') || 'https://cms.emytrends.com/wp/wp-json';
const FRONTEND_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://emytrends.com';

interface YoastSEOResponse {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_url?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }> | string;
  og_site_name?: string;
  og_locale?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: any;
}

/**
 * Fetches Yoast SEO data for the homepage
 */
export async function getHomepageYoastSEO(): Promise<YoastSEOResponse | null> {
  try {
    const response = await fetch(
      `${API_URL}/yoast/v1/get_head?url=${FRONTEND_URL}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch homepage Yoast SEO: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.json || data; // Handle different response formats
  } catch (error) {
    console.error('Error fetching homepage Yoast SEO:', error);
    return null;
  }
}

/**
 * Fetches Yoast SEO data for a specific post by slug
 */
export async function getPostYoastSEO(slug: string): Promise<YoastSEOResponse | null> {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?slug=${slug}&_fields=yoast_head_json&status=publish`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch post Yoast SEO for slug "${slug}": ${response.status}`);
      return null;
    }

    const posts = await response.json();
    return posts[0]?.yoast_head_json || null;
  } catch (error) {
    console.error(`Error fetching post Yoast SEO for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches Yoast SEO data for a category page
 */
export async function getCategoryYoastSEO(categorySlug: string): Promise<YoastSEOResponse | null> {
  try {
    const response = await fetch(
      `${API_URL}/yoast/v1/get_head?url=${FRONTEND_URL}/${categorySlug}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch category Yoast SEO for "${categorySlug}": ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.json || data; // Handle different response formats
  } catch (error) {
    console.error(`Error fetching category Yoast SEO for "${categorySlug}":`, error);
    return null;
  }
}

/**
 * Converts Yoast SEO data to Next.js Metadata format
 */
export function yoastToNextMetadata(yoast: YoastSEOResponse | null, fallbackTitle?: string, fallbackDescription?: string): Metadata {
  if (!yoast) {
    return {
      title: fallbackTitle || 'Emytrends - Breaking News & Latest Updates',
      description: fallbackDescription || 'Stay informed with real-time coverage of breaking news from around the world.',
    };
  }

  // Handle Open Graph images
  let ogImages: Array<{ url: string; width?: number; height?: number; alt?: string }> = [];
  if (yoast.og_image) {
    if (Array.isArray(yoast.og_image)) {
      ogImages = yoast.og_image.map(img => ({
        url: img.url,
        width: img.width || 1200,
        height: img.height || 630,
        alt: img.alt || yoast.title || '',
      }));
    } else if (typeof yoast.og_image === 'string') {
      ogImages = [{
        url: yoast.og_image,
        width: 1200,
        height: 630,
        alt: yoast.title || '',
      }];
    }
  }

  // Handle Twitter images
  let twitterImages: string[] = [];
  if (yoast.twitter_image) {
    twitterImages = [yoast.twitter_image];
  } else if (ogImages.length > 0) {
    twitterImages = [ogImages[0].url];
  }

  return {
    title: yoast.title || fallbackTitle || 'Emytrends',
    description: yoast.description || fallbackDescription || 'Breaking news and latest updates',
    alternates: {
      canonical: yoast.canonical || undefined,
    },
    openGraph: {
      title: yoast.og_title || yoast.title || fallbackTitle || 'Emytrends',
      description: yoast.og_description || yoast.description || fallbackDescription || 'Breaking news and latest updates',
      url: yoast.og_url || undefined,
      siteName: yoast.og_site_name || 'Emytrends',
      images: ogImages,
      locale: yoast.og_locale || 'en_US',
      type: (yoast.og_type as any) || 'website',
    },
    twitter: {
      card: (yoast.twitter_card as any) || 'summary_large_image',
      title: yoast.twitter_title || yoast.og_title || yoast.title || fallbackTitle || 'Emytrends',
      description: yoast.twitter_description || yoast.og_description || yoast.description || fallbackDescription || 'Breaking news and latest updates',
      images: twitterImages,
    },
  };
}

/**
 * Generates fallback metadata when Yoast data is not available
 */
export function generateFallbackMetadata(title?: string, description?: string, slug?: string): Metadata {
  const pageTitle = title || 'Emytrends - Breaking News & Latest Updates';
  const pageDescription = description || 'Stay informed with real-time coverage of breaking news, politics, business, technology, health, sports, and entertainment.';
  const pageUrl = slug ? `${FRONTEND_URL}/article/${slug}` : FRONTEND_URL;
  
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: 'Emytrends',
      images: [{
        url: `${FRONTEND_URL}/img/Maple.png`,
        width: 1200,
        height: 630,
        alt: 'Emytrends News',
      }],
      locale: 'en_US',
      type: slug ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${FRONTEND_URL}/img/Maple.png`],
    },
  };
}