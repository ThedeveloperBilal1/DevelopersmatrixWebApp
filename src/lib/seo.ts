export interface ArticleSchema {
  title: string;
  description: string;
  image: string | null;
  datePublished: Date | null;
  author: string;
  url: string;
}

export interface SoftwareSchema {
  name: string;
  description: string;
  image: string | null;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    price: string | null;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  url: string;
}

export interface FAQSchema {
  mainEntity: Array<{
    question: string;
    acceptedAnswer: {
      text: string;
    };
  }>;
}

export function generateArticleSchema(article: ArticleSchema): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished?.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    url: article.url,
  });
}

export function generateSoftwareSchema(software: SoftwareSchema): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: software.name,
    description: software.description,
    image: software.image,
    applicationCategory: software.applicationCategory,
    operatingSystem: software.operatingSystem,
    offers: {
      '@type': 'Offer',
      price: software.offers.price,
      priceCurrency: software.offers.priceCurrency,
    },
    ...(software.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: software.aggregateRating.ratingValue,
        ratingCount: software.aggregateRating.ratingCount,
      },
    }),
    url: software.url,
  });
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

export function generateOrganizationSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Developers Matrix',
    description: 'AI tools, developer resources, and passive income platform',
    url: 'https://developersmatrix.com',
    logo: 'https://developersmatrix.com/logo.png',
    sameAs: [
      'https://twitter.com/developersmatrix',
      'https://linkedin.com/company/developersmatrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@developersmatrix.com',
    },
  });
}
