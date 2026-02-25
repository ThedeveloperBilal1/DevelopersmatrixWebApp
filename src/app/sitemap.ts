import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { articles, blogPosts, utilityTools, aiTools } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://developersmatrix.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic routes from database
  const [newsArticles, posts, utilities, tools] = await Promise.all([
    db.query.articles.findMany({ limit: 1000 }),
    db.query.blogPosts.findMany({
      where: eq(blogPosts.isPublished, true),
      limit: 1000,
    }),
    db.query.utilityTools.findMany({
      where: eq(utilityTools.isPublished, true),
      limit: 1000,
    }),
    db.query.aiTools.findMany({ limit: 1000 }),
  ]);

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = utilities.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const aiToolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/ai-tools/${tool.slug}`,
    lastModified: tool.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...blogRoutes,
    ...toolRoutes,
    ...aiToolRoutes,
  ];
}
