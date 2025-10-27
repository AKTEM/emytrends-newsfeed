import { MetadataRoute } from 'next';

const API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.emytrends.com/wp/wp-json/wp/v2';
const FRONTEND_URL = 'https://www.emytrends.com';

interface WordPressPost {
  slug: string;
  modified: string;
  date: string;
}

/**
 * Formats a date string to ISO 8601 format required by Google
 * @param dateString - Date string from WordPress
 * @returns Properly formatted ISO date string
 */
function formatDateForSitemap(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date found: ${dateString}, using current date`);
      return new Date().toISOString();
    }
    
    // Return ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    return date.toISOString();
  } catch (error) {
    console.error(`Error formatting date ${dateString}:`, error);
    return new Date().toISOString();
  }
}

/**
 * Fetches all posts from WordPress with pagination
 * @returns Array of all posts with slug and modified date
 */
async function getAllPosts(): Promise<WordPressPost[]> {
  const allPosts: WordPressPost[] = [];
  let page = 1;
  let hasMorePosts = true;

  while (hasMorePosts) {
    try {
      const response = await fetch(
        `${API_URL}/posts?_fields=slug,modified,date&per_page=100&page=${page}&status=publish&orderby=modified&order=desc`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 1800 }, // Cache for 30 minutes
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch posts page ${page}: ${response.status}`);
        break;
      }

      const posts: WordPressPost[] = await response.json();
      
      if (posts.length === 0) {
        hasMorePosts = false;
      } else {
        allPosts.push(...posts);
        page++;
      }

      // Safety check to prevent infinite loops
      if (page > 100) {
        console.warn('Reached maximum page limit (100) for sitemap generation');
        break;
      }
    } catch (error) {
      console.error(`Error fetching posts page ${page}:`, error);
      break;
    }
  }

  return allPosts;
}

/**
 * Generates sitemap with all posts and static pages
 * @returns Sitemap entries for all content
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = formatDateForSitemap(new Date().toISOString());
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: FRONTEND_URL,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${FRONTEND_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/education`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/japa-routes`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/life-after-japa`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/tech-gadget`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/health`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/sports`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/finance`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/business-economy`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${FRONTEND_URL}/vibesncruise`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/maple-voices`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/through-the-lens`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${FRONTEND_URL}/shop-a-tale`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${FRONTEND_URL}/write-for-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${FRONTEND_URL}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  ];

  try {
    // Fetch all posts from WordPress
    const posts = await getAllPosts();
    
    // Map posts to sitemap entries
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${FRONTEND_URL}/article/${post.slug}`,
      lastModified: formatDateForSitemap(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    console.log(`Generated sitemap with ${staticPages.length} static pages and ${postEntries.length} posts`);
    
    // Validate all dates before returning
    const allEntries = [...staticPages, ...postEntries];
    const validatedEntries = allEntries.map(entry => ({
      ...entry,
      lastModified: entry.lastModified ? formatDateForSitemap(entry.lastModified.toString()) : currentDate
    }));
    
    return validatedEntries;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return static pages only if WordPress fetch fails
    const validatedStaticPages = staticPages.map(page => ({
      ...page,
      lastModified: formatDateForSitemap(page.lastModified?.toString() || new Date().toISOString())
    }));
    
    return validatedStaticPages;
  }
}