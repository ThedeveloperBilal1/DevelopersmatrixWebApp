'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  RefreshCw, 
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Copy,
  Bookmark,
  Check,
  Zap
} from 'lucide-react';

const industries = [
  { id: 'saas', name: 'SaaS', icon: '☁️' },
  { id: 'ai', name: 'AI/ML', icon: '🤖' },
  { id: 'fintech', name: 'FinTech', icon: '💰' },
  { id: 'healthtech', name: 'HealthTech', icon: '🏥' },
  { id: 'edtech', name: 'EdTech', icon: '📚' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'climatetech', name: 'Climate Tech', icon: '🌱' },
  { id: 'creator', name: 'Creator Economy', icon: '🎬' },
  { id: 'devtools', name: 'DevTools', icon: '🔧' },
  { id: 'hrtech', name: 'HR Tech', icon: '👥' },
];

const startupIdeas: Record<string, Array<{
  title: string;
  description: string;
  problem: string;
  solution: string;
  market: string;
  monetization: string;
  competition: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToMvp: string;
}>> = {
  'saas': [
    {
      title: "AI-Powered Customer Support Platform",
      description: "Automated customer support system that uses AI to handle 80% of common queries, escalating complex issues to human agents with full context.",
      problem: "Companies spend 30-40% of support budget on answering repetitive questions that could be automated.",
      solution: "AI chatbot that learns from past tickets, integrates with existing tools, and provides seamless handoff to humans when needed.",
      market: "Customer support software market valued at $15B, growing 11% annually.",
      monetization: "Per-conversation pricing starting at $49/month, enterprise plans at $500+/month.",
      competition: "Medium - Intercom and Zendesk adding AI, but specialized solutions still have room.",
      tags: ['AI', 'SaaS', 'B2B'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Team Knowledge Base with AI Search",
      description: "Smart documentation platform that uses semantic search to find answers across all company tools and docs instantly.",
      problem: "Employees waste 20% of their time searching for information across scattered tools and documents.",
      solution: "AI-powered search that indexes Slack, Google Drive, Notion, and more to provide instant answers.",
      market: "Knowledge management market worth $500B+ globally.",
      monetization: "Free tier for small teams, $8/user/month for businesses, enterprise custom pricing.",
      competition: "Medium - Glean and Guru exist, but many companies still unsatisfied.",
      tags: ['AI', 'Productivity', 'B2B'],
      difficulty: 'Medium',
      timeToMvp: '2-3 months'
    },
    {
      title: "Automated Invoice & Payment Reminder System",
      description: "B2B invoicing tool that automatically sends payment reminders, offers multiple payment options, and predicts late payments.",
      problem: "Small businesses spend 15+ hours/month chasing payments and managing cash flow.",
      solution: "Smart invoicing with automated reminders, payment prediction AI, and integrated payment processing.",
      market: "Small business accounting software market at $12B annually.",
      monetization: "Free tier, $19/month Pro, 1% transaction fee on payments processed.",
      competition: "Low-Medium - Many invoicing tools, few with smart prediction features.",
      tags: ['FinTech', 'SaaS', 'SMB'],
      difficulty: 'Easy',
      timeToMvp: '2 months'
    }
  ],
  'ai': [
    {
      title: "AI Meeting Assistant & Action Tracker",
      description: "AI that joins video meetings, takes notes, creates summaries, and automatically tracks action items across your team.",
      problem: "Professionals lose 30 minutes per meeting taking notes and following up on action items.",
      solution: "AI assistant that transcribes, summarizes, extracts action items, and integrates with project management tools.",
      market: "Remote work tools market at $58B, meeting productivity segment growing 25% YoY.",
      monetization: "Freemium with $15/user/month Pro tier, enterprise licenses.",
      competition: "Medium - Otter.ai and Fireflies exist, opportunity in action item tracking.",
      tags: ['AI', 'Productivity', 'Remote Work'],
      difficulty: 'Medium',
      timeToMvp: '3 months'
    },
    {
      title: "AI Content Repurposing Engine",
      description: "Transform long-form content (videos, podcasts, blogs) into multiple short-form pieces for social media automatically.",
      problem: "Content creators spend 10+ hours weekly repurposing content for different platforms.",
      solution: "AI that takes videos/podcasts and generates clips, blog posts, tweets, and LinkedIn posts automatically.",
      market: "Creator economy at $104B, content tools segment growing 30% annually.",
      monetization: "$29/month Creator, $99/month Pro, API access for enterprise.",
      competition: "Medium - Opus Clip and Descript growing, but many niches unserved.",
      tags: ['AI', 'Creator Tools', 'Content'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "AI Code Review & Security Scanner",
      description: "Automated code review tool that catches bugs, security vulnerabilities, and suggests improvements before deployment.",
      problem: "Development teams spend 30% of time on code reviews, often missing security issues.",
      solution: "AI-powered static analysis that reviews PRs, suggests fixes, and integrates with CI/CD pipelines.",
      market: "DevSecOps market at $41B, growing 22% annually.",
      monetization: "Free for open source, $15/developer/month for teams, enterprise custom.",
      competition: "Medium - SonarQube and Snyk dominant, but AI-native solutions emerging.",
      tags: ['AI', 'DevTools', 'Security'],
      difficulty: 'Hard',
      timeToMvp: '4-6 months'
    }
  ],
  'fintech': [
    {
      title: "Freelancer Tax & Finance OS",
      description: "All-in-one financial platform for freelancers: automatic tax calculation, expense tracking, invoicing, and retirement planning.",
      problem: "60M+ US freelancers struggle with inconsistent income, tax planning, and lack of benefits.",
      solution: "AI-powered finance platform that automates tax savings, predicts cash flow, and provides benefits access.",
      market: "Freelance economy at $1.2T in the US alone, growing 8% annually.",
      monetization: "Free tier, $12/month Premium, financial services revenue share.",
      competition: "Low-Medium - Most tools target traditional employees, freelancer-specific solutions lacking.",
      tags: ['FinTech', 'Freelance', 'AI'],
      difficulty: 'Medium',
      timeToMvp: '4 months'
    },
    {
      title: "Micro-Investment for Gen Z",
      description: "Investment app that rounds up purchases and invests spare change into diversified portfolios, NFTs, or crypto.",
      problem: "Young people struggle to start investing with limited funds and financial knowledge.",
      solution: "Frictionless micro-investing with educational content and community features.",
      market: "Retail investing market exploded post-2020, Gen Z investor segment growing 40% YoY.",
      monetization: "Monthly subscription $1-3, premium features, and asset management fees.",
      competition: "High - Acorns, Robinhood, and Public dominant, differentiation needed.",
      tags: ['FinTech', 'Gen Z', 'Investing'],
      difficulty: 'Hard',
      timeToMvp: '6+ months'
    },
    {
      title: "B2B Payments & Cash Flow Platform",
      description: "Simplified B2B payments with instant transfers, credit options, and cash flow prediction for small businesses.",
      problem: "Small businesses wait 30-90 days for payments, causing cash flow crises.",
      solution: "Instant B2B payments with built-in financing options and AI cash flow forecasting.",
      market: "B2B payments market at $125T globally, digital adoption still under 10%.",
      monetization: "Transaction fees 0.5-1%, financing interest, premium features.",
      competition: "Medium - Stripe and Melio growing, but many markets underserved.",
      tags: ['FinTech', 'B2B', 'Payments'],
      difficulty: 'Hard',
      timeToMvp: '6+ months'
    }
  ],
  'healthtech': [
    {
      title: "AI Mental Health Companion",
      description: "AI-powered mental health app providing 24/7 emotional support, CBT exercises, and connection to therapists when needed.",
      problem: "60% of people with mental health issues can't access therapy due to cost or availability.",
      solution: "AI chatbot trained on therapeutic techniques, with human therapist escalation.",
      market: "Mental health apps market at $4.2B, growing 16% annually.",
      monetization: "Free tier, $15/month Premium, enterprise wellness partnerships.",
      competition: "Medium - BetterHelp and Talkspace for therapy, Woebot for AI, opportunity in hybrid.",
      tags: ['HealthTech', 'AI', 'Mental Health'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Personalized Nutrition & Supplement Platform",
      description: "AI platform that analyzes health data to recommend personalized nutrition plans and supplement stacks.",
      problem: "People waste $ billions on ineffective supplements and generic diet advice.",
      solution: "AI analyzes blood work, DNA, lifestyle to create personalized supplement and nutrition recommendations.",
      market: "Personalized nutrition market at $16B, growing 15% annually.",
      monetization: "Subscription $29/month, supplement subscriptions, lab testing partnerships.",
      competition: 'Medium - Care/of and Rootine exist, but market still fragmented.',
      tags: ['HealthTech', 'AI', 'Personalization'],
      difficulty: 'Hard',
      timeToMvp: '6 months'
    },
    {
      title: "Remote Patient Monitoring Dashboard",
      description: "Platform for healthcare providers to monitor chronic patients remotely using wearables and connected devices.",
      problem: "Chronic disease management costs $3.7T annually in the US with poor patient outcomes.",
      solution: "Real-time monitoring dashboard with AI alerts for concerning trends and easy patient communication.",
      market: "Remote patient monitoring market at $117B by 2025.",
      monetization: "Per-patient monthly fee, device partnerships, insurance reimbursement.",
      competition: "Medium - Growing market with regulatory barriers creating moats.",
      tags: ['HealthTech', 'IoT', 'AI'],
      difficulty: 'Hard',
      timeToMvp: '8+ months'
    }
  ],
  'edtech': [
    {
      title: "AI Tutor & Study Companion",
      description: "Personalized AI tutor that adapts to learning style, creates study plans, and provides instant help with any subject.",
      problem: "1-on-1 tutoring costs $50-150/hour, unaffordable for most students.",
      solution: "AI tutor available 24/7 that explains concepts, quizzes students, and adapts to their pace.",
      market: "Online tutoring market at $17B, growing 14% annually.",
      monetization: "Free tier, $9.99/month Premium, school/district licenses.",
      competition: "Medium - Khan Academy and Chegg dominant, AI-native solutions emerging.",
      tags: ['EdTech', 'AI', 'Learning'],
      difficulty: 'Medium',
      timeToMvp: '3 months'
    },
    {
      title: "Micro-Learning Platform for Professionals",
      description: "Bite-sized learning modules (5-15 min) tailored for busy professionals, with AI curation based on career goals.",
      problem: "Professionals lack time for traditional courses, leading to skill gaps.",
      solution: "AI-curated micro-lessons delivered at optimal times, with practical exercises.",
      market: "Corporate training market at $370B globally.",
      monetization: "B2B licensing $5-15/employee/month, individual $9.99/month.",
      competition: "Medium - LinkedIn Learning and Coursera exist, micro-format differentiator.",
      tags: ['EdTech', 'AI', 'Professional Development'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Learn-by-Building Platform",
      description: "Interactive platform where users learn by building real projects with AI guidance and peer collaboration.",
      problem: "Traditional courses have 10-15% completion rate; learners need hands-on practice.",
      solution: "Project-based learning with AI assistance, code review, and community feedback.",
      market: "Online coding education at $2B, expanding to other skills.",
      monetization: "Free tier, $19/month Pro, career services fees.",
      competition: "Medium - Codecademy and freeCodeCamp exist, AI-guided building is new.",
      tags: ['EdTech', 'AI', 'Skills'],
      difficulty: 'Medium',
      timeToMvp: '4-5 months'
    }
  ],
  'ecommerce': [
    {
      title: "AI-Powered E-commerce Personalization",
      description: "Plugin that personalizes product recommendations, search results, and content for each shopper in real-time.",
      problem: "Generic shopping experiences lead to 97% cart abandonment rates.",
      solution: "AI that analyzes behavior to show personalized products, prices, and content.",
      market: "E-commerce personalization market at $1.2B, growing 25% annually.",
      monetization: "SaaS $99-499/month based on traffic, plus performance fees.",
      competition: "Medium - Dynamic Yield and Bloomreach dominant, SMB market underserved.",
      tags: ['E-commerce', 'AI', 'Personalization'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Social Commerce Enabler",
      description: "Platform that helps small businesses sell directly on social media with one-click checkout and analytics.",
      problem: "Small businesses struggle to convert social media followers into customers.",
      solution: "Tools for social selling: shoppable posts, DM automation, and conversion analytics.",
      market: "Social commerce at $1.2T globally by 2025.",
      monetization: "Transaction fees 2-3%, subscription tiers $29-199/month.",
      competition: "Medium - Shopify and Instagram Shopping exist, niche tools emerging.",
      tags: ['E-commerce', 'Social', 'SMB'],
      difficulty: 'Medium',
      timeToMvp: '3 months'
    },
    {
      title: "Sustainable Shopping Assistant",
      description: "Browser extension that shows sustainability scores and alternatives while shopping online.",
      problem: "Consumers want sustainable options but lack information to make informed choices.",
      solution: "Real-time sustainability ratings, ethical alternatives, and carbon footprint info.",
      market: "Sustainable e-commerce growing 3x faster than traditional retail.",
      monetization: "Affiliate commissions on alternatives, premium features $5/month.",
      competition: "Low-Medium - Few consumer-facing sustainability tools at scale.",
      tags: ['E-commerce', 'Sustainability', 'Consumer'],
      difficulty: 'Easy',
      timeToMvp: '2 months'
    }
  ],
  'climatetech': [
    {
      title: "Carbon Footprint Tracker for Businesses",
      description: "Platform that automatically calculates and helps reduce corporate carbon emissions across supply chain.",
      problem: "Companies need to track and report emissions but manual calculation is expensive and inaccurate.",
      solution: "Automated emissions tracking from financial data, with reduction recommendations.",
      market: "Carbon management software at $15B, growing 30% annually.",
      monetization: "SaaS $500-5000/month based on company size, consulting services.",
      competition: "Medium - Watershed and Persefoni growing, market still early.",
      tags: ['ClimateTech', 'SaaS', 'B2B'],
      difficulty: 'Medium',
      timeToMvp: '4 months'
    },
    {
      title: "Circular Economy Marketplace",
      description: "B2B platform for buying/selling surplus materials, byproducts, and waste between industries.",
      problem: "Manufacturers waste billions in materials that could be used by other industries.",
      solution: "AI-powered matching of waste streams with potential buyers, logistics coordination.",
      market: "Circular economy market at $4.5T opportunity globally.",
      monetization: "Transaction fees 5-10%, premium listings, logistics partnerships.",
      competition: "Low - Few digital platforms connecting industrial waste streams.",
      tags: ['ClimateTech', 'Marketplace', 'B2B'],
      difficulty: 'Medium',
      timeToMvp: '4-5 months'
    },
    {
      title: "Personal Carbon Offset Platform",
      description: "App that calculates personal carbon footprint and enables easy offsetting through verified projects.",
      problem: "Individuals want to offset their impact but it's complicated and trust is low.",
      solution: "Automatic tracking, transparent offsets with verification, and community features.",
      market: "Voluntary carbon market at $2B, expected to grow 15x by 2030.",
      monetization: "Small markup on offsets, premium features $5/month, corporate partnerships.",
      competition: "Medium - Wren and Tomorrow's Air exist, mainstream adoption still early.",
      tags: ['ClimateTech', 'Consumer', 'Offsets'],
      difficulty: 'Easy',
      timeToMvp: '2-3 months'
    }
  ],
  'creator': [
    {
      title: "All-in-One Creator Business OS",
      description: "Platform managing finances, sponsorships, contracts, and analytics for content creators.",
      problem: "Creators spend 40% of time on business tasks instead of creating content.",
      solution: "Unified dashboard for revenue tracking, sponsor management, contracts, and performance analytics.",
      market: "Creator economy at $104B, 50M+ creators globally.",
      monetization: "Free tier, Pro $29/month, Agency $199/month.",
      competition: "Medium - Fragmented tools, opportunity for consolidation.",
      tags: ['Creator Economy', 'SaaS', 'Business Tools'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "AI Thumbnail & Title Generator",
      description: "AI tool that generates optimized YouTube thumbnails and titles to maximize click-through rates.",
      problem: "Creators spend hours on thumbnails and often pick suboptimal titles.",
      solution: "AI analyzes video content and competitor performance to generate optimized assets.",
      market: "YouTube creators alone represent 51M channels, growing 40% YoY.",
      monetization: "Free tier with watermarks, $19/month Pro, API for enterprise.",
      competition: "Medium - TubeBuddy and VidIQ have some features, dedicated tools emerging.",
      tags: ['Creator Economy', 'AI', 'YouTube'],
      difficulty: 'Medium',
      timeToMvp: '2-3 months'
    },
    {
      title: "Creator Community & Monetization Platform",
      description: "Platform for creators to build paid communities with courses, exclusive content, and direct support.",
      problem: "Platforms take 30-50% of creator revenue and limit audience ownership.",
      solution: "White-label community platform with low fees (5-10%), owned audience, and flexible monetization.",
      market: "Creator economy platforms at $5B+, growing 25% annually.",
      monetization: "5-10% platform fee, premium features, white-label licensing.",
      competition: "Medium - Patreon, Gumroad, and Substack exist, niche opportunities remain.",
      tags: ['Creator Economy', 'Monetization', 'Community'],
      difficulty: 'Medium',
      timeToMvp: '4-5 months'
    }
  ],
  'devtools': [
    {
      title: "AI-Powered Documentation Generator",
      description: "Tool that automatically generates and maintains API documentation from code with examples.",
      problem: "Developers hate writing docs, leading to outdated or missing documentation.",
      solution: "AI analyzes code to generate comprehensive docs with examples, keeping them in sync.",
      market: "Developer tools market at $29B, documentation segment underserved.",
      monetization: "Free for open source, $15/developer/month for teams.",
      competition: "Medium - ReadMe and Swagger exist, AI-native solutions emerging.",
      tags: ['DevTools', 'AI', 'Documentation'],
      difficulty: 'Medium',
      timeToMvp: '3 months'
    },
    {
      title: "Feature Flag & Experimentation Platform",
      description: "Open-core feature flagging platform with A/B testing and gradual rollout capabilities.",
      problem: "Deploying new features is risky; teams need safe rollout and rollback mechanisms.",
      solution: "Easy-to-use feature flags with analytics, A/B testing, and instant rollback.",
      market: "Feature management market at $2B, growing 25% annually.",
      monetization: "Open core with cloud tier starting at $49/month, enterprise licenses.",
      competition: "Medium - LaunchDarkly dominant, open-source alternatives gaining traction.",
      tags: ['DevTools', 'Open Source', 'DevOps'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Developer Environment in the Cloud",
      description: "Instant, cloud-based development environments that work from any device with zero setup.",
      problem: "Developers waste 1-2 hours weekly on environment setup and configuration.",
      solution: "Pre-configured cloud environments that sync with repos and work from browser.",
      market: "Cloud IDE market at $1.5B, growing 30% annually.",
      monetization: "Free tier, $20/developer/month Pro, enterprise with self-hosting.",
      competition: "Medium - GitHub Codespaces and Gitpod growing, niche opportunities.",
      tags: ['DevTools', 'Cloud', 'Productivity'],
      difficulty: 'Hard',
      timeToMvp: '6+ months'
    }
  ],
  'hrtech': [
    {
      title: "AI Recruiting Assistant",
      description: "AI that screens candidates, schedules interviews, and provides bias-reduced shortlists for hiring teams.",
      problem: "Recruiters spend 30% of time on screening and scheduling, bias affects hiring.",
      solution: "AI-powered screening, automated scheduling, and structured interview coordination.",
      market: "Recruitment software at $28B, growing 7% annually.",
      monetization: "Per-hire fee $50-200, or SaaS $100-500/month based on volume.",
      competition: "Medium - Greenhouse and Lever adding AI, specialized tools emerging.",
      tags: ['HR Tech', 'AI', 'Recruiting'],
      difficulty: 'Medium',
      timeToMvp: '3-4 months'
    },
    {
      title: "Employee Feedback & Engagement Platform",
      description: "Continuous feedback platform with pulse surveys, 1:1 tools, and AI-powered insights for managers.",
      problem: "Annual reviews are outdated; companies need real-time engagement data.",
      solution: "Lightweight feedback tools with AI analysis of trends and manager coaching suggestions.",
      market: "Employee engagement software at $1.5B, growing 12% annually.",
      monetization: "$3-8/employee/month, enterprise with custom features.",
      competition: "Medium - Culture Amp and Lattice dominant, SMB market underserved.",
      tags: ['HR Tech', 'AI', 'Engagement'],
      difficulty: 'Medium',
      timeToMvp: '3 months'
    },
    {
      title: "Skills & Career Path Platform",
      description: "Platform that maps employee skills, suggests learning paths, and shows internal mobility opportunities.",
      problem: "Companies lose talent because employees can't see growth paths or skill gaps.",
      solution: "AI-powered skills mapping with personalized development plans and internal job matching.",
      market: "Learning & development market at $370B, skills-based hiring trend growing.",
      monetization: "$5-15/employee/month, integration with HRIS systems.",
      competition: "Medium - Degreed and Eightfold.ai exist, mid-market opportunity.",
      tags: ['HR Tech', 'AI', 'Career Development'],
      difficulty: 'Medium',
      timeToMvp: '4-5 months'
    }
  ]
};

export default function StartupIdeaClient() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [currentIdea, setCurrentIdea] = useState<typeof startupIdeas['saas'][0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState<typeof startupIdeas['saas']>([]);
  const [copied, setCopied] = useState(false);

  const getIdeasForIndustry = () => {
    if (!selectedIndustry || !startupIdeas[selectedIndustry]) {
      // Return random ideas from all categories
      const allIdeas = Object.values(startupIdeas).flat();
      return allIdeas;
    }
    return startupIdeas[selectedIndustry];
  };

  const generateIdea = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const ideas = getIdeasForIndustry();
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setCurrentIdea(randomIdea);
    setIsGenerating(false);
  };

  const saveIdea = () => {
    if (currentIdea && !savedIdeas.find(i => i.title === currentIdea.title)) {
      setSavedIdeas([...savedIdeas, currentIdea]);
    }
  };

  const copyIdea = () => {
    if (!currentIdea) return;
    const text = `
${currentIdea.title}

${currentIdea.description}

Problem: ${currentIdea.problem}
Solution: ${currentIdea.solution}
Market: ${currentIdea.market}
Monetization: ${currentIdea.monetization}
Competition: ${currentIdea.competition}
Difficulty: ${currentIdea.difficulty}
Time to MVP: ${currentIdea.timeToMvp}
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'Hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Startup Idea Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Industry (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map(ind => (
                  <Button
                    key={ind.id}
                    variant={selectedIndustry === ind.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedIndustry(selectedIndustry === ind.id ? '' : ind.id);
                      setCurrentIdea(null);
                    }}
                    className={`justify-start ${selectedIndustry === ind.id ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}`}
                  >
                    <span className="mr-2">{ind.icon}</span>
                    {ind.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={generateIdea}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate Idea
                </>
              )}
            </Button>

            {/* Saved Ideas */}
            {savedIdeas.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Saved Ideas ({savedIdeas.length})</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedIdeas.map((idea, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIdea(idea)}
                      className="w-full p-2 bg-muted/50 rounded text-xs text-left hover:bg-muted/70 transition-colors"
                    >
                      <div className="font-medium truncate">{idea.title}</div>
                      <div className="text-muted-foreground flex gap-1 mt-1">
                        {idea.tags.slice(0, 2).map(t => (
                          <span key={t} className="bg-background px-1 rounded">{t}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-2">
            {currentIdea ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{currentIdea.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentIdea.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                      <Badge className={getDifficultyColor(currentIdea.difficulty)}>
                        {currentIdea.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        {currentIdea.timeToMvp}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={saveIdea}>
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyIdea}>
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{currentIdea.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-sm">Problem</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{currentIdea.problem}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-sm">Solution</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{currentIdea.solution}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-sm">Market</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{currentIdea.market}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-sm">Monetization</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{currentIdea.monetization}</p>
                  </Card>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold text-sm">Competition</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentIdea.competition}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-muted/30 rounded-xl">
                <div className="text-center text-muted-foreground">
                  <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select an industry or generate a random idea</p>
                  <p className="text-sm mt-1">30+ curated startup ideas with market analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
