import { NextRequest, NextResponse } from 'next/server';
import { getPosts, transformPost } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        posts: [], 
        total: 0, 
        error: 'Search query is required' 
      }, { status: 400 });
    }

    console.log('Search API called with:', { query, page, perPage });

    // Call the WordPress API with search parameters
    const wordpressPosts = await getPosts({
      search: query.trim(),
      per_page: perPage,
      page: page,
      _embed: true,
      status: 'publish'
    });

    console.log('WordPress API response:', {
      postsCount: wordpressPosts.length,
      query: query.trim()
    });

    // Transform posts to our frontend format
    const transformedPosts = wordpressPosts
      .map(transformPost)
      .filter(Boolean);

    console.log('Transformed posts:', {
      transformedCount: transformedPosts.length,
      titles: transformedPosts.map(p => p.title).slice(0, 3)
    });

    return NextResponse.json({
      posts: transformedPosts,
      total: transformedPosts.length,
      query: query.trim(),
      page,
      perPage
    });

  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json({ 
      posts: [], 
      total: 0, 
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}