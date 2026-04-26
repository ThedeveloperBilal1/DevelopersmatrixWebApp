import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InContentAd, SidebarAd } from "@/components/ads/AdBanner";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { getBlogPostBySlug, getRecentBlogPosts, blogCategories } from "@/data/blog";
import { siteConfig } from "@/data/config";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/shared/Cards";
import { FeaturedImage } from "@/components/blog/FeaturedImage";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRecentBlogPosts(3).filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        author={post.author}
        datePublished={post.publishedAt}
        url={`${siteConfig.url}/blog/${post.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` }
        ]}
      />

      <article className="min-h-screen">
        {/* Header */}
        <header className="bg-background border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{post.category}</Badge>
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {post.image ? (
                <FeaturedImage src={post.image} alt={post.title} />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-xl mb-8 flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .replace(/^# .+$/gm, (match: string) => `<h1 class="text-3xl font-bold mt-8 mb-4">${match.slice(2)}</h1>`)
                      .replace(/^## .+$/gm, (match: string) => `<h2 class="text-2xl font-semibold mt-8 mb-4">${match.slice(3)}</h2>`)
                      .replace(/^### .+$/gm, (match: string) => `<h3 class="text-xl font-semibold mt-6 mb-3">${match.slice(4)}</h3>`)
                      .replace(/^- .+$/gm, (match: string) => `<li class="ml-4">${match.slice(2)}</li>`)
                      .replace(/^\d+\. .+$/gm, (match: string) => `<li class="ml-4 list-decimal">${match.replace(/^\d+\. /, '')}</li>`)
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '</p><p class="my-4 text-muted-foreground leading-relaxed">')
                      .replace(/^(?!<)/gm, '')
                  }}
                />
              </div>

              <InContentAd />

              {/* Tags */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 p-6 bg-muted/30 rounded-xl">
                <p className="font-medium mb-4">Share this article</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SidebarAd />

              {/* Author */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">Writer & Technologist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <div className="group">
                          <p className="font-medium text-sm group-hover:text-violet-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedPost.readTime} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {blogCategories.map(category => (
                      <Link
                        key={category}
                        href={`/blog?category=${category.toLowerCase()}`}
                        className="block text-sm hover:text-violet-600 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <SidebarAd />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
