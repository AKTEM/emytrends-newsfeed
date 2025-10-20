const WORDPRESS_API_URL = "https://cms.emytrends.com/wp/index.php?rest_route=/wp/v2";

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  parent: number;
}

export const fetchPosts = async (categorySlug?: string, perPage: number = 10): Promise<WordPressPost[]> => {
  try {
    let url = `${WORDPRESS_API_URL}/posts?_embed&per_page=${perPage}`;
    
    if (categorySlug) {
      const categories = await fetchCategories();
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        url += `&categories=${category.id}`;
      }
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
