import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newPost = await db
      .insert(blogPosts)
      .values({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        category: data.category,
        author: data.author,
        isFeatured: data.isFeatured,
        isPublished: data.isPublished,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        imageUrl: data.imageUrl || null,
        publishedAt: data.isPublished ? new Date() : null,
      })
      .returning();

    return Response.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return Response.json(
      { message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
