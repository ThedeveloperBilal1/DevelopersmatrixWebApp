import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { summarizeWithAI } from "@/lib/ai";

const rssParser = new Parser();

export interface ScrapedArticle {
  title: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

const RSS_FEEDS = [
  {
    url: "https://techcrunch.com/feed/",
    name: "TechCrunch",
    category: "general",
  },
  {
    url: "https://www.theverge.com/rss/index.xml",
    name: "The Verge",
    category: "general",
  },
  {
    url: "https://arstechnica.com/feed/",
    name: "Ars Technica",
    category: "general",
  },
  {
    url: "https://www.wired.com/feed/rss",
    name: "Wired",
    category: "general",
  },
];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

export function categorizeArticle(title: string, content: string): string {
  const text = (title + " " + content).toLowerCase();
  
  if (text.includes("ai") || text.includes("artificial intelligence") || text.includes("machine learning") || text.includes("llm") || text.includes("chatgpt") || text.includes("neural")) {
    return "ai";
  }
  if (text.includes("phone") || text.includes("laptop") || text.includes("tablet") || text.includes("watch") || text.includes("headphone") || text.includes("device")) {
    return "gadgets";
  }
  if (text.includes("app") || text.includes("software") || text.includes("update") || text.includes("windows") || text.includes("macos") || text.includes("ios") || text.includes("android")) {
    return "software";
  }
  if (text.includes("game") || text.includes("gaming") || text.includes("playstation") || text.includes("xbox") || text.includes("nintendo")) {
    return "gaming";
  }
  
  return "general";
}

export async function scrapeRSSFeeds(): Promise<ScrapedArticle[]> {
  const articles: ScrapedArticle[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching: ${feed.url}`);
      const parsed = await rssParser.parseURL(feed.url);

      for (const item of parsed.items.slice(0, 5)) {
        if (!item.title || !item.link) continue;

        // Extract image from content if available
        let imageUrl: string | undefined;
        if (item["media:content"]?.[0]?.$.url) {
          imageUrl = item["media:content"][0].$.url;
        } else if (item.content) {
          const $ = cheerio.load(item.content);
          const img = $("img").first();
          imageUrl = img.attr("src") || undefined;
        }

        // Get content for summarization
        const rawContent = item.contentSnippet || item.content || "";
        const { excerpt } = await summarizeWithAI(item.title, rawContent);

        const category = categorizeArticle(item.title, rawContent);

        articles.push({
          title: item.title,
          excerpt,
          imageUrl,
          sourceUrl: item.link,
          sourceName: feed.name,
          category,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        });
      }
    } catch (error) {
      console.error(`Failed to fetch ${feed.url}:`, error);
    }
  }

  return articles;
}
