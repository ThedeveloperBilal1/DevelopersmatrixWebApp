import { ArrowRight, Sparkles, TrendingUp, Zap, Code2, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-border">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-300" />
      </div>

      <div className="relative z-10 px-6 py-16 md:px-12 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-white">Curated for Developers</span>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">
              Your Daily
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tech Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI breakthroughs, coding insights, gadget reviews, and the best tech deals — 
            <span className="text-white font-semibold">handpicked for developers</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/category/ai">
              <Button size="lg" className="gap-2 px-8 h-12 text-base bg-white text-slate-900 hover:bg-slate-100 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                Explore AI News
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-tools">
              <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base border-white/30 text-white hover:bg-white/10">
                <Zap className="h-4 w-4" />
                Discover AI Tools
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { icon: TrendingUp, label: "Daily Updates", value: "24/7" },
              { icon: Cpu, label: "AI Coverage", value: "100%" },
              { icon: Code2, label: "Dev Focused", value: "50K+" },
              { icon: Zap, label: "Tools Listed", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
