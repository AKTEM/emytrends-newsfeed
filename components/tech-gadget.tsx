"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, User, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { TransformedPost } from '@/lib/wordpress';

interface TechGadgetProps {
  articles: TransformedPost[];
}

export function TechGadget({ articles }: TechGadgetProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-3">
        <Cpu className="w-8 h-8 text-cyan-600" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tech/Gadget
        </h2>
        <div className="flex-1 h-1 bg-cyan-600 rounded-full ml-4"></div>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-xl p-6 mb-8">
        <div className="text-center">
          <Cpu className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Latest Tech News & Gadget Reviews
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the newest technology trends, in-depth gadget reviews, and expert insights. 
            Stay ahead in the digital world.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles.map((article) => (
          <div 
            key={article.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden w-full"
          >
            <div className="aspect-video relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-3 left-3 flex space-x-2">
                <Badge className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Cpu className="w-3 h-3 mr-1" />
                  TECH/GADGET
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white group-hover:text-cyan-600 transition-colors line-clamp-2">
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
                className="w-full border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-300 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-950"
              >
                <Link href={`/article/${article.slug}`}>
                  Read Article
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        {articles.length > 3 && (
          <>
            <Button
              onClick={() => setShowAll(!showAll)}
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 flex items-center space-x-2 mx-auto"
            >
              <span>{showAll ? 'Show Less' : 'View All Tech/Gadget'}</span>
              {showAll ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Showing {displayedArticles.length} of {articles.length} articles
            </p>
          </>
        )}
        {articles.length <= 3 && articles.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Showing {displayedArticles.length} of {articles.length} articles
          </p>
        )}
      </div>
    </section>
  );
}
