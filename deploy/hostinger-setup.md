# DevelopersMatrix - Hostinger Deployment Guide

## Prerequisites

1. **Hostinger VPS or Cloud Hosting** (required for Node.js apps)
   - Shared hosting won't work for Next.js with API routes
   - Minimum: 2GB RAM, 1 vCPU, 20GB storage

2. **Domain configured** (developersmatrix.space.z.ai or your custom domain)

---

## Step 1: Connect to Your VPS via SSH

```bash
ssh root@your-vps-ip
```

---

## Step 2: Install Required Software

### Install Node.js 20.x
```bash
# For Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# For CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

### Install Bun (faster than npm)
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

### Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### Install Nginx
```bash
# Ubuntu/Debian
sudo apt install -y nginx

# CentOS/RHEL
sudo yum install -y nginx
```

---

## Step 3: Create Application Directory

```bash
sudo mkdir -p /var/www/developersmatrix
sudo chown -R $USER:$USER /var/www/developersmatrix
cd /var/www/developersmatrix
```

---

## Step 4: Upload Your Application

### Option A: Using Git (Recommended)
```bash
git clone https://github.com/your-username/developersmatrix.git .
```

### Option B: Using SCP from your local machine
```bash
scp -r /home/z/my-project/* root@your-vps-ip:/var/www/developersmatrix/
```

### Option C: Using rsync (faster for updates)
```bash
rsync -avz --exclude 'node_modules' --exclude '.next' \
  /home/z/my-project/ root@your-vps-ip:/var/www/developersmatrix/
```

---

## Step 5: Install Dependencies and Build

```bash
cd /var/www/developersmatrix

# Install dependencies
bun install

# Build for production
bun run build
```

---

## Step 6: Set Up Environment Variables

```bash
nano .env
```

Add your environment variables:
```
NODE_ENV=production
# Add any API keys you need
```

---

## Step 7: Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

---

## Step 8: Configure Nginx Reverse Proxy

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/developersmatrix
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name developersmatrix.space.z.ai www.developersmatrix.space.z.ai;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    client_max_body_size 50M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/developersmatrix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Step 9: Set Up SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d developersmatrix.space.z.ai
sudo systemctl enable certbot.timer
```

---

## Step 10: Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

---

## Quick Deploy Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs developersmatrix

# Restart app
pm2 restart developersmatrix

# Update app
cd /var/www/developersmatrix && git pull && bun install && bun run build && pm2 restart developersmatrix
```
