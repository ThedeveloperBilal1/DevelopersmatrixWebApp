import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTrendBySlug, getAllTrendSlugs, getRelatedTrends } from '@/data/trend-details';
import { TrendContent } from '@/components/trends/TrendContent';

interface TrendPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllTrendSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: TrendPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const trend = getTrendBySlug(resolvedParams.slug);

  if (!trend) {
    return {
      title: 'Trend Not Found',
    };
  }

  return {
    title: `${trend.title} - Technology Trends 2026`,
    description: trend.introduction.what.slice(0, 160),
    keywords: trend.tags,
    openGraph: {
      title: trend.title,
      description: trend.subtitle,
      type: 'article',
      tags: trend.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: trend.title,
      description: trend.subtitle,
    },
  };
}

export default async function TrendPage({ params }: TrendPageProps) {
  const resolvedParams = await params;
  const trend = getTrendBySlug(resolvedParams.slug);

  if (!trend) {
    notFound();
  }

  const relatedTrends = getRelatedTrends(resolvedParams.slug);

  return <TrendContent trend={trend} relatedTrends={relatedTrends} />;
}
