export interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  category: ThreadCategory;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies: Reply[];
  views: number;
}

export type ThreadCategory = 'General' | 'Career' | 'Technology' | 'Gaming' | 'AI' | 'Finance';

export const CATEGORIES: ThreadCategory[] = ['General', 'Career', 'Technology', 'Gaming', 'AI', 'Finance'];

export const CATEGORY_COLORS: Record<ThreadCategory, string> = {
  General: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30',
  Career: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  Technology: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  Gaming: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
  AI: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
  Finance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
};

// Generate a random anonymous name
export function generateAnonymousName(): string {
  const adjectives = [
    'Creative', 'Brilliant', 'Swift', 'Clever', 'Wise', 'Noble', 'Epic', 'Mighty',
    'Silent', 'Cosmic', 'Digital', 'Cyber', 'Tech', 'Code', 'Data', 'Pixel'
  ];
  const nouns = [
    'Developer', 'Coder', 'Hacker', 'Ninja', 'Wizard', 'Master', 'Guru', 'Pioneer',
    'Explorer', 'Innovator', 'Architect', 'Engineer', 'Designer', 'Builder', 'Creator'
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 999);
  return `${adj}${noun}${num}`;
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
