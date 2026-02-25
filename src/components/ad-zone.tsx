'use client';

interface AdZoneProps {
  slot: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
}

export function AdZone({ slot, format = 'rectangle', responsive = true }: AdZoneProps) {
  const getAdDimensions = () => {
    switch (format) {
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'vertical':
        return { width: '300px', height: '600px' };
      case 'rectangle':
      default:
        return { width: '300px', height: '250px' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <div className="flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: responsive ? '100%' : dimensions.width,
          height: dimensions.height,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-xxxxxxxxxxxxxxxx'}
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

export function AdScriptLoader() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
      crossOrigin="anonymous"
    />
  );
}
