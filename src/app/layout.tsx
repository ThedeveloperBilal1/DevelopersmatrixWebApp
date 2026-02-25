import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developers Matrix - Tech News, AI Updates & Developer Tools",
  description: "Your daily source for technology news, AI breakthroughs, coding insights, gadget reviews, and the best tech deals curated for developers.",
  keywords: ["tech news", "AI news", "developer tools", "coding", "technology", "gadgets", "tech deals", "programming"],
  authors: [{ name: "Developers Matrix" }],
  openGraph: {
    title: "Developers Matrix - Tech News & AI Updates",
    description: "Your daily source for technology news and developer tools",
    type: "website",
    siteName: "Developers Matrix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developers Matrix",
    description: "Tech news and AI updates for developers",
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
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
