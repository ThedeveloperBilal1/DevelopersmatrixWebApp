import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import type { InferSelectModel } from "drizzle-orm";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  ai: "Artificial Intelligence",
  gadgets: "Gadgets & Hardware",
  software: "Software & Apps",
  gaming: "Gaming",
  coding: "Coding & Development",
  general: "General Tech",
};

export async function generateStaticParams() {
  return [
    { category: "ai" },
    { category: "gadgets" },
    { category: "software" },
    { category: "gaming" },
    { category: "coding" },
    { category: "general" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  const validCategories = ["ai", "gadgets", "software", "gaming", "coding", "general"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryArticles = await db.query.articles.findMany({
    where: eq(articles.category, category),
    orderBy: desc(articles.publishedAt),
    limit: 24,
  }) as InferSelectModel<typeof articles>[];

  return (
    <div className="space-y-8">
      <section className="flex items-center gap-4">
        <Badge className="text-lg px-4 py-1">{categoryLabels[category] || category}</Badge>
        <span className="text-muted-foreground">
          {categoryArticles.length} articles
        </span>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArticles.map((article: InferSelectModel<typeof articles>) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      {categoryArticles.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No articles in this category yet.</p>
        </div>
      )}
    </div>
  );
}
