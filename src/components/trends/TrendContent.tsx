'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Wrench,
  Building,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendDetail } from '@/data/trend-details';

interface TrendContentProps {
  trend: TrendDetail;
  relatedTrends: TrendDetail[];
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  ai: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  tech: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  skill: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  career: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  startup: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function TrendContent({ trend, relatedTrends }: TrendContentProps) {
  const colors = categoryColors[trend.category] || categoryColors.tech;

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br ${trend.heroGradient} opacity-5 dark:opacity-10`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/30 dark:from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link href="/trends" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Trends
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <Badge className={`${colors.bg} ${colors.text} ${colors.border} border px-3 py-1`}>
                {trend.category.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                +{trend.growth}% growth
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            >
              {trend.title}
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 dark:text-slate-400"
            >
              {trend.subtitle}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 pt-2">
              {trend.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                What It Is
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{trend.introduction.what}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Why It Matters in 2026
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{trend.introduction.whyItMatters}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Sections */}
            {trend.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl font-bold">{section.title}</h2>
                
                {section.content && (
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
                )}

                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {section.subsections.map((sub, subIndex) => (
                      <div 
                        key={subIndex}
                        className="p-5 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
                      >
                        <h3 className="font-semibold mb-2 text-lg">{sub.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Real World Examples */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Building className="w-7 h-7 text-blue-500" />
                Real World Examples
              </h2>
              
              <div className="grid gap-4">
                {trend.realWorldExamples.map((example, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-lg">{example.title}</h3>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {example.company}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">{example.description}</p>
                    <p className="text-sm text-green-500 flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                      <span><strong>Outcome:</strong> {example.outcome}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to Get Started */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-indigo-500" />
                How to Get Started
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Beginner */}
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Beginner</h3>
                  </div>
                  <ul className="space-y-2">
                    {trend.howToGetStarted.beginner.map((item, index) => (
                      <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intermediate */}
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400">Intermediate</h3>
                  </div>
                  <ul className="space-y-2">
                    {trend.howToGetStarted.intermediate.map((item, index) => (
                      <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advanced */}
                <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h3 className="font-semibold text-purple-600 dark:text-purple-400">Advanced</h3>
                  </div>
                  <ul className="space-y-2">
                    {trend.howToGetStarted.advanced.map((item, index) => (
                      <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Wrench className="w-7 h-7 text-orange-500" />
                Tools to Know
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trend.tools.map((tool, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-1 shadow-sm"
                  >
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{tool.description}</p>
                    <Badge variant="outline" className="text-xs border-slate-200 dark:border-slate-700">
                      {tool.useCase}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pros and Cons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold">Pros and Considerations</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Advantages
                  </h3>
                  <ul className="space-y-3">
                    {trend.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                  <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Considerations
                  </h3>
                  <ul className="space-y-3">
                    {trend.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Future Outlook */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-500/10 dark:via-blue-500/5 dark:to-transparent border border-purple-200 dark:border-purple-500/20"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                Future Outlook
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{trend.futureOutlook}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Trends */}
      {relatedTrends.length > 0 && (
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Trends</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTrends.map((related) => {
                const relatedColors = categoryColors[related.category] || categoryColors.tech;
                return (
                  <Link key={related.id} href={`/trends/${related.slug}`}>
                    <div className="group p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${relatedColors.bg} ${relatedColors.text} text-xs`}>
                          {related.category}
                        </Badge>
                        <span className="text-xs text-green-500">+{related.growth}%</span>
                      </div>
                      <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-white transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                        Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to explore more?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Discover all technology trends and stay ahead of the curve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/trends">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 h-12 rounded-xl">
                  View All Trends
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 h-12 rounded-xl">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
