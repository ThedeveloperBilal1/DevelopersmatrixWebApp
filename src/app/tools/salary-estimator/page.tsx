import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DollarSign, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarAd, InContentAd } from "@/components/ads/AdBanner";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { getToolBySlug } from "@/data/tools";
import { siteConfig } from "@/data/config";
import SalaryEstimatorClient from "./SalaryEstimatorClient";

export const metadata: Metadata = {
  title: "Salary Estimator - Know Your Market Value",
  description: "Get accurate salary estimates for any role and location. Compare compensation across industries with real market data.",
  keywords: ["salary estimator", "salary calculator", "pay comparison", "salary range", "compensation calculator", "job salary"],
  openGraph: {
    title: "Salary Estimator | DevelopersMatrix",
    description: "Get accurate salary estimates for any role and location.",
    url: `${siteConfig.url}/tools/salary-estimator`,
  },
};

export default function SalaryEstimatorPage() {
  const tool = getToolBySlug('salary-estimator');

  return (
    <>
      <FAQSchema faqs={tool?.faqs || []} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "Salary Estimator", url: `${siteConfig.url}/tools/salary-estimator` }
        ]}
      />

      <div className="min-h-screen bg-muted/20">
        <section className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
            
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500">
                <DollarSign className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{tool?.name}</h1>
                  <Badge>Free</Badge>
                </div>
                <p className="text-lg text-muted-foreground">{tool?.description}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SalaryEstimatorClient />
              <InContentAd />
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>Everything you need to negotiate with confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {tool?.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

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
                        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
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
                  <Link href="/tools/ai-resume-builder" className="block">
                    <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">AI Resume Builder</p>
                      <p className="text-xs text-muted-foreground">Create professional resumes</p>
                    </div>
                  </Link>
                  <Link href="/tools/budget-planner" className="block">
                    <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Budget Planner</p>
                      <p className="text-xs text-muted-foreground">Plan your finances</p>
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
