import { db } from '@/lib/db';
import { utilityTools } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Tools - Calculators, Generators & Utilities',
  description: 'Free developer tools including calculators, converters, generators, checkers, and formatters. Everything you need for your projects.',
};

export const revalidate = 300;

async function getTools() {
  return await db.query.utilityTools.findMany({
    where: eq(utilityTools.isPublished, true),
    orderBy: desc(utilityTools.createdAt),
  });
}

export default async function ToolsPage() {
  const tools = await getTools();
  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 py-6">
        <h1 className="text-4xl font-bold">Developer Tools</h1>
        <p className="text-lg text-muted-foreground">
          Free utilities, calculators, generators, and tools for developers. No sign-up required.
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <Badge variant="default">All</Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-semibold text-lg flex-1">{tool.name}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="w-fit text-xs">
                      {tool.toolType}
                    </Badge>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:gap-2 transition-all"
                  >
                    Use <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground mt-3">
                  {tool.views} uses
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">No tools available yet.</p>
        </Card>
      )}
    </div>
  );
}
