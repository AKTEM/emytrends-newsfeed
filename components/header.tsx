"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, User, Bell, Moon, Sun, ChevronDown, ChevronUp, Leaf, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from "next/image";


const breakingNews = [
  "Breaking: Major Economic Policy Changes Announced",
  "Technology Giants Report Record Earnings",
  "Climate Agreement Reached at International Summit",
  "Sports Championship Finals This Weekend",
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [mobileLifestyleOpen, setMobileLifestyleOpen] = useState(false);
  const [mobileWorldOpen, setMobileWorldOpen] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsSearchOpen(false);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 px-4 overflow-hidden">
        <div className="flex items-center space-x-4">
          <Badge variant="destructive" className="animate-pulse bg-red-800 hover:bg-red-800">
            BREAKING
          </Badge>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {breakingNews[currentNewsIndex]}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
         



<Link href="/" className="block">
  <div className="flex items-center">
    <Image 
      src="/img/Maple.png" 
      alt="Logo" 
      width={100} 
      height={100} 
      className="object-contain"
    />
  </div>
</Link>



          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/politics" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Japa Routes
            </Link>
            <Link href="/business" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Life After Japa
            </Link>
            <Link href="/health" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Health
            </Link>
            <Link href="/entertainment" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Tech/Gadget
            </Link>
            <Link href="/sports" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              Sports
            </Link>
            <Link href="/lifestyle" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
              News
            </Link>

            {/* Education Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                <span>Education</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/world/africa">Academics</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/world/americas">Migration</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/world/australia">Exam/Admission</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/world/asia">Learning/Career Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/world/europe">Scholarships</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/world/uk">Student Life</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/world/canada">Canada</Link>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>


            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/daily-maple">Business/Economy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/maple-travel">Vibes N Cruise</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/maple-voices">Maple Voices</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="/booknook">Finance</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/through-the-lens">Through the Lens</Link>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Authentication Buttons - Desktop */}
            {!session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-red-600">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-red-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="mt-4 relative">
            <Input
              placeholder="Search news, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-red-200 focus:border-red-500 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>
        )}

        {/* User Menu */}
        {session ? (
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{session.user.displayName || session.user.username}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {session.user.displayName || session.user.username}
                </div>
                <div className="px-2 py-1.5 text-xs text-gray-500">
                  {session.user.email}
                </div>
                <DropdownMenuSeparator />
                {session.user.roles.includes('author') && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center space-x-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto">
            <div className="flex flex-col space-y-4 pt-4 pb-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link href="/politics" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Japa Routes
              </Link>
              <Link href="/business" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Life After Japa
              </Link>
              <Link href="/health" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Health
              </Link>
              <Link href="/entertainment" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Tech/Gadget
              </Link>
              <Link href="/sports" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                Sports
              </Link>
              <Link href="/lifestyle" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                News
              </Link>
              
              {/* Education Section with Collapsible Subsections */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <button
                  onClick={() => setMobileWorldOpen(!mobileWorldOpen)}
                  className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                >
                  <span>Education</span>
                  {mobileWorldOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {mobileWorldOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-red-200 dark:border-red-800">
                    <Link 
                      href="/world/africa" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Academics
                    </Link>
                    <Link 
                      href="/world/americas" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Migration
                    </Link>
                    <Link 
                      href="/world/australia" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Exam/Admission
                    </Link>
                    <Link 
                      href="/world/asia" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Learning/Career Guide
                    </Link>
                    <Link 
                      href="/world/europe" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Scholarships
                    </Link>
                    <Link 
                      href="/world/uk" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Student Life
                    </Link>
                    {/* <Link 
                      href="/world/canada" 
                      className="block text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Canada
                    </Link> */}
                  </div>
                )}
              </div>
              
              {/* More Section with Collapsible Subsections */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <button
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
                >
                  <span>More</span>
                  {mobileMoreOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {mobileMoreOpen && (
                  <div className="pl-4 space-y-2 border-l-2 border-red-200 dark:border-red-800">
                    <Link 
                      href="/daily-maple" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Business/Economy
                    </Link>
                    <Link 
                      href="/maple-travel" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Vibes N Cruise
                    </Link>
                    <Link 
                      href="/booknook" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Finance
                    </Link>
                    <Link 
                      href="/maple-travel" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                    Vibes N cruise
                    </Link>
                    <Link 
                      href="/through-the-lens" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Through the Lens
                    </Link>
                    <Link 
                      href="/maple-voices" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Maple Voices
                    </Link>
                    <Link 
                      href="/resources" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Resources
                    </Link>
                    <Link 
                      href="/shop-a-tale" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shop a Tale
                    </Link>
                    <Link 
                      href="/events" 
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Authentication */}
              {!session && (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex flex-col space-y-2">
                    <Link 
                      href="/auth/signin" 
                      className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Mobile User Menu */}
              {session && (
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.user.displayName || session.user.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {session.user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {session.user.roles.includes('author') && (
                      <Link 
                        href="/dashboard" 
                        className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-red-600 hover:text-red-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
