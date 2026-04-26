'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Rss } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/shared/Cards';
import { InContentAd } from '@/components/ads/AdBanner';
import { blogPosts, blogCategories } from '@/data/blog';

const POSTS_PER_PAGE = 6;

interface BlogClientProps {
  initialPosts: typeof blogPosts;
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE + 1); // +1 for featured post
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let result = [...initialPosts];
    
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1, visiblePosts);
  const hasMore = visiblePosts < filteredPosts.length;

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length + 1));
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setVisiblePosts(POSTS_PER_PAGE + 1);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Blog</span> & Insights
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Expert insights, practical guides, and industry analysis to help you 
            navigate your career and stay ahead in tech.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisiblePosts(POSTS_PER_PAGE + 1);
              }}
              className="pl-9 sm:pl-10 h-11 sm:h-12 bg-background/50 backdrop-blur-sm min-h-[44px]"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Column */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              <Badge 
                variant={selectedCategory === null ? 'default' : 'outline'}
                className={`cursor-pointer min-h-[36px] px-4 ${selectedCategory === null ? 'bg-violet-500 hover:bg-violet-600' : 'hover:bg-violet-500/10 hover:text-violet-600 hover:border-violet-500/30'}`}
                onClick={() => handleCategoryClick(null)}
              >
                All Posts
              </Badge>
              {blogCategories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer min-h-[36px] px-4 ${selectedCategory === category ? 'bg-violet-500 hover:bg-violet-600' : 'hover:bg-violet-500/10 hover:text-violet-600 hover:border-violet-500/30'}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="block mb-6 sm:mb-8">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto relative overflow-hidden">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                        <span className="text-4xl">📰</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3">{featuredPost.category}</Badge>
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {hasMore && filteredPosts.length > 0 && (
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={loadMore}
                  className="min-h-[44px] px-8"
                >
                  Load More Articles ({filteredPosts.length - visiblePosts + 1} remaining)
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Rss className="w-4 h-4 text-violet-500" />
                  Subscribe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Get the latest articles delivered to your inbox.
                </p>
                <Input placeholder="Your email" className="min-h-[44px]" />
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 min-h-[44px]">
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {blogCategories.map(category => {
                    const count = initialPosts.filter(p => p.category === category).length;
                    return (
                      <button 
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left"
                      >
                        <span className="text-sm">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Career', 'Productivity', 'JavaScript', 'Startup', 'Finance', 'Remote Work', 'Skills', 'Gaming', 'Politics', 'Technology'].map(tag => (
                    <Badge 
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-violet-500/10 hover:text-violet-600 min-h-[32px]"
                      onClick={() => {
                        setSearchQuery(tag);
                        setSelectedCategory(null);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <InContentAd />
          </div>
        </div>
      </div>
    </>
  );
}
