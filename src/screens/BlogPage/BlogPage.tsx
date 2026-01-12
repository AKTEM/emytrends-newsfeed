import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { getAllBlogPosts, BlogPost } from "../../lib/firebaseBlogs";
import { CalendarIcon, UserIcon, TagIcon } from "lucide-react";
import { BackButton } from "../../components/shared/BackButton";

export const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await getAllBlogPosts();
        const publishedBlogs = allBlogs.filter(blog => blog.published);
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(blog => blog.category)))];
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-backgroundbackground-0 flex flex-col">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-50">
        <PromoBanner />
      </header>
      <HeaderWithDropdown />
      
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <BackButton />
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-semi-bold-display-large text-textprimary-text mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl">
            Our Blog
          </h1>
          <p className="font-medium-body-large text-textsecondary-text max-w-2xl mx-auto text-base sm:text-lg">
            Discover the latest trends, tips, and stories about hair extensions and beauty
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold-title-medium transition-all text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-primaryprimary-2 text-textinverse-text"
                  : "bg-backgroundbackground-2 text-textprimary-text hover:bg-neutralneutral-0"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryprimary-2"></div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="font-medium-body-large text-textsecondary-text">
              No blog posts found in this category.
            </p>
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group bg-backgroundbackground-2 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="aspect-video overflow-hidden bg-neutralneutral-0">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 bg-tertiarytertiary-0 text-textinverse-text text-xs font-bold rounded mb-3">
                    {blog.category}
                  </div>

                  {/* Title */}
                  <h2 className="font-semi-bold-heading-large text-textprimary-text mb-3 line-clamp-2 text-xl sm:text-2xl group-hover:text-tertiarytertiary-0 transition-colors">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-medium-body-large text-textsecondary-text mb-4 line-clamp-3 text-sm sm:text-base">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-textsecondary-text">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    {blog.createdAt && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      <TagIcon className="w-4 h-4 text-textsecondary-text" />
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-neutralneutral-0 text-textsecondary-text rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
