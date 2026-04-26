import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'DevelopersMatrix',
  description: 'AI-Powered Life & Opportunity Optimization Hub - Tools, insights, and resources for developers, entrepreneurs, and tech professionals to optimize their careers and daily productivity.',
  url: 'https://developersmatrix.com',
  ogImage: 'https://developersmatrix.com/og-image.png',
  links: {
    twitter: 'https://twitter.com/developersmatrix',
    github: 'https://github.com/developersmatrix',
    linkedin: 'https://linkedin.com/company/developersmatrix'
  }
};

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'GTA 6', href: '/gta-6' },
  { 
    name: 'Tools', 
    href: '/tools',
    children: [
      { name: 'AI Resume Builder', href: '/tools/ai-resume-builder' },
      { name: 'Cover Letter Generator', href: '/tools/ai-cover-letter-generator' },
      { name: 'Interview Simulator', href: '/tools/ai-interview-simulator' },
      { name: 'Salary Estimator', href: '/tools/salary-estimator' },
      { name: 'Startup Ideas', href: '/tools/startup-idea-generator' },
      { name: 'AI Prompt Library', href: '/tools/ai-prompt-library' },
      { name: 'AI Email Assistant', href: '/tools/ai-email-assistant' },
      { name: 'Link Manager', href: '/tools/link-manager' },
      { name: 'Can You Run It?', href: '/tools/can-you-run-it' },
      { name: 'Budget Planner', href: '/tools/budget-planner' },
      { name: 'Habit Tracker', href: '/tools/habit-tracker' },
      { name: 'Productivity Planner', href: '/tools/productivity-planner' }
    ]
  },
  { name: 'Trends', href: '/trends' },
  { name: 'Blog', href: '/blog' },
  { name: 'Community', href: '/community' }
];

export const footerLinks = {
  product: [
    { name: 'AI Resume Builder', href: '/tools/ai-resume-builder' },
    { name: 'Budget Planner', href: '/tools/budget-planner' },
    { name: 'Trend Radar', href: '/trends' },
    { name: 'Community Q&A', href: '/community' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
};

export const widgetContent = {
  productivityTip: {
    tip: 'Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up and cluttering your mental space.',
    category: 'Time Management'
  },
  skillOfDay: {
    name: 'TypeScript',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript. Essential for modern web development and large-scale applications.',
    resources: [
      'Official TypeScript Handbook',
      'TypeScript Deep Dive',
      'Practical TypeScript Migration'
    ]
  },
  marketTrend: {
    title: 'AI Integration Demand',
    insight: 'Companies are actively seeking developers who can integrate AI capabilities into existing products. Skills in prompt engineering and AI API integration are increasingly valuable.',
    impact: 'high' as const
  },
  microLearning: {
    topic: 'React Hooks Deep Dive',
    content: 'Learn how to create custom hooks for reusable logic. Custom hooks let you extract component logic into reusable functions. Start with understanding useState and useEffect, then move to useContext and useReducer.',
    duration: '15 min'
  }
};
