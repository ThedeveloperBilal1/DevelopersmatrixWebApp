#!/bin/bash

# DevelopersMatrix Deployment Script for Hostinger VPS
# Usage: ./deploy.sh [--full]

set -e

APP_DIR="/var/www/developersmatrix"
LOG_FILE="/var/log/developersmatrix-deploy.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

log "Starting deployment..."

cd $APP_DIR

# Pull latest code
log "Pulling latest code..."
git fetch origin
git reset --hard origin/main

# Install dependencies
log "Installing dependencies..."
bun install --frozen-lockfile

# Build application
log "Building application..."
bun run build

# Restart PM2
log "Restarting application..."
pm2 restart developersmatrix

# Check status
pm2 status

log "Deployment complete!"
