// Tool Types
export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  category: 'career' | 'productivity' | 'finance' | 'learning' | 'gaming';
  features: string[];
  benefits: string[];
  faqs: FAQ[];
  keywords: string[];
  path: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image: string;
}

// Trend Types
export interface Trend {
  id: string;
  title: string;
  description: string;
  category: 'tech' | 'career' | 'skill' | 'startup' | 'ai';
  growth: number;
  prediction: string;
  icon: string;
  tags: string[];
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Community Types
export interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  answers: Answer[];
  tags: string[];
  createdAt: string;
  views: number;
  votes: number;
}

export interface Answer {
  id: string;
  content: string;
  author: string;
  isAiGenerated: boolean;
  createdAt: string;
  votes: number;
}

// Widget Types
export interface WidgetData {
  productivityTip: {
    tip: string;
    category: string;
  };
  skillOfDay: {
    name: string;
    description: string;
    resources: string[];
  };
  marketTrend: {
    title: string;
    insight: string;
    impact: 'high' | 'medium' | 'low';
  };
  microLearning: {
    topic: string;
    content: string;
    duration: string;
  };
}

// Salary Types
export interface SalaryData {
  role: string;
  location: string;
  min: number;
  max: number;
  median: number;
  currency: string;
}

// Habit Types
export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
}

// Budget Types
export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  frequency: 'monthly' | 'weekly' | 'yearly';
}

// Resume Types
export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

// Cover Letter Types
export interface CoverLetterData {
  jobTitle: string;
  company: string;
  jobDescription: string;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

// Site Configuration
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}
