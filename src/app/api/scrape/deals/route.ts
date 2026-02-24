import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deals } from "@/lib/db/schema";
import { scrapeDeals, generateDealSlug } from "@/lib/scraper/deals";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Starting deals scrape job...");
    const scrapedDeals = await scrapeDeals();
    
    let inserted = 0;
    let skipped = 0;

    for (const deal of scrapedDeals) {
      const slug = generateDealSlug(deal.title);
      
      const existing = await db.query.deals.findFirst({
        where: eq(deals.slug, slug),
      });

      if (existing) {
        skipped++;
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

      inserted++;
    }

    console.log(`Deals scrape complete: ${inserted} inserted, ${skipped} skipped`);

    return NextResponse.json({
      success: true,
      inserted,
      skipped,
      total: scrapedDeals.length,
    });
  } catch (error) {
    console.error("Deals scrape failed:", error);
    return NextResponse.json(
      { error: "Deals scrape failed", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
