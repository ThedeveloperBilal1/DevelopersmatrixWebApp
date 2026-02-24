import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { summarizeWithAI } from "@/lib/ai";

const rssParser = new Parser();

export interface ScrapedArticle {
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

const RSS_FEEDS = [
  { url: "https://techcrunch.com/feed/", name: "TechCrunch" },
  { url: "https://www.theverge.com/rss/index.xml", name: "The Verge" },
  { url: "https://arstechnica.com/feed/", name: "Ars Technica" },
  { url: "https://www.wired.com/feed/rss", name: "Wired" },
  { url: "https://www.engadget.com/rss.xml", name: "Engadget" },
  { url: "https://gizmodo.com/rss", name: "Gizmodo" },
  { url: "https://www.cnet.com/rss/news/", name: "CNET" },
  { url: "https://mashable.com/feed", name: "Mashable" },
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
  
  // AI category
  if (text.match(/\bai\b|artificial intelligence|machine learning|llm|chatgpt|claude|gemini|midjourney|stable diffusion|neural|deep learning|openai|anthropic/)) {
    return "ai";
  }
  
  // Coding category
  if (text.match(/\bcode\b|coding|programming|developer|github|javascript|python|react|angular|vue|nodejs|typescript|software engineering/)) {
    return "coding";
  }
  
  // Gaming category
  if (text.match(/\bgame\b|gaming|playstation|xbox|nintendo|switch|steam|console|fortnite|minecraft/)) {
    return "gaming";
  }
  
  // Gadgets category
  if (text.match(/\bphone\b|smartphone|laptop|tablet|watch|headphone|earbud|camera|drone|smart home|device|iphone|samsung|pixel/)) {
    return "gadgets";
  }
  
  // Software category
  if (text.match(/\bapp\b|software|windows|macos|ios|android|update|browser|chrome|firefox|safari|microsoft|google|apple/)) {
    return "software";
  }
  
  return "general";
}

async function fetchFullContent(url: string): Promise<{ content: string; imageUrl?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .advertisement, .ads, .social-share, .comments').remove();
    
    // Try to find main content
    let content = '';
    const selectors = [
      'article',
      '[class*="article-content"]',
      '[class*="post-content"]',
      '[class*="entry-content"]',
      'main',
      '.content',
      '#content'
    ];
    
    for (const selector of selectors) {
      const element = $(selector).first();
      if (element.length && element.text().length > 200) {
        content = element.html() || '';
        break;
      }
    }
    
    // Fallback to body if no article found
    if (!content) {
      content = $('body').html() || '';
    }
    
    // Clean up the content
    const $content = cheerio.load(content);
    $content('script, style, iframe, nav, header, footer, aside').remove();
    
    // Get first image
    let imageUrl: string | undefined;
    const imgSelectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'article img',
      '.featured-image img',
      'img'
    ];
    
    for (const selector of imgSelectors) {
      if (selector.includes('meta')) {
        const src = $(selector).attr('content');
        if (src && !src.includes('avatar') && !src.includes('logo')) {
          imageUrl = src;
          break;
        }
      } else {
        const src = $(selector).first().attr('src');
        if (src && !src.includes('avatar') && !src.includes('logo') && src.startsWith('http')) {
          imageUrl = src;
          break;
        }
      }
    }
    
    return {
      content: $content.html() || content,
      imageUrl
    };
  } catch (error) {
    console.error(`Failed to fetch content from ${url}:`, error);
    return { content: '' };
  }
}

export async function scrapeRSSFeeds(): Promise<ScrapedArticle[]> {
  const articles: ScrapedArticle[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching: ${feed.url}`);
      const parsed = await rssParser.parseURL(feed.url);

      for (const item of parsed.items.slice(0, 3)) { // Reduced to 3 per source to avoid rate limits
        if (!item.title || !item.link) continue;

        // Get image from RSS first
        let imageUrl: string | undefined;
        if (item['media:content']?.[0]?.$.url) {
          imageUrl = item['media:content'][0].$.url;
        } else if (item.enclosure?.url) {
          imageUrl = item.enclosure.url;
        }

        // Fetch full content
        const rawContent = item.contentSnippet || item.content || "";
        const { content: fullContent, imageUrl: fetchedImage } = await fetchFullContent(item.link);
        
        // Use fetched image if RSS didn't have one
        if (!imageUrl && fetchedImage) {
          imageUrl = fetchedImage;
        }

        // Generate excerpt from full content
        const contentForExcerpt = fullContent || rawContent;
        const { excerpt } = await summarizeWithAI(item.title, contentForExcerpt);

        const category = categorizeArticle(item.title, contentForExcerpt);

        articles.push({
          title: item.title,
          excerpt,
          content: fullContent || rawContent,
          imageUrl,
          sourceUrl: item.link,
          sourceName: feed.name,
          category,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        });

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Failed to fetch ${feed.url}:`, error);
    }
  }

  return articles;
}
