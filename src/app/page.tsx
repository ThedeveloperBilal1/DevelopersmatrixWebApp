import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { HeroSection } from "@/components/hero-section";
import { ArticleCard } from "@/components/article-card";
import { FeaturedArticles } from "@/components/featured-articles";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300; // Revalidate every 5 minutes

async function getArticles() {
  const allArticles = await db.query.articles.findMany({
    orderBy: desc(articles.publishedAt),
    limit: 20,
  }) as InferSelectModel<typeof articles>[];
  
  const featured = allArticles.filter((a: InferSelectModel<typeof articles>) => a.isFeatured).slice(0, 3);
  const regular = allArticles.filter((a: InferSelectModel<typeof articles>) => !a.isFeatured);
  
  return { featured, regular };
}

export default async function HomePage() {
  const { featured, regular } = await getArticles();

  return (
    <div className="space-y-8">
      <HeroSection />
      
      {featured.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Stories</h2>
          <FeaturedArticles articles={featured} />
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((article: InferSelectModel<typeof articles>) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        {regular.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles yet. Run the scraper to populate content!</p>
          </div>
        )}
      </section>
    </div>
  );
}
