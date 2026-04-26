import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface BlogPost {
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

const CATEGORIES = [
  'Gaming', 'Technology', 'Politics', 'World News', 
  'Entertainment', 'Career', 'AI', 'Science', 'Health'
];

// Pre-defined trending topics for each category (updated for 2026)
const TRENDING_TOPICS: Record<string, Array<{title: string, topic: string, keywords: string[]}>> = {
  'Gaming': [
    { title: 'GTA 6 Release Date Confirmed: Everything We Know About Rockstar\'s Next Masterpiece', topic: 'GTA 6 Grand Theft Auto VI release November 2026 Rockstar Games', keywords: ['GTA 6', 'Rockstar Games', 'Grand Theft Auto', 'Vice City', 'Next-Gen Gaming'] },
    { title: 'PlayStation 6 Rumors: What Sony\'s Next Console Could Offer', topic: 'PlayStation 6 PS6 Sony next generation console rumors', keywords: ['PlayStation', 'Sony', 'Gaming', 'Console', 'Next-Gen'] },
    { title: 'Esports Industry Reaches $2 Billion: The Rise of Competitive Gaming', topic: 'esports competitive gaming industry growth 2026', keywords: ['Esports', 'Competitive Gaming', 'Tournaments', 'Gaming Industry', 'Streaming'] },
    { title: 'Nintendo Switch 2 Launch Games: Complete Guide to Day One Titles', topic: 'Nintendo Switch 2 launch games 2026 release', keywords: ['Nintendo', 'Switch 2', 'Gaming', 'Console', 'Launch Games'] },
    { title: 'AI in Video Games: How Machine Learning is Revolutionizing Gameplay', topic: 'AI artificial intelligence video games NPC machine learning', keywords: ['AI Gaming', 'Machine Learning', 'NPCs', 'Game Development', 'Technology'] }
  ],
  'Technology': [
    { title: 'AI Revolution 2026: How Artificial Intelligence is Transforming Every Industry', topic: 'AI artificial intelligence revolution 2026 industry transformation', keywords: ['AI', 'Artificial Intelligence', 'Technology', 'Innovation', 'Automation'] },
    { title: 'Apple Vision Pro 2: The Future of Spatial Computing Arrives', topic: 'Apple Vision Pro 2 spatial computing AR VR mixed reality', keywords: ['Apple', 'Vision Pro', 'AR', 'VR', 'Spatial Computing'] },
    { title: 'Quantum Computing Breakthrough: 1000 Qubit Processor Achieved', topic: 'quantum computing breakthrough 1000 qubit processor', keywords: ['Quantum Computing', 'Technology', 'Innovation', 'Computing', 'Science'] },
    { title: '5G Networks Go Global: How Next-Gen Connectivity Changes Everything', topic: '5G network global rollout connectivity speed 2026', keywords: ['5G', 'Connectivity', 'Mobile', 'Network', 'Technology'] },
    { title: 'Electric Vehicle Sales Surge: EVs Now 40% of New Car Market', topic: 'electric vehicle EV sales surge 2026 Tesla BYD', keywords: ['Electric Vehicles', 'EV', 'Tesla', 'Green Technology', 'Automotive'] }
  ],
  'Politics': [
    { title: '2026 Midterm Elections: Key Races That Will Shape the Next Two Years', topic: '2026 midterm elections US Congress Senate House races', keywords: ['Elections', 'Politics', 'Congress', 'Senate', 'Voting'] },
    { title: 'Global Democracy Index: New Report Reveals Shifting Political Landscape', topic: 'democracy index global political landscape 2026', keywords: ['Democracy', 'Politics', 'Global', 'Freedom', 'Governance'] },
    { title: 'Climate Policy Summit: World Leaders Agree on Historic Carbon Targets', topic: 'climate policy summit carbon targets world leaders', keywords: ['Climate', 'Politics', 'Environment', 'Policy', 'Global Summit'] },
    { title: 'Digital Privacy Laws: New Regulations Transform Online Data Protection', topic: 'digital privacy laws GDPR data protection 2026', keywords: ['Privacy', 'Data Protection', 'Technology Law', 'GDPR', 'Regulation'] },
    { title: 'Immigration Reform 2026: New Policies Reshape Global Migration', topic: 'immigration reform policy 2026 migration global', keywords: ['Immigration', 'Policy', 'Migration', 'Politics', 'Reform'] }
  ],
  'World News': [
    { title: 'Global Economic Outlook 2026: Recovery and Growth Forecast', topic: 'global economy 2026 GDP growth forecast recovery', keywords: ['Economy', 'Global', 'Finance', 'Growth', 'Markets'] },
    { title: 'Climate Change Impact: Record Temperatures Reshape Global Weather Patterns', topic: 'climate change extreme weather 2026 temperatures', keywords: ['Climate', 'Weather', 'Environment', 'Global Warming', 'Science'] },
    { title: 'International Space Station: New Era of Space Cooperation Begins', topic: 'ISS International Space Station cooperation 2026', keywords: ['Space', 'ISS', 'NASA', 'International', 'Science'] },
    { title: 'Global Trade Agreements: New Partnerships Reshape International Commerce', topic: 'global trade agreements international commerce 2026', keywords: ['Trade', 'Global', 'Commerce', 'Economy', 'International'] },
    { title: 'Refugee Crisis Update: Humanitarian Efforts Intensify Worldwide', topic: 'refugee crisis humanitarian aid 2026', keywords: ['Refugees', 'Humanitarian', 'Global', 'Aid', 'Crisis'] }
  ],
  'Entertainment': [
    { title: 'Streaming Wars 2026: Which Platform is Winning the Battle', topic: 'streaming wars Netflix Disney Amazon 2026', keywords: ['Streaming', 'Netflix', 'Disney', 'Entertainment', 'Media'] },
    { title: 'Box Office Recovery: Movie Theaters See Strongest Year Since 2020', topic: 'box office movie theaters cinema 2026 recovery', keywords: ['Movies', 'Box Office', 'Cinema', 'Entertainment', 'Film'] },
    { title: 'Music Industry Evolution: How AI is Changing Song Creation', topic: 'music industry AI song creation 2026', keywords: ['Music', 'AI', 'Entertainment', 'Technology', 'Artists'] },
    { title: 'Virtual Concerts: The Rise of Digital Live Performance', topic: 'virtual concerts digital live performance 2026', keywords: ['Concerts', 'Virtual', 'Music', 'Entertainment', 'Live Events'] },
    { title: 'Celebrity Culture 2026: How Social Media Continues to Reshape Fame', topic: 'celebrity culture social media fame 2026', keywords: ['Celebrity', 'Social Media', 'Entertainment', 'Influencers', 'Culture'] }
  ],
  'Career': [
    { title: 'Remote Work Revolution: 60% of Companies Now Offer Hybrid Options', topic: 'remote work hybrid 2026 workplace trends', keywords: ['Remote Work', 'Hybrid', 'Career', 'Workplace', 'Trends'] },
    { title: 'AI and Jobs: Which Careers Will Thrive in the Automation Age', topic: 'AI jobs automation careers 2026', keywords: ['AI', 'Jobs', 'Career', 'Automation', 'Future of Work'] },
    { title: 'Salary Trends 2026: Industries Seeing the Biggest Pay Increases', topic: 'salary trends 2026 pay increases industries', keywords: ['Salary', 'Career', 'Jobs', 'Income', 'Trends'] },
    { title: 'Skill Gap Crisis: Most In-Demand Skills for 2026 Job Market', topic: 'skill gap in-demand skills job market 2026', keywords: ['Skills', 'Career', 'Jobs', 'Education', 'Training'] },
    { title: 'Side Hustle Economy: How Professionals Are Building Multiple Income Streams', topic: 'side hustle multiple income streams 2026', keywords: ['Side Hustle', 'Income', 'Career', 'Freelance', 'Entrepreneurship'] }
  ],
  'AI': [
    { title: 'ChatGPT and Beyond: The Evolution of AI Assistants in 2026', topic: 'ChatGPT AI assistants evolution 2026', keywords: ['ChatGPT', 'AI', 'Assistants', 'Technology', 'Automation'] },
    { title: 'Generative AI Breakthrough: New Models Create Photorealistic Content', topic: 'generative AI photorealistic content creation', keywords: ['Generative AI', 'AI', 'Content', 'Technology', 'Innovation'] },
    { title: 'AI Ethics 2026: New Guidelines Shape Responsible Development', topic: 'AI ethics guidelines responsible development 2026', keywords: ['AI Ethics', 'Technology', 'Regulation', 'Development', 'Responsibility'] },
    { title: 'AI in Healthcare: Revolutionary Diagnostics Save Lives', topic: 'AI healthcare diagnostics medical 2026', keywords: ['AI', 'Healthcare', 'Medical', 'Technology', 'Diagnostics'] },
    { title: 'Autonomous Vehicles: Self-Driving Cars Hit Major Milestone', topic: 'autonomous vehicles self-driving cars 2026', keywords: ['Autonomous', 'Vehicles', 'Self-Driving', 'AI', 'Transportation'] }
  ],
  'Science': [
    { title: 'Mars Mission Update: NASA\'s Latest Discoveries on the Red Planet', topic: 'Mars mission NASA discoveries 2026', keywords: ['Mars', 'NASA', 'Space', 'Science', 'Exploration'] },
    { title: 'Gene Therapy Breakthrough: New Treatments Offer Hope for Genetic Diseases', topic: 'gene therapy breakthrough genetic diseases 2026', keywords: ['Gene Therapy', 'Medical', 'Science', 'Health', 'Biotechnology'] },
    { title: 'Fusion Energy Milestone: Clean Power Revolution Gets Closer', topic: 'fusion energy clean power breakthrough 2026', keywords: ['Fusion', 'Energy', 'Clean Power', 'Science', 'Technology'] },
    { title: 'Ocean Discovery: Scientists Find New Species in Deep Sea Expedition', topic: 'ocean discovery new species deep sea', keywords: ['Ocean', 'Discovery', 'Science', 'Marine', 'Biology'] },
    { title: 'Climate Science: New Models Predict Future Environmental Changes', topic: 'climate science models predictions 2026', keywords: ['Climate', 'Science', 'Environment', 'Research', 'Prediction'] }
  ],
  'Health': [
    { title: 'Mental Health Awareness: New Approaches to Wellness in 2026', topic: 'mental health wellness approaches 2026', keywords: ['Mental Health', 'Wellness', 'Health', 'Self-Care', 'Psychology'] },
    { title: 'Nutrition Science Update: Latest Research Changes How We Eat', topic: 'nutrition science research diet 2026', keywords: ['Nutrition', 'Diet', 'Health', 'Science', 'Food'] },
    { title: 'Fitness Technology: How Wearable Devices Are Transforming Health', topic: 'fitness technology wearable devices health', keywords: ['Fitness', 'Technology', 'Wearables', 'Health', 'Exercise'] },
    { title: 'Sleep Science: New Research Reveals Optimal Rest Patterns', topic: 'sleep science research optimal rest 2026', keywords: ['Sleep', 'Health', 'Science', 'Wellness', 'Rest'] },
    { title: 'Telemedicine Growth: Virtual Healthcare Becomes Mainstream', topic: 'telemedicine virtual healthcare 2026', keywords: ['Telemedicine', 'Healthcare', 'Technology', 'Health', 'Virtual'] }
  ]
};

function getAuthorForCategory(category: string): string {
  const authors: Record<string, string> = {
    'Gaming': 'Gaming News Desk',
    'Technology': 'Technology Correspondent',
    'Politics': 'Political Analyst',
    'World News': 'Global Affairs Reporter',
    'Entertainment': 'Entertainment Writer',
    'Career': 'Career Expert',
    'AI': 'AI Research Team',
    'Science': 'Science Editor',
    'Health': 'Health Correspondent'
  };
  return authors[category] || 'News Desk';
}

function generateContentFromTopic(topicData: {title: string, topic: string, keywords: string[]}, category: string): {content: string, excerpt: string} {
  const { title, topic, keywords } = topicData;
  
  // Generate comprehensive content based on topic
  const content = `# ${title}

The landscape of ${category.toLowerCase()} continues to evolve rapidly in 2026, bringing unprecedented changes and exciting developments that are reshaping how we live, work, and interact with technology.

## Current State and Developments

As we progress through 2026, significant advancements have emerged in the realm of ${topic.toLowerCase()}. Industry leaders and innovators are pushing boundaries, creating new opportunities and challenges for consumers, professionals, and businesses alike.

The most notable developments include breakthrough innovations, strategic partnerships, and regulatory changes that are fundamentally transforming the sector. These changes reflect broader trends in technology adoption, consumer behavior, and global market dynamics.

### Key Factors Driving Change

Several critical factors are accelerating transformation in this space:

- **Technological Innovation**: New tools and platforms are enabling capabilities previously thought impossible
- **Consumer Demand**: Changing preferences and expectations are pushing companies to adapt
- **Regulatory Environment**: New policies are creating frameworks for responsible development
- **Global Competition**: International players are intensifying innovation efforts
- **Investment Flows**: Significant capital is being deployed to accelerate progress

## Industry Impact

The implications of these developments extend far beyond individual products or services. They represent fundamental shifts in how ${category.toLowerCase()} operates and delivers value to stakeholders.

### For Consumers

Users and consumers can expect enhanced experiences, more choices, and improved accessibility. The democratization of technology means that advanced capabilities are becoming available to broader audiences.

### For Businesses

Organizations are adapting their strategies, operations, and business models to remain competitive. Those who embrace change are positioning themselves for long-term success, while others risk being left behind.

### For Professionals

Career opportunities are evolving, with new roles emerging and traditional positions being transformed. Continuous learning and adaptation have become essential for professional success.

## Expert Perspectives

Industry analysts and thought leaders have weighed in on these developments:

> "The pace of change we're witnessing is unprecedented. Organizations that fail to adapt quickly will struggle to remain relevant," notes a leading industry analyst.

The consensus among experts is that we're entering a new era of innovation and transformation that will define the coming decade.

## Looking Forward

As 2026 continues, several trends are worth watching:

1. **Integration of AI and Automation**: More processes will become automated and intelligent
2. **Sustainability Focus**: Environmental considerations will increasingly influence decisions
3. **Personalization**: Experiences will become more tailored to individual needs
4. **Global Connectivity**: Cross-border collaboration will intensify
5. **Security and Privacy**: Protection of data and systems will remain paramount

## Conclusion

The developments in ${category.toLowerCase()} during 2026 represent both challenges and opportunities. Those who stay informed, remain adaptable, and embrace innovation will be best positioned to thrive in this evolving landscape.

Stay tuned for more updates as these stories develop.`;

  const excerpt = `Breaking developments in ${category.toLowerCase()}: ${title.toLowerCase().replace(/^[^:]+: /, '')}. Expert analysis and insights on what this means for you.`;

  return { content, excerpt };
}

function generateBlogPost(category: string): BlogPost | null {
  try {
    const topics = TRENDING_TOPICS[category];
    if (!topics || topics.length === 0) return null;
    
    const topicData = topics[Math.floor(Math.random() * topics.length)];
    const { content, excerpt } = generateContentFromTopic(topicData, category);

    const title = topicData.title;
    const tags = topicData.keywords;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);

    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(4, Math.ceil(wordCount / 200));

    return {
      id: `auto-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      slug,
      title,
      excerpt,
      content,
      author: getAuthorForCategory(category),
      category,
      tags,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime,
      image: `/images/blog/${slug.substring(0, 25)}.jpg`
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const secret = searchParams.get('secret');

    if (secret !== 'dm-auto-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const blogPost = generateBlogPost(category);

    if (!blogPost) {
      return NextResponse.json({ error: 'Failed to generate blog post' }, { status: 500 });
    }

    const blogsPath = path.join(process.cwd(), 'src', 'data', 'generated-blogs.json');
    let existingBlogs: BlogPost[] = [];
    
    try {
      const blogsData = fs.readFileSync(blogsPath, 'utf-8');
      existingBlogs = JSON.parse(blogsData);
    } catch {
      existingBlogs = [];
    }

    const slugExists = existingBlogs.some(b => b.slug === blogPost.slug);
    if (slugExists) {
      blogPost.slug = `${blogPost.slug}-${Date.now()}`;
    }

    existingBlogs.unshift(blogPost);
    existingBlogs = existingBlogs.slice(0, 50);
    fs.writeFileSync(blogsPath, JSON.stringify(existingBlogs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Blog post generated successfully!',
      blog: {
        title: blogPost.title,
        category: blogPost.category,
        slug: blogPost.slug,
        author: blogPost.author,
        readTime: blogPost.readTime,
        url: `https://developersmatrix.vercel.app/blog/${blogPost.slug}`
      },
      totalBlogs: existingBlogs.length
    });

  } catch (error) {
    console.error('Blog automation error:', error);
    return NextResponse.json({
      error: 'Failed to generate blog post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, count = 3 } = body;

    if (secret !== 'dm-auto-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: any[] = [];
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'generated-blogs.json');
    
    let existingBlogs: BlogPost[] = [];
    try {
      const blogsData = fs.readFileSync(blogsPath, 'utf-8');
      existingBlogs = JSON.parse(blogsData);
    } catch {
      existingBlogs = [];
    }

    for (let i = 0; i < count; i++) {
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const blogPost = generateBlogPost(category);
      
      if (blogPost) {
        existingBlogs.unshift(blogPost);
        results.push({
          success: true,
          title: blogPost.title,
          category: blogPost.category,
          slug: blogPost.slug
        });
      } else {
        results.push({
          success: false,
          category
        });
      }
    }

    existingBlogs = existingBlogs.slice(0, 50);
    fs.writeFileSync(blogsPath, JSON.stringify(existingBlogs, null, 2));

    return NextResponse.json({
      success: true,
      message: `Generated ${results.filter(r => r.success).length} blog posts`,
      generated: results,
      totalBlogs: existingBlogs.length
    });

  } catch (error) {
    console.error('Bulk blog generation error:', error);
    return NextResponse.json({
      error: 'Failed to generate blogs',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
