import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";
import ConnectWithUsClient from "./ConnectWithUsClient";

export const metadata: Metadata = {
  title: "Connect With Us - Advertise, Partner & Collaborate",
  description: "Partner with DevelopersMatrix for advertising, sponsored content, AI tool promotion, guest posting opportunities, and more. Reach thousands of developers and tech professionals.",
  keywords: ["advertise with us", "partner with us", "sponsored content", "guest post", "AI tool promotion", "tech advertising"],
  openGraph: {
    title: "Connect With Us | DevelopersMatrix",
    description: "Partner with DevelopersMatrix for advertising and collaboration opportunities.",
    url: `${siteConfig.url}/connect`,
  },
};

export default function ConnectPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Connect With Us", url: `${siteConfig.url}/connect` }
        ]}
      />
      <ConnectWithUsClient />
    </>
  );
}
