import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { scrapeRSSFeeds, generateSlug } from "@/lib/scraper";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  // Verify cron secret if set
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Starting scrape job...");
    const scrapedArticles = await scrapeRSSFeeds();
    
    let inserted = 0;
    let skipped = 0;

    for (const article of scrapedArticles) {
      const slug = generateSlug(article.title);
      
      // Check if article already exists
      const existing = await db.query.articles.findFirst({
        where: eq(articles.slug, slug),
      });

      if (existing) {
        skipped++;
        continue;
      }

      await db.insert(articles).values({
        title: article.title,
        slug,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        sourceUrl: article.sourceUrl,
        sourceName: article.sourceName,
        category: article.category,
        publishedAt: article.publishedAt,
        isManual: false,
      });

      inserted++;
    }

    console.log(`Scrape complete: ${inserted} inserted, ${skipped} skipped`);

    return NextResponse.json({
      success: true,
      inserted,
      skipped,
      total: scrapedArticles.length,
    });
  } catch (error) {
    console.error("Scrape failed:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: String(error) },
      { status: 500 }
    );
  }
}
