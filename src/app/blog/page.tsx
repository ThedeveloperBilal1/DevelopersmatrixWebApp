import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Developers Matrix',
  description: 'Read in-depth articles, tutorials, and guides about AI tools, developer resources, and tech trends.',
  keywords: ['blog', 'tutorials', 'guides', 'articles', 'tech'],
};

export const revalidate = 300;

async function getBlogPosts() {
  return await db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    orderBy: desc(blogPosts.publishedAt),
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 py-6">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Articles, tutorials, and insights about AI tools, development, and tech trends.
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

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {post.excerpt || post.content?.substring(0, 100)}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.author || 'Developers Matrix'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : 'Soon'}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="ml-auto">
                    <button className="text-primary hover:gap-2 flex items-center gap-1 transition-all">
                      Read <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">No blog posts published yet.</p>
        </Card>
      )}
    </div>
  );
}
