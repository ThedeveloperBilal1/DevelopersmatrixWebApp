import { db } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { BlogForm } from '@/components/blog-form';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, parseInt(id)),
  });

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} />;
}
