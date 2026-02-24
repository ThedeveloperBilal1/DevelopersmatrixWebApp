import { db } from "@/lib/db";
import { aiTools } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, Star, Zap, Image, Code, PenTool, Music, Video, Briefcase } from "lucide-react";
import Link from "next/link";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300;

const categoryIcons: Record<string, React.ReactNode> = {
  coding: <Code className="h-4 w-4" />,
  "image-generation": <Image className="h-4 w-4" />,
  writing: <PenTool className="h-4 w-4" />,
  audio: <Music className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  productivity: <Briefcase className="h-4 w-4" />,
  other: <Zap className="h-4 w-4" />,
};

const categoryLabels: Record<string, string> = {
  coding: "Coding & Development",
  "image-generation": "Image Generation",
  writing: "Writing & Content",
  audio: "Audio & Voice",
  video: "Video Creation",
  productivity: "Productivity",
  other: "Other Tools",
};

async function getAITools() {
  const tools = await db.query.aiTools.findMany({
    where: eq(aiTools.isActive, true),
    orderBy: desc(aiTools.isFeatured),
  }) as InferSelectModel<typeof aiTools>[];
  
  // Group by category
  const grouped = tools.reduce((acc, tool) => {
    const cat = tool.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {} as Record<string, InferSelectModel<typeof aiTools>[]>);
  
  return grouped;
}

// Sample data for initial display
const sampleTools = [
  {
    name: "ChatGPT",
    description: "OpenAI's conversational AI for text generation, coding, and more.",
    category: "writing",
    pricing: "freemium",
    websiteUrl: "https://chat.openai.com",
    features: ["Text generation", "Code assistance", "Image analysis"],
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster.",
    category: "coding",
    pricing: "paid",
    startingPrice: "$10/month",
    websiteUrl: "https://github.com/features/copilot",
    features: ["Code completion", "Chat interface", "Pull request summaries"],
  },
  {
    name: "Midjourney",
    description: "Create stunning AI-generated images from text descriptions.",
    category: "image-generation",
    pricing: "paid",
    startingPrice: "$10/month",
    websiteUrl: "https://midjourney.com",
    features: ["High-quality images", "Style variations", "Upscaling"],
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant with strong reasoning capabilities.",
    category: "writing",
    pricing: "freemium",
    websiteUrl: "https://claude.ai",
    features: ["Long context", "Document analysis", "Coding help"],
  },
  {
    name: "ElevenLabs",
    description: "AI voice generation with realistic speech synthesis.",
    category: "audio",
    pricing: "freemium",
    startingPrice: "$5/month",
    websiteUrl: "https://elevenlabs.io",
    features: ["Voice cloning", "Multiple languages", "Emotion control"],
  },
  {
    name: "Runway ML",
    description: "AI-powered video editing and generation platform.",
    category: "video",
    pricing: "freemium",
    startingPrice: "$15/month",
    websiteUrl: "https://runwayml.com",
    features: ["Video generation", "Background removal", "Motion tracking"],
  },
];

export default async function AIToolsPage() {
  const groupedTools = await getAITools();
  const hasData = Object.keys(groupedTools).length > 0;
  
  // Use sample data if no database entries yet
  const displayTools = hasData ? groupedTools : sampleTools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool as any);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI Directory</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Best AI Tools</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the top AI tools for coding, image generation, writing, and more. 
          Curated and categorized for easy discovery.
        </p>
      </section>

      {Object.entries(displayTools).map(([category, tools]) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            {categoryIcons[category] || <Zap className="h-5 w-5" />}
            <h2 className="text-xl font-bold">{categoryLabels[category] || category}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: any) => (
              <Card key={tool.id || tool.name} className="group overflow-hidden hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {tool.imageUrl ? (
                        <img src={tool.imageUrl} alt={tool.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        {tool.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{tool.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {tool.pricing && (
                      <Badge variant={tool.pricing === 'free' ? 'default' : 'secondary'} className="text-xs">
                        {tool.pricing}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  
                  {tool.startingPrice && (
                    <p className="text-sm font-medium">From {tool.startingPrice}</p>
                  )}

                  {tool.features && tool.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map((feature: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{feature}</Badge>
                      ))}
                    </div>
                  )}

                  <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full" variant="outline">
                      Visit Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
