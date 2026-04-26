import { cn } from '@/lib/utils';

interface AdBannerProps {
  type: 'header' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

const adSizes = {
  header: { width: 728, height: 90, label: '728x90' },
  sidebar: { width: 300, height: 250, label: '300x250' },
  'in-content': { width: '100%', height: 280, label: 'Responsive' },
  footer: { width: 728, height: 90, label: '728x90' }
};

export function AdBanner({ type, className }: AdBannerProps) {
  const size = adSizes[type];

  return (
    <div
      className={cn(
        'bg-muted/50 rounded-lg flex items-center justify-center border border-border/50',
        className
      )}
      style={{
        width: typeof size.width === 'number' ? `${size.width}px` : size.width,
        height: `${size.height}px`,
        maxWidth: '100%'
      }}
    >
      <div className="text-center">
        <p className="text-xs text-muted-foreground/50 uppercase tracking-wider">
          Advertisement
        </p>
        <p className="text-xs text-muted-foreground/30 mt-1">
          {size.label}
        </p>
      </div>
    </div>
  );
}

export function HeaderAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <AdBanner type="header" />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="w-full flex justify-center">
      <AdBanner type="sidebar" />
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="w-full flex justify-center py-6">
      <AdBanner type="in-content" className="max-w-[800px]" />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <AdBanner type="footer" />
    </div>
  );
}
