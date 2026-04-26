'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: '1',
    slug: 'ai-revolution-2026-job-market',
    title: 'The AI Revolution: How It Is Reshaping the Job Market in 2026',
    excerpt: 'Explore how AI is transforming industries and creating new job opportunities.',
    category: 'Career',
    readTime: 8,
    image: '/images/blog/ai-breakthrough.jpg',
    color: 'from-purple-600 to-blue-600',
    featured: true,
  },
  {
    id: '2',
    slug: 'remote-work-productivity-tips-2026',
    title: '10 Strategies to Boost Productivity While Working Remotely',
    excerpt: 'Master the art of remote work with these science-backed strategies.',
    category: 'Productivity',
    readTime: 10,
    image: '/images/blog/entertainment.jpg',
    color: 'from-blue-600 to-cyan-600',
    featured: false,
  },
  {
    id: '3',
    slug: 'startup-funding-guide-2026',
    title: 'The Complete Guide to Startup Funding',
    excerpt: 'Navigate the complex world of startup funding with this comprehensive guide.',
    category: 'Startup',
    readTime: 12,
    image: '/images/blog/chatgpt-ai.jpg',
    color: 'from-orange-600 to-amber-600',
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function BlogSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/50 dark:from-purple-900/10 via-transparent to-transparent" />

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
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-purple-500 uppercase tracking-wider">Latest Posts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              From the Blog
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
              Insights, guides, and industry analysis.
            </p>
          </div>
          <Link href="/blog" className="hidden sm:block">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl group">
              Read all posts 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Blog Grid - Bento Style */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants} className={post.featured ? 'md:col-span-2 lg:col-span-1' : ''}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group relative h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-60`} />
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 backdrop-blur-sm">
                      {post.category}
                    </Badge>

                    {/* Featured Badge */}
                    {post.featured && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <span className="text-xs font-medium text-purple-500 group-hover:text-purple-400 flex items-center gap-1">
                        Read article 
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link href="/blog">
            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              Read all posts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
