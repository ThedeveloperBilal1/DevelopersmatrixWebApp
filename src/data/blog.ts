import { BlogPost } from '@/types';
import generatedBlogs from './generated-blogs.json';

// Static blog posts
const staticBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-revolution-2026-job-market',
    title: 'The AI Revolution: How Artificial Intelligence is Reshaping the Job Market in 2026',
    excerpt: 'Explore how AI is transforming industries, creating new job opportunities, and what skills you need to thrive in the evolving employment landscape.',
    content: `
# The AI Revolution: How Artificial Intelligence is Reshaping the Job Market in 2026

The year 2026 marks a pivotal moment in the relationship between artificial intelligence and employment. What once seemed like distant science fiction has become an integral part of our daily work lives, fundamentally altering how businesses operate and how professionals approach their careers.

## The Current Landscape

Artificial intelligence has moved beyond simple automation tasks to become a collaborative partner in knowledge work. From content creation to code development, AI tools are augmenting human capabilities rather than replacing them entirely. This shift has created a new paradigm where the most valuable employees are those who can effectively leverage AI to amplify their productivity.

According to recent studies, over 85% of businesses have implemented some form of AI in their operations. This widespread adoption has created both challenges and opportunities for workers across all industries.

## Jobs Being Created

The AI revolution is creating entirely new job categories:

- **AI Prompt Engineers**: Specialists who craft effective prompts to get optimal results from AI systems
- **AI Ethics Specialists**: Professionals who ensure AI implementations align with ethical standards
- **ML Operations Engineers**: Experts who manage the deployment and maintenance of machine learning models
- **AI Integration Specialists**: Developers who connect AI tools with existing business systems

## Preparing for the Future

Success in this new landscape requires proactive preparation. Focus on continuous learning and developing uniquely human skills that AI cannot replicate.
    `,
    author: 'Sarah Chen',
    category: 'Career',
    tags: ['AI', 'Career', 'Job Market', 'Technology'],
    publishedAt: '2026-01-15',
    readTime: 8,
    image: '/images/blog/ai-breakthrough.jpg'
  },
  {
    id: '2',
    slug: 'remote-work-productivity-tips-2026',
    title: '10 Proven Strategies to Boost Your Productivity While Working Remotely',
    excerpt: 'Master the art of remote work with these science-backed productivity strategies that help you stay focused, motivated, and balanced.',
    content: `
# 10 Proven Strategies to Boost Your Productivity While Working Remotely

Remote work has transformed from a perk to a necessity for millions of professionals worldwide. Here are ten proven strategies to help you thrive in your remote work journey.

## 1. Designate a Dedicated Workspace

Your environment significantly impacts your productivity and mindset. Creating a dedicated workspace signals to your brain that it's time to focus.

## 2. Follow a Consistent Schedule

Establishing and maintaining a consistent schedule helps your body and mind adapt to a productive rhythm.

## 3. Use Time-Blocking Techniques

Time blocking involves scheduling specific blocks of time for different tasks or types of work.

## 4. Take Regular Breaks

The Pomodoro Technique, working in 25-minute focused sessions followed by 5-minute breaks, has proven highly effective.

## Conclusion

Remote work productivity isn't about working more hours—it's about working more effectively.
    `,
    author: 'Michael Torres',
    category: 'Productivity',
    tags: ['Remote Work', 'Productivity', 'Work From Home', 'Tips'],
    publishedAt: '2026-01-12',
    readTime: 10,
    image: '/images/blog/entertainment.jpg'
  },
  {
    id: '3',
    slug: 'startup-funding-guide-2026',
    title: 'The Complete Guide to Startup Funding in 2026: From Bootstrapping to Series A',
    excerpt: 'Navigate the complex world of startup funding with this comprehensive guide covering all stages.',
    content: `
# The Complete Guide to Startup Funding in 2026

Securing funding remains one of the most challenging aspects of building a startup. This guide provides a roadmap for entrepreneurs at every stage.

## Understanding Your Funding Needs

Before pursuing any funding source, honestly assess your capital requirements, runway needs, and growth goals.

## Bootstrapping: The Foundation

Bootstrapping offers complete ownership retention and forced discipline.

## Angel Investors

Angel investors typically provide $25,000 to $500,000 and bring valuable mentorship.

## Series A: Scaling Up

Series A funding marks the transition from startup to scale-up.
    `,
    author: 'Jennifer Walsh',
    category: 'Startup',
    tags: ['Startup', 'Funding', 'Investment', 'Entrepreneurship'],
    publishedAt: '2026-01-10',
    readTime: 12,
    image: '/images/blog/chatgpt-ai.jpg'
  },
  {
    id: '4',
    slug: 'tech-skills-2026-high-demand',
    title: 'The Top 15 Tech Skills in High Demand in 2026',
    excerpt: 'Stay ahead of the curve by developing these in-demand technical skills.',
    content: `
# The Top 15 Tech Skills in High Demand in 2026

## 1. Artificial Intelligence and Machine Learning
## 2. Cloud Computing
## 3. Cybersecurity
## 4. Data Science
## 5. DevOps and SRE

The tech industry rewards continuous learning. Focus on these high-demand skills for career growth.
    `,
    author: 'David Park',
    category: 'Technology',
    tags: ['Technology', 'Skills', 'Career', 'Learning'],
    publishedAt: '2026-01-08',
    readTime: 9,
    image: '/images/blog/gaming-esports.jpg'
  },
  {
    id: '5',
    slug: 'side-hustle-ideas-developers-2026',
    title: '10 Lucrative Side Hustle Ideas for Developers in 2026',
    excerpt: 'Discover profitable side hustle opportunities that leverage your development skills.',
    content: `
# 10 Lucrative Side Hustle Ideas for Developers in 2026

As a developer, you possess skills that are highly monetizable. Here are ten side hustle opportunities.

## Create and Sell Digital Products
## Freelance Development
## Create Online Courses
## Build SaaS Products
## Technical Writing

Your development skills are valuable—multiple income streams help you capture that value.
    `,
    author: 'Alex Rivera',
    category: 'Career',
    tags: ['Side Hustle', 'Developers', 'Income', 'Freelancing'],
    publishedAt: '2026-01-05',
    readTime: 11,
    image: '/images/blog/us-politics.jpg'
  },
  {
    id: '6',
    slug: 'personal-finance-software-engineers-2026',
    title: 'Personal Finance Guide for Software Engineers: Maximize Your Tech Salary',
    excerpt: 'Learn how software engineers can optimize their finances and investing strategies.',
    content: `
# Personal Finance Guide for Software Engineers

High income doesn't automatically translate to wealth. This guide covers essential financial strategies.

## Understanding Your Total Compensation
## Negotiating Your Compensation
## Tax Optimization
## Investment Strategy

The key is intentionality—making deliberate choices rather than letting money drift away.
    `,
    author: 'Rachel Kim',
    category: 'Finance',
    tags: ['Personal Finance', 'Software Engineering', 'Investment', 'Salary'],
    publishedAt: '2026-01-02',
    readTime: 13,
    image: '/images/blog/ukraine-war.jpg'
  }
];

// Get all blog posts (static + generated)
export function getAllBlogPosts(): BlogPost[] {
  return [...(generatedBlogs as BlogPost[]), ...staticBlogPosts];
}

// Export merged blog posts
export const blogPosts = getAllBlogPosts();

export const blogCategories = ['Gaming', 'Technology', 'Politics', 'World News', 'Entertainment', 'Career', 'Productivity', 'Startup', 'Finance', 'Health', 'Education', 'Environment', 'Science'];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
