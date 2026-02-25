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
import * as cheerio from "cheerio";

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

  return {
    title: `${article.title} | Developers Matrix`,
    description: article.excerpt?.replace(/<[^>]*>/g, " ").substring(0, 160) || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt?.replace(/<[^>]*>/g, " ").substring(0, 160) || undefined,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  };
}

// Clean HTML content for better display
function cleanArticleContent(html: string): string {
  if (!html) return "";
  
  const $ = cheerio.load(html);
  
  // Remove unwanted elements
  $('script, style, iframe, nav, header, footer, aside, .advertisement, .ads, .social-share, .comments, .related-posts').remove();
  
  // Clean up images - ensure they have proper classes
  $('img').each((_, elem) => {
    const $img = $(elem);
    $img.addClass('rounded-lg my-6 max-w-full h-auto');
    $img.removeAttr('style');
    $img.removeAttr('width');
    $img.removeAttr('height');
  });
  
  // Clean up links
  $('a').each((_, elem) => {
    const $a = $(elem);
    $a.addClass('text-primary hover:underline');
    $a.attr('target', '_blank');
    $a.attr('rel', 'noopener noreferrer');
  });
  
  // Clean up headings
  $('h1, h2, h3, h4, h5, h6').each((_, elem) => {
    const $h = $(elem);
    $h.addClass('font-bold mt-8 mb-4 text-foreground');
  });
  
  // Clean up paragraphs
  $('p').each((_, elem) => {
    const $p = $(elem);
    $p.addClass('mb-4 leading-relaxed text-foreground/90');
  });
  
  // Clean up lists
  $('ul, ol').each((_, elem) => {
    const $list = $(elem);
    $list.addClass('mb-4 ml-6 space-y-2');
  });
  $('li').each((_, elem) => {
    const $li = $(elem);
    $li.addClass('text-foreground/90');
  });
  
  // Clean up blockquotes
  $('blockquote').each((_, elem) => {
    const $bq = $(elem);
    $bq.addClass('border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground');
  });
  
  return $.html();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    notFound();
  }

  const cleanContent = article.content ? cleanArticleContent(article.content) : "";
  const cleanExcerpt = article.excerpt ? article.excerpt.replace(/<[^>]*>/g, " ").trim() : "";

  return (
    <article className="max-w-4xl mx-auto">
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
          <Badge variant="secondary" className="text-xs">{article.category}</Badge>
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

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {cleanContent ? (
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: cleanContent }} 
          />
        ) : cleanExcerpt ? (
          <p className="text-xl text-muted-foreground leading-relaxed">{cleanExcerpt}</p>
        ) : (
          <div className="p-8 text-center bg-muted/50 rounded-xl">
            <p className="text-muted-foreground">Full content not available. Read the original article below.</p>
          </div>
        )}
      </div>

      {/* Source Link */}
      <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-medium">Originally published on {article.sourceName}</p>
            <p className="text-sm text-muted-foreground">Read the full story at the source</p>
          </div>
          
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              Read Original
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}
