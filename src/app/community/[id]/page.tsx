import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Clock, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SidebarAd, InContentAd } from "@/components/ads/AdBanner";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Question - Community Q&A",
  description: "View question and answers from the community.",
};

const questionData = {
  id: '1',
  title: 'How do I transition from frontend to full-stack development?',
  content: 'I have 3 years of experience in React and want to expand to backend development. What technologies should I learn first? Should I focus on Node.js since I already know JavaScript, or should I learn a different backend language like Python or Go? Also, what about databases - should I start with SQL or NoSQL?',
  author: 'Alex Developer',
  tags: ['Career', 'Full-Stack', 'Learning'],
  createdAt: '2024-01-15',
  views: 1250,
  votes: 42,
  answers: [
    {
      id: '1',
      content: `Great question! Since you already have a strong React background, I'd recommend starting with Node.js. Here's why:

1. **JavaScript Everywhere**: You can use the same language for both frontend and backend.
2. **Popular Frameworks**: Express.js is minimal and great for learning.
3. **Database Choice**: Start with PostgreSQL for relational data.

**Learning Path:**
- Week 1-2: Node.js basics, Express.js fundamentals
- Week 3-4: RESTful API design, authentication
- Week 5-6: PostgreSQL basics, ORM (Prisma)
- Week 7-8: Build a full-stack project`,
      author: 'Sarah Engineer',
      isAiGenerated: false,
      createdAt: '2024-01-15',
      votes: 28
    },
    {
      id: '2',
      content: `**AI-Generated Response:**

Transitioning from frontend to full-stack is an excellent career move! Here's a structured approach:

1. **Start with Node.js** - Since you know JavaScript, this is the natural choice.
2. **Learn Express.js** - Most popular Node.js framework for APIs.
3. **Database Skills:** PostgreSQL for relational, MongoDB for documents.
4. **Essential Concepts:** REST API design, Authentication, Deployment.

**Timeline:** With consistent effort (1-2 hours daily), you can become proficient in 3-6 months.`,
      author: 'AI Assistant',
      isAiGenerated: true,
      createdAt: '2024-01-15',
      votes: 15
    }
  ]
};

export default function QuestionPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: siteConfig.url },
        { name: "Community", url: `${siteConfig.url}/community` },
        { name: questionData.title, url: `${siteConfig.url}/community/${questionData.id}` }
      ]} />

      <div className="min-h-screen bg-muted/20">
        <section className="bg-background border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/community" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Questions
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{questionData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{questionData.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{questionData.createdAt}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{questionData.views} views</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {questionData.tags.map(tag => (<Badge key={tag} variant="secondary">{tag}</Badge>))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="outline" size="sm"><ThumbsUp className="w-4 h-4" /></Button>
                      <span className="font-bold">{questionData.votes}</span>
                    </div>
                    <p className="text-muted-foreground flex-1">{questionData.content}</p>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-xl font-semibold">{questionData.answers.length} Answers</h2>
              {questionData.answers.map(answer => (
                <Card key={answer.id} className={answer.isAiGenerated ? 'border-violet-500/30' : ''}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" size="sm"><ThumbsUp className="w-4 h-4" /></Button>
                        <span className="font-bold">{answer.votes}</span>
                      </div>
                      <div className="flex-1">
                        {answer.isAiGenerated && (
                          <Badge className="mb-3 bg-violet-500/10 text-violet-500 border-violet-500/20">
                            <Sparkles className="w-3 h-3 mr-1" />AI-Generated
                          </Badge>
                        )}
                        <p className="text-muted-foreground whitespace-pre-line">{answer.content}</p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t text-sm text-muted-foreground">
                          <span>Answered by <span className="font-medium text-foreground">{answer.author}</span></span>
                          <span>•</span>
                          <span>{answer.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <InContentAd />

              <Card>
                <CardHeader><CardTitle className="text-lg">Your Answer</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Textarea placeholder="Write your answer here..." rows={6} />
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">Post Your Answer</Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SidebarAd />
              <Card>
                <CardHeader><CardTitle className="text-base">Related Questions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/community/2"><p className="text-sm hover:text-violet-600">Best practices for AI integration in production?</p></Link>
                  <Link href="/community/3"><p className="text-sm hover:text-violet-600">How to negotiate salary for senior developer?</p></Link>
                </CardContent>
              </Card>
              <SidebarAd />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
