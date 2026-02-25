import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/50 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">Daily Newsletter</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead in Tech
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Get the latest AI news, developer tools, and exclusive deals delivered to your inbox every morning.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 px-4"
            />
            <Button type="submit" size="lg" className="h-12 px-8 whitespace-nowrap">
              <Sparkles className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            Join 10,000+ developers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
