"use client";

import { useEffect } from 'react';

interface YoastSchemaInjectorProps {
  schema: any;
}

/**
 * Client-side component to inject Yoast schema into the document head
 * This is used when we need to add schema.org JSON-LD data dynamically
 */
export function YoastSchemaInjector({ schema }: YoastSchemaInjectorProps) {
  useEffect(() => {
    if (!schema) return;

    // Create script element for JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    
    // Add to document head
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);

  return null; // This component doesn't render anything visible
}