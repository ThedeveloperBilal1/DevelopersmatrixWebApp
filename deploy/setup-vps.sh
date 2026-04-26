#!/bin/bash

# Quick Setup Script for DevelopersMatrix on Hostinger VPS
# Run as root: sudo bash setup-vps.sh

set -e

echo "================================================"
echo "DevelopersMatrix VPS Setup Script"
echo "================================================"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# Update system
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20
echo "[2/8] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Bun
echo "[3/8] Installing Bun..."
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Install PM2
echo "[4/8] Installing PM2..."
npm install -g pm2

# Install Nginx
echo "[5/8] Installing Nginx..."
apt install -y nginx

# Install Certbot
echo "[6/8] Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx

# Create application directory
echo "[7/8] Creating application directory..."
mkdir -p /var/www/developersmatrix
mkdir -p /var/www/developersmatrix/logs

# Configure firewall
echo "[8/8] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "================================================"
echo "Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Upload your application to /var/www/developersmatrix"
echo "   rsync -avz --exclude 'node_modules' --exclude '.next' \\"
echo "     /home/z/my-project/ root@your-vps-ip:/var/www/developersmatrix/"
echo ""
echo "2. Install dependencies and build:"
echo "   cd /var/www/developersmatrix"
echo "   bun install"
echo "   bun run build"
echo ""
echo "3. Start the application:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo "4. Configure Nginx:"
echo "   cp deploy/nginx.conf /etc/nginx/sites-available/developersmatrix"
echo "   ln -s /etc/nginx/sites-available/developersmatrix /etc/nginx/sites-enabled/"
echo "   nginx -t && systemctl restart nginx"
echo ""
echo "5. Get SSL certificate:"
echo "   certbot --nginx -d developersmatrix.space.z.ai"
echo ""
