'use client';

interface FeaturedImageProps {
  src: string;
  alt: string;
}

export function FeaturedImage({ src, alt }: FeaturedImageProps) {
  return (
    <div className="aspect-video relative overflow-hidden rounded-xl mb-8">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center';
          fallback.innerHTML = '<span class="text-6xl">📰</span>';
          e.currentTarget.parentElement?.appendChild(fallback);
        }}
      />
    </div>
  );
}
