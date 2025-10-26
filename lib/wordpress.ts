import { safeAsync, withErrorBoundary } from './error-handler';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL || 'https://cms.emytrends.com/wp/wp-json/wp/v2';

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      link: string;
      slug: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      date: string;
      slug: string;
      type: string;
      link: string;
      title: {
        rendered: string;
      };
      author: number;
      caption: {
        rendered: string;
      };
      alt_text: string;
      media_type: string;
      mime_type: string;
      media_details: {
        width: number;
        height: number;
        file: string;
        sizes: {
          [key: string]: {
            file: string;
            width: number;
            height: number;
            mime_type: string;
            source_url: string;
          };
        };
      };
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      link: string;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any;
}

export interface TransformedPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  views: string;
  publishDate: string;
  slug: string;
  featured?: boolean;
  isTrending?: boolean;
  isBreaking?: boolean;
  tags: string[];
}

// Cache for API responses - TEMPORARILY DISABLED
// const cache = new Map();
// const CACHE_DURATION = 60 * 1000; // Cache for 1 minute

async function fetchWithCache(url: string, options?: RequestInit) {
  // CACHING TEMPORARILY DISABLED
  // const cacheKey = url + JSON.stringify(options);
  // const cached = cache.get(cacheKey);

  // if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
  //   return cached.data;
  // }

  try {
    console.log('Fetching WordPress API:', url);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store', // Disable Next.js caching
      // next: { revalidate: 60 }, // Cache for 60 seconds - DISABLED
    });

    console.log('WordPress API response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status} for URL: ${url}`, errorText);
      return [];
    }

    const data = await response.json();
    console.log('WordPress API data received:', Array.isArray(data) ? `${data.length} items` : typeof data);

    // CACHING TEMPORARILY DISABLED
    // cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('WordPress API fetch error for URL:', url, error);
    return [];
  }
}

export async function getPosts(params: {
  per_page?: number;
  page?: number;
  categories?: string;
  search?: string;
  _embed?: boolean;
  sticky?: boolean;
  status?: string;
} = {}): Promise<WordPressPost[]> {
  const searchParams = new URLSearchParams();
  
  if (params.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.categories) searchParams.append('categories', params.categories);
  if (params.search) {
    // Ensure search term is properly encoded and not empty
    const searchTerm = params.search.trim();
    if (searchTerm) {
      searchParams.append('search', searchTerm);
      console.log('Adding search parameter:', searchTerm);
    }
  }
  if (params._embed !== false) searchParams.append('_embed', 'true');
  if (params.sticky) searchParams.append('sticky', 'true');
  // Only fetch published posts by default
  searchParams.append('status', params.status || 'publish');
  
  // Always sort by date (newest first)
  searchParams.append('orderby', 'date');
  searchParams.append('order', 'desc');

  const url = `${API_URL}/posts?${searchParams.toString()}`;
  console.log('Final WordPress API URL:', url);
  
  return safeAsync(() => fetchWithCache(url), []);
}

export async function getPost(id: number): Promise<WordPressPost> {
  const url = `${API_URL}/posts/${id}?_embed=true&status=publish`;
  return safeAsync(() => fetchWithCache(url), null as any);
}

export async function getPostBySlug(slug: string): Promise<WordPressPost> {
  const url = `${API_URL}/posts?slug=${slug}&_embed=true&status=publish`;
  const posts = await safeAsync(() => fetchWithCache(url), []);
  return posts[0];
}

export async function getCategories(): Promise<WordPressCategory[]> {
  const url = `${API_URL}/categories?per_page=100`;
  return safeAsync(() => fetchWithCache(url), []);
}

export async function getPostsByCategory(categorySlug: string, limit?: number): Promise<WordPressPost[]> {
  try {
    const categories = await getCategories();
    const category = categories.find(cat => cat.slug === categorySlug);

    if (!category) {
      console.warn(`Category not found: ${categorySlug}. Available categories:`, categories.map(cat => cat.slug));
      return [];
    }

    if (limit !== undefined) {
      return getPosts({
        categories: category.id.toString(),
        per_page: limit,
        _embed: true,
        status: 'publish'
      });
    }

    const allPosts: WordPressPost[] = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
      const posts = await getPosts({
        categories: category.id.toString(),
        per_page: perPage,
        page: page,
        _embed: true,
        status: 'publish'
      });

      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts.push(...posts);
        if (posts.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    console.log(`Fetched ${allPosts.length} posts for category ${categorySlug}`);
    return allPosts;
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

// Transform WordPress post to our frontend format
export function transformPost(post: WordPressPost): TransformedPost {
  if (!post) {
    return null as any;
  }
  
  const author = post._embedded?.author?.[0]?.name || 'Unknown Author';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400';
  
  // Get category name
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'General';
  
  // Extract plain text from excerpt
  const excerptText = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || post.title?.rendered || '';
  
  // Clean and preserve HTML content structure
  const cleanContent = (post.content?.rendered || '')
    .replace(/\r\n/g, '\n')
    .replace(/\n\n+/g, '\n\n')
    .trim();
  
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = cleanContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Generate random views (in a real app, this would come from analytics)
  const views = `${(Math.random() * 5 + 1).toFixed(1)}k views`;
  
  // Get tags
  const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];

  return {
    id: post.id,
    title: post.title?.rendered || 'Untitled',
    excerpt: excerptText || post.title.rendered,
    content: cleanContent,
    category,
    image: featuredImage,
    author,
    readTime: `${readTime} min read`,
    views,
    publishDate: post.date,
    slug: post.slug,
    tags,
    featured: post.sticky,
    isTrending: Math.random() > 0.7, // Random trending status
    isBreaking: Math.random() > 0.9, // Random breaking status
  };
}

// Get posts for specific sections
export async function getLatestHeadlines(limit: number = 3): Promise<TransformedPost[]> {
  try {
    const posts = await getPosts({ per_page: limit, _embed: true, status: 'publish' });
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error fetching latest headlines:', error);
    return [];
  }
}

export async function getEditorsPicks(limit: number = 3): Promise<TransformedPost[]> {
  try {
    // First try to get posts from "editors-picks" category
    const editorsPosts = await getPostsByCategory('editors-picks', Math.max(limit, 20));
    if (editorsPosts.length > 0) {
      return editorsPosts.map(post => ({ ...transformPost(post), featured: true }));
    }
    
    // If no editors-picks category, try "editor-picks" (alternative slug)
    const editorPicksPosts = await getPostsByCategory('editor-picks', Math.max(limit, 20));
    if (editorPicksPosts.length > 0) {
      return editorPicksPosts.map(post => ({ ...transformPost(post), featured: true }));
    }
    
    // Try sticky posts as fallback
    const stickyPosts = await getPosts({ per_page: Math.max(limit, 20), _embed: true, sticky: true, status: 'publish' });
    if (stickyPosts.length > 0) {
      return stickyPosts.map(post => ({ ...transformPost(post), featured: true }));
    }
    
    // If still no posts, get recent posts and mark them as featured
    const recentPosts = await getPosts({ per_page: Math.max(limit, 20), _embed: true, status: 'publish' });
    return recentPosts.map(post => ({ ...transformPost(post), featured: true }));
  } catch (error) {
    console.error('Error fetching editor\'s picks:', error);
    return [];
  }
}

// Section-specific functions
export async function getDailyMaple(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('business-economy', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getMapleTravel(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('vibes-n-cruise', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getThroughTheLens(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('through-the-lens', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getFeaturedArticles(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('featured-articles', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getMapleVoices(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('maple-voices', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getExploreCanada(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('explore-canada', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getResources(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('resources', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getEvents(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('events', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getContinent(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('continent', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getCanadaNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('canada', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getYouMayHaveMissed(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('you-may-have-missed', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

// World News functions for specific regions (now Education categories)
export async function getAfricaNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('academics', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getAmericasNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('migration', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getAustraliaNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('exam-admission', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getAsiaNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('learning-career-guide', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getEuropeNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('scholarships', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getUKNews(limit: number = 1): Promise<TransformedPost[]> {
  return getPostsByCategory('student-life', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

// BookNook and Lifestyle Wire functions
export async function getBookNook(limit: number = 3): Promise<TransformedPost[]> {
  return getPostsByCategory('finance', Math.max(limit, 20)).then(posts => posts.map(transformPost));
}

export async function getTheFridayPost(limit?: number): Promise<TransformedPost[]> {
  return getPostsByCategory('the-friday-post', limit).then(posts => posts.map(transformPost));
}

export async function getLifestyle(limit?: number): Promise<TransformedPost[]> {
  return getPostsByCategory('lifestyle', limit).then(posts => posts.map(transformPost));
}

// Keep minimal fallback data only for extreme error cases
export const fallbackPosts: TransformedPost[] = [];