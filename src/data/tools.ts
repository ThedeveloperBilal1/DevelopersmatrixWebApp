import { Tool, FAQ } from '@/types';

const resumeBuilderFaqs: FAQ[] = [
  {
    question: "How does the AI Resume Builder work?",
    answer: "Our AI Resume Builder uses advanced language models to analyze your input and generate professional, ATS-optimized resume content. Simply enter your details, and the AI will create compelling descriptions, bullet points, and summaries tailored to your industry."
  },
  {
    question: "Is this resume builder suitable for all industries?",
    answer: "Yes! Our AI Resume Builder is designed to work across all industries and job levels. Whether you're a software developer, marketing professional, healthcare worker, or executive, the AI adapts to create industry-appropriate content."
  },
  {
    question: "Can I customize the generated resume?",
    answer: "Absolutely! The AI-generated content serves as a strong foundation. You can edit, add, or remove any sections to perfectly match your personal experience and career goals."
  },
  {
    question: "What formats can I export my resume in?",
    answer: "You can export your resume in multiple formats including PDF, DOCX, and plain text. PDF is recommended for most applications as it preserves formatting across all devices."
  }
];

const coverLetterFaqs: FAQ[] = [
  {
    question: "How do I write an effective cover letter with AI?",
    answer: "Our AI Cover Letter Generator analyzes the job description and your background to create a personalized, compelling cover letter. Simply paste the job posting, add your experience details, and let the AI craft a professional letter."
  },
  {
    question: "What makes a cover letter stand out to employers?",
    answer: "A standout cover letter is personalized to the company, demonstrates knowledge of the role, highlights relevant achievements with specific examples, and shows enthusiasm for the position. Our AI helps you achieve all of these elements."
  },
  {
    question: "Should I customize my cover letter for each application?",
    answer: "Yes, absolutely! Each cover letter should be tailored to the specific role and company. Our AI makes this process efficient by generating customized content based on each job description you provide."
  }
];

const interviewFaqs: FAQ[] = [
  {
    question: "How does the AI Interview Simulator work?",
    answer: "Our AI Interview Simulator generates realistic interview questions based on your target role and industry. You can practice your responses and receive AI-generated feedback on your answers, including suggestions for improvement."
  },
  {
    question: "What types of interview questions are included?",
    answer: "The simulator includes behavioral questions, technical questions, situational scenarios, and role-specific inquiries. You can customize the focus areas based on your interview preparation needs."
  },
  {
    question: "Can I practice for specific companies?",
    answer: "Yes! You can specify the company you're interviewing with, and the AI will tailor questions to match that company's known interview style and values."
  }
];

const budgetPlannerFaqs: FAQ[] = [
  {
    question: "How does the Budget Planner help with financial planning?",
    answer: "Our Budget Planner provides a comprehensive view of your income and expenses, helping you identify spending patterns, set savings goals, and make informed financial decisions. Visual charts make it easy to understand your financial health."
  },
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. All data is stored locally in your browser and never sent to external servers. Your financial information remains completely private and under your control."
  },
  {
    question: "Can I track multiple income sources?",
    answer: "Yes! The Budget Planner supports multiple income streams and expense categories. Whether you have a salary, freelance income, investments, or side hustles, you can track everything in one place."
  }
];

const habitTrackerFaqs: FAQ[] = [
  {
    question: "How does habit tracking improve productivity?",
    answer: "Habit tracking creates accountability and visual progress feedback. Seeing your streaks grow motivates continued behavior, while the data helps identify patterns and optimize your daily routines for maximum productivity."
  },
  {
    question: "What types of habits can I track?",
    answer: "You can track any habit - from health routines like exercise and water intake, to productivity habits like reading, coding practice, or meditation. Custom categories let you organize habits your way."
  },
  {
    question: "Does the app send reminders?",
    answer: "Yes, you can set custom reminders for each habit. Choose the time and frequency that works best for your schedule to ensure you never miss a day."
  }
];

const salaryEstimatorFaqs: FAQ[] = [
  {
    question: "How accurate are the salary estimates?",
    answer: "Our salary estimates are based on aggregated data from multiple sources including job postings, industry surveys, and user submissions. While we strive for accuracy, actual salaries may vary based on company size, specific skills, and negotiation."
  },
  {
    question: "Can I compare salaries across different locations?",
    answer: "Yes! Our tool allows you to compare salaries for the same role across different cities and countries, factoring in cost of living adjustments to give you a realistic view of compensation in various locations."
  },
  {
    question: "How often is the salary data updated?",
    answer: "Our database is updated monthly with the latest market data to ensure you have access to current salary information for your job search and negotiations."
  }
];

const startupIdeaFaqs: FAQ[] = [
  {
    question: "How does the AI generate startup ideas?",
    answer: "Our AI analyzes current market trends, emerging technologies, and consumer needs to generate innovative startup ideas. It combines industry knowledge with creative problem-solving to suggest viable business opportunities."
  },
  {
    question: "Are the generated ideas unique?",
    answer: "Each idea is generated fresh based on your inputs and current market conditions. While similar concepts may exist, the AI provides unique angles and implementation suggestions for each idea."
  },
  {
    question: "Can I refine and iterate on generated ideas?",
    answer: "Absolutely! Use the generated ideas as a starting point and ask for variations, specific market focus, or implementation strategies. The AI can dive deeper into any aspect that interests you."
  }
];

const productivityPlannerFaqs: FAQ[] = [
  {
    question: "What makes this productivity planner different?",
    answer: "Our AI-powered planner combines task management with intelligent scheduling suggestions, priority optimization, and productivity insights. It learns from your patterns to help you work smarter, not harder."
  },
  {
    question: "Can I integrate this with other tools?",
    answer: "The planner is designed to work standalone or alongside your existing tools. Export options and future integrations with popular calendars and project management tools are planned."
  },
  {
    question: "How does the AI help with prioritization?",
    answer: "The AI analyzes task urgency, importance, dependencies, and your historical productivity patterns to suggest optimal task ordering and time allocation for maximum efficiency."
  }
];

export const tools: Tool[] = [
  {
    id: 'ai-resume-builder',
    slug: 'ai-resume-builder',
    name: 'AI Resume Builder',
    description: 'Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. Get personalized content suggestions, modern templates, and export options that help you stand out to recruiters and hiring managers.',
    shortDescription: 'Build ATS-optimized resumes with AI assistance',
    icon: 'FileText',
    category: 'career',
    features: [
      'AI-powered content generation',
      'ATS-friendly formatting',
      'Multiple professional templates',
      'Real-time preview',
      'Export to PDF, DOCX',
      'Cover letter integration'
    ],
    benefits: [
      'Save hours of resume writing time',
      'Increase interview callback rates',
      'Pass ATS screening systems',
      'Professional formatting automatically'
    ],
    faqs: resumeBuilderFaqs,
    keywords: ['resume builder', 'AI resume', 'ATS resume', 'professional resume', 'resume maker', 'job application'],
    path: '/tools/ai-resume-builder'
  },
  {
    id: 'ai-cover-letter-generator',
    slug: 'ai-cover-letter-generator',
    name: 'AI Cover Letter Generator',
    description: 'Generate personalized, compelling cover letters tailored to each job application. Our AI analyzes job descriptions and crafts professional letters that highlight your relevant experience and skills.',
    shortDescription: 'Generate personalized cover letters for any job',
    icon: 'Mail',
    category: 'career',
    features: [
      'Job description analysis',
      'Personalized content generation',
      'Multiple tone options',
      'Company-specific customization',
      'Quick editing tools',
      'Download in multiple formats'
    ],
    benefits: [
      'Stand out from other applicants',
      'Save time on each application',
      'Tailored content for every job',
      'Professional writing quality'
    ],
    faqs: coverLetterFaqs,
    keywords: ['cover letter generator', 'AI cover letter', 'job application letter', 'cover letter maker'],
    path: '/tools/ai-cover-letter-generator'
  },
  {
    id: 'ai-interview-simulator',
    slug: 'ai-interview-simulator',
    name: 'AI Interview Simulator',
    description: 'Practice interviews with our AI-powered simulator. Get realistic questions, practice your responses, and receive instant feedback to improve your interview performance and confidence.',
    shortDescription: 'Practice interviews with AI feedback',
    icon: 'MessageSquare',
    category: 'career',
    features: [
      'Role-specific questions',
      'Real-time feedback',
      'Performance analytics',
      'Multiple interview types',
      'Company-specific preparation',
      'Recording and playback'
    ],
    benefits: [
      'Build interview confidence',
      'Identify improvement areas',
      'Practice anywhere, anytime',
      'Prepare for specific companies'
    ],
    faqs: interviewFaqs,
    keywords: ['interview simulator', 'interview practice', 'AI interview', 'mock interview', 'job interview prep'],
    path: '/tools/ai-interview-simulator'
  },
  {
    id: 'budget-planner',
    slug: 'budget-planner',
    name: 'Budget Planner',
    description: 'Take control of your finances with our comprehensive budget planner. Track income and expenses, visualize spending patterns, set savings goals, and make smarter financial decisions.',
    shortDescription: 'Track finances and optimize spending',
    icon: 'Wallet',
    category: 'finance',
    features: [
      'Income and expense tracking',
      'Visual spending charts',
      'Savings goal setting',
      'Budget alerts',
      'Multiple currency support',
      'Export financial reports'
    ],
    benefits: [
      'Understand your spending habits',
      'Reach savings goals faster',
      'Make informed financial decisions',
      'Reduce financial stress'
    ],
    faqs: budgetPlannerFaqs,
    keywords: ['budget planner', 'expense tracker', 'personal finance', 'money management', 'savings calculator'],
    path: '/tools/budget-planner'
  },
  {
    id: 'habit-tracker',
    slug: 'habit-tracker',
    name: 'Daily Habit Tracker',
    description: 'Build better habits and break bad ones with our intuitive habit tracker. Track daily routines, build streaks, visualize progress, and develop the consistency needed for personal growth.',
    shortDescription: 'Build lasting habits with streak tracking',
    icon: 'CheckCircle',
    category: 'productivity',
    features: [
      'Daily habit logging',
      'Streak tracking',
      'Progress visualization',
      'Custom categories',
      'Reminder notifications',
      'Weekly/monthly reviews'
    ],
    benefits: [
      'Build consistency in daily routines',
      'Visual motivation through streaks',
      'Identify patterns in behavior',
      'Achieve personal growth goals'
    ],
    faqs: habitTrackerFaqs,
    keywords: ['habit tracker', 'daily habits', 'habit building', 'productivity tracker', 'routine tracker'],
    path: '/tools/habit-tracker'
  },
  {
    id: 'salary-estimator',
    slug: 'salary-estimator',
    name: 'Salary Estimator',
    description: 'Know your worth with our comprehensive salary estimator. Get accurate salary ranges for roles across industries and locations, backed by real market data and cost of living adjustments.',
    shortDescription: 'Get accurate salary insights by role and location',
    icon: 'DollarSign',
    category: 'career',
    features: [
      'Role-based estimates',
      'Location comparisons',
      'Cost of living adjustments',
      'Experience level filters',
      'Industry benchmarks',
      'Negotiation tips'
    ],
    benefits: [
      'Negotiate with confidence',
      'Compare opportunities fairly',
      'Understand market rates',
      'Make informed career decisions'
    ],
    faqs: salaryEstimatorFaqs,
    keywords: ['salary estimator', 'salary calculator', 'pay comparison', 'salary range', 'compensation calculator'],
    path: '/tools/salary-estimator'
  },
  {
    id: 'startup-idea-generator',
    slug: 'startup-idea-generator',
    name: 'Startup Idea Generator',
    description: 'Spark your entrepreneurial journey with AI-generated startup ideas. Get innovative business concepts, market analysis, and implementation suggestions tailored to your interests and expertise.',
    shortDescription: 'Generate innovative business ideas with AI',
    icon: 'Lightbulb',
    category: 'productivity',
    features: [
      'Industry-specific ideas',
      'Market opportunity analysis',
      'Implementation suggestions',
      'Resource requirements',
      'Monetization strategies',
      'Competitor landscape'
    ],
    benefits: [
      'Discover untapped opportunities',
      'Validate business concepts',
      'Get implementation guidance',
      'Save research time'
    ],
    faqs: startupIdeaFaqs,
    keywords: ['startup ideas', 'business ideas', 'AI business generator', 'entrepreneur ideas', 'startup generator'],
    path: '/tools/startup-idea-generator'
  },
  {
    id: 'productivity-planner',
    slug: 'productivity-planner',
    name: 'Productivity Planner',
    description: 'Maximize your efficiency with our AI-powered productivity planner. Smart task management, priority optimization, and intelligent scheduling help you accomplish more in less time.',
    shortDescription: 'Optimize your daily productivity with AI',
    icon: 'Calendar',
    category: 'productivity',
    features: [
      'Smart task prioritization',
      'Time blocking',
      'Progress tracking',
      'Daily/weekly views',
      'AI scheduling suggestions',
      'Goal alignment'
    ],
    benefits: [
      'Accomplish more daily',
      'Reduce decision fatigue',
      'Build productive habits',
      'Achieve work-life balance'
    ],
    faqs: productivityPlannerFaqs,
    keywords: ['productivity planner', 'task manager', 'daily planner', 'time management', 'work organizer'],
    path: '/tools/productivity-planner'
  },
  {
    id: 'can-you-run-it',
    slug: 'can-you-run-it',
    name: 'Can You Run It?',
    description: 'Check if your PC can run any game before buying. Compare your hardware specs against minimum and recommended requirements for 1000+ popular games including GTA 6, Cyberpunk 2077, and more.',
    shortDescription: 'Check if your PC can run any game',
    icon: 'Gamepad2',
    category: 'gaming',
    features: [
      'Compare PC specs to game requirements',
      'Minimum & recommended specs check',
      '1000+ games database',
      'Performance prediction',
      'Hardware upgrade suggestions',
      'FPS estimator'
    ],
    benefits: [
      'Save money on games you can\'t run',
      'Know what upgrades you need',
      'Make informed purchase decisions',
      'Avoid disappointment'
    ],
    faqs: [
      { question: "How does the checker work?", answer: "Enter your PC specs and select a game. We compare your hardware against official requirements." },
      { question: "Is it accurate?", answer: "We use official game requirements and benchmark data for accurate comparisons." }
    ],
    keywords: ['can you run it', 'game requirements', 'PC specs checker', 'system requirements', 'gaming hardware'],
    path: '/tools/can-you-run-it'
  },
  {
    id: 'ai-prompt-library',
    slug: 'ai-prompt-library',
    name: 'AI Prompt Library & Playground',
    description: 'Curated collection of 500+ high-quality AI prompts for ChatGPT, Claude, Midjourney & more. Test prompts in our sandbox and rate their effectiveness.',
    shortDescription: 'Curated prompts with AI sandbox testing',
    icon: 'BookOpen',
    category: 'productivity',
    features: [
      '500+ curated prompts by category',
      'Prompt performance ratings',
      'Save & share prompts',
      'AI sandbox to test them',
      'Community contributions',
      'Copy to clipboard'
    ],
    benefits: [
      'Get better AI results instantly',
      'Learn prompt engineering',
      'Save time on prompt creation',
      'Discover proven prompts'
    ],
    faqs: [
      { question: "What is the AI Prompt Library?", answer: "A curated collection of high-quality prompts for various AI tools, rated by effectiveness." },
      { question: "Can I save my own prompts?", answer: "Yes! Save prompts to your library and share them with unique links." }
    ],
    keywords: ['AI prompts', 'prompt library', 'ChatGPT prompts', 'Midjourney prompts', 'prompt engineering'],
    path: '/tools/ai-prompt-library'
  },
  {
    id: 'ai-email-assistant',
    slug: 'ai-email-assistant',
    name: 'AI Email Assistant',
    description: 'Draft professional emails in seconds from brief notes. Rewrite emails to sound more professional, adjust tone, and generate quick responses for any situation.',
    shortDescription: 'Draft and rewrite emails with AI',
    icon: 'Mail',
    category: 'productivity',
    features: [
      'Draft emails from short notes',
      'Rewrite to sound professional',
      'Tone adjuster (formal/friendly/etc)',
      'Response suggestions',
      'Multiple language support',
      'Templates library'
    ],
    benefits: [
      'Write emails 10x faster',
      'Sound more professional',
      'Never struggle with wording',
      'Perfect for non-native speakers'
    ],
    faqs: [
      { question: "What can it do?", answer: "Draft emails from notes, rewrite emails, adjust tone, and suggest responses." },
      { question: "Is my email private?", answer: "Yes, all processing happens locally in your browser." }
    ],
    keywords: ['email assistant', 'AI email writer', 'professional email', 'email drafter', 'email tone'],
    path: '/tools/ai-email-assistant'
  },
  {
    id: 'link-manager',
    slug: 'link-manager',
    name: 'Link Manager & Smart Bio',
    description: 'Create custom branded short links with click analytics, QR codes, and auto-updating bio pages that sync with your YouTube and Instagram content.',
    shortDescription: 'Branded links with analytics & smart bios',
    icon: 'Link',
    category: 'productivity',
    features: [
      'Custom branded links',
      'Click analytics dashboard',
      'Auto-update latest YouTube/Instagram',
      'Link scheduling',
      'QR code generator',
      'Bio page builder'
    ],
    benefits: [
      'Track link performance',
      'Build professional bio pages',
      'Schedule campaign links',
      'Grow your audience'
    ],
    faqs: [
      { question: "What is this tool?", answer: "Create short branded links, track clicks, and build smart bio pages." },
      { question: "Can I track analytics?", answer: "Yes! Get detailed analytics including clicks, locations, and devices." }
    ],
    keywords: ['link shortener', 'bio link', 'QR code generator', 'link analytics', 'branded links'],
    path: '/tools/link-manager'
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getAllToolSlugs(): string[] {
  return tools.map(tool => tool.slug);
}
