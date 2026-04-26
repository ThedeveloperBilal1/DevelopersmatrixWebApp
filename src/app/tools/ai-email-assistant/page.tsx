import { Metadata } from 'next';
import AIEmailAssistantClient from './AIEmailAssistantClient';

export const metadata: Metadata = {
  title: "AI Email Assistant | DevelopersMatrix",
  description: "Draft professional emails in seconds. Rewrite emails to sound more professional, adjust tone, and generate quick responses with AI assistance.",
  openGraph: {
    title: "AI Email Assistant",
    description: "AI-powered email drafting, rewriting, and tone adjustment.",
  },
};

export default function AIEmailAssistantPage() {
  return <AIEmailAssistantClient />;
}
