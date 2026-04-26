"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare, Search, Plus, Users, ThumbsUp, ThumbsDown, Eye, Clock,
  Sparkles, ChevronDown, ChevronUp, Filter, TrendingUp, MessageCircle,
  Send, Trash2, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Thread, Reply, ThreadCategory, CATEGORIES, CATEGORY_COLORS,
  generateAnonymousName, formatRelativeTime
} from '@/types/community';

const STORAGE_KEY = 'developersmatrix-community-threads';

// Sample threads for initial data
const sampleThreads: Thread[] = [
  {
    id: '1',
    title: 'How do I transition from frontend to full-stack development?',
    content: 'I have 3 years of experience in React and want to expand to backend. What technologies should I learn first? Should I start with Node.js, Python, or Go? Any recommendations for good learning resources?',
    author: 'CreativeDeveloper42',
    category: 'Career',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    upvotes: 42,
    downvotes: 3,
    replies: [
      {
        id: 'r1',
        content: 'Start with Node.js since you already know JavaScript. Express.js is a great starting point. Then learn databases like PostgreSQL and MongoDB.',
        author: 'TechWizard100',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        upvotes: 15,
        downvotes: 1
      },
      {
        id: 'r2',
        content: 'I made the transition last year! Would recommend learning about APIs, authentication, and database design. Build a few full projects to practice.',
        author: 'CodeNinja77',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        upvotes: 8,
        downvotes: 0
      }
    ],
    views: 1250
  },
  {
    id: '2',
    title: 'What are the best practices for AI integration in production?',
    content: 'Looking for guidance on deploying LLM-based features in a production environment. How do you handle rate limiting, cost optimization, and error handling? What about monitoring and fallbacks?',
    author: 'DigitalArchitect99',
    category: 'AI',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    upvotes: 67,
    downvotes: 2,
    replies: [
      {
        id: 'r3',
        content: 'Implement caching aggressively! Use semantic caching for similar queries. Also set up proper token counting and alerts.',
        author: 'MightyEngineer55',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        upvotes: 25,
        downvotes: 1
      }
    ],
    views: 2100
  },
  {
    id: '3',
    title: 'Best mechanical keyboard for coding in 2024?',
    content: 'Looking to upgrade my setup. What are your recommendations for mechanical keyboards optimized for programming? Preferably with Cherry MX switches and good build quality.',
    author: 'PixelMaster3000',
    category: 'Technology',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    upvotes: 34,
    downvotes: 1,
    replies: [],
    views: 890
  },
  {
    id: '4',
    title: 'GTA 6 system requirements discussion',
    content: 'With the upcoming release, what specs do you think we\'ll need for 60fps at 1440p? Let\'s discuss predictions and prepare our builds!',
    author: 'CosmicExplorer88',
    category: 'Gaming',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    upvotes: 89,
    downvotes: 4,
    replies: [
      {
        id: 'r4',
        content: 'Based on current trends, I\'d say RTX 4070 or RX 7800 XT minimum for 1440p 60fps. 32GB RAM would be safe.',
        author: 'WisePioneer11',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        upvotes: 45,
        downvotes: 2
      }
    ],
    views: 3400
  },
  {
    id: '5',
    title: 'Index fund vs ETF for long-term investing?',
    content: 'I\'m new to investing and trying to decide between index funds and ETFs. What are the pros and cons of each for a long-term passive investment strategy?',
    author: 'NobleInnovator22',
    category: 'Finance',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    upvotes: 28,
    downvotes: 0,
    replies: [],
    views: 670
  }
];

export default function CommunityClient() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ThreadCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'top' | 'views'>('latest');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const [newThread, setNewThread] = useState({ title: '', content: '', category: 'General' as ThreadCategory });
  const [newReply, setNewReply] = useState('');
  const [userAuthor] = useState(generateAnonymousName);

  // Load threads from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setThreads(JSON.parse(stored));
      } catch {
        setThreads(sampleThreads);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleThreads));
      }
    } else {
      setThreads(sampleThreads);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleThreads));
    }
  }, []);

  // Save threads to localStorage whenever they change
  useEffect(() => {
    if (threads.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    }
  }, [threads]);

  // Filter and sort threads
  const filteredThreads = useMemo(() => {
    let result = [...threads];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t => t.title.toLowerCase().includes(query) ||
             t.content.toLowerCase().includes(query) ||
             t.author.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'top':
        result.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'views':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [threads, selectedCategory, searchQuery, sortBy]);

  // Calculate stats
  const stats = useMemo(() => ({
    totalThreads: threads.length,
    totalReplies: threads.reduce((acc, t) => acc + t.replies.length, 0),
    totalViews: threads.reduce((acc, t) => acc + t.views, 0),
    categories: CATEGORIES.map(cat => ({
      name: cat,
      count: threads.filter(t => t.category === cat).length
    }))
  }), [threads]);

  // Create new thread
  const handleCreateThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim()) return;

    const thread: Thread = {
      id: Date.now().toString(),
      title: newThread.title.trim(),
      content: newThread.content.trim(),
      author: userAuthor,
      category: newThread.category,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
      views: 0
    };

    setThreads(prev => [thread, ...prev]);
    setNewThread({ title: '', content: '', category: 'General' });
    setIsCreateDialogOpen(false);
  };

  // Vote on thread
  const handleThreadVote = (threadId: string, voteType: 'up' | 'down') => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          upvotes: voteType === 'up' ? t.upvotes + 1 : t.upvotes,
          downvotes: voteType === 'down' ? t.downvotes + 1 : t.downvotes
        };
      }
      return t;
    }));
  };

  // Vote on reply
  const handleReplyVote = (threadId: string, replyId: string, voteType: 'up' | 'down') => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: t.replies.map(r => {
            if (r.id === replyId) {
              return {
                ...r,
                upvotes: voteType === 'up' ? r.upvotes + 1 : r.upvotes,
                downvotes: voteType === 'down' ? r.downvotes + 1 : r.downvotes
              };
            }
            return r;
          })
        };
      }
      return t;
    }));
  };

  // Add reply
  const handleAddReply = (threadId: string, replyContent: string) => {
    if (!replyContent.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      content: replyContent.trim(),
      author: userAuthor,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0
    };

    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, replies: [...t.replies, reply] };
      }
      return t;
    }));

    setNewReply('');
  };

  // Delete thread
  const handleDeleteThread = (threadId: string) => {
    setThreads(prev => prev.filter(t => t.id !== threadId));
    if (expandedThread === threadId) {
      setExpandedThread(null);
    }
  };

  // View thread
  const handleViewThread = (threadId: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, views: t.views + 1 };
      }
      return t;
    }));
    setExpandedThread(threadId);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 px-4 py-2 border-violet-500/30 bg-violet-500/10">
            <Users className="w-3.5 h-3.5 mr-2 text-violet-500" />
            <span className="text-violet-600 dark:text-violet-400">Growing Community</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Community <span className="gradient-text">Threads</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join discussions, share knowledge, and connect with developers, entrepreneurs, 
            and tech professionals worldwide.
          </p>

          {/* Search and Create */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Thread
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.totalThreads}</p>
              <p className="text-sm text-muted-foreground">Threads</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.totalReplies}</p>
              <p className="text-sm text-muted-foreground">Replies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{CATEGORIES.length}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Threads List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <Button
                variant={sortBy === 'latest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('latest')}
                className={sortBy === 'latest' ? 'bg-violet-500 hover:bg-violet-600' : ''}
              >
                <Clock className="w-3 h-3 mr-1" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'top' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('top')}
                className={sortBy === 'top' ? 'bg-violet-500 hover:bg-violet-600' : ''}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Top Voted
              </Button>
              <Button
                variant={sortBy === 'views' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('views')}
                className={sortBy === 'views' ? 'bg-violet-500 hover:bg-violet-600' : ''}
              >
                <Eye className="w-3 h-3 mr-1" />
                Most Viewed
              </Button>

              <div className="ml-auto">
                <Select
                  value={selectedCategory}
                  onValueChange={(v) => setSelectedCategory(v as ThreadCategory | 'all')}
                >
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Threads */}
            {filteredThreads.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground mb-4">No threads found</p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    variant="outline"
                    className="border-violet-500/30 text-violet-600 hover:bg-violet-500/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start a new thread
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredThreads.map(thread => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  isExpanded={expandedThread === thread.id}
                  onView={() => handleViewThread(thread.id)}
                  onCollapse={() => setExpandedThread(null)}
                  onVote={(type) => handleThreadVote(thread.id, type)}
                  onReplyVote={(replyId, type) => handleReplyVote(thread.id, replyId, type)}
                  onAddReply={(content) => handleAddReply(thread.id, content)}
                  onDelete={() => handleDeleteThread(thread.id)}
                  userAuthor={userAuthor}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Thread CTA */}
            <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-violet-500" />
                  Start a Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Share your thoughts, ask questions, or help others in the community.
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Thread
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-500" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-violet-500/10 text-violet-600'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <Badge className={CATEGORY_COLORS[cat.name]}>
                        {cat.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{cat.count}</span>
                    </button>
                  ))}
                  <Separator className="my-2" />
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-center p-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === 'all'
                        ? 'bg-violet-500/10 text-violet-600'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    Show All
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTopContributors(threads).map((user, index) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-xs font-bold">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.points} points</p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Thread Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Thread</DialogTitle>
            <DialogDescription>
              Start a discussion with the community. You&apos;ll post as <span className="font-medium text-violet-600">{userAuthor}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What's your question or topic?"
                value={newThread.title}
                onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={newThread.category}
                onValueChange={(v) => setNewThread(prev => ({ ...prev, category: v as ThreadCategory }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Describe your question or topic in detail..."
                value={newThread.content}
                onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateThread}
              disabled={!newThread.title.trim() || !newThread.content.trim()}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Create Thread
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Thread Card Component
interface ThreadCardProps {
  thread: Thread;
  isExpanded: boolean;
  onView: () => void;
  onCollapse: () => void;
  onVote: (type: 'up' | 'down') => void;
  onReplyVote: (replyId: string, type: 'up' | 'down') => void;
  onAddReply: (content: string) => void;
  onDelete: () => void;
  userAuthor: string;
}

function ThreadCard({
  thread, isExpanded, onView, onCollapse, onVote, onReplyVote, onAddReply, onDelete, userAuthor
}: ThreadCardProps) {
  const [replyInput, setReplyInput] = useState('');
  const score = thread.upvotes - thread.downvotes;

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? 'border-violet-500/50 shadow-lg' : 'hover:border-violet-500/30'}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex gap-4">
          {/* Vote Column */}
          <div className="hidden sm:flex flex-col items-center gap-1 min-w-[60px]">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
              onClick={() => onVote('up')}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <span className={`text-lg font-bold ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : ''}`}>
              {score}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
              onClick={() => onVote('down')}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-2">
              <Badge className={CATEGORY_COLORS[thread.category]}>
                {thread.category}
              </Badge>
              {thread.replies.length > 0 && (
                <Badge variant="outline" className="border-green-500/50 text-green-500">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-semibold text-lg mb-2 cursor-pointer hover:text-violet-600 transition-colors"
              onClick={isExpanded ? onCollapse : onView}
            >
              {thread.title}
            </h3>

            {/* Content Preview or Full Content */}
            <p className={`text-sm text-muted-foreground mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {thread.content}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>by <span className="text-violet-600 dark:text-violet-400">{thread.author}</span></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatRelativeTime(thread.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {thread.views}
                </span>
              </div>

              {/* Mobile Vote Buttons */}
              <div className="flex items-center gap-2 sm:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-muted-foreground hover:text-green-500"
                  onClick={() => onVote('up')}
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {thread.upvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-muted-foreground hover:text-red-500"
                  onClick={() => onVote('down')}
                >
                  <ThumbsDown className="w-3 h-3 mr-1" />
                  {thread.downvotes}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded View - Replies */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            {/* Replies */}
            {thread.replies.length > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-violet-500" />
                  Replies ({thread.replies.length})
                </h4>
                <ScrollArea className="max-h-80">
                  <div className="space-y-3 pr-4">
                    {thread.replies.map(reply => (
                      <ReplyCard
                        key={reply.id}
                        reply={reply}
                        onVote={(type) => onReplyVote(reply.id, type)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Reply Input */}
            <div className="space-y-2">
              <Textarea
                placeholder={`Reply as ${userAuthor}...`}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  onClick={onDelete}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onCollapse}
                  >
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Collapse
                  </Button>
                  <Button
                    size="sm"
                    disabled={!replyInput.trim()}
                    onClick={() => {
                      onAddReply(replyInput);
                      setReplyInput('');
                    }}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expand Button */}
        {!isExpanded && (
          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="border-violet-500/30">
                <Sparkles className="w-3 h-3 mr-1 text-violet-500" />
                {thread.replies.length} replies
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onView}
              className="text-violet-600 hover:text-violet-700 hover:bg-violet-500/10"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              View & Reply
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Reply Card Component
interface ReplyCardProps {
  reply: Reply;
  onVote: (type: 'up' | 'down') => void;
}

function ReplyCard({ reply, onVote }: ReplyCardProps) {
  const score = reply.upvotes - reply.downvotes;

  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <div className="flex gap-3">
        {/* Vote */}
        <div className="flex flex-col items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-green-500"
            onClick={() => onVote('up')}
          >
            <ThumbsUp className="w-3 h-3" />
          </Button>
          <span className={`text-xs font-medium ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : ''}`}>
            {score}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-red-500"
            onClick={() => onVote('down')}
          >
            <ThumbsDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">{reply.author}</span>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(reply.createdAt)}</span>
          </div>
          <p className="text-sm text-muted-foreground">{reply.content}</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get top contributors
function getTopContributors(threads: Thread[]): { name: string; points: number }[] {
  const contributorMap = new Map<string, number>();

  threads.forEach(thread => {
    // Thread author gets points for thread + votes
    const threadPoints = 10 + thread.upvotes - thread.downvotes;
    contributorMap.set(thread.author, (contributorMap.get(thread.author) || 0) + threadPoints);

    // Reply authors get points for replies + votes
    thread.replies.forEach(reply => {
      const replyPoints = 5 + reply.upvotes - reply.downvotes;
      contributorMap.set(reply.author, (contributorMap.get(reply.author) || 0) + replyPoints);
    });
  });

  return Array.from(contributorMap.entries())
    .map(([name, points]) => ({ name, points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);
}
