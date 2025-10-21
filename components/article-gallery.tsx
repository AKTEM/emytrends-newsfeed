"use client";

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageData {
  src: string;
  alt: string;
  caption?: string;
}

interface ArticleGalleryProps {
  images: ImageData[];
  className?: string;
}

export function ArticleGallery({ images, className = '' }: ArticleGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const getGridClasses = (totalImages: number, index: number) => {
    // Calculate which row this image is in (0-indexed)
    const rowIndex = Math.floor(index / 3);
    const positionInRow = index % 3;
    const remainingImages = totalImages - (rowIndex * 3);
    const imagesInCurrentRow = Math.min(3, remainingImages);

    if (imagesInCurrentRow === 1) {
      return 'col-span-3'; // Full width (100%)
    } else if (imagesInCurrentRow === 2) {
      return 'col-span-3 md:col-span-1'; // Half width on desktop (50% each)
    } else {
      return 'col-span-1'; // Third width (33.33% each)
    }
  };

  return (
    <>
      {/* Gallery Grid - Desktop Only */}
      <div className={`hidden lg:block ${className}`}>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer overflow-hidden rounded-xl shadow-lg ${getGridClasses(images.length, index)}`}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              {image.caption && (
                <div className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-medium">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout - Traditional WordPress Style */}
      <div className="lg:hidden space-y-6 mb-8">
        {images.map((image, index) => (
          <div key={index} className="space-y-3">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto"
              />
            </div>
            {image.caption && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center italic px-4">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4 w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => navigateImage('prev')}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => navigateImage('next')}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Image Container */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative max-w-full max-h-[85vh] flex items-center justify-center">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Caption and Counter */}
              <div className="mt-6 text-center max-w-2xl">
                {images[currentImageIndex].caption && (
                  <p className="text-white text-lg mb-2 leading-relaxed">
                    {images[currentImageIndex].caption}
                  </p>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="text-white/70 text-sm">
                      {currentImageIndex + 1} of {images.length}
                    </div>
                    <div className="flex space-x-1">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}