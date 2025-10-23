'use client';

import { TransformedPost } from '@/lib/wordpress';
import Link from 'next/link';
import { SafeImage } from './safe-image';
import { Clock, Eye, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TechGadgetProps {
  articles: TransformedPost[];
}

export function TechGadget({ articles }: TechGadgetProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tech & Gadgets
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Latest technology news, gadget reviews, and tech insights
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg mb-8">
          <p className="text-lg font-medium">
            Stay ahead with cutting-edge technology trends, reviews, and innovation updates
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/article/${article.slug}`} className="block">
                <div className="relative h-48">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Tech & Gadgets
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Read Review
                  </button>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {articles.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  View All Tech & Gadget Articles
                </>
              )}
            </button>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Showing {displayedArticles.length} of {articles.length} articles
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
