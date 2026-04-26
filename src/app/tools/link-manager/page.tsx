import { Metadata } from 'next';
import LinkManagerClient from './LinkManagerClient';

export const metadata: Metadata = {
  title: "Link Manager & Smart Bio | DevelopersMatrix",
  description: "Create custom branded short links with click analytics, QR codes, and auto-updating bio pages that sync with your YouTube and Instagram content.",
  openGraph: {
    title: "Link Manager & Smart Bio Tool",
    description: "Branded short links with analytics, QR codes, and smart bio pages.",
  },
};

export default function LinkManagerPage() {
  return <LinkManagerClient />;
}
