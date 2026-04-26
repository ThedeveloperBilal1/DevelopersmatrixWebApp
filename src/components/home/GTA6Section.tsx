'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gamepad2, Calendar, Monitor, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function GTA6Section() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/20 to-transparent dark:from-purple-900/20 dark:via-pink-900/10 dark:to-slate-950" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100/50 via-pink-50/30 to-white dark:from-purple-900/30 dark:via-pink-900/20 dark:to-slate-900 border border-purple-200 dark:border-purple-500/20 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <Badge className="w-fit mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30">
                <Gamepad2 className="w-3 h-3 mr-1" />
                Featured Game
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Grand Theft Auto{' '}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  VI
                </span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                Check if your PC can run GTA 6. Get the latest system requirements, 
                release date info, real-time news, and use our compatibility checker.
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Release</p>
                    <p className="font-semibold text-sm">Fall 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                  <Monitor className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Platforms</p>
                    <p className="font-semibold text-sm">PS5, Xbox, PC</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 col-span-2 shadow-sm">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-sm">Vice City — Inspired by Miami</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/gta-6">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 rounded-xl shadow-lg shadow-purple-500/25">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Check Requirements
                  </Button>
                </Link>
                <Link href="/tools/can-you-run-it">
                  <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                    PC Specs Checker
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-64 lg:h-auto min-h-[400px]"
            >
              <img 
                src="/images/games/gta6.png" 
                alt="GTA 6 - Grand Theft Auto VI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/50 dark:to-slate-900/50 lg:to-white dark:lg:to-slate-900" />
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
              >
                Coming November 2026
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
