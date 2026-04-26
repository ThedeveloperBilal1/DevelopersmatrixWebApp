# Deploy DevelopersMatrix to Vercel (FREE)

## Why Vercel?
- Created by the makers of Next.js
- Best performance for Next.js apps
- FREE tier includes:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - Custom domain

## Steps to Deploy

### 1. Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
gh repo create developersmatrix --public --source=. --push
```

### 2. Connect to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings

### 3. Configure Environment Variables
In Vercel dashboard, add your `.env` variables:
- Any API keys you have

### 4. Deploy
Click "Deploy" - Vercel handles everything!

### 5. Add Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add: developersmatrix.com
3. Update DNS records at Hostinger:
   - A record → 76.76.21.21
   - CNAME www → cname.vercel-dns.com

## Alternative: Deploy Command
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel

# Follow prompts, then for production:
vercel --prod
```

## After Deployment
- Your site will be live at: your-project.vercel.app
- Auto-deploys on every GitHub push
- Preview deployments for pull requests

## Cost: $0/month
Perfect for your website!
