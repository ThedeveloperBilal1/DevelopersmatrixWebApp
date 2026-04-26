import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Gamepad2, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarAd, InContentAd } from "@/components/ads/AdBanner";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";
import { canYouRunItFaqs } from "@/data/new-tools";
import CanYouRunItClient from "./CanYouRunItClient";

export const metadata: Metadata = {
  title: "Can You Run It? - Check Game Requirements for Your PC",
  description: "Check if your PC can run any game before buying. Compare your hardware specs against minimum and recommended requirements for 1000+ popular games.",
  keywords: ["can you run it", "game requirements", "PC specs checker", "system requirements", "gaming hardware", "game compatibility"],
  openGraph: {
    title: "Can You Run It? - Game Requirements Checker | DevelopersMatrix",
    description: "Check if your PC can run any game before buying.",
    url: `${siteConfig.url}/tools/can-you-run-it`,
  },
};

export default function CanYouRunItPage() {
  const tool = {
    name: "Can You Run It?",
    description: "Check if your PC can run any game before buying. Compare your hardware specs against minimum and recommended requirements.",
    features: [
      'Compare your PC specs to game requirements',
      'Minimum & recommended specs check',
      '1000+ games database',
      'Performance prediction',
      'Hardware upgrade suggestions',
      'FPS estimator'
    ],
    benefits: [
      'Save money on games you can\'t run',
      'Know what upgrades you need',
      'Make informed purchase decisions',
      'Avoid disappointment'
    ]
  };

  return (
    <>
      <FAQSchema faqs={canYouRunItFaqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        { name: "Can You Run It", url: `${siteConfig.url}/tools/can-you-run-it` }
      ]} />

      <div className="min-h-screen bg-muted/20">
        <section className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Tools
            </Link>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{tool.name}</h1>
                  <Badge>Free</Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-500">
                    1000+ Games
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CanYouRunItClient />
              <InContentAd />
              
              <Card className="mt-8">
                <CardHeader><CardTitle>Key Features</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {canYouRunItFaqs.map((faq, index) => (
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
                <CardHeader><CardTitle className="text-base">Benefits</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
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
