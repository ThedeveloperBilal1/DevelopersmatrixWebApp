"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Sparkles, Zap, ShoppingBag, Gamepad2, Code, Smartphone, Laptop, Home } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/category/ai", label: "AI", icon: Sparkles },
  { href: "/ai-tools", label: "AI Tools", icon: Zap },
  { href: "/category/gadgets", label: "Gadgets", icon: Smartphone },
  { href: "/category/software", label: "Software", icon: Laptop },
  { href: "/category/gaming", label: "Gaming", icon: Gamepad2 },
  { href: "/category/coding", label: "Coding", icon: Code },
  { href: "/deals", label: "Deals", icon: ShoppingBag },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-auto px-2 py-1 rounded-lg bg-slate-900 dark:bg-slate-800">
              <Image 
                src="/logo.png" 
                alt="Developers Matrix" 
                width={160}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {link.label}
              </Link>
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

        {isOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
