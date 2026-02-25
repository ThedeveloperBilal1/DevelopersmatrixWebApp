import { db } from "@/lib/db";
import { articles, deals, aiTools } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Tag, 
  Sparkles, 
  RefreshCw, 
  Plus,
  ExternalLink,
  TrendingUp,
  BookOpen,
  Code2
} from "lucide-react";

export const revalidate = 0;

async function getStats() {
  const [articleCount, dealCount, toolCount, blogPostCount, utilityToolCount] = await Promise.all([
    db.query.articles.findMany({ limit: 1000 }).then(a => a.length),
    db.query.deals.findMany({ limit: 1000 }).then(d => d.length),
    db.query.aiTools.findMany({ limit: 1000 }).then(t => t.length),
    db.query.blogPosts.findMany({ limit: 1000 }).then(b => b.length),
    db.query.utilityTools.findMany({ limit: 1000 }).then(u => u.length),
  ]);
  
  return { articleCount, dealCount, toolCount, blogPostCount, utilityToolCount };
}

export default async function AdminPage() {
  const stats = await getStats();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form action="/api/scrape" method="POST">
          <Button type="submit" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Run Scraper
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.articleCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deals</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dealCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Tools</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toolCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPostCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tools</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.utilityToolCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create and manage blog articles with SEO optimization.
            </p>
            <div className="flex gap-2">
              <Link href="/admin/blog">
                <Button variant="outline" className="gap-2 text-xs">
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </Link>
              <Link href="/blog" target="_blank">
                <Button variant="ghost" className="gap-2 text-xs">
                  <ExternalLink className="h-4 w-4" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utility Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add calculators, generators, and developer utilities.
            </p>
            <div className="flex gap-2">
              <Link href="/admin/tools">
                <Button variant="outline" className="gap-2 text-xs">
                  <Plus className="h-4 w-4" />
                  New Tool
                </Button>
              </Link>
              <Link href="/tools" target="_blank">
                <Button variant="ghost" className="gap-2 text-xs">
                  <ExternalLink className="h-4 w-4" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage AI tools directory and product database.
            </p>
            <div className="flex gap-2">
              <Link href="/admin/ai-tools">
                <Button variant="outline" className="gap-2 text-xs">
                  <Plus className="h-4 w-4" />
                  New Tool
                </Button>
              </Link>
              <Link href="/ai-tools" target="_blank">
                <Button variant="ghost" className="gap-2 text-xs">
                  <ExternalLink className="h-4 w-4" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <RecentArticles />
    </div>
  );
}

async function RecentArticles() {
  const recentArticles = await db.query.articles.findMany({
    orderBy: desc(articles.createdAt),
    limit: 5,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentArticles.map((article) => (
            <div key={article.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{article.title}</p>
                <p className="text-sm text-muted-foreground">{article.sourceName} • {article.category}</p>
              </div>
              <Link href={`/article/${article.slug}`} target="_blank">
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
