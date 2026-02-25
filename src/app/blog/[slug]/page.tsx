import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Eye } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleSchema, BreadcrumbSchema } from '@/components/schema-markup';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.slug, slug),
  });

  if (post && !post.isPublished) {
    return null;
  }

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author ? [post.author] : undefined,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Increment view count
  await db
    .update(blogPosts)
    .set({ views: (post.views || 0) + 1 })
    .where(eq(blogPosts.id, post.id));

  // Add schema markup
  const breadcrumbItems = [
    { name: 'Home', url: 'https://developersmatrix.com' },
    { name: 'Blog', url: 'https://developersmatrix.com/blog' },
    { name: post.title, url: `https://developersmatrix.com/blog/${post.slug}` },
  ];

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.content?.substring(0, 100) || ''}
        image={post.imageUrl || undefined}
        author={post.author || 'Developers Matrix'}
        datePublished={post.publishedAt || new Date()}
        url={`https://developersmatrix.com/blog/${post.slug}`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Header */}
      <div className="space-y-4">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <h1 className="text-4xl font-bold">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {post.views} views
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{post.category}</Badge>
          {post.tags &&
            Array.isArray(post.tags) &&
            post.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {String(tag)}
              </Badge>
            ))}
        </div>
      </div>

      {/* Featured Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
          {post.excerpt}
        </p>
      )}

      {/* Content */}
      {post.content && (
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <Card className="p-6 whitespace-pre-wrap text-sm leading-relaxed">
            {post.content}
          </Card>
        </div>
      )}

      {/* Related Links */}
      <Card className="p-6 space-y-4 bg-muted/50">
        <h3 className="font-semibold">Share this article</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  url: window.location.href,
                });
              }
            }}
          >
            Share
          </Button>
          <Button variant="outline" size="sm">
            Copy Link
          </Button>
        </div>
      </Card>

      {/* Back Link */}
      <div className="pt-6 border-t">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Button>
        </Link>
      </div>
    </article>
  );
}
