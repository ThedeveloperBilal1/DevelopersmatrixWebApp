import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { HeroSection } from "@/components/hero-section";
import { ArticleCard } from "@/components/article-card";
import { FeaturedArticles } from "@/components/featured-articles";
import { TrendingTools } from "@/components/trending-tools";
import { TopDeals } from "@/components/top-deals";
import { NewsletterSection } from "@/components/newsletter-section";
import { StructuredData } from "@/components/structured-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Gamepad2, ArrowRight } from "lucide-react";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300;

async function getArticles() {
  const allArticles = await db.query.articles.findMany({
    orderBy: desc(articles.publishedAt),
    limit: 50,
  }) as InferSelectModel<typeof articles>[];
  
  // Filter by category
  const aiArticles = allArticles.filter((a: InferSelectModel<typeof articles>) => a.category === 'ai').slice(0, 6);
  const gamingArticles = allArticles.filter((a: InferSelectModel<typeof articles>) => a.category === 'gaming').slice(0, 6);
  const featured = allArticles.filter((a: InferSelectModel<typeof articles>) => a.isFeatured).slice(0, 3);
  const regular = allArticles.filter((a: InferSelectModel<typeof articles>) => !a.isFeatured).slice(0, 6);
  
  return { aiArticles, gamingArticles, featured, regular };
}

export default async function HomePage() {
  const { aiArticles, gamingArticles, featured, regular } = await getArticles();

  return (
    <>
      <StructuredData />
      
      <div className="space-y-16">
        <HeroSection />
        
        {/* Trending AI Tools Section */}
        <TrendingTools />
        
        {/* Top Deals Section */}
        <TopDeals />
        
        {/* AI News Section */}
        {aiArticles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">AI News</h2>
              </div>
              <Link href="/category/ai">
                <Button variant="ghost" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiArticles.map((article: InferSelectModel<typeof articles>) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Gaming News Section */}
        {gamingArticles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Gaming News</h2>
              </div>
              <Link href="/category/gaming">
                <Button variant="ghost" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamingArticles.map((article: InferSelectModel<typeof articles>) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
        
        {featured.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Stories</h2>
            </div>
            <FeaturedArticles articles={featured} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest News</h2>
          </div>
          
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

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </>
  );
}
