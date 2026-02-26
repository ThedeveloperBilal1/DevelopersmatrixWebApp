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

// Format article content with proper structure
function formatArticleContent(html: string): { type: string; content: string }[] {
  if (!html) return [];
  
  const $ = cheerio.load(html);
  
  // Remove unwanted elements
  $('script, style, iframe, nav, header, footer, aside, .advertisement, .ads, .social-share, .comments, .related-posts').remove();
  
  const sections: { type: string; content: string }[] = [];
  
  // Process headings
  $('h1, h2, h3, h4, h5, h6').each((_, elem) => {
    const text = $(elem).text().trim();
    if (text && text.length > 3) {
      sections.push({ type: 'heading', content: text });
    }
  });
  
  // Process paragraphs
  $('p').each((_, elem) => {
    const text = $(elem).text().trim();
    if (text && text.length > 20) {
      sections.push({ type: 'paragraph', content: text });
    }
  });
  
  // Process lists
  $('ul, ol').each((_, elem) => {
    const items: string[] = [];
    $(elem).find('li').each((_, li) => {
      const text = $(li).text().trim();
      if (text) items.push(text);
    });
    if (items.length > 0) {
      sections.push({ type: 'list', content: JSON.stringify(items) });
    }
  });
  
  // Process blockquotes
  $('blockquote').each((_, elem) => {
    const text = $(elem).text().trim();
    if (text && text.length > 10) {
      sections.push({ type: 'quote', content: text });
    }
  });
  
  // If no structured content found, fall back to text extraction
  if (sections.length === 0) {
    const text = $.text().trim();
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 30);
    paragraphs.forEach(p => {
      sections.push({ type: 'paragraph', content: p.trim() });
    });
  }
  
  return sections;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    notFound();
  }

  const contentSections = formatArticleContent(article.content || article.excerpt || "");

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

      {/* Article Content - Properly Formatted */}
      <div className="article-content">
        {contentSections.length > 0 ? (
          <div className="space-y-6">
            {contentSections.map((section, index) => {
              if (section.type === 'heading') {
                return (
                  <h2 
                    key={index} 
                    className="text-2xl font-bold mt-10 mb-4 text-foreground"
                  >
                    {section.content}
                  </h2>
                );
              }
              
              if (section.type === 'paragraph') {
                return (
                  <p 
                    key={index}
                    className="text-lg leading-relaxed text-foreground/90"
                  >
                    {section.content}
                  </p>
                );
              }
              
              if (section.type === 'list') {
                const items = JSON.parse(section.content);
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                    {items.map((item: string, i: number) => (
                      <li key={i} className="text-foreground/90">{item}</li>
                    ))}
                  </ul>
                );
              }
              
              if (section.type === 'quote') {
                return (
                  <blockquote 
                    key={index}
                    className="border-l-4 border-primary/30 pl-6 py-2 italic text-muted-foreground my-8"
                  >
                    "{section.content}"
                  </blockquote>
                );
              }
              
              return null;
            })}
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
