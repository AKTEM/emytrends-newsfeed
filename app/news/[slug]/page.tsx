import { ArticleClientPage } from '@/components/article-client-page';
import { getLatestHeadlines, TransformedPost } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostYoastSEO, yoastToNextMetadata, generateFallbackMetadata } from '@/lib/yoast-seo';
import { processContentForGallery, validateImages } from '@/lib/image-parser';

const API_URL = 'https://api.mapleepoch.com/wp-json/wp/v2';
const FRONTEND_URL = 'https://www.mapleepoch.com';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  slug: string;
  categories: number[];
  author: number;
  featured_media: number;
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

// Generate static params for permalinks
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/posts?_fields=slug&per_page=100&status=publish`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn('Failed to fetch posts for static params');
      return [];
    }

    const posts = await response.json();
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface NewsPageProps {
  params: {
    slug: string;
  };
}

async function getPostData(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${API_URL}/posts?slug=${slug}&_fields=id,title,content,excerpt,date,modified,slug,categories,author,featured_media&_embed=true&status=publish`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.warn(`HTTP error! status: ${response.status} for slug: ${slug}`);
      return null;
    }

    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  try {
    // First try to get Yoast SEO data directly
    const yoastData = await getPostYoastSEO(params.slug);
    
    if (yoastData) {
      return yoastToNextMetadata(yoastData);
    }

    // Fallback: try to get post data for basic metadata
    const post = await getPostData(params.slug);
    
    if (!post) {
      return generateFallbackMetadata('Article Not Found - The Maple Epoch', 'The requested article could not be found.', params.slug);
    }

    // Generate fallback metadata from post data
    const title = post.title?.rendered || 'The Maple Epoch';
    const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || 'Breaking news and latest updates';
    
    return generateFallbackMetadata(title, description, params.slug);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return generateFallbackMetadata();
  }
}

async function getArticleData(slug: string): Promise<TransformedPost | null> {
  try {
    const post = await getPostData(slug);
    
    if (!post) {
      return null;
    }

    // Transform WordPress post to our frontend format
    const author = post._embedded?.author?.[0]?.name || 'Unknown Author';
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400';
    
    // Get category name
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const category = categories.length > 0 ? categories[0].name : 'General';
    
    // Extract plain text from excerpt
    const excerptText = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || post.title?.rendered || '';
    
    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = post.content?.rendered?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // Generate random views (in a real app, this would come from analytics)
    const views = `${(Math.random() * 5 + 1).toFixed(1)}k views`;
    
    // Get tags
    const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];

    return {
      id: post.id,
      title: post.title?.rendered || 'Untitled',
      excerpt: excerptText,
      content: post.content?.rendered || '',
      category,
      image: featuredImage,
      author,
      readTime: `${readTime} min read`,
      views,
      publishDate: post.date,
      slug: post.slug,
      tags,
      featured: false,
      isTrending: Math.random() > 0.7,
      isBreaking: Math.random() > 0.9,
    };
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return null;
  }
}

function generateFallbackSchema(post: WordPressPost, slug: string) {
  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = new Date(post.modified).toISOString();
  const articleUrl = `${FRONTEND_URL}/${slug}`;
  
  // Clean HTML from excerpt
  const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '';
  
  // Get featured image
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title?.rendered || '',
    "description": description,
    "url": articleUrl,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Organization",
      "name": post._embedded?.author?.[0]?.name || "The Maple Epoch"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Maple Epoch",
      "url": FRONTEND_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${FRONTEND_URL}/img/Maple.png`,
        "width": 100,
        "height": 100
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": featuredImage,
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "articleSection": post._embedded?.['wp:term']?.[0]?.[0]?.name || "News",
    "inLanguage": "en-US"
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  let article: TransformedPost | null = null;
  
  try {
    article = await getArticleData(params.slug);
  } catch (error) {
    console.error('Error loading article:', error);
  }
  
  if (!article) {
    notFound();
  }

  // Fetch post with Yoast schema data for injection
  // Fetch latest headlines for the sidebar
  let latestHeadlines: TransformedPost[] = [];
  try {
    latestHeadlines = await getLatestHeadlines(3);
  } catch (error) {
    console.error('Error fetching latest headlines for sidebar:', error);
    latestHeadlines = [];
  }

  // Transform the article to match the expected format for ArticleClientPage
  const articleData = {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    image: article.image,
    author: {
      name: article.author,
      bio: `${article.author} is a contributor to our publication, bringing expertise and insights to our readers.`,
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    publishDate: article.publishDate,
    readTime: article.readTime,
    views: article.views,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    shares: Math.floor(Math.random() * 200) + 20,
    tags: article.tags
  };
  
  return (
    <>
      <ArticleClientPage article={articleData} latestHeadlines={latestHeadlines} />
    </>
  );
}