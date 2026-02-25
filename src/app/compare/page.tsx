import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Tools & Software Comparisons - Developers Matrix',
  description:
    'Compare AI tools, software, and developer resources side-by-side. Find the best tool for your needs.',
};

export default function ComparePage() {
  const comparisons = [
    {
      id: 1,
      title: 'ChatGPT vs Claude vs Gemini',
      category: 'AI Chat Models',
      description: 'Compare leading AI language models for coding and content generation',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'VS Code vs Sublime Text vs WebStorm',
      category: 'Code Editors',
      description: 'Find the best code editor for your development workflow',
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      title: 'GitHub Copilot vs Tabnine vs Amazon CodeWhisperer',
      category: 'AI Code Assistants',
      description: 'Compare AI-powered coding assistants for productivity',
      difficulty: 'Intermediate',
    },
    {
      id: 4,
      title: 'Vercel vs Netlify vs Railway',
      category: 'Deployment Platforms',
      description: 'Compare deployment and hosting platforms for web apps',
      difficulty: 'Intermediate',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 py-6">
        <h1 className="text-4xl font-bold">Tool Comparisons</h1>
        <p className="text-lg text-muted-foreground">
          Side-by-side comparisons of popular AI tools, software, and developer resources.
        </p>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comp) => (
          <Card key={comp.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <h2 className="font-semibold text-lg">{comp.title}</h2>
              <p className="text-sm text-muted-foreground">{comp.description}</p>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{comp.category}</Badge>
                <Badge variant="secondary">{comp.difficulty}</Badge>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/compare/${comp.id}`}>View Comparison</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">Want to request a comparison?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We regularly add new comparisons based on community requests.
        </p>
        <Button asChild>
          <Link href="/contact">Submit a Request</Link>
        </Button>
      </Card>
    </div>
  );
}
