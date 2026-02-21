# TechPulse - Tech News Platform

A modern, automated tech news aggregation platform built with Next.js 14, featuring AI-powered summaries, deal tracking, and SEO optimization.

## Features

- 🤖 **Automated Content Aggregation** - RSS feed scraping from top tech sources
- 🧠 **AI-Powered Summaries** - OpenAI integration for intelligent article summaries
- 🌙 **Dark Mode First** - Modern UI with dark mode as default
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🔍 **SEO Optimized** - Structured data, meta tags, fast loading
- 💰 **Monetization Ready** - AdSense-friendly layout, affiliate link support

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd tech-news-platform
npm install
```

### 2. Set Up Database (Neon - Free Tier)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string
4. Create `.env.local` file:

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."  # Optional, for AI summaries
```

### 3. Run Migrations

```bash
npx drizzle-kit push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Populate Content

```bash
# Trigger scrape manually
curl -X POST http://localhost:3000/api/scrape
```

## Deployment

### Option A: Vercel (Recommended, Free)

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Option B: Hostinger VPS

1. Build locally: `npm run build`
2. Upload `.next` folder and `package.json`
3. Install dependencies: `npm install --production`
4. Start: `npm start`

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── lib/
│   ├── db/          # Database schema & connection
│   └── scraper/     # RSS scraping logic
└── app/api/         # API routes
```

## Automated Scraping

Set up a cron job to run every hour:

```bash
# Using Vercel Cron (paid) or external service like cron-job.org
# POST to: https://your-domain.com/api/scrape
# Header: Authorization: Bearer YOUR_CRON_SECRET
```

## Customization

- **Add RSS sources**: Edit `src/lib/scraper/index.ts`
- **Change styling**: Modify `src/app/globals.css`
- **Add categories**: Update the `categorizeArticle` function

## License

MIT
