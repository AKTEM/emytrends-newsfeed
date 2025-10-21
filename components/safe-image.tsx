"use client";

import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function SafeImage({ src, alt, className = '', fallbackSrc }: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const defaultFallback = 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400';

  useEffect(() => {
    setImageSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    
    if (imageSrc !== (fallbackSrc || defaultFallback)) {
      setImageSrc(fallbackSrc || defaultFallback);
    }
  };

  if (hasError && imageSrc === (fallbackSrc || defaultFallback)) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`safe-image ${className}`}
      data-loaded={isLoaded}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  );
}