import { db } from "@/lib/db";
import { deals } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tag } from "lucide-react";
import Link from "next/link";
import type { InferSelectModel } from "drizzle-orm";

export const revalidate = 300;

async function getDeals() {
  return await db.query.deals.findMany({
    where: (dealsTable: typeof deals.$inferSelect, { eq }: { eq: any }) => eq(dealsTable.isActive, true),
    orderBy: desc(deals.createdAt),
    limit: 30,
  }) as InferSelectModel<typeof deals>[];
}

export default async function DealsPage() {
  const activeDeals = await getDeals();

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Tag className="h-4 w-4" />
          <span className="text-sm font-medium">Hot Deals</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Tech Deals</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Curated deals on gadgets, software, and tech accessories. 
          Prices updated regularly.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeDeals.map((deal: InferSelectModel<typeof deals>) => (
          <Card key={deal.id} className="group overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video relative overflow-hidden bg-muted">
              {deal.imageUrl ? (
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <Tag className="h-8 w-8 text-primary/40" />
                </div>
              )}
              
              {deal.discountPercent && (
                <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                  -{deal.discountPercent}%
                </Badge>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{deal.category}</Badge>
                <span className="text-xs text-muted-foreground">{deal.retailer}</span>
              </div>
              <h3 className="font-semibold line-clamp-2">{deal.title}</h3>
            </CardHeader>

            <CardContent>
              {deal.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {deal.description}
                </p>
              )}

              <div className="flex items-center gap-3 mb-4">
                {deal.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {deal.originalPrice}
                  </span>
                )}
                {deal.dealPrice && (
                  <span className="text-xl font-bold text-primary">
                    {deal.dealPrice}
                  </span>
                )}
              </div>

              <Link href={deal.productUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">
                  View Deal
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      {activeDeals.length === 0 && (
        <div className="text-center py-16">
          <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No active deals</h3>
          <p className="text-muted-foreground">Check back soon for new deals!</p>
        </div>
      )}
    </div>
  );
}
