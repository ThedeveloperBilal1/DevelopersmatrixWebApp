import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title: "Micro-Learning - Daily Tech Lessons",
  description: "Learn something new every day with our micro-learning lessons. Quick 15-20 minute lessons on React, TypeScript, SQL, Docker, and more.",
  keywords: ["micro-learning", "daily lessons", "tech tutorials", "learn programming", "quick lessons"],
  openGraph: {
    title: "Micro-Learning | DevelopersMatrix",
    description: "Daily tech lessons in just 15-20 minutes.",
    url: `${siteConfig.url}/learn`,
  },
};

export default function LearnPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Learn", url: `${siteConfig.url}/learn` }
        ]}
      />
      <LearnClient />
    </>
  );
}
