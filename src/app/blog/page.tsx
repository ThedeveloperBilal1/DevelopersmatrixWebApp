import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/config";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Insights, Guides & Industry Analysis",
  description: "Explore our blog for the latest insights on career development, productivity, technology trends, startup advice, and personal finance for tech professionals.",
  keywords: ["tech blog", "career advice", "productivity tips", "developer insights", "startup guide", "tech career"],
  openGraph: {
    title: "Blog | DevelopersMatrix",
    description: "Explore our blog for the latest insights on career development, productivity, and technology trends.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` }
        ]}
      />
      <BlogClient initialPosts={blogPosts} />
    </>
  );
}
