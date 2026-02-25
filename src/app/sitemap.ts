import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { articles, aiTools } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://developersmatrix-web-app.vercel.app";
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/ai-tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/admin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Category routes
  const categories = ["ai", "coding", "gadgets", "software", "gaming", "general"];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Article routes
  const allArticles = await db.query.articles.findMany({
    orderBy: desc(articles.updatedAt),
    limit: 100,
  }) as InferSelectModel<typeof articles>[];
  
  const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article: InferSelectModel<typeof articles>) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updatedAt || article.createdAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // AI Tools routes
  const allTools = await db.query.aiTools.findMany({
    where: (toolsTable: typeof aiTools.$inferSelect, { eq }: { eq: any }) => eq(toolsTable.isActive, true),
    orderBy: desc(aiTools.updatedAt),
    limit: 50,
  }) as InferSelectModel<typeof aiTools>[];
  
  const toolRoutes: MetadataRoute.Sitemap = allTools.map((tool: InferSelectModel<typeof aiTools>) => ({
    url: `${baseUrl}/ai-tools/${tool.slug}`,
    lastModified: tool.updatedAt || tool.createdAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...toolRoutes];
}
