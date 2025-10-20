import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/wordpress";
import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const Index = () => {
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

  const { data: editorsPicks, isLoading: loadingEditors } = useQuery({
    queryKey: ["posts", "editors-picks"],
    queryFn: () => fetchPosts("editors-picks", 5),
  });

  const { data: latestPosts, isLoading: loadingLatest } = useQuery({
    queryKey: ["posts", "latest"],
    queryFn: () => fetchPosts(undefined, 8),
  });

  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="container py-8">
        {/* Hero Section - Editor's Picks */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-primary" />
            <h2 className="text-3xl font-bold">Editor's Picks</h2>
          </div>

          {loadingEditors ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[400px]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {editorsPicks?.slice(0, 1).map((post) => (
                <div key={post.id} className="md:col-span-2">
                  <ArticleCard post={post} featured />
                </div>
              ))}
              <div className="space-y-6">
                {editorsPicks?.slice(1, 3).map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Latest Headlines */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-primary" />
            <h2 className="text-3xl font-bold">Latest Headlines</h2>
          </div>

          {loadingLatest ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-[350px]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {latestPosts?.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EmyTrends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
