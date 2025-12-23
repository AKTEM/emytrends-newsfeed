import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { getAllBlogPosts, deleteBlogPost, BlogPost } from "../../lib/firebaseBlogs";
import { deleteProductImage } from "../../lib/firebaseStorage";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";

export const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getAllBlogPosts();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, images?: string[]) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      if (images && images.length > 0) {
        await Promise.all(images.map(img => deleteProductImage(img)));
      }
      await deleteBlogPost(id);
      await loadBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-lg">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Blog Posts</h1>
        <Button 
          onClick={() => navigate("/admin/blogs/new")}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button onClick={() => navigate("/admin/blogs/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Blog Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                {/* Mobile Layout */}
                <div className="flex flex-col sm:hidden gap-3">
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-1 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <Badge variant={blog.published ? "default" : "secondary"} className="text-xs">
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {blog.author}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{blog.category}</span>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{blog.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                      className="flex-1"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(blog.id!, blog.images)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Tablet/Desktop Layout */}
                <div className="hidden sm:flex gap-4">
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg lg:text-xl font-semibold mb-1 truncate">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant={blog.published ? "default" : "secondary"}>
                            {blog.published ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            by {blog.author} • {blog.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="hidden lg:inline ml-1">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(blog.id!, blog.images)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden lg:inline ml-1">Delete</span>
                        </Button>
                      </div>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
