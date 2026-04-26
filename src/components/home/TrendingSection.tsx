'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Brain, Code, Cpu, Leaf, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  {
    id: '1',
    slug: 'generative-ai-enterprise',
    title: 'Generative AI in Enterprise',
    growth: 340,
    category: 'AI',
    icon: Brain,
    description: 'Enterprise adoption of generative AI tools is accelerating rapidly.',
    color: 'purple',
  },
  {
    id: '2',
    slug: 'ai-augmented-development',
    title: 'AI-Augmented Development',
    growth: 420,
    category: 'Skills',
    icon: Code,
    description: 'AI coding assistants are transforming software development workflows.',
    color: 'blue',
  },
  {
    id: '3',
    slug: 'edge-computing-expansion',
    title: 'Edge Computing Expansion',
    growth: 180,
    category: 'Tech',
    icon: Cpu,
    description: 'Edge computing is becoming essential for real-time processing needs.',
    color: 'orange',
  },
  {
    id: '4',
    slug: 'green-tech-sustainability',
    title: 'Green Tech & Sustainability',
    growth: 210,
    category: 'Startup',
    icon: Leaf,
    description: 'Environmental concerns are driving innovation in sustainable technology.',
    color: 'green',
  },
  {
    id: '5',
    slug: 'cybersecurity-skills-gap',
    title: 'Cybersecurity Skills Gap',
    growth: 85,
    category: 'Career',
    icon: Shield,
    description: 'The cybersecurity skills shortage continues to intensify globally.',
    color: 'red',
  },
  {
    id: '6',
    slug: 'platform-engineering',
    title: 'Platform Engineering',
    growth: 195,
    category: 'Skills',
    icon: Settings,
    description: 'Platform engineering is emerging as a critical discipline.',
    color: 'indigo',
  },
];

const categoryStyles: Record<string, { bg: string; text: string; iconBg: string }> = {
  AI: { bg: 'bg-purple-500/10', text: 'text-purple-500', iconBg: 'from-purple-500/20 to-blue-500/20' },
  Tech: { bg: 'bg-blue-500/10', text: 'text-blue-500', iconBg: 'from-blue-500/20 to-cyan-500/20' },
  Skills: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', iconBg: 'from-indigo-500/20 to-violet-500/20' },
  Startup: { bg: 'bg-orange-500/10', text: 'text-orange-500', iconBg: 'from-orange-500/20 to-amber-500/20' },
  Career: { bg: 'bg-green-500/10', text: 'text-green-500', iconBg: 'from-green-500/20 to-emerald-500/20' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function TrendingSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />

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
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-purple-500 uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              What is Hot in Tech
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
              Stay ahead with the latest trends shaping the industry.
            </p>
          </div>
          <Link href="/trends" className="hidden sm:block">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl group">
              Explore all trends 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Trending Grid - Bento Style */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {trendingTopics.map((topic, index) => {
            const styles = categoryStyles[topic.category] || categoryStyles.AI;
            return (
              <motion.div key={topic.id} variants={itemVariants}>
                <Link href={`/trends/${topic.slug}`}>
                  <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 shadow-sm backdrop-blur-sm hover:shadow-lg dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-purple-500/5 hover:-translate-y-1 h-full">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${styles.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <topic.icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles.bg} ${styles.text}`}>
                          {topic.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +{topic.growth}%
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mb-4">
                      {topic.description}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm font-medium text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 dark:text-slate-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                      #{index + 1}
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
          <Link href="/trends">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              Explore all trends <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
