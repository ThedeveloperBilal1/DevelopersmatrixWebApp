import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Eye, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarAd, InContentAd } from "@/components/ads/AdBanner";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { getToolBySlug } from "@/data/tools";
import { siteConfig } from "@/data/config";
import ResumeBuilderClient from "./ResumeBuilderClient";

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional, ATS-Optimized Resumes",
  description: "Build professional, ATS-optimized resumes in minutes with our free AI-powered resume builder. Get personalized content suggestions, modern templates, and instant downloads.",
  keywords: ["AI resume builder", "resume maker", "ATS resume", "professional resume", "free resume builder", "job application"],
  openGraph: {
    title: "AI Resume Builder | DevelopersMatrix",
    description: "Build professional, ATS-optimized resumes in minutes with our free AI-powered resume builder.",
    url: `${siteConfig.url}/tools/ai-resume-builder`,
  },
};

export default function ResumeBuilderPage() {
  const tool = getToolBySlug('ai-resume-builder');

  return (
    <>
      <FAQSchema faqs={tool?.faqs || []} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "AI Resume Builder", url: `${siteConfig.url}/tools/ai-resume-builder` }
        ]}
      />

      <div className="min-h-screen bg-muted/20">
        {/* Header */}
        <section className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link 
              href="/tools" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
            
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-violet-500/10 text-violet-500">
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{tool?.name}</h1>
                  <Badge>Free</Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ATS-Optimized
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{tool?.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Tool Area */}
            <div className="lg:col-span-3">
              <ResumeBuilderClient />
              
              <InContentAd />
              
              {/* Features Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Everything you need to create a standout resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {tool?.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SidebarAd />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Related Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/tools/ai-cover-letter-generator" className="block">
                    <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Cover Letter Generator</p>
                      <p className="text-xs text-muted-foreground">Create matching cover letters</p>
                    </div>
                  </Link>
                  <Link href="/tools/ai-interview-simulator" className="block">
                    <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Interview Simulator</p>
                      <p className="text-xs text-muted-foreground">Practice for your interview</p>
                    </div>
                  </Link>
                  <Link href="/tools/salary-estimator" className="block">
                    <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Salary Estimator</p>
                      <p className="text-xs text-muted-foreground">Know your market value</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <SidebarAd />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
