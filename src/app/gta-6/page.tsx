import { Metadata } from 'next';
import GTA6Client from './GTA6Client';

export const metadata: Metadata = {
  title: "GTA 6 - System Requirements, Release Date & Latest News | DevelopersMatrix",
  description: "Check if your PC can run GTA 6. Get the latest system requirements, release date, features, and real-time news about Grand Theft Auto VI.",
  openGraph: {
    title: "GTA 6 - System Requirements & Latest News",
    description: "Everything you need to know about GTA 6: PC requirements, release date, and features.",
    images: ['/og-gta6.png'],
  },
};

export default function GTA6Page() {
  return <GTA6Client />;
}
