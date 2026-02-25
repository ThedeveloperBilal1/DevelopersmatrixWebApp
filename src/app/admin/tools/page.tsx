import { db } from '@/lib/db';
import { utilityTools } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Trash2 } from 'lucide-react';

export const revalidate = 0;

async function getTools() {
  return await db.query.utilityTools.findMany({
    orderBy: desc(utilityTools.createdAt),
  });
}

export default async function ToolsAdminPage() {
  const tools = await getTools();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Utility Tools</h1>
        <Link href="/admin/tools/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Tool
          </Button>
        </Link>
      </div>

      {tools.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No tools yet</p>
            <Link href="/admin/tools/new">
              <Button>Create First Tool</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tools.map((tool) => (
            <Card key={tool.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={tool.isPublished ? 'default' : 'secondary'}>
                        {tool.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline">{tool.toolType}</Badge>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/tools/${tool.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
