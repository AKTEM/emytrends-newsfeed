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
    const yoastData = await getCategoryYoastSEO('japa-routes');
    return yoastToNextMetadata(
      yoastData,
      'Japa Routes - The Maple Epoch',
      'Discover pathways, opportunities, and essential information for those planning to relocate abroad. Your complete guide to Japa routes.'
    );
  } catch (error) {
    console.error('Error generating japa routes metadata:', error);
    return yoastToNextMetadata(null, 'Japa Routes - The Maple Epoch', 'Discover pathways, opportunities, and essential information for those planning to relocate abroad. Your complete guide to Japa routes.');
  }
}

async function getJapaRoutesData() {
  try {
    const posts = await getPostsByCategory('japa-routes');
    return posts.map(transformPost).filter(Boolean);
  } catch (error) {
    console.error('Error fetching japa routes data:', error);
    return [];
  }
}

export default async function PoliticsPage() {
  const articles = await getJapaRoutesData();
  
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
              <span className="text-gray-900 dark:text-white">Japa Routes</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Japa Routes</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Discover pathways, opportunities, and essential information for those
                planning to relocate abroad. Your complete guide to Japa routes.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 py-12">
          <ArticlesGrid
            articles={articles}
            categoryName="Japa Routes"
            categoryColor="bg-red-600 hover:bg-red-700"
            gradientFrom="from-red-600"
            gradientTo="to-red-700"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}