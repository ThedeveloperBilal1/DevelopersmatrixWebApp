'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Zap, Code, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const headlines = [
  { text: 'Explore AI Trends', icon: Brain },
  { text: 'Learn Web Development', icon: Code },
  { text: 'Master Future Skills', icon: Target },
  { text: 'Build Your Career', icon: Zap },
];

const stats = [
  { value: '12+', label: 'AI Tools' },
  { value: '10K+', label: 'Daily Users' },
  { value: '500+', label: 'Career Insights' },
  { value: '1000+', label: 'Success Stories' },
];

export function HeroSection() {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-background to-blue-100/50 dark:from-purple-900/20 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent dark:from-purple-900/20 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Animated Glow Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[128px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Badge 
              variant="outline" 
              className="mb-8 px-4 py-2 border-purple-500/30 bg-purple-500/5 backdrop-blur-sm text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              AI-Powered Platform for Developers
            </Badge>
          </motion.div>

          {/* Dynamic Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-4"
          >
            <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeadline}
                  initial={{ y: 40, opacity: 0, rotateX: -15 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -40, opacity: 0, rotateX: 15 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                >
                  {(() => {
                    const IconComponent = headlines[currentHeadline].icon;
                    return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />;
                  })()}
                  <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-600 dark:text-slate-300">
                    {headlines[currentHeadline].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Headline Indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {headlines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeadline(index)}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    index === currentHeadline 
                      ? 'bg-purple-500 w-8' 
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-4'
                  }`}
                  aria-label={`Go to headline ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">Your Complete Toolkit for</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Career & Growth
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered resume builders, interview prep, budget tools, and the latest tech trends.
            Everything you need to advance your career and stay ahead.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/tools">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 h-14 text-base font-medium shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-2xl"
              >
                Start Building <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/trends">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 h-14 text-base font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl backdrop-blur-sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Explore Trends
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/50 transition-all hover:-translate-y-1 shadow-sm"
              >
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
