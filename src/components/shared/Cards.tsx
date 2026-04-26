import Link from 'next/link';
import { 
  ArrowRight, 
  Clock, 
  TrendingUp,
  FileText,
  Mail,
  MessageSquare,
  Wallet,
  CheckCircle,
  DollarSign,
  Lightbulb,
  Calendar,
  Brain,
  Cpu,
  Code,
  Atom,
  Home,
  Leaf,
  Layers,
  Shield,
  Scale,
  Globe,
  Settings,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tool, BlogPost, Trend } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Wallet: <Wallet className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.path}>
      <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-violet-500/50 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
              {iconMap[tool.icon] || <FileText className="w-5 h-5" />}
            </div>
            <Badge variant="secondary" className="capitalize">
              {tool.category}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-violet-600 transition-colors">
            {tool.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {tool.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5">
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1.5 text-violet-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 group-hover:shadow-lg transition-shadow">
            Use Tool <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-violet-500/50 overflow-hidden">
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-violet-500/20 to-purple-600/20">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <Badge className="absolute top-3 left-3" variant="secondary">
            {post.category}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-violet-600 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  const categoryColors: Record<string, string> = {
    tech: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    career: 'bg-green-500/10 text-green-600 border-green-500/20',
    skill: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    startup: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    ai: 'bg-violet-500/10 text-violet-500 border-violet-500/20'
  };

  return (
    <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-violet-500/50">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={categoryColors[trend.category]}>
            {trend.category.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            +{trend.growth}%
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-violet-600 transition-colors flex items-center gap-2">
          {iconMap[trend.icon] && (
            <span className="text-violet-500">{iconMap[trend.icon]}</span>
          )}
          <span className="line-clamp-1">{trend.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {trend.description}
        </p>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs font-medium text-foreground mb-1">Prediction</p>
          <p className="text-xs text-muted-foreground">{trend.prediction}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {trend.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
