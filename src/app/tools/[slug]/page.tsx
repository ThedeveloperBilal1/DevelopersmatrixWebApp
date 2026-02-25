import { db } from '@/lib/db';
import { utilityTools } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string) {
  return await db.query.utilityTools.findFirst({
    where: eq(utilityTools.slug, slug),
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} - Free Developer Tool | Developers Matrix`,
    description: tool.description,
    keywords: [tool.name, tool.category, tool.toolType, 'free tool', 'developer tool'],
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
    },
  };
}

export const revalidate = 3600;

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool || !tool.isPublished) {
    notFound();
  }

  // Increment view count
  await db
    .update(utilityTools)
    .set({ views: (tool.views || 0) + 1 })
    .where(eq(utilityTools.id, tool.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/tools">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>

        <h1 className="text-4xl font-bold">{tool.name}</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Badge>{tool.toolType}</Badge>
          <Badge variant="outline">{tool.category}</Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            {tool.views} uses
          </div>
        </div>

        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      {/* Tool Interface Placeholder */}
      <Card className="p-8 bg-muted/50 text-center space-y-4 min-h-96 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">{tool.name}</h2>
        <p className="text-muted-foreground">Interactive tool interface would appear here</p>
        <p className="text-sm text-muted-foreground">
          This is a{' '}
          <span className="font-medium text-foreground">
            {tool.toolType}
          </span>{' '}
          for {tool.category}
        </p>
      </Card>

      {/* Description */}
      {tool.content && (
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">About</h2>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {tool.content}
          </div>
        </Card>
      )}

      {/* Features */}
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Features</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Free to use - no sign-up required</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Works entirely in your browser</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>No data collection or storage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Optimized for{' '}{tool.category} tasks</span>
          </li>
        </ul>
      </Card>

      {/* Related Tools */}
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Tips</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Bookmark this page for quick access</li>
          <li>Works best on desktop and tablet devices</li>
          <li>Results are calculated locally in your browser</li>
          <li>Clear your browser cache if results seem incorrect</li>
        </ul>
      </Card>

      {/* Back Link */}
      <div className="pt-6 border-t">
        <Link href="/tools">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            View all developer tools
          </Button>
        </Link>
      </div>
    </div>
  );
}
