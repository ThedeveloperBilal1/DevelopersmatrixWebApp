import { pgTable, serial, text, timestamp, varchar, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  imageUrl: text('image_url'),
  sourceUrl: text('source_url').notNull(),
  sourceName: varchar('source_name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  tags: jsonb('tags').default([]),
  isFeatured: boolean('is_featured').default(false),
  isManual: boolean('is_manual').default(false),
  views: integer('views').default(0),
  publishedAt: timestamp('published_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const deals = pgTable('deals', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  originalPrice: varchar('original_price', { length: 50 }),
  dealPrice: varchar('deal_price', { length: 50 }),
  discountPercent: integer('discount_percent'),
  productUrl: text('product_url').notNull(),
  retailer: varchar('retailer', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  isActive: boolean('is_active').default(true),
  expiresAt: timestamp('expires_at'),
  clicks: integer('clicks').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sources = pgTable('sources', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  url: text('url').notNull(),
  rssUrl: text('rss_url'),
  type: varchar('type', { length: 50 }).notNull(), // 'news', 'blog', 'deals'
  isActive: boolean('is_active').default(true),
  lastFetchedAt: timestamp('last_fetched_at'),
  createdAt: timestamp('created_at').defaultNow(),
});
