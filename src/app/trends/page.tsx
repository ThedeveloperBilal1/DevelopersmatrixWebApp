import { Metadata } from "next";
import { TrendingUp, Brain, Cpu, Code, Atom, Home, Leaf, Layers, Shield, Scale, Globe, Settings, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendCard } from "@/components/shared/Cards";
import { InContentAd } from "@/components/ads/AdBanner";
import { OrganizationSchema } from "@/components/seo/SchemaMarkup";
import { trends, getAllTrendCategories } from "@/data/trends";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Trend Radar - Tech Trends, Career Insights & Market Predictions",
  description: "Stay ahead with the latest tech trends, career growth predictions, skill demand forecasts, and AI opportunity insights. Updated weekly with data-driven analysis.",
  keywords: ["tech trends", "career predictions", "skill demand", "AI trends", "job market", "technology forecast"],
  openGraph: {
    title: "Trend Radar | DevelopersMatrix",
    description: "Stay ahead with the latest tech trends, career growth predictions, and market insights.",
    url: `${siteConfig.url}/trends`,
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Atom: <Atom className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />
};

const categoryInfo = {
  ai: { name: 'AI & ML', color: 'bg-violet-500', icon: <Brain className="w-5 h-5" /> },
  tech: { name: 'Technology', color: 'bg-blue-500', icon: <Cpu className="w-5 h-5" /> },
  career: { name: 'Career', color: 'bg-green-500', icon: <TrendingUp className="w-5 h-5" /> },
  skill: { name: 'Skills', color: 'bg-purple-500', icon: <Code className="w-5 h-5" /> },
  startup: { name: 'Startup', color: 'bg-orange-500', icon: <Globe className="w-5 h-5" /> }
};

export default function TrendsPage() {
  const categories = getAllTrendCategories();

  return (
    <>
      <OrganizationSchema
        name={siteConfig.name}
        url={siteConfig.url}
        description={siteConfig.description}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 px-4 py-2 border-violet-500/30 bg-violet-500/10">
            <TrendingUp className="w-3.5 h-3.5 mr-2 text-violet-500" />
            <span className="text-violet-600 dark:text-violet-400">Updated Weekly</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Trend <span className="gradient-text">Radar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the curve with emerging tech trends, career predictions, 
            skill demand forecasts, and AI opportunities shaping the future.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const count = trends.filter(t => t.category === key).length;
              return (
                <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={`p-2 rounded-lg ${info.color}/10 text-[${info.color.replace('bg-', '')}]`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{info.name}</p>
                    <p className="text-xs text-muted-foreground">{count} trends</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map(category => {
            const categoryTrends = trends.filter(t => t.category === category);
            const info = categoryInfo[category as keyof typeof categoryInfo];
            
            return (
              <div key={category} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2.5 rounded-xl ${info.color}/10 text-violet-500`}>
                    {info.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{info.name} Trends</h2>
                    <p className="text-muted-foreground">
                      Latest developments and predictions in {info.name.toLowerCase()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTrends.map(trend => (
                    <TrendCard key={trend.id} trend={trend} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <InContentAd />

      {/* Insight Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Insights for 2024</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Data-driven predictions to help you make informed career and business decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-violet-500" />
                  AI Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">80%</p>
                <p className="text-sm text-muted-foreground">
                  of enterprises will deploy AI applications by 2025. Start building AI integration skills now.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Cybersecurity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">3.5M</p>
                <p className="text-sm text-muted-foreground">
                  unfilled cybersecurity jobs globally. Excellent career opportunity for security professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-500" />
                  Low-Code/No-Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-2">70%</p>
                <p className="text-sm text-muted-foreground">
                  of new business applications will use low-code technologies by 2025.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Want Personalized Trend Insights?</h2>
          <p className="text-muted-foreground mb-6">
            Sign up for our newsletter and get customized trend alerts based on your interests and career goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 h-10 px-4 rounded-md border border-input bg-background text-sm"
            />
            <Button className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              Get Alerts
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
