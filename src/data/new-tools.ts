import { Tool, FAQ } from '@/types';

export const canYouRunItFaqs: FAQ[] = [
  {
    question: "How does the 'Can You Run It' checker work?",
    answer: "Enter your PC specifications (CPU, GPU, RAM) and select a game. Our tool compares your hardware against the game's minimum and recommended requirements to tell you if you can run it smoothly."
  },
  {
    question: "What's the difference between minimum and recommended requirements?",
    answer: "Minimum requirements let you run the game at lowest settings, possibly with lag. Recommended requirements ensure smooth gameplay at medium-high settings with stable frame rates."
  },
  {
    question: "How accurate are the results?",
    answer: "Our database is updated regularly with official game requirements. Results are estimates - actual performance may vary based on drivers, background apps, and optimization."
  },
  {
    question: "Can I check requirements for any game?",
    answer: "Yes! We have a database of 1000+ popular games. If a game isn't listed, you can manually enter requirements from the game's official website."
  }
];

export const promptLibraryFaqs: FAQ[] = [
  {
    question: "What is the AI Prompt Library?",
    answer: "A curated collection of high-quality prompts for ChatGPT, Claude, Midjourney, and other AI tools, organized by category and rated by the community."
  },
  {
    question: "Can I save my own prompts?",
    answer: "Yes! Save prompts to your library, organize them into collections, and share them with others via unique links."
  },
  {
    question: "What is the AI Playground?",
    answer: "A sandbox environment where you can test prompts directly with AI, see outputs instantly, and iterate to improve your prompts."
  },
  {
    question: "How are prompts rated?",
    answer: "Users rate prompts based on effectiveness, clarity, and results. Top-rated prompts appear first in each category."
  }
];

export const emailAssistantFaqs: FAQ[] = [
  {
    question: "What can the AI Email Assistant do?",
    answer: "Draft professional emails from brief notes, rewrite existing emails to sound more professional, adjust tone (formal, friendly, persuasive), and generate quick replies."
  },
  {
    question: "Is my email content private?",
    answer: "Yes, all processing happens locally in your browser. We don't store or transmit your email content to any server."
  },
  {
    question: "Can I adjust the email tone?",
    answer: "Absolutely! Choose from Professional, Friendly, Formal, Persuasive, or Casual tones. The AI adapts your content accordingly."
  },
  {
    question: "Does it support multiple languages?",
    answer: "Yes, the AI Email Assistant can draft and rewrite emails in multiple languages including English, Spanish, French, German, and more."
  }
];

export const linkManagerFaqs: FAQ[] = [
  {
    question: "What is the Link Manager & Smart Bio Tool?",
    answer: "Create custom branded short links, track click analytics, generate QR codes, and build smart bio pages that auto-update with your latest content from YouTube and Instagram."
  },
  {
    question: "Can I track link clicks?",
    answer: "Yes! Get detailed analytics including total clicks, unique visitors, geographic data, device types, and click trends over time."
  },
  {
    question: "How does auto-update work?",
    answer: "Connect your YouTube or Instagram account, and your bio page automatically displays your latest videos or posts without manual updates."
  },
  {
    question: "Can I schedule links?",
    answer: "Yes, set start and end dates for links. Perfect for time-limited campaigns, event promotions, or seasonal content."
  }
];

export const newTools: Tool[] = [
  {
    id: 'can-you-run-it',
    slug: 'can-you-run-it',
    name: 'Can You Run It? - Game Requirements Checker',
    description: 'Check if your PC can run any game before buying. Compare your hardware specs against minimum and recommended requirements for 1000+ popular games.',
    shortDescription: 'Check if your PC can run any game',
    icon: 'Gamepad2',
    category: 'gaming',
    features: [
      'Compare your PC specs to game requirements',
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
    faqs: canYouRunItFaqs,
    keywords: ['can you run it', 'game requirements', 'PC specs checker', 'system requirements', 'gaming hardware'],
    path: '/tools/can-you-run-it'
  },
  {
    id: 'ai-prompt-library',
    slug: 'ai-prompt-library',
    name: 'AI Prompt Library & Playground',
    description: 'Curated collection of high-quality AI prompts for ChatGPT, Claude, Midjourney & more. Test prompts in our sandbox and rate their effectiveness.',
    shortDescription: 'Curated prompts with AI sandbox testing',
    icon: 'BookOpen',
    category: 'productivity',
    features: [
      'Curated prompts by category',
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
    faqs: promptLibraryFaqs,
    keywords: ['AI prompts', 'prompt library', 'ChatGPT prompts', 'Midjourney prompts', 'prompt engineering'],
    path: '/tools/ai-prompt-library'
  },
  {
    id: 'ai-email-assistant',
    slug: 'ai-email-assistant',
    name: 'AI Email Assistant',
    description: 'Draft professional emails in seconds from brief notes. Rewrite emails to sound more professional, adjust tone, and generate quick responses.',
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
    faqs: emailAssistantFaqs,
    keywords: ['email assistant', 'AI email writer', 'professional email', 'email drafter', 'email tone'],
    path: '/tools/ai-email-assistant'
  },
  {
    id: 'link-manager',
    slug: 'link-manager',
    name: 'Link Manager & Smart Bio Tool',
    description: 'Create custom branded short links with click analytics, QR codes, and auto-updating bio pages that sync with your YouTube and Instagram content.',
    shortDescription: 'Branded links with analytics & smart bios',
    icon: 'Link',
    category: 'productivity',
    features: [
      'Custom branded links',
      'Click analytics dashboard',
      'Auto-update latest YouTube/Instagram',
      'Enable link scheduling',
      'QR code generator',
      'Bio page builder'
    ],
    benefits: [
      'Track link performance',
      'Build professional bio pages',
      'Schedule campaign links',
      'Grow your audience'
    ],
    faqs: linkManagerFaqs,
    keywords: ['link shortener', 'bio link', 'QR code generator', 'link analytics', 'branded links'],
    path: '/tools/link-manager'
  }
];

export const gameCategories = ['Action', 'RPG', 'FPS', 'Strategy', 'Sports', 'Racing', 'Horror', 'Simulation'];
