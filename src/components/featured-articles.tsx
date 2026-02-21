import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Link href={`/article/${main.slug}`} className="group relative overflow-hidden rounded-xl bg-card border hover:shadow-lg transition-all">
        <div className="aspect-[16/10] relative">
          {main.imageUrl ? (
            <img
              src={main.imageUrl}
              alt={main.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">
              <Zap className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge variant="secondary" className="mb-3">{main.category}</Badge>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{main.title}</h3>
            {main.excerpt && (
              <p className="text-white/80 text-sm line-clamp-2">{main.excerpt}</p>
            )}
          </div>
        </div>
      </Link>

      <div className="space-y-4">
        {rest.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group flex gap-4 p-4 rounded-xl bg-card border hover:shadow-md transition-all"
          >
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="mb-2">{article.category}</Badge>
              <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
