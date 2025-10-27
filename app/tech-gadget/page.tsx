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
    const yoastData = await getCategoryYoastSEO('tech-gadget');
    return yoastToNextMetadata(
      yoastData,
      'Tech/Gadget - The Maple Epoch',
      'Stay updated with the latest technology news, gadget reviews, tech trends, innovations, and digital developments.'
    );
  } catch (error) {
    console.error('Error generating tech gadget metadata:', error);
    return yoastToNextMetadata(null, 'Tech/Gadget - The Maple Epoch', 'Stay updated with the latest technology news, gadget reviews, tech trends, innovations, and digital developments.');
  }
}

async function getTechGadgetData() {
  try {
    const posts = await getPostsByCategory('tech-gadget');
    return posts.map(transformPost).filter(Boolean);
  } catch (error) {
    console.error('Error fetching tech gadget data:', error);
    return [];
  }
}

export default async function EntertainmentPage() {
  const articles = await getTechGadgetData();
  
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
              <span className="text-gray-900 dark:text-white">Tech/Gadget</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Tech/Gadget</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Stay updated with the latest technology news, gadget reviews, tech trends,
                innovations, and digital developments.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 py-12">
          <ArticlesGrid
            articles={articles}
            categoryName="Tech/Gadget"
            categoryColor="bg-pink-600 hover:bg-pink-700"
            gradientFrom="from-pink-600"
            gradientTo="to-pink-700"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}