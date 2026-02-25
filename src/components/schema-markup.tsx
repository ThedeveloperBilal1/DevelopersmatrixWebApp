interface SchemaMarkupProps {
  type: string;
  data: Record<string, any>;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Developers Matrix',
    url: 'https://developersmatrix.com',
    logo: 'https://developersmatrix.com/logo.png',
    description:
      'AI tools directory, developer resources, and passive income platform',
    sameAs: [
      'https://twitter.com/developersmatrix',
      'https://linkedin.com/company/developersmatrix',
      'https://github.com/developersmatrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@developersmatrix.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  author: string;
  datePublished: Date;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  author,
  datePublished,
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    ...(image && { image }),
    datePublished: datePublished.toISOString(),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Developers Matrix',
      logo: {
        '@type': 'ImageObject',
        url: 'https://developersmatrix.com/logo.png',
      },
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareToolSchemaProps {
  name: string;
  description: string;
  image?: string;
  url: string;
  category: string;
  rating?: number;
  pricingModel?: 'free' | 'freemium' | 'paid';
  startingPrice?: string;
}

export function SoftwareToolSchema({
  name,
  description,
  image,
  url,
  category,
  rating,
  pricingModel,
  startingPrice,
}: SoftwareToolSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    ...(image && { image }),
    url,
    applicationCategory: category,
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        bestRating: '5',
        worstRating: '1',
      },
    }),
    offers: {
      '@type': 'Offer',
      price: startingPrice || '0',
      priceCurrency: 'USD',
      ...(pricingModel && { availability: 'https://schema.org/' + pricingModel }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
