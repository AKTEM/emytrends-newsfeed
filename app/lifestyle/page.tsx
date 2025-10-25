import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, User, TrendingUp, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { getPostsByCategory, transformPost } from '@/lib/wordpress';
import { getCategoryYoastSEO, yoastToNextMetadata } from '@/lib/yoast-seo';
import { Metadata } from 'next';
import { ArticlesGrid } from '@/components/articles-grid';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const yoastData = await getCategoryYoastSEO('news');
    return yoastToNextMetadata(
      yoastData,
      'News - The Maple Epoch',
      'Stay informed with the latest news, current events, breaking stories, and comprehensive coverage from around the world.'
    );
  } catch (error) {
    console.error('Error generating news metadata:', error);
    return yoastToNextMetadata(null, 'News - The Maple Epoch', 'Stay informed with the latest news, current events, breaking stories, and comprehensive coverage from around the world.');
  }
}

async function getNewsData() {
  try {
    const posts = await getPostsByCategory('news');
    return posts.map(transformPost).filter(Boolean);
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}

export default async function LifestylePage() {
  const articles = await getNewsData();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-32">
        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white">News</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">News</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Stay informed with the latest news, current events, breaking stories,
                and comprehensive coverage from around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 py-12">
          <ArticlesGrid
            articles={articles}
            categoryName="News"
            categoryColor="bg-pink-600 hover:bg-pink-700"
            gradientFrom="from-pink-600"
            gradientTo="to-rose-600"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}