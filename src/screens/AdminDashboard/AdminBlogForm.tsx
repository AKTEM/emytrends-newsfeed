import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { addBlogPost, updateBlogPost, getBlogPost, BlogPost } from "../../lib/firebaseBlogs";
import { uploadProductImage } from "../../lib/firebaseStorage";
import { X } from "lucide-react";

const CATEGORIES = ["Hair Care", "Style Guide", "Product Reviews", "Tips & Tricks", "News"];

export const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    featuredImage: "",
    images: [],
    tags: [],
    published: false,
  });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      loadBlog(id);
    }
  }, [id, isEdit]);

  const loadBlog = async (blogId: string) => {
    try {
      const blog = await getBlogPost(blogId);
      if (blog) {
        setFormData(blog);
      }
    } catch (error) {
      console.error("Error loading blog:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let featuredImageUrl = formData.featuredImage;
      let imageUrls = [...(formData.images || [])];

      const tempId = id || `blog-${Date.now()}`;

      if (featuredImageFile) {
        featuredImageUrl = await uploadProductImage(featuredImageFile, tempId);
      }

      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map((file) => uploadProductImage(file, tempId));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const blogData = {
        ...formData,
        featuredImage: featuredImageUrl,
        images: imageUrls,
      };

      if (isEdit && id) {
        await updateBlogPost(id, blogData);
      } else {
        await addBlogPost(blogData);
      }

      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags?.includes(tagInput)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={2}
                placeholder="Brief summary of the blog post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={12}
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Image</label>
              {formData.featuredImage && (
                <div className="mb-4">
                  <img src={formData.featuredImage} alt="Featured" className="w-64 h-48 object-cover rounded" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Images</label>
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImageFiles(e.target.files ? Array.from(e.target.files) : [])}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Publish this blog post</span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Blog Post" : "Create Blog Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/blogs")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
