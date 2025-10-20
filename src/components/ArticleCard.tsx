import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WordPressPost } from "@/lib/wordpress";
import { Calendar } from "lucide-react";

interface ArticleCardProps {
  post: WordPressPost;
  featured?: boolean;
}

export const ArticleCard = ({ post, featured = false }: ArticleCardProps) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/article/${post.slug}`}>
      <Card
        className={`group overflow-hidden transition-all hover:shadow-lg ${
          featured ? "h-[500px]" : "h-full"
        }`}
      >
        {imageUrl && (
          <div className={`overflow-hidden ${featured ? "h-[300px]" : "h-[200px]"}`}>
            <img
              src={imageUrl}
              alt={post.title.rendered}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <Badge variant="destructive" className="text-xs">
                {category.name}
              </Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
          </div>
          <h3
            className={`font-bold line-clamp-2 group-hover:text-primary transition-colors ${
              featured ? "text-2xl" : "text-lg"
            }`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </CardHeader>
        <CardContent>
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </CardContent>
      </Card>
    </Link>
  );
};
