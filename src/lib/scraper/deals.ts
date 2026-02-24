import * as cheerio from "cheerio";

export interface ScrapedDeal {
  title: string;
  description: string;
  imageUrl?: string;
  originalPrice?: string;
  dealPrice: string;
  discountPercent?: number;
  productUrl: string;
  retailer: string;
  category: string;
  expiresAt?: Date;
}

const DEAL_SOURCES = [
  {
    name: "Amazon",
    url: "https://www.amazon.com/gp/goldbox",
    category: "general",
  },
];

// For now, we'll use a manual approach for deals
// In production, you'd use affiliate APIs or scrape deal sites
export async function scrapeDeals(): Promise<ScrapedDeal[]> {
  const deals: ScrapedDeal[] = [];
  
  // Sample deals for demonstration
  // In production, replace with actual scraping or API calls
  const sampleDeals: ScrapedDeal[] = [
    {
      title: "Sony WH-1000XM5 Noise Canceling Headphones",
      description: "Industry-leading noise cancellation with 30-hour battery life.",
      imageUrl: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
      originalPrice: "$399.99",
      dealPrice: "$298.00",
      discountPercent: 25,
      productUrl: "https://amazon.com/dp/B09XS7JWHH",
      retailer: "Amazon",
      category: "gadgets",
    },
    {
      title: "Apple AirPods Pro 2",
      description: "Active noise cancellation, transparency mode, spatial audio.",
      imageUrl: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
      originalPrice: "$249.00",
      dealPrice: "$189.99",
      discountPercent: 24,
      productUrl: "https://amazon.com/dp/B0CHWRXH8B",
      retailer: "Amazon",
      category: "gadgets",
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      description: "256GB, AI-powered features, S Pen included.",
      imageUrl: "https://m.media-amazon.com/images/I/71CXhVhpW0L._AC_SL1500_.jpg",
      originalPrice: "$1,299.99",
      dealPrice: "$1,099.99",
      discountPercent: 15,
      productUrl: "https://amazon.com/dp/B0CMDWC436",
      retailer: "Amazon",
      category: "gadgets",
    },
    {
      title: "ChatGPT Plus Subscription",
      description: "Access to GPT-4, DALL-E, and advanced features.",
      dealPrice: "$20/month",
      productUrl: "https://chat.openai.com",
      retailer: "OpenAI",
      category: "software",
    },
    {
      title: "Midjourney Subscription",
      description: "AI image generation with high-quality outputs.",
      dealPrice: "$10/month",
      productUrl: "https://midjourney.com",
      retailer: "Midjourney",
      category: "software",
    },
    {
      title: "Adobe Creative Cloud",
      description: "All apps including Photoshop, Illustrator, Premiere Pro.",
      originalPrice: "$54.99/month",
      dealPrice: "$35.99/month",
      discountPercent: 35,
      productUrl: "https://www.adobe.com/creativecloud.html",
      retailer: "Adobe",
      category: "software",
    },
  ];
  
  return sampleDeals;
}

export function generateDealSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}
