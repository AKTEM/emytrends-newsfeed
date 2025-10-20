import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostBySlug } from "@/lib/wordpress";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";

const ArticlePage = () => {
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

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="container py-8 max-w-4xl">
          <Skeleton className="h-[400px] mb-8" />
          <Skeleton className="h-12 mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <Skeleton className="h-96" />
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="container py-8 max-w-4xl">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Article not found</h1>
            <p className="text-xl text-muted-foreground">
              The article you're looking for doesn't exist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <article className="container py-8 max-w-4xl">
        {imageUrl && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={post.title.rendered}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          {category && (
            <Badge variant="destructive" className="mb-4">
              {category.name}
            </Badge>
          )}
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      <footer className="border-t mt-16 py-8">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EmyTrends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticlePage;
