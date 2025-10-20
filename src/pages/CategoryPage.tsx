import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPosts } from "@/lib/wordpress";
import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => fetchPosts(slug, 20),
  });

  const categoryName = slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="container py-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1 bg-primary" />
          <h1 className="text-4xl font-bold">{categoryName}</h1>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[350px]" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EmyTrends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
