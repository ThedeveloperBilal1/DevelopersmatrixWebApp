import { Metadata } from 'next';
import AIPromptLibraryClient from './AIPromptLibraryClient';

export const metadata: Metadata = {
  title: "AI Prompt Library & Playground | DevelopersMatrix",
  description: "Explore 500+ curated AI prompts for ChatGPT, Claude, Midjourney & more. Test prompts in our sandbox and discover effective prompt engineering techniques.",
  openGraph: {
    title: "AI Prompt Library & Playground",
    description: "Curated collection of 500+ AI prompts with sandbox testing and ratings.",
  },
};

export default function AIPromptLibraryPage() {
  return <AIPromptLibraryClient />;
}
