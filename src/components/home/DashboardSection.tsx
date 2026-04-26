'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Lightbulb, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Cloud,
  Newspaper,
  Quote,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const widgets = [
  {
    title: 'Weather',
    icon: Cloud,
    value: '72°F',
    subtitle: 'Partly Cloudy',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Tech News',
    icon: Newspaper,
    value: '5 Stories',
    subtitle: 'AI & Startups',
    gradient: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Daily Quote',
    icon: Quote,
    value: '"Stay hungry"',
    subtitle: 'Steve Jobs',
    gradient: 'from-orange-500/10 to-amber-500/10',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Upcoming',
    icon: Calendar,
    value: '3 Events',
    subtitle: 'This Week',
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-500',
  },
];

const insights = [
  {
    category: 'PRODUCTIVITY TIP',
    title: 'The 2-Minute Rule',
    description: 'If a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up and keeps your workflow smooth.',
    icon: Lightbulb,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    href: '/learn',
  },
  {
    category: 'SKILL OF THE DAY',
    title: 'React Server Components',
    description: 'New rendering model for React that renders components on the server. Perfect for building fast, modern web applications.',
    icon: BookOpen,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    href: '/learn',
  },
  {
    category: 'MARKET INSIGHT',
    title: 'AI Agents & Automation',
    description: 'Companies are racing to integrate AI agents that can autonomously complete complex tasks. Skills in agent development are in high demand.',
    icon: TrendingUp,
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    href: '/trends',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function DashboardSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-100/50 dark:from-purple-900/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-500 uppercase tracking-wider">Personalized</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Daily Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Start your day with personalized insights, tips, and updates all in one glance.
          </p>
        </motion.div>

        {/* Dashboard Preview - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Widgets Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-1 grid grid-cols-2 gap-4"
          >
            {widgets.map((widget) => (
              <motion.div 
                key={widget.title}
                variants={itemVariants}
                className="group"
              >
                <div className={`p-5 rounded-2xl bg-white dark:bg-gradient-to-br dark:${widget.gradient} border border-slate-200 dark:border-slate-700/30 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300 h-full`}>
                  <widget.icon className={`w-6 h-6 ${widget.iconColor} mb-3`} />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{widget.title}</p>
                  <p className="text-lg font-semibold">{widget.value}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{widget.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Insights */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 space-y-4"
          >
            {insights.map((insight, index) => (
              <motion.div 
                key={insight.title}
                variants={itemVariants}
              >
                <Link href={insight.href}>
                  <div className="group p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${insight.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <insight.icon className={`w-6 h-6 ${insight.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${insight.iconColor} mb-1`}>{insight.category}</p>
                        <h3 className="font-semibold mb-1 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">{insight.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {insight.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/learn">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 h-12 rounded-xl shadow-lg shadow-purple-500/25 group">
              Start Learning 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
