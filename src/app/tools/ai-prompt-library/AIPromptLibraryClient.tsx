'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  Search, 
  Star, 
  Copy, 
  Check,
  Play,
  Bookmark,
  Filter,
  Sparkles,
  Code,
  FileText,
  MessageSquare,
  Palette,
  Briefcase,
  Lightbulb,
  Heart,
  Share2,
  X
} from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  model: string[];
  rating: number;
  uses: number;
  tags: string[];
  description: string;
  author: string;
}

const categories = [
  { id: 'all', name: 'All Prompts', icon: BookOpen },
  { id: 'coding', name: 'Coding', icon: Code },
  { id: 'writing', name: 'Writing', icon: FileText },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'creative', name: 'Creative', icon: Palette },
  { id: 'marketing', name: 'Marketing', icon: Sparkles },
  { id: 'learning', name: 'Learning', icon: Lightbulb },
  { id: 'productivity', name: 'Productivity', icon: MessageSquare },
];

const prompts: Prompt[] = [
  // Coding Prompts
  {
    id: '1',
    title: 'Explain Code Like I\'m 5',
    prompt: 'Explain this code in simple terms that a 5-year-old could understand:\n\n```\n[PASTE CODE HERE]\n```\n\nBreak it down into: 1) What it does overall, 2) Key parts and their jobs, 3) Why someone would use it.',
    category: 'coding',
    model: ['ChatGPT', 'Claude', 'Gemini'],
    rating: 4.9,
    uses: 15420,
    tags: ['beginner', 'explanation', 'learning'],
    description: 'Perfect for understanding complex code without technical jargon',
    author: 'Community'
  },
  {
    id: '2',
    title: 'Code Review Assistant',
    prompt: 'Act as a senior code reviewer. Analyze this code for:\n\n1. **Potential bugs or errors**\n2. **Performance issues**\n3. **Security vulnerabilities**\n4. **Code style & best practices**\n5. **Suggested improvements**\n\nCode:\n```\n[PASTE CODE HERE]\n```\n\nProvide specific line-by-line feedback when possible.',
    category: 'coding',
    model: ['ChatGPT', 'Claude'],
    rating: 4.8,
    uses: 12350,
    tags: ['review', 'best-practices', 'debugging'],
    description: 'Comprehensive code review with actionable feedback',
    author: 'DevTeam'
  },
  {
    id: '3',
    title: 'Debug This Error',
    prompt: 'I\'m getting this error:\n\n```\n[PASTE ERROR MESSAGE]\n```\n\nHere\'s my code:\n```\n[PASTE CODE]\n```\n\nHelp me:\n1. Understand what\'s causing this error\n2. Provide a fix with explanation\n3. Suggest how to prevent similar errors',
    category: 'coding',
    model: ['ChatGPT', 'Claude', 'Gemini'],
    rating: 4.9,
    uses: 28450,
    tags: ['debugging', 'errors', 'troubleshooting'],
    description: 'Quick debugging with root cause analysis',
    author: 'Community'
  },
  {
    id: '4',
    title: 'Write Unit Tests',
    prompt: 'Write comprehensive unit tests for this code using [Jest/PyTest/etc]:\n\n```\n[PASTE CODE]\n```\n\nInclude:\n- Happy path tests\n- Edge cases\n- Error handling tests\n- Mock any external dependencies\n\nExplain what each test validates.',
    category: 'coding',
    model: ['ChatGPT', 'Claude'],
    rating: 4.7,
    uses: 8920,
    tags: ['testing', 'unit-tests', 'quality'],
    description: 'Generate thorough unit tests with coverage',
    author: 'QAPro'
  },
  
  // Writing Prompts
  {
    id: '5',
    title: 'Blog Post Writer',
    prompt: 'Write a comprehensive blog post about [TOPIC] with:\n\n**Structure:**\n- Engaging hook/intro\n- 3-5 main sections with subheadings\n- Practical examples or case studies\n- Actionable takeaways\n- Compelling conclusion\n\n**Style:**\n- Conversational but professional\n- Use short paragraphs (2-3 sentences)\n- Include data/statistics where relevant\n- Target word count: [X] words\n\n**Audience:** [Describe your target audience]',
    category: 'writing',
    model: ['ChatGPT', 'Claude'],
    rating: 4.8,
    uses: 18930,
    tags: ['blog', 'content', 'seo'],
    description: 'Create engaging blog posts with proper structure',
    author: 'ContentPro'
  },
  {
    id: '6',
    title: 'Email Polish Pro',
    prompt: 'Rewrite this email to be more professional and effective:\n\n**Original:**\n[PASTE EMAIL]\n\n**Goals:**\n- Clear and concise\n- Professional tone\n- Action-oriented with clear next steps\n- Appropriate for [audience: boss/client/team]\n\nProvide the rewritten email and explain key changes.',
    category: 'writing',
    model: ['ChatGPT', 'Claude', 'Gemini'],
    rating: 4.9,
    uses: 22150,
    tags: ['email', 'professional', 'communication'],
    description: 'Transform rough drafts into polished emails',
    author: 'BusinessWriter'
  },
  
  // Business Prompts
  {
    id: '7',
    title: 'SWOT Analysis Generator',
    prompt: 'Create a comprehensive SWOT analysis for [COMPANY/PRODUCT]:\n\n**Strengths:** Internal positive factors\n**Weaknesses:** Internal negative factors  \n**Opportunities:** External positive factors\n**Threats:** External negative factors\n\nFor each point:\n- Provide specific examples\n- Rate impact (High/Medium/Low)\n- Suggest actionable strategies\n\nFormat as a professional table with explanations.',
    category: 'business',
    model: ['ChatGPT', 'Claude'],
    rating: 4.6,
    uses: 9840,
    tags: ['analysis', 'strategy', 'planning'],
    description: 'Professional SWOT analysis with strategic insights',
    author: 'StrategyAI'
  },
  {
    id: '8',
    title: 'Startup Pitch Deck Creator',
    prompt: 'Help me create a compelling pitch deck for [STARTUP DESCRIPTION]. Include:\n\n1. **Problem Statement** - Clear pain point\n2. **Solution** - Your unique approach\n3. **Market Opportunity** - TAM, SAM, SOM\n4. **Business Model** - Revenue streams\n5. **Traction** - Key metrics\n6. **Competition** - Competitive landscape\n7. **Team** - Why you\'re the right team\n8. **Ask** - Funding amount and use\n\nProvide slide content and speaker notes.',
    category: 'business',
    model: ['ChatGPT', 'Claude'],
    rating: 4.7,
    uses: 7620,
    tags: ['startup', 'pitch', 'funding'],
    description: 'Create investor-ready pitch deck content',
    author: 'VentureAI'
  },
  
  // Creative Prompts
  {
    id: '9',
    title: 'Story Starter Generator',
    prompt: 'Write the opening chapter of a [GENRE] story with:\n\n**Elements:**\n- Compelling first line that hooks the reader\n- Vivid setting description\n- Introduction of main character(s)\n- Hint of conflict or mystery\n- End with a page-turner moment\n\n**Style:** [Describe tone: dark/lightfast-paced/atmospheric]\n**Length:** ~1000 words\n\nMake it immersive and impossible to put down.',
    category: 'creative',
    model: ['ChatGPT', 'Claude'],
    rating: 4.5,
    uses: 11280,
    tags: ['fiction', 'storytelling', 'creative'],
    description: 'Generate captivating story openings',
    author: 'StoryWriter'
  },
  {
    id: '10',
    title: 'Midjourney Art Director',
    prompt: 'Create a detailed Midjourney prompt for [SUBJECT] with:\n\n**Subject:** [Main focus]\n**Style:** [art style: oil painting, digital art, photograph, etc.]\n**Mood:** [emotional tone]\n**Lighting:** [type of lighting]\n**Camera:** [angle, lens, perspective]\n**Colors:** [color palette]\n**Details:** [specific elements to include]\n\nFormat: "/imagine prompt: [detailed description] --ar [aspect ratio] --v 6"\n\nProvide 3 variations.',
    category: 'creative',
    model: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    rating: 4.8,
    uses: 14560,
    tags: ['art', 'midjourney', 'image-generation'],
    description: 'Professional Midjourney prompt engineering',
    author: 'ArtDirector'
  },
  
  // Marketing Prompts
  {
    id: '11',
    title: 'Social Media Content Calendar',
    prompt: 'Create a 7-day social media content calendar for [BRAND/NICHE]:\n\n**For each day include:**\n- Platform (Instagram, Twitter, LinkedIn, TikTok)\n- Post type (carousel, video, story, reel)\n- Caption with relevant hashtags\n- Best posting time\n- Engagement prompt\n\n**Goals:** [awareness/engagement/sales]\n**Target audience:** [describe audience]\n\nMake content varied, engaging, and shareable.',
    category: 'marketing',
    model: ['ChatGPT', 'Claude'],
    rating: 4.7,
    uses: 9340,
    tags: ['social-media', 'content', 'planning'],
    description: 'Plan a week of engaging social content',
    author: 'SocialPro'
  },
  {
    id: '12',
    title: 'Ad Copy That Converts',
    prompt: 'Write high-converting ad copy for [PRODUCT/SERVICE]:\n\n**Create 3 versions:**\n\n1. **Problem-Agitation-Solution** format\n2. **Before-After-Bridge** format\n3. **Story-based** format\n\n**Each ad should include:**\n- Scroll-stopping headline\n- Benefit-focused body copy\n- Social proof elements\n- Clear CTA\n\nTarget audience: [describe]\nPlatform: [Facebook/Google/Instagram]',
    category: 'marketing',
    model: ['ChatGPT', 'Claude'],
    rating: 4.6,
    uses: 8750,
    tags: ['advertising', 'copywriting', 'conversion'],
    description: 'Create compelling ad copy that drives action',
    author: 'AdMaster'
  },
  
  // Learning Prompts
  {
    id: '13',
    title: 'Learn Anything Framework',
    prompt: 'Help me learn [TOPIC] using the Feynman Technique:\n\n1. **Explain it simply** - Teach me like I\'m 12\n2. **Identify gaps** - What don\'t I understand yet?\n3. **Deep dive** - Fill in the gaps with examples\n4. **Simplify further** - Can I explain it even more simply?\n\nAlso include:\n- Key concepts to master first\n- Common misconceptions\n- Practice exercises\n- Resources for further learning\n\nMy current level: [beginner/intermediate/advanced]',
    category: 'learning',
    model: ['ChatGPT', 'Claude', 'Gemini'],
    rating: 4.9,
    uses: 19840,
    tags: ['learning', 'education', 'feynman'],
    description: 'Master any topic with the proven Feynman method',
    author: 'LearnAI'
  },
  {
    id: '14',
    title: 'Interview Prep Coach',
    prompt: 'I\'m preparing for a [JOB TITLE] interview at [COMPANY]. Help me:\n\n1. **Research the company** - Key facts, culture, recent news\n2. **Prepare for common questions** - With STAR-method answers\n3. **Technical questions** - Role-specific technical prep\n4. **Questions to ask** - Insightful questions for the interviewer\n5. **Red flags to address** - How to handle weaknesses\n\nProvide practice questions and sample answers.',
    category: 'learning',
    model: ['ChatGPT', 'Claude'],
    rating: 4.8,
    uses: 14230,
    tags: ['interview', 'career', 'preparation'],
    description: 'Comprehensive interview preparation guide',
    author: 'CareerCoach'
  },
  
  // Productivity Prompts
  {
    id: '15',
    title: 'Meeting Summary Pro',
    prompt: 'Convert these meeting notes into a professional summary:\n\n**Notes:**\n[PASTE NOTES]\n\n**Output format:**\n\n## Meeting Summary\n**Date:** [Date]\n**Attendees:** [List]\n\n### Key Discussion Points\n- [Bullet points]\n\n### Decisions Made\n- [Decisions with rationale]\n\n### Action Items\n| Task | Owner | Due Date |\n|------|--------|----------|\n\n### Next Steps\n- [Next meeting/follow-ups]',
    category: 'productivity',
    model: ['ChatGPT', 'Claude'],
    rating: 4.7,
    uses: 11560,
    tags: ['meetings', 'productivity', 'organization'],
    description: 'Transform rough notes into professional summaries',
    author: 'ProductivityPro'
  },
  {
    id: '16',
    title: 'Weekly Review Template',
    prompt: 'Help me conduct a weekly review:\n\n**Accomplishments this week:**\n- [LIST YOUR WINS]\n\n**Challenges faced:**\n- [LIST CHALLENGES]\n\n**Goals for next week:**\n- [LIST GOALS]\n\nProvide:\n1. Analysis of progress patterns\n2. Suggestions for overcoming challenges\n3. Prioritized action items\n4. Time-blocking suggestions\n5. Habit tracker recommendations',
    category: 'productivity',
    model: ['ChatGPT', 'Claude'],
    rating: 4.6,
    uses: 7890,
    tags: ['review', 'planning', 'goals'],
    description: 'Structured weekly reflection and planning',
    author: 'LifeHacker'
  }
];

export default function AIPromptLibraryClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedPrompts');
    if (saved) setSavedPrompts(JSON.parse(saved));
  }, []);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSave = (id: string) => {
    const newSaved = savedPrompts.includes(id) 
      ? savedPrompts.filter(p => p !== id)
      : [...savedPrompts, id];
    setSavedPrompts(newSaved);
    localStorage.setItem('savedPrompts', JSON.stringify(newSaved));
  };

  const testPrompt = async () => {
    if (!selectedPrompt || !testInput) return;
    setIsTesting(true);
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'prompt-test',
          prompt: selectedPrompt.prompt.replace('[PASTE CODE HERE]', testInput)
                              .replace('[PASTE ERROR MESSAGE]', testInput)
                              .replace('[PASTE EMAIL]', testInput)
                              .replace('[PASTE NOTES]', testInput)
                              .replace('[TOPIC]', testInput)
                              .replace('[PASTE CODE]', testInput)
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestOutput(data.content);
      } else {
        setTestOutput('Unable to test. This is a preview of what the AI would generate based on your input.');
      }
    } catch {
      setTestOutput('Preview mode: The AI would process your input and generate a detailed response based on the prompt template.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">500+ Curated Prompts</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            AI Prompt <span className="gradient-text">Library & Playground</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality prompts, test them in our sandbox, and save your favorites. 
            Curated for ChatGPT, Claude, Midjourney, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'bg-purple-500 hover:bg-purple-600' : 'whitespace-nowrap'}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prompts List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredPrompts.length} prompts found
              </p>
              {savedPrompts.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedCategory('all')}>
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  {savedPrompts.length} Saved
                </Button>
              )}
            </div>

            {filteredPrompts.map(prompt => (
              <Card 
                key={prompt.id}
                className={`cursor-pointer transition-all hover:border-purple-500/50 ${
                  selectedPrompt?.id === prompt.id ? 'border-purple-500 bg-purple-500/5' : ''
                }`}
                onClick={() => setSelectedPrompt(prompt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{prompt.title}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs">{prompt.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{prompt.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {prompt.model.map(m => (
                          <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                        ))}
                        {prompt.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleSave(prompt.id); }}
                      >
                        <Heart className={`w-4 h-4 ${savedPrompts.includes(prompt.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); copyPrompt(prompt.prompt); }}
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {selectedPrompt ? (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{selectedPrompt.title}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPrompt(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-purple-500">{selectedPrompt.category}</Badge>
                        <Badge variant="outline">{selectedPrompt.uses.toLocaleString()} uses</Badge>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Prompt Template</label>
                        <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                          {selectedPrompt.prompt}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-purple-500 hover:bg-purple-600"
                          onClick={() => copyPrompt(selectedPrompt.prompt)}
                        >
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          Copy Prompt
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => toggleSave(selectedPrompt.id)}
                        >
                          <Heart className={`w-4 h-4 ${savedPrompts.includes(selectedPrompt.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Sandbox */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Quick Test
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="Enter your input to test this prompt..."
                        rows={3}
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        className="text-sm"
                      />
                      <Button 
                        className="w-full" 
                        onClick={testPrompt}
                        disabled={isTesting || !testInput}
                      >
                        {isTesting ? 'Testing...' : 'Test Prompt'}
                      </Button>
                      {testOutput && (
                        <div className="bg-muted/50 p-3 rounded-lg text-sm">
                          {testOutput}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a prompt to preview</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
