import { MetadataRoute } from 'next';

const API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.emytrends.com/wp/wp-json/wp/v2';
const FRONTEND_URL = 'https://www.emytrends.com';

interface WordPressPost {
  slug: string;
  title: {
    rendered: string;
  };
  date: string;
}

/**
 * Formats a date string to ISO 8601 format required by Google News
 * @param dateString - Date string from WordPress
 * @returns Properly formatted ISO date string
 */
function formatDateForGoogleNews(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date found in news sitemap: ${dateString}, using current date`);
      return new Date().toISOString();
    }
    
    // Google News requires ISO 8601 format
    return date.toISOString();
  } catch (error) {
    console.error(`Error formatting date for Google News ${dateString}:`, error);
    return new Date().toISOString();
  }
}

/**
 * Fetches recent posts from WordPress (last 48 hours) with pagination
 * @returns Array of recent posts with slug, title, and date
 */
async function getRecentPosts(): Promise<WordPressPost[]> {
  const recentPosts: WordPressPost[] = [];
  
  // Calculate 48 hours ago in ISO format
  const fortyEightHoursAgo = formatDateForGoogleNews(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString());
  
  let page = 1;
  let hasMorePosts = true;

  while (hasMorePosts && recentPosts.length < 100) { // Google News limit is 100 articles
    try {
      const response = await fetch(
        `${API_URL}/posts?after=${fortyEightHoursAgo}&_fields=slug,title,date&per_page=50&page=${page}&status=publish&orderby=date&order=desc`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 900 }, // Cache for 15 minutes for news
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch recent posts page ${page}: ${response.status}`);
        break;
      }

      const posts: WordPressPost[] = await response.json();
      
      if (posts.length === 0) {
        hasMorePosts = false;
      } else {
        recentPosts.push(...posts);
        page++;
      }

      // Safety check to prevent infinite loops
      if (page > 10) {
        console.warn('Reached maximum page limit (10) for news sitemap generation');
        break;
      }
    } catch (error) {
      console.error(`Error fetching recent posts page ${page}:`, error);
      break;
    }
  }

  // Limit to 100 articles (Google News requirement)
  return recentPosts.slice(0, 100);
}

/**
 * Strips HTML tags from a string
 * @param html - HTML string to clean
 * @returns Plain text string
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Escapes XML special characters
 * @param text - Text to escape
 * @returns XML-safe string
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates Google News sitemap XML
 * @returns Response with XML content
 */
export async function GET(): Promise<Response> {
  try {
    // Fetch recent posts from WordPress
    const posts = await getRecentPosts();
    
    // Filter out posts with invalid dates and limit to last 48 hours
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    
    const validPosts = posts.filter(post => {
      try {
        const postDate = new Date(post.date);
        return !isNaN(postDate.getTime()) && postDate >= fortyEightHoursAgo && postDate <= now;
      } catch (error) {
        console.warn(`Filtering out post with invalid date: ${post.slug} - ${post.date}`);
        return false;
      }
    });
    
    // Generate XML content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${validPosts.map((post) => {
  const cleanTitle = escapeXml(stripHtml(post.title.rendered));
  const publishDate = formatDateForGoogleNews(post.date);
  
  return `  <url>
    <loc>${FRONTEND_URL}/article/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Emytrends</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishDate}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
    </news:news>
  </url>`;
}).join('\n')}
</urlset>`;

    console.log(`Generated Google News sitemap with ${validPosts.length} recent articles (filtered from ${posts.length} total)`);
    
    return new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=900, s-maxage=900', // Cache for 15 minutes
      },
    });
  } catch (error) {
    console.error('Error generating Google News sitemap:', error);
    
    // Return empty sitemap on error
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
    
    return new Response(emptyXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes on error
      },
    });
  }
}