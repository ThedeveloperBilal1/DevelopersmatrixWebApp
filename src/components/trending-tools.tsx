import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, TrendingUp, Zap, Code, Image, PenTool } from "lucide-react";

const trendingTools = [
  {
    name: "ChatGPT",
    category: "writing",
    description: "Conversational AI for text generation",
    icon: PenTool,
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    name: "GitHub Copilot",
    category: "coding",
    description: "AI pair programmer",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    name: "Midjourney",
    category: "image",
    description: "AI image generation",
    icon: Image,
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    name: "Claude",
    category: "writing",
    description: "AI assistant with long context",
    icon: Sparkles,
    color: "from-orange-500/20 to-amber-500/10",
  },
];

export function TrendingTools() {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Trending AI Tools</h2>
        </div>
        <Link href="/ai-tools">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.name} href="/ai-tools">
              <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer border-border/50 hover:border-primary/30">
                <CardContent className="p-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  
                  <Badge variant="secondary" className="mb-2 text-xs">{tool.category}</Badge>
                  
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
