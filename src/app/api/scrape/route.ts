import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articles, deals } from "@/lib/db/schema";
import { scrapeRSSFeeds, generateSlug } from "@/lib/scraper";
import { scrapeDeals, generateDealSlug } from "@/lib/scraper/deals";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  return handleScrape(request);
}

export async function POST(request: Request) {
  return handleScrape(request);
}

async function handleScrape(request: Request) {
  // Verify cron secret if set
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    articles: { inserted: 0, skipped: 0, total: 0 },
    deals: { inserted: 0, skipped: 0, total: 0 },
  };

  try {
    // Scrape articles
    console.log("Starting articles scrape...");
    const scrapedArticles = await scrapeRSSFeeds();
    
    for (const article of scrapedArticles) {
      const slug = generateSlug(article.title);
      
      const existing = await db.query.articles.findFirst({
        where: eq(articles.slug, slug),
      });

      if (existing) {
        results.articles.skipped++;
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

      results.articles.inserted++;
    }
    results.articles.total = scrapedArticles.length;

    // Scrape deals
    console.log("Starting deals scrape...");
    const scrapedDeals = await scrapeDeals();
    
    for (const deal of scrapedDeals) {
      const slug = generateDealSlug(deal.title);
      
      const existing = await db.query.deals.findFirst({
        where: eq(deals.slug, slug),
      });

      if (existing) {
        results.deals.skipped++;
        continue;
      }

      await db.insert(deals).values({
        title: deal.title,
        slug,
        description: deal.description,
        imageUrl: deal.imageUrl,
        originalPrice: deal.originalPrice,
        dealPrice: deal.dealPrice,
        discountPercent: deal.discountPercent,
        productUrl: deal.productUrl,
        retailer: deal.retailer,
        category: deal.category,
        isActive: true,
      });

      results.deals.inserted++;
    }
    results.deals.total = scrapedDeals.length;

    console.log("Scrape complete:", results);

    return NextResponse.json({
      success: true,
      ...results,
    });
  } catch (error) {
    console.error("Scrape failed:", error);
    return NextResponse.json(
      { error: "Scrape failed", details: String(error) },
      { status: 500 }
    );
  }
}
