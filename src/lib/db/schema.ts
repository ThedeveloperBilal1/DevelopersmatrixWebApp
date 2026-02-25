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

export const aiTools = pgTable('ai_tools', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  imageUrl: text('image_url'),
  websiteUrl: text('website_url').notNull(),
  category: varchar('category', { length: 100 }).notNull(), // 'coding', 'image-generation', 'writing', 'audio', 'video', 'productivity', 'other'
  pricing: varchar('pricing', { length: 50 }), // 'free', 'freemium', 'paid'
  startingPrice: varchar('starting_price', { length: 50 }),
  features: jsonb('features').default([]),
  pros: jsonb('pros').default([]),
  cons: jsonb('cons').default([]),
  rating: integer('rating'), // 1-5
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  category: varchar('category', { length: 100 }).notNull(),
  tags: jsonb('tags').default([]),
  author: varchar('author', { length: 200 }).default('Developers Matrix'),
  isFeatured: boolean('is_featured').default(false),
  isPublished: boolean('is_published').default(false),
  views: integer('views').default(0),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: varchar('seo_description', { length: 500 }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const utilityTools = pgTable('utility_tools', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  toolType: varchar('tool_type', { length: 100 }).notNull(), // 'calculator', 'converter', 'generator', 'checker', 'formatter'
  icon: varchar('icon', { length: 100 }),
  content: text('content'),
  isPublished: boolean('is_published').default(false),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const comparisons = pgTable('comparisons', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  item1Id: integer('item1_id').notNull(),
  item2Id: integer('item2_id').notNull(),
  item1Name: varchar('item1_name', { length: 200 }).notNull(),
  item2Name: varchar('item2_name', { length: 200 }).notNull(),
  comparisonData: jsonb('comparison_data'),
  content: text('content'),
  isPublished: boolean('is_published').default(false),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 200 }),
  role: varchar('role', { length: 50 }).default('editor'), // 'admin', 'editor'
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
