"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { SiTiktok } from 'react-icons/si'; // Added TikTok icon

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500">Emytrends</h3>
            <p className="text-gray-400 text-sm">
              Your trusted source for breaking news, in-depth analysis, and Information that matter. 
              Where Information Meets Entertainment
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/1Ey1ho7SQw/?mibextid=wwXIfr" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://x.com/emytrends/" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/emytrends_" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://www.youtube.com/@emytrendsmedia" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="https://www.tiktok.com/@emytrends01" className="text-gray-400 hover:text-red-500 transition-colors">
                <SiTiktok className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/politics" className="text-gray-400 hover:text-white transition-colors">Japa Routes</Link></li>
              <li><Link href="/business" className="text-gray-400 hover:text-white transition-colors">  Life After Japa</Link></li>
              <li><Link href="/health" className="text-gray-400 hover:text-white transition-colors">Health</Link></li>
              <li><Link href="/entertainment" className="text-gray-400 hover:text-white transition-colors">Tech/Gadget</Link></li>
              <li><Link href="/sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link></li>
              <li><Link href="/lifestyle" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
              {/* <li><Link href="/the-friday-post" className="text-gray-400 hover:text-white transition-colors">The Friday Post</Link></li> */}
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Special Sections */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Beyond the Headlines</h4>
            <ul className="space-y-2">
              <li><Link href="/world/africa" className="text-gray-400 hover:text-white transition-colors">Academics</Link></li>
              <li><Link href="/world/australia" className="text-gray-400 hover:text-white transition-colors">Exam/Admission</Link></li>
              <li><Link href="/daily-maple" className="text-gray-400 hover:text-white transition-colors">Business/Economy</Link></li>
              <li><Link href="/maple-travel" className="text-gray-400 hover:text-white transition-colors">Vibes N Cruise</Link></li>
              <li><Link href="/booknook" className="text-gray-400 hover:text-white transition-colors">Finance</Link></li>
              <li><Link href="/world/uk" className="text-gray-400 hover:text-white transition-colors">Student Life</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Contact Us</h4>
            <ul className="space-y-2">
             
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>emytrendsmedia@gmail.com</span>
              </li>
             
             
 <li className="flex items-center space-x-2 text-gray-400">
              
                <span> <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </li></span>

            </li>
             
            </ul>
            <div className="mt-6">
              <Link 
                href="/write-for-us" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Write for Us
              </Link>
              <Link 
                href="/shop-a-tale" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors ml-3"
              >
                Shop a Tale
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Emytrends. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
