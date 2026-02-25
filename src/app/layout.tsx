import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developers Matrix - AI Tools, Developer News & Passive Income",
  description: "The ultimate platform for developers. Browse AI tools, read the latest tech news, access utility tools, and earn passive income through reviews and recommendations.",
  keywords: ["AI tools", "developer tools", "tech news", "passive income", "developer resources", "software reviews"],
  openGraph: {
    title: "Developers Matrix",
    description: "AI tools directory, developer news, utility tools, and passive income opportunities",
    type: "website",
    url: "https://developersmatrix.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: true,
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
