import { ArticleClientPage } from '@/components/article-client-page';
import { getPostBySlug, transformPost, getPosts, TransformedPost, getLatestHeadlines } from '@/lib/wordpress';
import { getPostYoastSEO, yoastToNextMetadata, generateFallbackMetadata } from '@/lib/yoast-seo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { processContentForGallery, validateImages } from '@/lib/image-parser';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

// Generate static params for permalinks
export async function generateStaticParams() {
  try {
    // Get recent posts from WordPress
    const posts = await getPosts({ per_page: 100 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    // First try to get Yoast SEO data directly
    const yoastData = await getPostYoastSEO(params.slug);
    
    if (yoastData) {
      return yoastToNextMetadata(yoastData);
    }

    // Fallback: try to get post data for basic metadata
    const article = await getArticleData(params.slug);
    
    if (!article) {
      return generateFallbackMetadata('Article Not Found - The Maple Epoch', 'The requested article could not be found.', params.slug);
    }

    // Generate fallback metadata from post data
    const title = article.title || 'The Maple Epoch';
    const description = article.excerpt || 'Breaking news and latest updates';
    
    return generateFallbackMetadata(title, description, params.slug);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return generateFallbackMetadata();
  }
}

async function getArticleData(slug: string): Promise<TransformedPost | null> {
  try {
    const post = await getPostBySlug(slug);
    if (post && post.id) {
      const transformed = transformPost(post);
      if (transformed) {
        return transformed;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleData(params.slug);
  
  if (!article) {
    notFound();
  }

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
  
  return <ArticleClientPage article={articleData} latestHeadlines={latestHeadlines} />;
}