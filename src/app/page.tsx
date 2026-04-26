import { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { OrganizationSchema, WebApplicationSchema } from "@/components/seo/SchemaMarkup";
import { 
  HeroSection, 
  CategoriesSection, 
  FeaturedToolsSection, 
  TrendingSection, 
  DashboardSection, 
  BlogSection, 
  GTA6Section, 
  CTASection 
} from "@/components/home";

export const metadata: Metadata = {
  title: "AI-Powered Tools for Developers, Entrepreneurs & Tech Professionals",
  description: "Discover AI-powered tools for resume building, budget planning, interview preparation, and more. Stay ahead with tech trends and career insights. Free AI tools for career growth.",
  keywords: [
    "AI resume builder",
    "free resume maker",
    "cover letter generator",
    "interview preparation",
    "salary estimator",
    "career tools",
    "productivity tools",
    "budget planner",
    "developer tools",
    "job search tools",
    "GTA 6 requirements",
    "tech trends 2026"
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "DevelopersMatrix - AI-Powered Career & Life Optimization",
    description: "Discover AI-powered tools for resume building, budget planning, interview preparation, and more. Join 10,000+ professionals.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "DevelopersMatrix - AI-Powered Tools Platform"
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevelopersMatrix - AI-Powered Career & Life Optimization',
    description: 'Discover AI-powered tools for resume building, budget planning, interview preparation, and more.',
    images: [siteConfig.ogImage],
    creator: '@developersmatrix',
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema
        name={siteConfig.name}
        url={siteConfig.url}
        description={siteConfig.description}
      />
      <WebApplicationSchema
        name={siteConfig.name}
        description={siteConfig.description}
        url={siteConfig.url}
        applicationCategory="BusinessApplication"
        operatingSystem="Web"
        offers={{ price: "0", priceCurrency: "USD" }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured AI Tools Section */}
      <FeaturedToolsSection />

      {/* Trending Section */}
      <TrendingSection />

      {/* Daily Dashboard Section */}
      <DashboardSection />

      {/* GTA 6 Featured Section */}
      <GTA6Section />

      {/* Blog Preview Section */}
      <BlogSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
