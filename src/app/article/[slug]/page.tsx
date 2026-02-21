import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Clock, Eye } from "lucide-react";
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

  return {
    title: `${article.title} | TechPulse`,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Link href="/">
        <Button variant="ghost" className="mb-6 pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to news
        </Button>
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge>{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{article.sourceName}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {format(new Date(article.publishedAt), "MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {article.views?.toLocaleString() || 0} views
          </span>
        </div>
      </header>

      {article.imageUrl && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-muted">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : article.excerpt ? (
          <p className="text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>
        ) : null}
      </div>

      <div className="mt-12 pt-8 border-t">
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <Button variant="outline">
            Read original article
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </div>
    </article>
  );
}
