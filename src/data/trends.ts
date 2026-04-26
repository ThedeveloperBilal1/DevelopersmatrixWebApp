import { Trend } from '@/types';

export const trends: Trend[] = [
  {
    id: '1',
    title: 'Generative AI in Enterprise Applications',
    description: 'Enterprise adoption of generative AI tools is accelerating rapidly. Companies are integrating AI assistants into workflows for content creation, code generation, and customer service automation. This trend is reshaping how businesses operate and creating demand for AI integration specialists.',
    category: 'ai',
    growth: 340,
    prediction: 'By 2025, 80% of enterprises will have deployed AI-powered applications in production.',
    icon: 'Brain',
    tags: ['AI', 'Enterprise', 'Automation', 'LLM']
  },
  {
    id: '2',
    title: 'Edge Computing Expansion',
    description: 'Edge computing is becoming essential for real-time processing needs. From IoT devices to autonomous vehicles, processing data closer to its source reduces latency and bandwidth costs while enabling new application categories.',
    category: 'tech',
    growth: 180,
    prediction: 'Edge computing market will reach $87 billion by 2026.',
    icon: 'Cpu',
    tags: ['Edge Computing', 'IoT', 'Cloud', 'Infrastructure']
  },
  {
    id: '3',
    title: 'AI-Augmented Development',
    description: 'AI coding assistants are transforming software development. Developers using tools like GitHub Copilot report 55% faster task completion. This shift is changing required skills and increasing productivity.',
    category: 'skill',
    growth: 420,
    prediction: 'AI-assisted development will become standard practice by 2025.',
    icon: 'Code',
    tags: ['Development', 'AI', 'Productivity', 'Tools']
  },
  {
    id: '4',
    title: 'Quantum Computing Commercialization',
    description: 'Quantum computing is moving from research labs to commercial applications. Financial services, pharmaceuticals, and logistics companies are exploring quantum solutions for previously intractable problems.',
    category: 'tech',
    growth: 95,
    prediction: 'Quantum computing will achieve practical advantage for specific use cases by 2026.',
    icon: 'Atom',
    tags: ['Quantum', 'Computing', 'Innovation', 'Research']
  },
  {
    id: '5',
    title: 'Remote Work Technology Stack',
    description: 'The remote work technology ecosystem continues to evolve. New tools for virtual collaboration, asynchronous communication, and distributed team management are creating opportunities for startups and career paths.',
    category: 'career',
    growth: 150,
    prediction: 'Remote-first companies will represent 30% of tech employment by 2025.',
    icon: 'Home',
    tags: ['Remote Work', 'Collaboration', 'Tools', 'Future of Work']
  },
  {
    id: '6',
    title: 'Green Tech and Sustainable Computing',
    description: 'Environmental concerns are driving innovation in sustainable technology. From energy-efficient data centers to carbon-aware computing, sustainability is becoming a core consideration in technology decisions.',
    category: 'startup',
    growth: 210,
    prediction: 'Green tech investments will double by 2025.',
    icon: 'Leaf',
    tags: ['Sustainability', 'Green Tech', 'Environment', 'ESG']
  },
  {
    id: '7',
    title: 'Low-Code/No-Code Platforms',
    description: 'Democratization of software development through low-code and no-code platforms is accelerating. Business users can now build applications without traditional programming, changing the role of professional developers.',
    category: 'tech',
    growth: 230,
    prediction: '70% of new business applications will use low-code or no-code technologies by 2025.',
    icon: 'Layers',
    tags: ['Low-Code', 'No-Code', 'Development', 'Business']
  },
  {
    id: '8',
    title: 'Cybersecurity Skills Gap',
    description: 'The cybersecurity skills shortage continues to intensify. With 3.5 million unfilled cybersecurity jobs globally, this field offers exceptional career opportunities for those willing to develop expertise.',
    category: 'career',
    growth: 85,
    prediction: 'Cybersecurity roles will remain among the most in-demand through 2030.',
    icon: 'Shield',
    tags: ['Security', 'Career', 'Skills', 'Jobs']
  },
  {
    id: '9',
    title: 'AI Ethics and Governance',
    description: 'As AI systems become more prevalent, ethical considerations and governance frameworks are gaining importance. Companies need professionals who can navigate responsible AI implementation.',
    category: 'ai',
    growth: 290,
    prediction: 'AI ethics roles will become standard in enterprise by 2025.',
    icon: 'Scale',
    tags: ['AI Ethics', 'Governance', 'Compliance', 'Responsible AI']
  },
  {
    id: '10',
    title: 'Web3 and Decentralized Applications',
    description: 'Despite market volatility, Web3 development continues. Focus is shifting to practical applications in identity, finance, and data ownership rather than speculative tokens.',
    category: 'startup',
    growth: 75,
    prediction: 'Web3 infrastructure will mature significantly by 2025.',
    icon: 'Globe',
    tags: ['Web3', 'Blockchain', 'DeFi', 'Decentralization']
  },
  {
    id: '11',
    title: 'Platform Engineering',
    description: 'Platform engineering is emerging as a critical discipline for improving developer productivity. Internal developer platforms are becoming standard at tech-forward organizations.',
    category: 'skill',
    growth: 195,
    prediction: 'Platform engineering will be a dedicated role at 50% of enterprises by 2026.',
    icon: 'Settings',
    tags: ['DevOps', 'Platform', 'Developer Experience', 'Infrastructure']
  },
  {
    id: '12',
    title: 'Data Engineering Demand',
    description: 'As organizations accumulate more data, data engineering has become essential. The gap between data science ambitions and data infrastructure reality creates strong demand for data engineers.',
    category: 'career',
    growth: 165,
    prediction: 'Data engineering will remain one of the fastest-growing tech roles.',
    icon: 'Database',
    tags: ['Data', 'Engineering', 'Analytics', 'Pipeline']
  }
];

export function getTrendsByCategory(category: Trend['category']): Trend[] {
  return trends.filter(trend => trend.category === category);
}

export function getTrendingTopics(count: number = 6): Trend[] {
  return [...trends].sort((a, b) => b.growth - a.growth).slice(0, count);
}

export function getAllTrendCategories(): string[] {
  return ['tech', 'career', 'skill', 'startup', 'ai'];
}
