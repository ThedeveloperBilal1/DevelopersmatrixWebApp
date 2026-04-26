import ZAI from 'z-ai-web-dev-sdk';
import { BlogPost } from '@/types';

// Tech news sources to scrape from
export const NEWS_SOURCES = [
  { name: 'TechCrunch', domain: 'techcrunch.com', category: 'Technology' },
  { name: 'The Verge', domain: 'theverge.com', category: 'Technology' },
  { name: 'Wired', domain: 'wired.com', category: 'Technology' },
  { name: 'Ars Technica', domain: 'arstechnica.com', category: 'Technology' },
  { name: 'Hacker News', domain: 'news.ycombinator.com', category: 'Developer' },
  { name: 'Dev.to', domain: 'dev.to', category: 'Developer' },
  { name: 'Medium Tech', domain: 'medium.com', category: 'Technology' },
  { name: 'VentureBeat', domain: 'venturebeat.com', category: 'Business' },
];

// Trending topics to search for
export const TRENDING_TOPICS = [
  'artificial intelligence latest news',
  'ChatGPT GPT-4 developments',
  'programming trends 2024',
  'web development frameworks',
  'cloud computing news',
  'cybersecurity threats',
  'startup funding rounds',
  'tech layoffs hiring',
  'remote work technology',
  'developer tools new releases',
  'JavaScript TypeScript updates',
  'Python machine learning',
  'React Next.js news',
  'software engineering best practices',
  'tech career advice',
  'SaaS business strategies',
];

interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
}

interface PageContent {
  title: string;
  url: string;
  html: string;
  publishedTime?: string;
}

class BlogAutomationService {
  private zai: Awaited<ReturnType<typeof ZAI.create>> | null = null;

  async initialize() {
    if (!this.zai) {
      this.zai = await ZAI.create();
    }
    return this.zai;
  }

  /**
   * Search for trending articles on a topic
   */
  async searchTrendingArticles(topic: string, numResults: number = 10): Promise<SearchResult[]> {
    const zai = await this.initialize();
    
    try {
      const results = await zai.functions.invoke('web_search', {
        query: topic,
        num: numResults,
        recency_days: 3 // Last 3 days
      });

      return results || [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  /**
   * Extract content from a web page
   */
  async extractPageContent(url: string): Promise<PageContent | null> {
    const zai = await this.initialize();

    try {
      const result = await zai.functions.invoke('page_reader', {
        url: url
      });

      if (result && result.data) {
        return {
          title: result.data.title,
          url: result.data.url,
          html: result.data.html,
          publishedTime: result.data.publishedTime
        };
      }
      return null;
    } catch (error) {
      console.error('Page extraction failed:', error);
      return null;
    }
  }

  /**
   * Clean HTML to plain text
   */
  htmlToPlainText(html: string): string {
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Generate a blog post from source content using AI
   */
  async generateBlogPost(
    sourceContent: PageContent,
    category: string
  ): Promise<Omit<BlogPost, 'id' | 'slug'> | null> {
    const zai = await this.initialize();

    const plainText = this.htmlToPlainText(sourceContent.html).substring(0, 3000);

    try {
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a professional tech writer for DevelopersMatrix, a platform for developers and tech professionals. 
            Create engaging, informative blog posts that are:
            - Well-structured with clear headings
            - SEO-optimized with relevant keywords
            - Valuable to developers, entrepreneurs, and tech professionals
            - Original content inspired by the source (not copied)
            - Include practical insights and actionable advice`
          },
          {
            role: 'user',
            content: `Based on this source content, create an original blog post for DevelopersMatrix:

Source Title: ${sourceContent.title}
Source URL: ${sourceContent.url}
Category: ${category}

Source Content:
${plainText}

Create a complete blog post with:
1. An engaging title (max 60 chars)
2. A compelling excerpt (max 160 chars)
3. Full article content in markdown format (800-1200 words)
4. 5 relevant tags
5. Author name (use a generic tech writer name)

Respond in this exact JSON format:
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "author": "...",
  "tags": ["...", "..."],
  "readTime": 8
}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const responseText = completion.choices[0]?.message?.content || '';
      
      // Parse JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.title,
          excerpt: parsed.excerpt,
          content: parsed.content,
          author: parsed.author,
          category: category,
          tags: parsed.tags,
          publishedAt: new Date().toISOString().split('T')[0],
          readTime: parsed.readTime || 8,
          image: '/images/blog/default.jpg'
        };
      }
      return null;
    } catch (error) {
      console.error('Blog generation failed:', error);
      return null;
    }
  }

  /**
   * Generate a slug from title
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  }

  /**
   * Run the full automation pipeline
   */
  async runAutomation(postsPerRun: number = 3): Promise<BlogPost[]> {
    console.log('Starting blog automation...');
    
    const generatedPosts: BlogPost[] = [];
    
    // Pick random topics
    const shuffledTopics = TRENDING_TOPICS.sort(() => Math.random() - 0.5);
    const selectedTopics = shuffledTopics.slice(0, postsPerRun);

    for (const topic of selectedTopics) {
      try {
        console.log(`\nSearching for: ${topic}`);
        
        // Search for articles
        const searchResults = await this.searchTrendingArticles(topic, 5);
        
        if (searchResults.length === 0) {
          console.log('No results found, skipping...');
          continue;
        }

        // Find a suitable article
        for (const result of searchResults) {
          // Skip if from blocked domains
          if (this.isBlockedDomain(result.host_name)) {
            continue;
          }

          console.log(`Extracting: ${result.name}`);
          
          // Extract content
          const pageContent = await this.extractPageContent(result.url);
          
          if (!pageContent || pageContent.html.length < 500) {
            console.log('Insufficient content, skipping...');
            continue;
          }

          // Determine category
          const category = this.determineCategory(result.host_name, topic);

          // Generate blog post
          const blogPost = await this.generateBlogPost(pageContent, category);
          
          if (blogPost) {
            const slug = this.generateSlug(blogPost.title);
            const fullPost: BlogPost = {
              id: Date.now().toString(),
              slug: slug,
              ...blogPost
            };
            
            generatedPosts.push(fullPost);
            console.log(`✓ Generated: ${blogPost.title}`);
            
            // Only generate one post per topic
            break;
          }
        }

        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Error processing topic ${topic}:`, error);
      }
    }

    console.log(`\nAutomation complete. Generated ${generatedPosts.length} posts.`);
    return generatedPosts;
  }

  /**
   * Check if domain is blocked
   */
  private isBlockedDomain(hostname: string): boolean {
    const blockedDomains = [
      'facebook.com',
      'twitter.com',
      'instagram.com',
      'linkedin.com',
      'youtube.com',
      'tiktok.com',
      'pinterest.com',
      'reddit.com'
    ];
    return blockedDomains.some(domain => hostname.includes(domain));
  }

  /**
   * Determine blog category from source and topic
   */
  private determineCategory(hostname: string, topic: string): string {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('career') || topicLower.includes('hiring') || topicLower.includes('layoff')) {
      return 'Career';
    }
    if (topicLower.includes('startup') || topicLower.includes('funding') || topicLower.includes('business')) {
      return 'Startup';
    }
    if (topicLower.includes('finance') || topicLower.includes('salary')) {
      return 'Finance';
    }
    if (topicLower.includes('productivity') || topicLower.includes('remote')) {
      return 'Productivity';
    }
    
    // Default to Technology
    return 'Technology';
  }
}

// Export singleton instance
export const blogAutomation = new BlogAutomationService();
