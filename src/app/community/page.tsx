import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";
import CommunityClient from "@/components/community/CommunityClient";

export const metadata: Metadata = {
  title: "Community Threads - Ask Questions, Share Knowledge",
  description: "Join our community of developers, entrepreneurs, and tech professionals. Create threads, reply to discussions, and share your knowledge.",
  keywords: ["tech community", "developer threads", "programming discussions", "career advice", "tech help", "AI discussions", "gaming", "finance"],
  openGraph: {
    title: "Community Threads | DevelopersMatrix",
    description: "Join our community of developers, entrepreneurs, and tech professionals. Create threads, reply to discussions, and share your knowledge.",
    url: `${siteConfig.url}/community`,
  },
};

export default function CommunityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Community", url: `${siteConfig.url}/community` }
        ]}
      />
      <CommunityClient />
    </>
  );
}
