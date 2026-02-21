import { TrendingUp, Cpu, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="h-4 w-4" />
            Live Updates
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Your Daily Dose of{" "}
          <span className="text-primary">Tech Intelligence</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6">
          AI breakthroughs, gadget reviews, software updates, and the best tech deals — 
          curated and delivered fresh.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Real-time news aggregation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cpu className="h-4 w-4" />
            <span>AI-powered summaries</span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </section>
  );
}
