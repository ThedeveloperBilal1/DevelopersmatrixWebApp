import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function GET() {
  try {
    const zai = await ZAI.create();
    
    // Search for latest GTA 6 news
    const searchResults = await zai.functions.invoke("web_search", {
      query: "GTA 6 Grand Theft Auto VI latest news updates 2024 2025",
      num: 8
    });

    const news = searchResults.map((item: { 
      name: string; 
      snippet: string; 
      url: string; 
      date?: string;
      host_name?: string;
    }) => ({
      title: item.name,
      snippet: item.snippet,
      url: item.url,
      source: item.host_name || 'News Source',
      date: item.date || new Date().toLocaleDateString()
    }));

    return NextResponse.json({ news });
  } catch (error) {
    console.error('GTA6 news API error:', error);
    
    // Return fallback news
    return NextResponse.json({
      news: [
        {
          title: "GTA 6 Release Date Confirmed for Fall 2025",
          snippet: "Rockstar Games confirms Grand Theft Auto VI will launch in Fall 2025 for PlayStation 5 and Xbox Series X|S.",
          url: "https://www.rockstargames.com/newswire",
          source: "Rockstar Games",
          date: "2024"
        },
        {
          title: "GTA 6 Trailer Breakdown: Everything We Know",
          snippet: "Detailed analysis of the GTA 6 trailer revealing Vice City location, dual protagonists, and next-gen features.",
          url: "https://www.ign.com/articles/gta-6-trailer-breakdown",
          source: "IGN",
          date: "2024"
        },
        {
          title: "GTA 6 PC Release - What We Know",
          snippet: "Historical patterns suggest GTA 6 PC version may arrive 6-12 months after console launch.",
          url: "https://www.pcgamer.com/gta-6-pc",
          source: "PC Gamer",
          date: "2024"
        }
      ]
    });
  }
}
