import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Latest Tech News - Developers Matrix',
  description: 'Breaking tech news, AI updates, software releases, and industry trends. Stay informed with the latest technology news.',
};

export const revalidate = 300;

async function getNews() {
  return await db.query.articles.findMany({
    orderBy: desc(articles.publishedAt),
  });
}

export default async function NewsPage() {
  const articles_data = await getNews();
  const categories = [...new Set(articles_data.map((a) => a.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 py-6">
        <h1 className="text-4xl font-bold">Latest Tech News</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with breaking technology news, AI breakthroughs, and industry trends.
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <Badge variant="default">All</Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {articles_data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles_data.map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.excerpt || article.content?.substring(0, 100)}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2 items-center">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.publishedAt!).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:gap-2 transition-all"
                      asChild
                    >
                      <span>
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </Button>
                  </div>

                  {article.sourceUrl && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Source: {article.sourceName}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">No news articles available yet.</p>
        </Card>
      )}
    </div>
  );
}
