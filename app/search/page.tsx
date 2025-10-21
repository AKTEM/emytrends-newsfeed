"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Eye, User, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TransformedPost } from '@/lib/wordpress';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<TransformedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Performing search for:', searchTerm);
      
      // Call our API route for search
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&per_page=20`);
      
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('Search API response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setSearchResults(data.posts || []);
      setTotalResults(data.total || 0);
      
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'Search failed');
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

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
              <span className="text-gray-900 dark:text-white">Search</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Search Results
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Search news, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-red-200 focus:border-red-500 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700"
              >
                Search
              </Button>
            </form>
            
            {query && (
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  "Searching..."
                ) : error ? (
                  <span className="text-red-600">Error: {error}</span>
                ) : (
                  `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`
                )}
              </p>
            )}
          </div>

          {/* Search Results */}
          {error ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-red-300 dark:text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Search Error
              </h2>
              <p className="text-red-600 dark:text-red-400 mb-8">
                {error}
              </p>
              <Button onClick={() => {
                setError(null);
                if (query) performSearch(query);
              }}>
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((article) => (
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
                    
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs">
                        {article.category}
                      </Badge>
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
          ) : query ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Results Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/politics">Politics</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/business">Business</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/technology">Technology</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/health">Health</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Start Your Search
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Enter keywords above to search through our articles, topics, and authors.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}