import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../../components/shared/Header";
import { Footer } from "../../components/shared/Footer";
import { getBlogPost, BlogPost } from "../../lib/firebaseBlogs";
import { CalendarIcon, UserIcon, TagIcon, ArrowLeftIcon } from "lucide-react";

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        const blogData = await getBlogPost(id);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-backgroundbackground-0 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryprimary-2"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-backgroundbackground-0 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-textprimary-text mb-4">Blog post not found</h1>
          <Link 
            to="/blog" 
            className="text-tertiarytertiary-0 hover:underline font-medium"
          >
            Return to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundbackground-0 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-textsecondary-text hover:text-textprimary-text mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back to Blog</span>
        </Link>

        {/* Category Badge */}
        <div className="inline-block px-4 py-2 bg-tertiarytertiary-0 text-textinverse-text text-sm font-bold rounded mb-4">
          {blog.category}
        </div>

        {/* Title */}
        <h1 className="font-semi-bold-display-medium text-textprimary-text mb-6 text-2xl sm:text-3xl lg:text-4xl leading-tight">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-6 border-b border-neutralneutral-0">
          <div className="flex items-center gap-2 text-textsecondary-text">
            <UserIcon className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">{blog.author}</span>
          </div>
          {blog.createdAt && (
            <div className="flex items-center gap-2 text-textsecondary-text">
              <CalendarIcon className="w-5 h-5" />
              <span className="text-sm sm:text-base">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8 sm:mb-12 rounded-lg overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
          <div 
            className="font-medium-body-large text-textprimary-text leading-relaxed whitespace-pre-wrap text-base sm:text-lg"
            style={{ lineHeight: '1.8' }}
          >
            {blog.content}
          </div>
        </div>

        {/* Additional Images */}
        {blog.images && blog.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {blog.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${blog.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex items-start gap-3 pt-8 border-t border-neutralneutral-0">
            <TagIcon className="w-5 h-5 text-textsecondary-text mt-1 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutralneutral-0 text-textsecondary-text rounded text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
