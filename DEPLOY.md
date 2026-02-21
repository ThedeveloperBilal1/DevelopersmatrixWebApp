# 🚀 TechPulse Deployment Guide

## Quick Deploy (Vercel - Recommended)

### Step 1: Push to GitHub

```bash
cd tech-news-platform
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/tech-news-platform.git
git push -u origin main
```

### Step 2: Set Up Neon Database (Free)

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (fastest)
3. Create new project → name it "techpulse"
4. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require`)

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. "Add New Project" → Import your GitHub repo
3. In Environment Variables, add:
   ```
   DATABASE_URL=postgresql://... (from Neon)
   OPENAI_API_KEY=sk-... (optional, for AI summaries)
   ```
4. Click Deploy

### Step 4: Run Database Migrations

In Vercel dashboard:
1. Go to your project → Settings → Git
2. Install Vercel CLI locally: `npm i -g vercel`
3. Run: `vercel env pull` (downloads env vars)
4. Run: `npx drizzle-kit push`

Or use Neon console's SQL editor to run the migration manually.

### Step 5: Populate Initial Content

```bash
# Trigger scrape manually
curl -X POST https://YOUR_VERCEL_URL/api/scrape
```

---

## Deploy on Hostinger VPS

### Prerequisites

- Hostinger VPS (Ubuntu 22.04 recommended)
- Domain pointed to your VPS IP
- Node.js 18+ installed

### Step 1: Connect to VPS

```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Install Node.js & PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### Step 3: Clone & Build

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/tech-news-platform.git
cd tech-news-platform
npm install
npm run build
```

### Step 4: Environment Variables

```bash
nano .env.local
# Add:
DATABASE_URL="your-neon-connection-string"
OPENAI_API_KEY="your-openai-key"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### Step 5: Run Migrations

```bash
npx drizzle-kit push
```

### Step 6: Start with PM2

```bash
pm2 start npm --name "techpulse" -- start
pm2 save
pm2 startup
```

### Step 7: Nginx Setup (Optional but Recommended)

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/techpulse
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/techpulse /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Setting Up Automated Scraping

### Option A: Vercel Cron (Paid)

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/scrape",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Option B: External Cron (Free)

Use [cron-job.org](https://cron-job.org):
1. Sign up (free)
2. Create new cron job
3. URL: `https://yourdomain.com/api/scrape`
4. Schedule: Every hour
5. Optional: Add header `Authorization: Bearer YOUR_CRON_SECRET`

### Option C: Server Cron (VPS only)

```bash
crontab -e
# Add:
0 * * * * curl -X POST https://yourdomain.com/api/scrape
```

---

## Post-Deploy Checklist

- [ ] Homepage loads correctly
- [ ] Dark mode works
- [ ] Scrape endpoint returns articles
- [ ] Article pages work
- [ ] Category pages work
- [ ] Deals page loads
- [ ] Mobile responsive
- [ ] Set up cron job for scraping
- [ ] Apply for Google AdSense (need content first)
- [ ] Submit sitemap to Google Search Console

---

## Troubleshooting

### "No database connection string"
- Check `DATABASE_URL` is set correctly
- Ensure Neon allows connections from your IP (Vercel IPs if on Vercel)

### Build fails
- Check Node.js version: `node -v` (need 18+)
- Clear `.next` folder: `rm -rf .next` and rebuild

### Articles not appearing
- Run scrape manually: `curl -X POST /api/scrape`
- Check database has data: Query in Neon console

---

## Next Steps

1. **Customize RSS sources** → Edit `src/lib/scraper/index.ts`
2. **Add your logo/branding** → Update `src/components/navbar.tsx`
3. **Apply for AdSense** → Need 20-30 articles first
4. **Set up analytics** → Add Google Analytics script

---

**Need help?** Check the README.md or ask me.
