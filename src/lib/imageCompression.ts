/**
 * Compresses and optimizes images before upload
 * Maintains quality while significantly reducing file size
 */

interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetSizeKB?: number;
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 0.88,
  targetSizeKB: 500,
};

/**
 * Compresses an image file while maintaining quality
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compressed image file
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // If file is already small enough, return as-is
  if (file.size / 1024 < opts.targetSizeKB / 2) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;
          
          if (width > opts.maxWidth || height > opts.maxHeight) {
            const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          // Create canvas
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to compress image"));
                return;
              }

              // Create new file from blob
              const compressedFile = new File([blob], file.name, {
                type: file.type === "image/png" ? "image/png" : "image/jpeg",
                lastModified: Date.now(),
              });

              // Log compression results
              const originalSize = (file.size / 1024).toFixed(2);
              const compressedSize = (compressedFile.size / 1024).toFixed(2);
              const reduction = (
                ((file.size - compressedFile.size) / file.size) *
                100
              ).toFixed(1);

              console.log(
                `Image compressed: ${originalSize}KB → ${compressedSize}KB (${reduction}% reduction)`
              );

              resolve(compressedFile);
            },
            file.type === "image/png" ? "image/png" : "image/jpeg",
            opts.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Compresses multiple images in parallel
 * @param files - Array of image files to compress
 * @param options - Compression options
 * @returns Array of compressed image files
 */
export const compressImages = async (
  files: File[],
  options: CompressionOptions = {}
): Promise<File[]> => {
  return Promise.all(files.map((file) => compressImage(file, options)));
};
