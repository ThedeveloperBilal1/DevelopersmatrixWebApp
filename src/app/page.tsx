import { db } from "@/lib/db";
import { articles, aiTools, blogPosts, utilityTools } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { HeroSection } from "@/components/hero-section";
import { ArticleCard } from "@/components/article-card";
import { FeaturedArticles } from "@/components/featured-articles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300;

async function getContent() {
  const [allArticles, tools, blogs, utilities] = await Promise.all([
    db.query.articles.findMany({
      orderBy: desc(articles.publishedAt),
      limit: 20,
    }),
    db.query.aiTools.findMany({
      orderBy: desc(aiTools.createdAt),
      limit: 6,
    }),
    db.query.blogPosts.findMany({
      orderBy: desc(blogPosts.publishedAt),
      limit: 4,
    }),
    db.query.utilityTools.findMany({
      limit: 4,
    }),
  ]);

  const featured = allArticles.filter((a) => a.isFeatured).slice(0, 3);
  const regular = allArticles.filter((a) => !a.isFeatured);

  return { featured, regular, tools, blogs, utilities };
}

export default async function HomePage() {
  const { featured, regular, tools, blogs, utilities } = await getContent();

  return (
    <div className="space-y-12">
      <HeroSection />

      {/* Featured Stories */}
      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Stories</h2>
            <Link href="/news">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedArticles articles={featured} />
        </section>
      )}

      {/* AI Tools Section */}
      {tools.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="h-8 w-8" />
                Trending AI Tools
              </h2>
            </div>
            <Link href="/ai-tools">
              <Button variant="ghost" className="gap-2">
                Explore All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool) => (
              <Card key={tool.id} className="flex flex-col p-4 hover:shadow-lg transition-shadow">
                {tool.imageUrl && (
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="w-full h-32 object-contain mb-4 rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{tool.category}</Badge>
                    {tool.pricing && <span className="text-xs text-muted-foreground">{tool.pricing}</span>}
                  </div>
                </div>
                <Link href={tool.websiteUrl} target="_blank" className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Tool
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Utility Tools Section */}
      {utilities.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Code2 className="h-8 w-8" />
              Developer Tools
            </h2>
            <Link href="/tools">
              <Button variant="ghost" className="gap-2">
                More Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {utilities.slice(0, 4).map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.slug}`}>
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer h-full">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Blog
            </h2>
            <Link href="/blog">
              <Button variant="ghost" className="gap-2">
                Read More <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.slice(0, 4).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt || post.content?.substring(0, 100)}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{post.category}</Badge>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link href="/news">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {regular.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-muted-foreground">No articles yet. Run the scraper to populate content!</p>
          </Card>
        )}
      </section>
    </div>
  );
}
