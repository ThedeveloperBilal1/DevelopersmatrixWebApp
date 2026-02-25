import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Clock, Eye, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  const cleanExcerpt = article.excerpt?.replace(/<[^\u003e]*>/g, " ").substring(0, 160) || "";

  return {
    title: `${article.title} | Developers Matrix`,
    description: cleanExcerpt,
    openGraph: {
      title: article.title,
      description: cleanExcerpt,
      images: article.imageUrl ? [article.imageUrl] : undefined,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
    },
  };
}

// Extract plain text from HTML for display
function extractTextFromHtml(html: string): string {
  if (!html) return "";
  // Remove script and style tags
  let text = html.replace(/<script[^\u003e]*>[<\s\S]*?<\/script>/gi, " ");
  text = text.replace(/<style[^\u003e]*>[<\s\S]*?<\/style>/gi, " ");
  // Replace common block elements with newlines
  text = text.replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, "\n");
  // Remove all remaining HTML tags
  text = text.replace(/<[^\u003e]*>/g, " ");
  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    notFound();
  }

  const articleText = extractTextFromHtml(article.content || article.excerpt || "");
  const paragraphs = articleText.split(/\n+/).filter(p => p.trim().length > 20);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back button */}
      <Link href="/">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to news
        </Button>
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary" className="text-xs capitalize">{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{article.sourceName}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

        <div className="flex items-center justify-between py-4 border-y border-border/50">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {format(new Date(article.publishedAt), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {article.views?.toLocaleString() || 0} views
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-muted shadow-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Article Content - Clean Text Format */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {paragraphs.length > 0 ? (
          <div className="space-y-6">
            {paragraphs.slice(0, 3).map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
            
            <div className="p-6 bg-muted/50 rounded-xl border border-border/50 my-8">
              <p className="text-sm text-muted-foreground mb-4">
                Continue reading the full article at the source:
              </p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button>
                  Read Full Article
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
            
            {paragraphs.slice(3).map((paragraph, index) => (
              <p key={`rest-${index}`} className="text-lg leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-muted/50 rounded-xl">
            <p className="text-muted-foreground mb-4">Full content not available in our database.</p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                Read at {article.sourceName}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Source Link */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-medium">Originally published on {article.sourceName}</p>
            <p className="text-sm text-muted-foreground">{format(new Date(article.publishedAt), "MMMM d, yyyy")}</p>
          </div>
          
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              Visit Source
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}
