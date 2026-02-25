import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface Params {
  id: string;
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updated = await db
      .update(blogPosts)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    if (!updated[0]) {
      return Response.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return Response.json(updated[0]);
  } catch (error) {
    console.error('Blog update error:', error);
    return Response.json(
      { message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params;

    const deleted = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    if (!deleted[0]) {
      return Response.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Blog post deleted' });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return Response.json(
      { message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
