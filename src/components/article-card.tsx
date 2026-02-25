import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import * as cheerio from "cheerio";

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

interface ArticleCardProps {
  article: Article;
}

// Strip HTML tags and get plain text
function stripHtml(html: string): string {
  if (!html) return "";
  // Use cheerio if available, otherwise simple regex fallback
  try {
    const $ = cheerio.load(html);
    return $.text().trim();
  } catch {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Clean excerpt - strip HTML if present
  const cleanExcerpt = article.excerpt 
    ? stripHtml(article.excerpt).substring(0, 150) + "..."
    : "";

  return (
    <Link href={`/article/${article.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-border/50 hover:border-primary/30">
        <div className="aspect-video relative overflow-hidden bg-muted">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
              <ArrowUpRight className="h-10 w-10 text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Badge className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm border-0 shadow-sm">
            {article.category}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {cleanExcerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {cleanExcerpt}
            </p>
          )}

          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">{article.sourceName}</span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
