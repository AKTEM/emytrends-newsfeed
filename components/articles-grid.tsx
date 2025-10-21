"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, User, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { TransformedPost } from '@/lib/wordpress';

interface ArticlesGridProps {
  articles: TransformedPost[];
  categoryName: string;
  categoryColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export function ArticlesGrid({ 
  articles, 
  categoryName, 
  categoryColor, 
  gradientFrom, 
  gradientTo 
}: ArticlesGridProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 12);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles.map((article) => (
          <div 
            key={article.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
          >
            <div className="aspect-video relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-3 left-3 flex space-x-2">
                <Badge className={`${categoryColor} text-white`}>
                  {categoryName.toUpperCase()}
                </Badge>
                {article.isTrending && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    TRENDING
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2">
                <Link href={`/article/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
                </div>
              </div>
              
              <Button 
                asChild
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                <Link href={`/article/${article.slug}`}>
                  Read Full Story
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {articles.length > 12 && (
        <div className="text-center mt-12">
          <Button
            onClick={() => setShowAll(!showAll)}
            size="lg"
            className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white px-8 py-3 flex items-center space-x-2 mx-auto`}
          >
            <span>{showAll ? 'Show Less' : 'Load More Articles'}</span>
            {showAll ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Showing {displayedArticles.length} of {articles.length} articles
          </p>
        </div>
      )}
    </>
  );
}