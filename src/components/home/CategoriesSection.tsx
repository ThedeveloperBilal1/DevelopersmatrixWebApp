'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, 
  Briefcase, 
  DollarSign, 
  Zap, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    title: 'AI Tools',
    description: 'Smart AI-powered solutions for content, code, and productivity',
    icon: Brain,
    href: '/tools?category=ai',
    gradient: 'from-purple-500/10 to-purple-600/10',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    borderHover: 'hover:border-purple-500/50',
    stats: '5+ tools',
  },
  {
    title: 'Career Tools',
    description: 'Resume builders, interview prep, and salary estimators',
    icon: Briefcase,
    href: '/tools?category=career',
    gradient: 'from-blue-500/10 to-blue-600/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    borderHover: 'hover:border-blue-500/50',
    stats: '4+ tools',
  },
  {
    title: 'Finance',
    description: 'Budget planners, expense trackers, and financial insights',
    icon: DollarSign,
    href: '/tools?category=finance',
    gradient: 'from-green-500/10 to-green-600/10',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    borderHover: 'hover:border-green-500/50',
    stats: '2+ tools',
  },
  {
    title: 'Productivity',
    description: 'Habit trackers, planners, and workflow optimizers',
    icon: Zap,
    href: '/tools?category=productivity',
    gradient: 'from-orange-500/10 to-orange-600/10',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    borderHover: 'hover:border-orange-500/50',
    stats: '3+ tools',
  },
  {
    title: 'Learning',
    description: 'Micro-learning courses and skill development resources',
    icon: GraduationCap,
    href: '/learn',
    gradient: 'from-indigo-500/10 to-indigo-600/10',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
    borderHover: 'hover:border-indigo-500/50',
    stats: '50+ lessons',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export function CategoriesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/50 dark:from-purple-900/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Find the right tool for your needs. Each category is packed with 
            resources designed to help you succeed.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Link href={category.href}>
                <div className={`group relative p-6 rounded-2xl bg-white dark:bg-gradient-to-br dark:${category.gradient} border border-slate-200 dark:border-slate-800/50 ${category.borderHover} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${category.iconBg} ${category.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mb-4">
                    {category.description}
                  </p>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400">
                      {category.stats}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
