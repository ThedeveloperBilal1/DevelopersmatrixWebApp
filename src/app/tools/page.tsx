import { Metadata } from "next";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  Wallet, 
  CheckCircle, 
  DollarSign, 
  Lightbulb, 
  Calendar,
  Gamepad2,
  BookOpen,
  Link2
} from "lucide-react";
import { ToolCard } from "@/components/shared/Cards";
import { InContentAd } from "@/components/ads/AdBanner";
import { WebApplicationSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { tools } from "@/data/tools";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "AI-Powered Tools for Career & Productivity",
  description: "Access free AI-powered tools including Resume Builder, Cover Letter Generator, Budget Planner, and more. Optimize your career and daily productivity.",
  openGraph: {
    title: "AI-Powered Tools | DevelopersMatrix",
    description: "Access free AI-powered tools including Resume Builder, Cover Letter Generator, Budget Planner, and more.",
    url: `${siteConfig.url}/tools`,
  },
};

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8" />,
  Mail: <Mail className="w-8 h-8" />,
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  Wallet: <Wallet className="w-8 h-8" />,
  CheckCircle: <CheckCircle className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />,
  Gamepad2: <Gamepad2 className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Link: <Link2 className="w-8 h-8" />,
};

export default function ToolsPage() {
  const categories = [
    { id: 'career', name: 'Career', description: 'Tools to advance your career' },
    { id: 'productivity', name: 'Productivity', description: 'Boost your daily efficiency' },
    { id: 'finance', name: 'Finance', description: 'Manage your money wisely' },
    { id: 'gaming', name: 'Gaming', description: 'Game system requirements and specs' },
  ];

  return (
    <>
      <WebApplicationSchema
        name="DevelopersMatrix Tools"
        description="Collection of AI-powered tools for career and productivity optimization"
        url={`${siteConfig.url}/tools`}
        applicationCategory="BusinessApplication"
        operatingSystem="Web"
        offers={{ price: "0", priceCurrency: "USD" }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` }
        ]}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            AI-Powered <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Powerful, free tools designed to optimize your career, finances, and daily productivity. 
            Built with AI to save you time and deliver professional results.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryTools = tools.filter(tool => tool.category === category.id);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <InContentAd />

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Our Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every tool is designed with your success in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">100% Free Core Features</h3>
              <p className="text-sm text-muted-foreground">
                All essential features are completely free. No hidden costs or trial periods.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Results</h3>
              <p className="text-sm text-muted-foreground">
                Leverage advanced AI to generate professional, high-quality content in seconds.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Privacy-First</h3>
              <p className="text-sm text-muted-foreground">
                Your data stays local. We don't store or share your personal information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
