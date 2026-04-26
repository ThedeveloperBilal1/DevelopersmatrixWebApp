#!/bin/bash

# DevelopersMatrix - Automated Blog Generation Script
# Run this daily to generate new blog posts

echo "🚀 Starting blog automation..."

# Navigate to project directory
cd /home/z/my-project

# Generate a random category
CATEGORIES=("Gaming" "Technology" "Politics" "World News" "Entertainment" "Career" "AI" "Science" "Health")
RANDOM_INDEX=$((RANDOM % ${#CATEGORIES[@]}))
CATEGORY=${CATEGORIES[$RANDOM_INDEX]}

echo "📝 Generating blog for category: $CATEGORY"

# Call the blog automation API
RESPONSE=$(curl -s "http://localhost:3000/api/blog-automation?secret=dm-auto-2026&category=$CATEGORY")

echo "Response: $RESPONSE"

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Blog post generated successfully!"
    
    # Git operations for auto-deploy
    git add src/data/generated-blogs.json
    git commit -m "feat: Add automated blog post - $(date '+%Y-%m-%d')"
    git push origin main
    
    echo "🚀 Changes pushed to GitHub - Vercel will auto-deploy!"
else
    echo "❌ Failed to generate blog post"
    echo "$RESPONSE"
fi
