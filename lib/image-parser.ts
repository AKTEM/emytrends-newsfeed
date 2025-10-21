/**
 * Utility functions for parsing and extracting images from WordPress content
 */

export interface ParsedImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Extracts images from WordPress HTML content
 * @param content - The HTML content from WordPress
 * @returns Array of parsed image data
 */
export function extractImagesFromContent(content: string): ParsedImage[] {
  if (!content) return [];

  const images: ParsedImage[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  // Find all img elements
  const imgElements = doc.querySelectorAll('img');
  
  imgElements.forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;

    const alt = img.getAttribute('alt') || '';
    const width = img.getAttribute('width') ? parseInt(img.getAttribute('width')!) : undefined;
    const height = img.getAttribute('height') ? parseInt(img.getAttribute('height')!) : undefined;
    
    // Look for caption in various WordPress structures
    let caption = '';
    
    // Check for WordPress caption shortcode structure
    const figcaption = img.closest('figure')?.querySelector('figcaption');
    if (figcaption) {
      caption = figcaption.textContent?.trim() || '';
    }
    
    // Check for WordPress caption div
    const captionDiv = img.closest('.wp-caption')?.querySelector('.wp-caption-text');
    if (captionDiv && !caption) {
      caption = captionDiv.textContent?.trim() || '';
    }
    
    // Check for caption in data attributes
    const dataCaption = img.getAttribute('data-caption');
    if (dataCaption && !caption) {
      caption = dataCaption;
    }

    images.push({
      src,
      alt,
      caption: caption || undefined,
      width,
      height
    });
  });

  return images;
}

/**
 * Removes images from HTML content (for display after gallery)
 * @param content - The HTML content
 * @returns Content with images removed
 */
export function removeImagesFromContent(content: string): string {
  if (!content) return '';

  // Remove WordPress image blocks and shortcodes
  let cleanContent = content
    // Remove figure elements with images
    .replace(/<figure[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/figure>/gi, '')
    // Remove standalone img tags
    .replace(/<img[^>]*>/gi, '')
    // Remove WordPress caption shortcodes
    .replace(/\[caption[^\]]*\][\s\S]*?\[\/caption\]/gi, '')
    // Remove WordPress gallery shortcodes
    .replace(/\[gallery[^\]]*\]/gi, '')
    // Remove empty paragraphs that might be left behind
    .replace(/<p>\s*<\/p>/gi, '')
    // Remove multiple consecutive line breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Clean up extra whitespace
    .trim();

  return cleanContent;
}

/**
 * Checks if content has enough images to warrant a gallery
 * @param content - The HTML content
 * @returns Boolean indicating if gallery should be used
 */
export function shouldUseGallery(content: string): boolean {
  const images = extractImagesFromContent(content);
  return images.length >= 5;
}

/**
 * Processes WordPress content for gallery display
 * @param content - The original HTML content
 * @returns Object with images array and cleaned content
 */
export function processContentForGallery(content: string): {
  images: ParsedImage[];
  cleanContent: string;
  useGallery: boolean;
} {
  const images = extractImagesFromContent(content);
  const useGallery = images.length >= 5;
  
  if (useGallery) {
    const cleanContent = removeImagesFromContent(content);
    return {
      images,
      cleanContent,
      useGallery: true
    };
  }

  return {
    images,
    cleanContent: content,
    useGallery: false
  };
}

/**
 * Validates image URLs and provides fallbacks
 * @param images - Array of parsed images
 * @returns Array of validated images with fallbacks
 */
export function validateImages(images: ParsedImage[]): ParsedImage[] {
  const fallbackImage = 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800';
  
  return images.map((image, index) => ({
    ...image,
    src: image.src || fallbackImage,
    alt: image.alt || `Gallery image ${index + 1}`,
    caption: image.caption || undefined
  }));
}