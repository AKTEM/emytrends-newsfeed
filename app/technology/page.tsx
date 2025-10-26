import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getPostsByCategory, transformPost, fallbackPosts } from '@/lib/wordpress';
import { getCategoryYoastSEO, yoastToNextMetadata } from '@/lib/yoast-seo';
import { Metadata } from 'next';
import { ArticlesGrid } from '@/components/articles-grid';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const yoastData = await getCategoryYoastSEO('technology');
    return yoastToNextMetadata(
      yoastData,
      'Technology - The Maple Epoch',
      'Stay ahead with the latest technology news, innovations, digital trends, and tech industry developments.'
    );
  } catch (error) {
    console.error('Error generating technology metadata:', error);
    return yoastToNextMetadata(null, 'Technology - The Maple Epoch', 'Stay ahead with the latest technology news, innovations, digital trends, and tech industry developments.');
  }
}

async function getTechnologyData() {
  try {
    const posts = await getPostsByCategory('technology');
    return posts.length > 0 ? posts.map(transformPost).filter(Boolean) : fallbackPosts.filter(post =>
      post.category.toLowerCase() === 'technology'
    );
  } catch (error) {
    console.error('Error fetching technology data:', error);
    return fallbackPosts.filter(post =>
      post.category.toLowerCase() === 'technology'
    );
  }
}

export default async function TechnologyPage() {
  const articles = await getTechnologyData();

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
              <span className="text-gray-900 dark:text-white">Technology</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Technology</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Stay ahead with the latest technology news, innovations, digital trends, 
                and tech industry developments that shape our digital future.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 py-12">
          <ArticlesGrid 
            articles={articles}
            categoryName="Technology"
            categoryColor="bg-purple-600 hover:bg-purple-700"
            gradientFrom="from-purple-600"
            gradientTo="to-purple-700"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}