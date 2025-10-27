"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, User, TrendingUp } from 'lucide-react';
import { TransformedPost, getPostsByCategory, transformPost } from '@/lib/wordpress';
import { NewsFeaturesSidebar } from '@/components/news-features-sidebar';

interface HeroSectionProps {
  articles: TransformedPost[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [businessArticle, setBusinessArticle] = useState<TransformedPost | null>(null);
  const [trendingBusinessArticle, setTrendingBusinessArticle] = useState<TransformedPost | null>(null);
  const [lifeAfterJapaArticle, setLifeAfterJapaArticle] = useState<TransformedPost | null>(null);
  const [techGadgetArticle, setTechGadgetArticle] = useState<TransformedPost | null>(null);
  const [vibesNCruiseArticle, setVibesNCruiseArticle] = useState<TransformedPost | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchBusinessNews() {
      try {
        const businessPosts = await getPostsByCategory('business', 10);
        if (businessPosts.length > 0) {
          const transformed = transformPost(businessPosts[0]);
          if (transformed) {
            setBusinessArticle(transformed);
          }
        }
        if (businessPosts.length > 1) {
          const transformed = transformPost(businessPosts[1]);
          if (transformed) {
            setTrendingBusinessArticle(transformed);
          }
        }
      } catch (error) {
        console.error('Error fetching business news:', error);
      }
    }
    
    async function fetchCategoryArticles() {
      try {
        // Fetch Life After Japa
        const lifeAfterJapaPosts = await getPostsByCategory('life-after-japa', 1);
        if (lifeAfterJapaPosts.length > 0) {
          const transformed = transformPost(lifeAfterJapaPosts[0]);
          if (transformed) {
            setLifeAfterJapaArticle(transformed);
          }
        }

        // Fetch Tech/Gadget
        const techGadgetPosts = await getPostsByCategory('tech-gadget', 1);
        if (techGadgetPosts.length > 0) {
          const transformed = transformPost(techGadgetPosts[0]);
          if (transformed) {
            setTechGadgetArticle(transformed);
          }
        }

        // Fetch Vibes N Cruise
        const vibesNCruisePosts = await getPostsByCategory('vibes-n-cruise', 1);
        if (vibesNCruisePosts.length > 0) {
          const transformed = transformPost(vibesNCruisePosts[0]);
          if (transformed) {
            setVibesNCruiseArticle(transformed);
          }
        }
      } catch (error) {
        console.error('Error fetching category articles:', error);
      }
    }
    
    fetchBusinessNews();
    fetchCategoryArticles();
  }, []);

  const targetCategories = ['Politics', 'Business', 'Technology', 'News', 'Sports', 'Entertainment'];

  const categorizedArticles = targetCategories.reduce((acc, category) => {
    const categoryArticles = articles.filter(article =>
      article.category.toLowerCase() === category.toLowerCase()
    );
    if (categoryArticles.length > 0) {
      acc[category] = categoryArticles;
    }
    return acc;
  }, {} as Record<string, TransformedPost[]>);

  const displayArticles: TransformedPost[] = [];

  targetCategories.forEach(category => {
    if (categorizedArticles[category]) {
      if (category === 'Business') {
        const businessArticles = categorizedArticles[category];
        const tiktokArticle = businessArticles.find(article =>
          article.title.toLowerCase().includes('tiktok') ||
          article.slug === 'trump-tiktok-buyer'
        );
        if (tiktokArticle) {
          displayArticles.push(tiktokArticle);
          const otherBusinessArticles = businessArticles.filter(article => article.id !== tiktokArticle.id);
          if (otherBusinessArticles.length > 0) {
            displayArticles.push(otherBusinessArticles[0]);
          }
        } else {
          displayArticles.push(...businessArticles.slice(0, 2));
        }
      } else {
        displayArticles.push(...categorizedArticles[category].slice(0, 2));
      }
    }
  });

  if (displayArticles.length === 0) {
    // Return empty section instead of loading state
    return null;
  }

  const finalArticles = displayArticles.slice(0, 9);
  const mainArticle = finalArticles[0];
  const sideArticles = finalArticles.slice(1, 4);
  const bottomArticles = finalArticles.slice(4, 9);

  if (!mainArticle) {
    // Return empty section instead of loading state
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Breaking News <span className="text-red-600">& Latest Updates</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Where Information Meets Entertainment
          </p>
          <div className="flex justify-center items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-red-600 animate-pulse">
              <div className="w-2 h-2 bg-red-600 rounded-full" /> LIVE
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article + Bottom */}
          <div className="lg:col-span-2">
            {/* Main */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 mb-8">
              <div className="aspect-video relative">
                <img
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {mainArticle.isBreaking && (
                    <Badge className="bg-red-600 text-white animate-pulse">BREAKING</Badge>
                  )}
                  <Badge className="bg-white text-black">{mainArticle.category}</Badge>
                </div>
                <div className="absolute bottom-0 p-6 text-white">
                  {/* ✅ Responsive title text size */}
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
                    {mainArticle.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User className="w-4 h-4" />{mainArticle.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{mainArticle.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{mainArticle.views}</span>
                    </div>
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                      <Link href={`/article/${mainArticle.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Articles - 4 New Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  slug: 'japa-routes', 
                  display: 'Japa Routes', 
                  wpCategory: 'japa-routes',
                  article: articles.find(a => 
                    a.category.toLowerCase().replace(/\s+/g, '-') === 'japa-routes' ||
                    a.tags?.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === 'japa-routes')
                  )
                },
                { 
                  slug: 'life-after-japa', 
                  display: 'Life After Japa', 
                  wpCategory: 'life-after-japa',
                  article: lifeAfterJapaArticle
                },
                { 
                  slug: 'tech-gadget', 
                  display: 'Tech/Gadget', 
                  wpCategory: 'tech-gadget',
                  article: techGadgetArticle
                },
                { 
                  slug: 'vibes-n-cruise', 
                  display: 'Vibes N Cruise', 
                  wpCategory: 'vibes-n-cruise',
                  article: vibesNCruiseArticle
                }
              ].map((category) => {
                // Only render if article exists
                if (!category.article) return null;
                
                const displayArticle = category.article;

                return (
                  <div key={category.slug} className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition">
                    <div className="aspect-video relative">
                      <img src={displayArticle.image} alt={displayArticle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900 text-xs">{displayArticle.category}</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 hover:text-red-600">
                        <Link href={`/article/${displayArticle.slug}`}>{displayArticle.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{displayArticle.excerpt}</p>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span><User className="inline w-3 h-3" /> {displayArticle.author}</span>
                        <span><Clock className="inline w-3 h-3" /> {displayArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Column */}
          <div className="flex flex-col gap-6">
            {/* Business/Economy Article */}
            {businessArticle && (
              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={businessArticle.image || 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                    alt={businessArticle.title || 'Business/Economy News'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-blue-600 text-white">BUSINESS/ECONOMY</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 line-clamp-2">
                    <Link href={`/article/${businessArticle.slug}`}>
                      {businessArticle.title || 'Business/Economy News Update'}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">
                    {businessArticle.excerpt || 'Latest business and economy developments.'}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{businessArticle.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{businessArticle.readTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Business (Static Card) */}
            {trendingBusinessArticle && (
              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={trendingBusinessArticle.image || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={trendingBusinessArticle.title || 'Trending Business News'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-blue-600 text-white">BUSINESS</Badge>
                    <Badge className="bg-orange-500 text-white animate-pulse">
                      <TrendingUp className="w-3 h-3 mr-1" />TRENDING
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 line-clamp-2">
                    <Link href={`/article/${trendingBusinessArticle.slug}`}>
                      {trendingBusinessArticle.title || 'Trending Business Story'}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {trendingBusinessArticle.excerpt || 'Trending business story with market analysis.'}
                  </p>
                </div>
              </div>
            )}

            {/* News Features Sidebar */}
            <NewsFeaturesSidebar />
            {/* Two Side Articles */}
            {sideArticles.slice(0, 0).map(article => (
              <div key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="h-32 relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {article.isTrending && (
                      <Badge className="bg-red-600 text-white text-xs"><TrendingUp className="w-3 h-3 mr-1" />TRENDING</Badge>
                    )}
                    <Badge className="bg-white text-black text-xs">{article.category}</Badge>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-red-600">
                    <Link href={`/article/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
