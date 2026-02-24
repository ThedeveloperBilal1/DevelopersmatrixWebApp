"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Cpu, Menu, X, Sparkles, Zap, ShoppingBag, Gamepad2, Code, Smartphone, Laptop } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
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
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Cpu className="h-6 w-6 text-primary" />
            <span>TechPulse</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
