import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechPulse - Latest Tech News, AI Updates & Deals",
  description: "Your daily source for technology news, AI breakthroughs, gadget reviews, and the best tech deals.",
  keywords: ["tech news", "AI news", "technology", "gadgets", "tech deals"],
  openGraph: {
    title: "TechPulse - Latest Tech News & Deals",
    description: "Your daily source for technology news and deals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
