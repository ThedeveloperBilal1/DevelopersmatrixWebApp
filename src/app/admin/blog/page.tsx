import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, ExternalLink, Trash2 } from 'lucide-react';

export const revalidate = 0;

async function getBlogPosts() {
  return await db.query.blogPosts.findMany({
    orderBy: desc(blogPosts.createdAt),
  });
}

export default async function BlogAdminPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Link href="/admin/blog/new">
              <Button>Create First Post</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                      {post.isFeatured && (
                        <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt || post.content?.substring(0, 100)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Views: {post.views} • Created: {new Date(post.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
