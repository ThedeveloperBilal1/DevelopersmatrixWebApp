"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Code, Menu, X, Sparkles, Zap, ShoppingBag, Code2, Smartphone, Briefcase, ArrowRight, DollarSign } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navCategories = [
  {
    label: "Discover",
    items: [
      { href: "/news", label: "Latest News", icon: Code2, description: "Tech & AI updates" },
      { href: "/ai-tools", label: "AI Tools", icon: Sparkles, description: "Directory of AI tools" },
      { href: "/tools", label: "Developer Tools", icon: Zap, description: "Utilities & generators" },
      { href: "/deals", label: "Best Deals", icon: ShoppingBag, description: "Tech deals & offers" },
    ],
  },
  {
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog", icon: Briefcase, description: "Articles & tutorials" },
      { href: "/compare", label: "Comparisons", icon: Code, description: "Tool comparisons" },
      { href: "/category/tutorial", label: "Tutorials", icon: Code2, description: "Step-by-step guides" },
    ],
  },
  {
    label: "Monetize",
    items: [
      { href: "/affiliate", label: "Affiliate Program", icon: DollarSign, description: "Earn commissions" },
      { href: "/admin", label: "Admin Panel", icon: Briefcase, description: "Manage content" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code className="h-6 w-6" />
            <span>Developers Matrix</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((category) => (
              <div
                key={category.label}
                className="relative group"
                onMouseEnter={() => setOpenMenu(category.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Button
                  variant="ghost"
                  className="text-sm font-medium"
                >
                  {category.label}
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:rotate-90 transition-transform" />
                </Button>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-0 hidden group-hover:block bg-background border rounded-lg shadow-lg mt-0 min-w-max">
                  <div className="grid grid-cols-1 gap-0 p-4">
                    {category.items.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start gap-3 p-2 rounded hover:bg-muted transition-colors group"
                        >
                          <IconComponent className="h-4 w-4 mt-1 text-muted-foreground group-hover:text-foreground" />
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t py-4 space-y-4">
            {navCategories.map((category) => (
              <div key={category.label} className="space-y-2">
                <h3 className="font-semibold text-sm px-2">{category.label}</h3>
                {category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground px-4 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
