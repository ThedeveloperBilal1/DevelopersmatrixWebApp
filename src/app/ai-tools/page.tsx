import { db } from "@/lib/db";
import { aiTools } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, Star, Zap, Image, Code, PenTool, Music, Video, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300;

const categoryIcons: Record<string, React.ReactNode> = {
  coding: <Code className="h-5 w-5" />,
  "image-generation": <Image className="h-5 w-5" />,
  writing: <PenTool className="h-5 w-5" />,
  audio: <Music className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  productivity: <Briefcase className="h-5 w-5" />,
  other: <Zap className="h-5 w-5" />,
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

// Real AI tools data
const realAITools = [
  {
    name: "ChatGPT",
    description: "OpenAI's conversational AI for text generation, coding assistance, and general queries.",
    longDescription: "ChatGPT is a large language model trained by OpenAI that can understand and generate human-like text. It's great for coding help, writing assistance, analysis, and general conversation.",
    category: "writing",
    pricing: "freemium",
    startingPrice: "Free / $20 Pro",
    websiteUrl: "https://chat.openai.com",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    rating: 5,
    features: ["Code generation", "Text summarization", "Image analysis (GPT-4V)", "Custom GPTs", "API access"],
    isFeatured: true,
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer powered by OpenAI Codex for code suggestions and completion.",
    longDescription: "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor. It works with Python, JavaScript, TypeScript, Ruby, Go, and many other languages.",
    category: "coding",
    pricing: "paid",
    startingPrice: "$10/month",
    websiteUrl: "https://github.com/features/copilot",
    imageUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot-logo.svg",
    rating: 5,
    features: ["Code completion", "Chat interface", "Pull request summaries", "CLI assistance", "Multiple IDE support"],
    isFeatured: true,
  },
  {
    name: "Midjourney",
    description: "Create stunning AI-generated artwork and images from text descriptions.",
    longDescription: "Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species through AI-generated imagery.",
    category: "image-generation",
    pricing: "paid",
    startingPrice: "$10/month",
    websiteUrl: "https://midjourney.com",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
    rating: 5,
    features: ["High-quality images", "Style variations", "Upscaling", "Inpainting", "Discord integration"],
    isFeatured: true,
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant with strong reasoning and long context capabilities.",
    longDescription: "Claude is an AI assistant created by Anthropic. It's designed to be helpful, harmless, and honest, with particular strengths in analysis, writing, and coding tasks.",
    category: "writing",
    pricing: "freemium",
    startingPrice: "Free / $20 Pro",
    websiteUrl: "https://claude.ai",
    imageUrl: "",
    rating: 5,
    features: ["100K+ context window", "Document analysis", "Coding assistance", "API access", "Artifacts feature"],
    isFeatured: true,
  },
  {
    name: "Cursor",
    description: "AI-first code editor built on VS Code with powerful code generation features.",
    longDescription: "Cursor is a code editor built from the ground up with AI at its core. It includes features like AI-powered code completion, chat, and the ability to edit entire files with natural language.",
    category: "coding",
    pricing: "freemium",
    startingPrice: "Free / $20 Pro",
    websiteUrl: "https://cursor.sh",
    imageUrl: "",
    rating: 5,
    features: ["AI code completion", "Chat with codebase", "Natural language editing", "VS Code compatible", "GPT-4 powered"],
    isFeatured: false,
  },
  {
    name: "ElevenLabs",
    description: "AI voice generation with realistic speech synthesis and voice cloning.",
    longDescription: "ElevenLabs creates the most realistic, versatile and contextually-aware AI voices. Generate high-quality spoken audio in any voice, style, and language.",
    category: "audio",
    pricing: "freemium",
    startingPrice: "$5/month",
    websiteUrl: "https://elevenlabs.io",
    imageUrl: "",
    rating: 5,
    features: ["Voice cloning", "29 languages", "Speech synthesis", "Projects for long-form", "API access"],
    isFeatured: true,
  },
  {
    name: "Runway ML",
    description: "AI-powered video editing and generation platform for creators.",
    longDescription: "Runway is an applied AI research company shaping the next era of art, entertainment and human creativity. Their Gen-2 model can generate realistic videos from text prompts.",
    category: "video",
    pricing: "freemium",
    startingPrice: "$15/month",
    websiteUrl: "https://runwayml.com",
    imageUrl: "",
    rating: 4,
    features: ["Text to video", "Image to video", "Video to video", "Motion brush", "Infinite image"],
    isFeatured: true,
  },
  {
    name: "Stable Diffusion",
    description: "Open-source image generation model with local and cloud options.",
    longDescription: "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input. It's open source and can run locally.",
    category: "image-generation",
    pricing: "free",
    startingPrice: "Free",
    websiteUrl: "https://stability.ai",
    imageUrl: "",
    rating: 4,
    features: ["Open source", "Local installation", "Custom models", "Inpainting", "Outpainting"],
    isFeatured: false,
  },
  {
    name: "DALL-E 3",
    description: "OpenAI's latest image generation model with high accuracy to prompts.",
    longDescription: "DALL-E 3 understands significantly more nuance and detail than previous systems, allowing you to easily translate your ideas into exceptionally accurate images.",
    category: "image-generation",
    pricing: "paid",
    startingPrice: "Via ChatGPT Plus",
    websiteUrl: "https://openai.com/dall-e-3",
    imageUrl: "",
    rating: 5,
    features: ["High prompt accuracy", "Text in images", "ChatGPT integration", "Safety features", "Commercial use"],
    isFeatured: false,
  },
  {
    name: "Perplexity AI",
    description: "AI-powered search engine with real-time information and citations.",
    longDescription: "Perplexity is an AI-powered search engine that provides direct answers to complex questions with real-time information and cited sources.",
    category: "productivity",
    pricing: "freemium",
    startingPrice: "Free / $20 Pro",
    websiteUrl: "https://perplexity.ai",
    imageUrl: "",
    rating: 5,
    features: ["Real-time search", "Cited sources", "Copilot mode", "Focus modes", "API access"],
    isFeatured: true,
  },
  {
    name: "Notion AI",
    description: "AI writing assistant integrated directly into Notion workspace.",
    longDescription: "Notion AI helps you write faster, think bigger, and augment your creativity. Built directly into your Notion workspace for seamless productivity.",
    category: "productivity",
    pricing: "paid",
    startingPrice: "$10/month",
    websiteUrl: "https://notion.so/product/ai",
    imageUrl: "",
    rating: 4,
    features: ["Writing assistance", "Summarization", "Translation", "Q&A on documents", "Database autofill"],
    isFeatured: false,
  },
  {
    name: "Jasper",
    description: "AI writing assistant for marketing copy, blog posts, and content creation.",
    longDescription: "Jasper is an AI copilot for marketing teams. It helps create blog posts, marketing copy, social media content, and more with brand voice consistency.",
    category: "writing",
    pricing: "paid",
    startingPrice: "$49/month",
    websiteUrl: "https://jasper.ai",
    imageUrl: "",
    rating: 4,
    features: ["Brand voice", "Marketing templates", "SEO mode", "Campaigns", "API access"],
    isFeatured: false,
  },
  {
    name: "Synthesia",
    description: "Create professional AI videos with virtual avatars from text.",
    longDescription: "Synthesia is the world's #1 AI video generation platform. Turn text into professional videos with AI avatars in minutes, without cameras or studios.",
    category: "video",
    pricing: "paid",
    startingPrice: "$22/month",
    websiteUrl: "https://synthesia.io",
    imageUrl: "",
    rating: 4,
    features: ["140+ AI avatars", "120+ languages", "Custom avatars", "Screen recording", "Templates"],
    isFeatured: false,
  },
  {
    name: "Murf AI",
    description: "Versatile AI voice generator for creating studio-quality voiceovers.",
    longDescription: "Murf AI offers realistic AI voices for creating professional voiceovers for videos, presentations, and more. 120+ voices in 20+ languages.",
    category: "audio",
    pricing: "freemium",
    startingPrice: "$19/month",
    websiteUrl: "https://murf.ai",
    imageUrl: "",
    rating: 4,
    features: ["120+ voices", "Voice changer", "Google Slides add-on", "Canva integration", "Team collaboration"],
    isFeatured: false,
  },
  {
    name: "Replicate",
    description: "Run AI models in the cloud with a simple API.",
    longDescription: "Replicate lets you run machine learning models in the cloud from your own code. No servers to set up, no Docker containers to manage.",
    category: "coding",
    pricing: "pay-as-you-go",
    startingPrice: "Pay per use",
    websiteUrl: "https://replicate.com",
    imageUrl: "",
    rating: 5,
    features: ["Thousands of models", "Simple API", "Custom models", "Scalable", "Community"],
    isFeatured: false,
  },
];

async function getAITools() {
  const dbTools = await db.query.aiTools.findMany({
    where: eq(aiTools.isActive, true),
    orderBy: desc(aiTools.isFeatured),
  }) as InferSelectModel<typeof aiTools>[];
  
  // If no tools in DB, return the real tools
  if (dbTools.length === 0) {
    return realAITools;
  }
  
  return dbTools;
}

export default async function AIToolsPage() {
  const tools = await getAITools();
  
  // Group by category
  const grouped = tools.reduce((acc, tool) => {
    const cat = tool.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {} as Record<string, any[]>);

  // Get featured tools
  const featuredTools = tools.filter((t: any) => t.isFeatured).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI Tools Directory</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Best AI Tools for Developers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the top AI tools for coding, image generation, writing, and more. 
          Handpicked and categorized for easy discovery.
        </p>
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Featured Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTools.map((tool: any) => (
              <Card key={tool.name} className="group overflow-hidden hover:shadow-lg transition-all border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {tool.imageUrl ? (
                        <img src={tool.imageUrl} alt={tool.name} className="w-12 h-12 rounded-lg object-contain bg-muted p-1" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                        {tool.rating && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < tool.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                              />
                            ))}
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
      )}

      {/* Tools by Category */}
      <div className="space-y-12">
        {Object.entries(grouped).map(([category, categoryTools]) => (
          <section key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              {categoryIcons[category] || <Zap className="h-5 w-5" />}
              <h2 className="text-xl font-bold">{categoryLabels[category] || category}</h2>
              <Badge variant="secondary" className="ml-2">{categoryTools.length}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTools.map((tool: any) => (
                <Card key={tool.name} className="group overflow-hidden hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {tool.imageUrl ? (
                          <img src={tool.imageUrl} alt={tool.name} className="w-10 h-10 rounded-lg object-contain bg-muted p-1" />
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
                    <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    
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
    </div>
  );
}
