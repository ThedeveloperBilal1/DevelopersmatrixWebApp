'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, Mail, MessageSquare, Brain, Gamepad2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const featuredTools = [
  {
    id: 'ai-resume-builder',
    name: 'AI Resume Builder',
    description: 'Create ATS-optimized resumes in minutes with AI assistance.',
    icon: FileText,
    category: 'Career',
    color: 'purple',
    href: '/tools/ai-resume-builder',
    featured: true,
  },
  {
    id: 'ai-cover-letter',
    name: 'Cover Letter Generator',
    description: 'Generate personalized cover letters that match any job posting.',
    icon: Mail,
    category: 'Career',
    color: 'blue',
    href: '/tools/ai-cover-letter-generator',
    featured: false,
  },
  {
    id: 'interview-simulator',
    name: 'Interview Simulator',
    description: 'Practice interviews with AI feedback. Build confidence.',
    icon: MessageSquare,
    category: 'Career',
    color: 'indigo',
    href: '/tools/ai-interview-simulator',
    featured: false,
  },
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    description: 'Track expenses, set goals, and visualize your finances.',
    icon: Brain,
    category: 'Finance',
    color: 'green',
    href: '/tools/budget-planner',
    featured: false,
  },
  {
    id: 'can-you-run-it',
    name: 'Can You Run It?',
    description: 'Check if your PC meets game requirements instantly.',
    icon: Gamepad2,
    category: 'Gaming',
    color: 'orange',
    href: '/tools/can-you-run-it',
    featured: false,
  },
  {
    id: 'startup-ideas',
    name: 'Startup Idea Generator',
    description: 'Get AI-powered business ideas tailored to your skills.',
    icon: Sparkles,
    category: 'Productivity',
    color: 'pink',
    href: '/tools/startup-idea-generator',
    featured: false,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'group-hover:shadow-purple-500/10' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'group-hover:shadow-blue-500/10' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'group-hover:shadow-indigo-500/10' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', glow: 'group-hover:shadow-green-500/10' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'group-hover:shadow-orange-500/10' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'group-hover:shadow-pink-500/10' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function FeaturedToolsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/30 dark:from-purple-900/10 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <Badge variant="outline" className="mb-4 border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400">
              Featured
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              AI-Powered Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
              Handpicked tools to help you work smarter, not harder.
            </p>
          </div>
          <Link href="/tools" className="hidden sm:block">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl group">
              View all tools 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Tools Grid - Bento Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {featuredTools.map((tool) => {
            const colors = colorMap[tool.color];
            return (
              <motion.div key={tool.id} variants={itemVariants}>
                <Link href={tool.href}>
                  <div className={`group relative p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                    {/* Featured Badge */}
                    {tool.featured && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs border-0">
                          Popular
                        </Badge>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-7 h-7" />
                    </div>
                    
                    {/* Category Badge */}
                    <Badge variant="secondary" className="mb-3 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs">
                      {tool.category}
                    </Badge>
                    
                    {/* Content */}
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {tool.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors mt-4">
                      <span>Try it free</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile View All */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link href="/tools">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              View all tools <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
