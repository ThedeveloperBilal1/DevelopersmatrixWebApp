# Deployment to Hostinger VPS

## Quick Deploy Instructions

### 1. Initial VPS Setup (One-time)

SSH into your VPS and run:
```bash
sudo bash setup-vps.sh
```

### 2. Deploy Your Application

From your local machine:
```bash
# Sync files to VPS
rsync -avz --exclude 'node_modules' --exclude '.next' \
  /home/z/my-project/ root@your-vps-ip:/var/www/developersmatrix/

# SSH and build
ssh root@your-vps-ip
cd /var/www/developersmatrix
bun install
bun run build
pm2 start ecosystem.config.js
pm2 save
```

### 3. Configure Domain

1. Copy Nginx config:
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/developersmatrix
ln -s /etc/nginx/sites-available/developersmatrix /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

2. Get SSL:
```bash
certbot --nginx -d developersmatrix.space.z.ai
```

### 4. Updates

From your local machine:
```bash
rsync -avz --exclude 'node_modules' --exclude '.next' \
  /home/z/my-project/ root@your-vps-ip:/var/www/developersmatrix/

ssh root@your-vps-ip "cd /var/www/developersmatrix && bun install && bun run build && pm2 restart developersmatrix"
```

## Useful Commands

| Task | Command |
|------|---------|
| Check status | `pm2 status` |
| View logs | `pm2 logs developersmatrix` |
| Restart | `pm2 restart developersmatrix` |
| Stop | `pm2 stop developersmatrix` |
| Nginx logs | `tail -f /var/log/nginx/error.log` |

## Files in this folder

| File | Purpose |
|------|---------|
| `hostinger-setup.md` | Detailed setup guide |
| `setup-vps.sh` | Automated VPS setup script |
| `nginx.conf` | Nginx reverse proxy configuration |
| `deploy.sh` | Quick deployment script |
