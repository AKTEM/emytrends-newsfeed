import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BusinessEconomy } from '@/components/business-economy';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getDailyMaple } from '@/lib/wordpress';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

async function getDailyMapleData() {
  try {
    const posts = await getDailyMaple(12);
    return posts;
  } catch (error) {
    console.error('Error fetching Daily Maple data:', error);
    return [];
  }
}

export default async function DailyMaplePage() {
  const articles = await getDailyMapleData();

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
              <span className="text-gray-900 dark:text-white"> Business/Economy</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Business/Economy</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Get the latest updates on markets, startups, policies, and the economy. 
                Stay informed with insights that shape business and financial decisions.

              </p>
            </div>
          </div>
        </div>

        {/* Business Economy Content */}
        <div className="container mx-auto px-4 py-12">
          <BusinessEconomy articles={articles} />
        </div>
      </main>
      <Footer />
    </div>
  );
}