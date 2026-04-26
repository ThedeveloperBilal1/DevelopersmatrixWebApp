/**
 * Blog Automation Cron Job Script
 * 
 * This script runs the blog automation to generate new posts.
 * Can be scheduled with cron or run manually.
 * 
 * Usage:
 *   npx tsx scripts/blog-cron.ts
 *   bun run scripts/blog-cron.ts
 * 
 * Cron example (runs daily at 6 AM):
 *   0 6 * * * cd /path/to/project && npx tsx scripts/blog-cron.ts >> logs/blog-cron.log 2>&1
 */

const CONFIG = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  apiKey: process.env.BLOG_API_KEY || 'devmatrix-secret-key-2024',
  postsPerRun: parseInt(process.env.POSTS_PER_RUN || '3'),
};

interface BlogPostResponse {
  id: string;
  title: string;
  slug: string;
  category: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  newPosts?: BlogPostResponse[];
  totalPosts?: number;
  stats?: {
    totalPosts: number;
    categories: Record<string, number>;
    lastGenerated: string | null;
  };
  error?: string;
}

async function makeRequest(
  url: string, 
  options: { method: string; headers?: Record<string, string> }, 
  data?: unknown
): Promise<{ status: number; data: ApiResponse }> {
  const response = await fetch(url, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CONFIG.apiKey,
      ...options.headers
    },
    body: data ? JSON.stringify(data) : undefined
  });

  const responseData = await response.json();
  return { status: response.status, data: responseData as ApiResponse };
}

async function main() {
  console.log('========================================');
  console.log(`Blog Automation - ${new Date().toISOString()}`);
  console.log('========================================\n');

  try {
    // First, check if the server is running
    console.log('Checking server status...');
    
    try {
      const healthCheck = await makeRequest(`${CONFIG.baseUrl}/api/blog-automation`, { method: 'GET' });
      console.log(`Server responded with status: ${healthCheck.status}`);
    } catch {
      console.error('Error: Server is not responding. Make sure the dev server is running.');
      console.error('Run: bun run dev');
      process.exit(1);
    }

    // Generate new blogs
    console.log(`\nGenerating ${CONFIG.postsPerRun} blog posts...`);
    
    const result = await makeRequest(
      `${CONFIG.baseUrl}/api/blog-automation`,
      { method: 'POST' },
      { count: CONFIG.postsPerRun }
    );

    if (result.status === 200 && result.data.success) {
      console.log('\n✅ Success!');
      console.log(`Generated: ${result.data.newPosts?.length || 0} posts`);
      console.log(`Total posts: ${result.data.totalPosts}`);
      
      if (result.data.newPosts) {
        console.log('\nNew posts:');
        result.data.newPosts.forEach((post, i) => {
          console.log(`  ${i + 1}. ${post.title} (${post.category})`);
        });
      }
    } else {
      console.error('\n❌ Failed to generate posts');
      console.error('Response:', result.data);
      process.exit(1);
    }

    // Get updated stats
    console.log('\nFetching updated stats...');
    const stats = await makeRequest(`${CONFIG.baseUrl}/api/blog-automation?action=stats`, { method: 'GET' });
    
    if (stats.data?.stats) {
      console.log('\nBlog Statistics:');
      console.log(`  Total posts: ${stats.data.stats.totalPosts}`);
      console.log('  Categories:', JSON.stringify(stats.data.stats.categories, null, 4));
    }

    console.log('\n========================================');
    console.log('Blog automation completed successfully!');
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run
main();
