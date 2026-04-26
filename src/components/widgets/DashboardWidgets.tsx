'use client';

import { 
  Lightbulb, 
  TrendingUp, 
  BookOpen, 
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTodayLesson } from '@/data/micro-learning';

interface WidgetCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function WidgetCard({ title, icon, children, className }: WidgetCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:border-violet-500/50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

const productivityTips = [
  { tip: 'Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up.', category: 'Time Management' },
  { tip: 'Time blocking: Dedicate specific blocks of time to different tasks. Protect these blocks like important meetings.', category: 'Productivity' },
  { tip: 'The Pomodoro Technique: Work in 25-minute focused sessions followed by 5-minute breaks. After 4 sessions, take a longer 15-30 minute break.', category: 'Focus' },
  { tip: 'Eat the frog first: Tackle your most challenging task first thing in the morning when willpower is highest.', category: 'Prioritization' },
  { tip: 'Single-tasking beats multitasking: Focus on one thing at a time. Switching costs can consume up to 40% of productive time.', category: 'Focus' },
  { tip: 'Weekly review: Spend 30 minutes each week reviewing accomplishments and planning the next week.', category: 'Planning' },
  { tip: 'Inbox Zero strategy: Process emails immediately - delete, delegate, respond, or defer. Keep your inbox clear.', category: 'Email' }
];

const skills = [
  { name: 'TypeScript', description: 'A typed superset of JavaScript that compiles to plain JavaScript.', resources: ['TypeScript Handbook', 'TypeScript Deep Dive'] },
  { name: 'React Server Components', description: 'New rendering model for React that renders components on the server.', resources: ['React Docs', 'Server Components Guide'] },
  { name: 'Docker', description: 'Platform for developing, shipping, and running applications in containers.', resources: ['Docker Docs', 'Docker Tutorial'] },
  { name: 'GraphQL', description: 'Query language for APIs that lets clients request exactly what they need.', resources: ['GraphQL Official', 'How to GraphQL'] },
  { name: 'Kubernetes', description: 'Container orchestration platform for automating deployment and scaling.', resources: ['Kubernetes Docs', 'K8s Tutorial'] },
  { name: 'Rust', description: 'Systems programming language focused on safety and performance.', resources: ['Rust Book', 'Rust by Example'] },
  { name: 'WebAssembly', description: 'Binary instruction format for stack-based virtual machines.', resources: ['WebAssembly Docs', 'Wasm Guide'] }
];

const marketTrends = [
  { title: 'AI Agents & Automation', insight: 'Companies are racing to integrate AI agents that can autonomously complete complex tasks. Skills in agent development and prompt engineering are in high demand.', impact: 'high' as const },
  { title: 'Edge Computing Growth', insight: 'Edge computing adoption is accelerating as companies seek lower latency. CDN and edge function expertise becoming crucial.', impact: 'high' as const },
  { title: 'Rise of Developer Platforms', insight: 'Internal developer platforms (IDPs) are becoming standard in enterprises. Platform engineering skills are increasingly valuable.', impact: 'medium' as const },
  { title: 'WebAssembly Adoption', insight: 'WASM is moving beyond browsers to server-side applications. Performance-critical web apps are adopting it rapidly.', impact: 'medium' as const },
  { title: 'AI-Powered Security', insight: 'Security tools leveraging AI for threat detection are becoming standard. Understanding AI security implications is essential.', impact: 'high' as const },
  { title: 'Remote-First Tools', insight: 'Tools enabling async work and remote collaboration continue growing. Building for distributed teams is the new normal.', impact: 'medium' as const },
  { title: 'Green Computing', insight: 'Sustainability in tech is gaining attention. Efficient code and green hosting are becoming differentiators.', impact: 'low' as const }
];

function getDailyContent<T>(items: T[]): T {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return items[dayOfYear % items.length];
}

export function ProductivityTip() {
  const { tip, category } = getDailyContent(productivityTips);

  return (
    <WidgetCard title="Productivity Tip" icon={<Lightbulb className="w-4 h-4" />}>
      <div className="space-y-3">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
        <Link href="/trends">
          <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700 p-0 h-auto">
            More tips <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    </WidgetCard>
  );
}

export function SkillOfDay() {
  const skill = getDailyContent(skills);

  return (
    <WidgetCard title="Skill of the Day" icon={<BookOpen className="w-4 h-4" />}>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          <Badge variant="outline" className="text-xs">Trending</Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground">Resources:</p>
          {skill.resources.map((resource, index) => (
            <button
              key={index}
              className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              {resource}
            </button>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}

export function MarketTrend() {
  const trend = getDailyContent(marketTrends);

  const impactColors = {
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    low: 'bg-green-500/10 text-green-600 border-green-500/20'
  };

  return (
    <WidgetCard title="Market Trend Insight" icon={<TrendingUp className="w-4 h-4" />}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">{trend.title}</h4>
          <Badge variant="outline" className={impactColors[trend.impact]}>
            {trend.impact.charAt(0).toUpperCase() + trend.impact.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{trend.insight}</p>
        <Link href="/trends">
          <Button variant="outline" size="sm" className="w-full group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500">
            Explore Trends
          </Button>
        </Link>
      </div>
    </WidgetCard>
  );
}

export function MicroLearning() {
  const lesson = getTodayLesson();

  return (
    <WidgetCard title="Micro-Learning" icon={<Zap className="w-4 h-4" />}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{lesson.topic}</h4>
          <Badge variant="secondary" className="text-xs">{lesson.duration}</Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{lesson.summary}</p>
        <Link href="/learn">
          <Button variant="outline" size="sm" className="w-full group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500">
            Start Learning
          </Button>
        </Link>
      </div>
    </WidgetCard>
  );
}
