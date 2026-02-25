import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Tag } from "lucide-react";

const topDeals = [
  {
    title: "Sony WH-1000XM5",
    category: "Headphones",
    price: "$298",
    originalPrice: "$399",
    discount: "25%",
    image: "🎧",
  },
  {
    title: "ChatGPT Plus",
    category: "AI Tool",
    price: "$20/mo",
    originalPrice: "",
    discount: "",
    image: "🤖",
  },
  {
    title: "GitHub Copilot",
    category: "Developer",
    price: "$10/mo",
    originalPrice: "",
    discount: "",
    image: "💻",
  },
  {
    title: "Midjourney",
    category: "Image AI",
    price: "$10/mo",
    originalPrice: "",
    discount: "",
    image: "🎨",
  },
];

export function TopDeals() {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Top Deals</h2>
        </div>
        <Link href="/deals">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topDeals.map((deal) => (
          <Link key={deal.title} href="/deals">
            <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer border-border/50 hover:border-primary/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{deal.image}</span>
                  {deal.discount && (
                    <Badge className="bg-destructive text-destructive-foreground">-{deal.discount}</Badge>
                  )}
                </div>
                
                <Badge variant="outline" className="mb-2 text-xs">{deal.category}</Badge>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{deal.title}</h3>
                
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{deal.price}</span>
                  {deal.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
