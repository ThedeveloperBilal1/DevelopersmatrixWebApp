import { Metadata } from "next";
import { Sparkles, Target, Users, Heart, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InContentAd } from "@/components/ads/AdBanner";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Vision",
  description: "Learn about DevelopersMatrix - our mission to empower developers, entrepreneurs, and tech professionals with AI-powered tools and insights.",
  openGraph: {
    title: "About Us | DevelopersMatrix",
    description: "Learn about DevelopersMatrix and our mission to empower tech professionals.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema
        name={siteConfig.name}
        url={siteConfig.url}
        description={siteConfig.description}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` }
        ]}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 px-4 py-2 border-violet-500/30 bg-violet-500/10">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-violet-500" />
            <span className="text-violet-600 dark:text-violet-400">Our Story</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">DevelopersMatrix</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to empower developers, entrepreneurs, and tech professionals 
            with AI-powered tools and insights to optimize their careers and lives.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                DevelopersMatrix was founded with a simple yet powerful vision: to create a daily destination 
                where tech professionals can access the tools, insights, and resources they need to thrive in 
                their careers and personal lives.
              </p>
              <p className="text-muted-foreground mb-4">
                In an industry that moves at breakneck speed, staying ahead requires more than just technical 
                skills. It requires career intelligence, productivity optimization, financial literacy, and 
                a community of peers who understand your journey.
              </p>
              <p className="text-muted-foreground">
                We believe that AI should augment human potential, not replace it. Every tool we build is 
                designed to save time, provide insights, and help you make better decisions—while keeping 
                you in control.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Target className="w-6 h-6" />, title: "Mission-Driven", desc: "Focused on real impact" },
                { icon: <Users className="w-6 h-6" />, title: "Community First", desc: "Built by developers, for developers" },
                { icon: <Shield className="w-6 h-6" />, title: "Privacy-Focused", desc: "Your data stays yours" },
                { icon: <Zap className="w-6 h-6" />, title: "AI-Powered", desc: "Leveraging cutting-edge AI" },
              ].map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InContentAd />

      {/* Values Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                  </div>
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We continuously explore new technologies and approaches to deliver cutting-edge solutions 
                  that make a real difference in our users' lives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  Trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Transparency and privacy are non-negotiable. We're committed to being clear about how 
                  our tools work and protecting your personal information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Heart className="w-5 h-5 text-blue-500" />
                  </div>
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We believe in the power of shared knowledge. Our community-driven approach ensures 
                  that everyone can contribute and benefit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact in Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold gradient-text">50K+</p>
              <p className="text-muted-foreground mt-2">Monthly Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">8</p>
              <p className="text-muted-foreground mt-2">AI-Powered Tools</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">500+</p>
              <p className="text-muted-foreground mt-2">Articles Published</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">15K+</p>
              <p className="text-muted-foreground mt-2">Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-8">
            Be part of a growing community of developers, entrepreneurs, and tech professionals 
            who are optimizing their careers and lives with DevelopersMatrix.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              Get Started Free
            </Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
