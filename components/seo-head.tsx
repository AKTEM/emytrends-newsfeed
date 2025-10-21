import React from 'react';

interface YoastSEOData {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_url?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }> | string;
  og_site_name?: string;
  og_locale?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: any;
}

interface SeoHeadProps {
  yoast: YoastSEOData | null;
}

/**
 * SEO Head component that renders Yoast metadata into Next.js head
 * This component is used for rendering meta tags from WordPress Yoast SEO
 */
export default function SeoHead({ yoast }: SeoHeadProps) {
  if (!yoast) return null;

  return (
    <>
      {/* Basic SEO */}
      {yoast.title && <title>{yoast.title}</title>}
      {yoast.description && (
        <meta name="description" content={yoast.description} />
      )}
      {yoast.canonical && (
        <link rel="canonical" href={yoast.canonical} />
      )}

      {/* Open Graph */}
      {yoast.og_title && (
        <meta property="og:title" content={yoast.og_title} />
      )}
      {yoast.og_description && (
        <meta property="og:description" content={yoast.og_description} />
      )}
      {yoast.og_type && (
        <meta property="og:type" content={yoast.og_type} />
      )}
      {yoast.og_url && (
        <meta property="og:url" content={yoast.og_url} />
      )}
      {yoast.og_site_name && (
        <meta property="og:site_name" content={yoast.og_site_name} />
      )}
      {yoast.og_locale && (
        <meta property="og:locale" content={yoast.og_locale} />
      )}
      
      {/* Open Graph Images */}
      {yoast.og_image && (
        <>
          {Array.isArray(yoast.og_image) ? (
            yoast.og_image.map((img, index) => (
              <React.Fragment key={index}>
                <meta property="og:image" content={img.url} />
                {img.width && <meta property="og:image:width" content={img.width.toString()} />}
                {img.height && <meta property="og:image:height" content={img.height.toString()} />}
                {img.alt && <meta property="og:image:alt" content={img.alt} />}
              </React.Fragment>
            ))
          ) : (
            <meta property="og:image" content={yoast.og_image} />
          )}
        </>
      )}

      {/* Twitter Card */}
      {yoast.twitter_card && (
        <meta name="twitter:card" content={yoast.twitter_card} />
      )}
      {yoast.twitter_title && (
        <meta name="twitter:title" content={yoast.twitter_title} />
      )}
      {yoast.twitter_description && (
        <meta name="twitter:description" content={yoast.twitter_description} />
      )}
      {yoast.twitter_image && (
        <meta name="twitter:image" content={yoast.twitter_image} />
      )}

      {/* Schema.org JSON-LD */}
      {yoast.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(yoast.schema)
          }}
        />
      )}
    </>
  );
}