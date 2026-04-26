'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send, 
  Copy, 
  Check,
  RefreshCw,
  Wand2,
  FileText,
  MessageSquare,
  Sparkles,
  ThumbsUp,
  Briefcase,
  Heart,
  AlertCircle,
  Smile
} from 'lucide-react';

type ToneType = 'professional' | 'friendly' | 'formal' | 'casual' | 'persuasive' | 'empathetic';
type EmailMode = 'draft' | 'rewrite' | 'reply' | 'tone';

interface EmailResult {
  subject: string;
  body: string;
  tone: string;
  suggestions?: string[];
}

const tones: { id: ToneType; name: string; icon: React.ReactNode; description: string }[] = [
  { id: 'professional', name: 'Professional', icon: <Briefcase className="w-4 h-4" />, description: 'Business-appropriate, clear, and concise' },
  { id: 'friendly', name: 'Friendly', icon: <Smile className="w-4 h-4" />, description: 'Warm and approachable' },
  { id: 'formal', name: 'Formal', icon: <FileText className="w-4 h-4" />, description: 'Official and respectful' },
  { id: 'casual', name: 'Casual', icon: <MessageSquare className="w-4 h-4" />, description: 'Relaxed and conversational' },
  { id: 'persuasive', name: 'Persuasive', icon: <ThumbsUp className="w-4 h-4" />, description: 'Compelling and action-oriented' },
  { id: 'empathetic', name: 'Empathetic', icon: <Heart className="w-4 h-4" />, description: 'Understanding and supportive' },
];

const emailTemplates = [
  {
    name: 'Meeting Request',
    category: 'business',
    preview: 'Request a meeting with a colleague or client'
  },
  {
    name: 'Follow Up',
    category: 'business',
    preview: 'Follow up on a previous conversation or meeting'
  },
  {
    name: 'Thank You',
    category: 'personal',
    preview: 'Express gratitude for an opportunity or favor'
  },
  {
    name: 'Job Application',
    category: 'career',
    preview: 'Apply for a position with a compelling email'
  },
  {
    name: 'Out of Office',
    category: 'business',
    preview: 'Professional out of office auto-reply'
  },
  {
    name: 'Introduction',
    category: 'networking',
    preview: 'Introduce yourself to a new contact'
  },
  {
    name: 'Request for Information',
    category: 'business',
    preview: 'Ask for information professionally'
  },
  {
    name: 'Apology',
    category: 'personal',
    preview: 'Sincere apology for a mistake or delay'
  },
];

export default function AIEmailAssistantClient() {
  const [activeMode, setActiveMode] = useState<EmailMode>('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Draft mode state
  const [draftInput, setDraftInput] = useState({
    purpose: '',
    recipient: '',
    keyPoints: '',
    tone: 'professional' as ToneType
  });
  
  // Rewrite mode state
  const [rewriteInput, setRewriteInput] = useState({
    originalEmail: '',
    improvements: [] as string[],
    tone: 'professional' as ToneType
  });
  
  // Reply mode state
  const [replyInput, setReplyInput] = useState({
    originalEmail: '',
    replyType: 'acknowledge' as 'acknowledge' | 'decline' | 'accept' | 'clarify',
    additionalNotes: ''
  });
  
  // Tone adjustment state
  const [toneInput, setToneInput] = useState({
    originalEmail: '',
    targetTone: 'professional' as ToneType
  });
  
  const [result, setResult] = useState<EmailResult | null>(null);

  const improvementOptions = [
    { id: 'clarity', label: 'Make clearer' },
    { id: 'concise', label: 'More concise' },
    { id: 'polite', label: 'More polite' },
    { id: 'action', label: 'Add call to action' },
    { id: 'grammar', label: 'Fix grammar' },
    { id: 'persuasive', label: 'More persuasive' },
  ];

  const toggleImprovement = (id: string) => {
    setRewriteInput(prev => ({
      ...prev,
      improvements: prev.improvements.includes(id)
        ? prev.improvements.filter(i => i !== id)
        : [...prev.improvements, id]
    }));
  };

  const generateEmail = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeMode,
          data: activeMode === 'draft' ? draftInput :
                activeMode === 'rewrite' ? rewriteInput :
                activeMode === 'reply' ? replyInput : toneInput
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Generate locally as fallback
        generateLocalEmail();
      }
    } catch {
      generateLocalEmail();
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalEmail = () => {
    let subject = '';
    let body = '';
    let tone = '';
    
    if (activeMode === 'draft') {
      subject = `Re: ${draftInput.purpose || 'Your Request'}`;
      body = `Dear ${draftInput.recipient || 'Sir/Madam'},

I hope this email finds you well. ${draftInput.purpose}

${draftInput.keyPoints ? `Key points:\n${draftInput.keyPoints.split(',').map(p => `• ${p.trim()}`).join('\n')}` : ''}

Please let me know if you have any questions or need additional information.

Best regards,
[Your Name]`;
      tone = draftInput.tone;
    } else if (activeMode === 'rewrite') {
      body = rewriteInput.originalEmail;
      subject = 'Rewritten Email';
      tone = rewriteInput.tone;
    } else if (activeMode === 'reply') {
      subject = 'Re: Your Email';
      body = `Thank you for your email. I have received your message and will get back to you shortly.

${replyInput.additionalNotes ? replyInput.additionalNotes : ''}

Best regards,
[Your Name]`;
      tone = 'professional';
    } else {
      body = toneInput.originalEmail;
      subject = 'Tone-Adjusted Email';
      tone = toneInput.targetTone;
    }
    
    setResult({ subject, body, tone });
  };

  const copyEmail = () => {
    if (!result) return;
    const text = `Subject: ${result.subject}\n\n${result.body}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">AI-Powered Email Writing</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            AI Email <span className="gradient-text">Assistant</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Draft professional emails in seconds, rewrite for clarity, adjust tone, 
            and generate perfect responses with AI assistance.
          </p>
        </div>

        {/* Mode Tabs */}
        <Tabs value={activeMode} onValueChange={(v) => { setActiveMode(v as EmailMode); setResult(null); }}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="draft" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Draft</span>
            </TabsTrigger>
            <TabsTrigger value="rewrite" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Rewrite</span>
            </TabsTrigger>
            <TabsTrigger value="reply" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Reply</span>
            </TabsTrigger>
            <TabsTrigger value="tone" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Tone</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {activeMode === 'draft' && 'Draft New Email'}
                  {activeMode === 'rewrite' && 'Rewrite Email'}
                  {activeMode === 'reply' && 'Generate Reply'}
                  {activeMode === 'tone' && 'Adjust Tone'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Draft Mode */}
                <TabsContent value="draft" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>What's the purpose of this email?</Label>
                    <Input
                      placeholder="e.g., Request a meeting, Follow up on proposal..."
                      value={draftInput.purpose}
                      onChange={(e) => setDraftInput({ ...draftInput, purpose: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Who is the recipient?</Label>
                    <Input
                      placeholder="e.g., John (Manager), HR Team, Client..."
                      value={draftInput.recipient}
                      onChange={(e) => setDraftInput({ ...draftInput, recipient: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Key points to include (comma-separated)</Label>
                    <Textarea
                      placeholder="e.g., Discuss project timeline, Share progress update, Ask for feedback"
                      rows={3}
                      value={draftInput.keyPoints}
                      onChange={(e) => setDraftInput({ ...draftInput, keyPoints: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {tones.slice(0, 6).map(t => (
                        <Button
                          key={t.id}
                          variant={draftInput.tone === t.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setDraftInput({ ...draftInput, tone: t.id })}
                          className={draftInput.tone === t.id ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        >
                          {t.icon}
                          <span className="ml-1 text-xs">{t.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Rewrite Mode */}
                <TabsContent value="rewrite" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>Original Email</Label>
                    <Textarea
                      placeholder="Paste the email you want to rewrite..."
                      rows={6}
                      value={rewriteInput.originalEmail}
                      onChange={(e) => setRewriteInput({ ...rewriteInput, originalEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Improvements</Label>
                    <div className="flex flex-wrap gap-2">
                      {improvementOptions.map(opt => (
                        <Badge
                          key={opt.id}
                          variant={rewriteInput.improvements.includes(opt.id) ? 'default' : 'outline'}
                          className={`cursor-pointer ${rewriteInput.improvements.includes(opt.id) ? 'bg-blue-500' : ''}`}
                          onClick={() => toggleImprovement(opt.id)}
                        >
                          {opt.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Tone</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {tones.slice(0, 6).map(t => (
                        <Button
                          key={t.id}
                          variant={rewriteInput.tone === t.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRewriteInput({ ...rewriteInput, tone: t.id })}
                          className={rewriteInput.tone === t.id ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        >
                          {t.icon}
                          <span className="ml-1 text-xs">{t.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Reply Mode */}
                <TabsContent value="reply" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>Original Email You Received</Label>
                    <Textarea
                      placeholder="Paste the email you want to reply to..."
                      rows={5}
                      value={replyInput.originalEmail}
                      onChange={(e) => setReplyInput({ ...replyInput, originalEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reply Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'acknowledge', label: 'Acknowledge' },
                        { id: 'accept', label: 'Accept' },
                        { id: 'decline', label: 'Decline' },
                        { id: 'clarify', label: 'Clarify' },
                      ].map(type => (
                        <Button
                          key={type.id}
                          variant={replyInput.replyType === type.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setReplyInput({ ...replyInput, replyType: type.id as typeof replyInput.replyType })}
                          className={replyInput.replyType === type.id ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes (optional)</Label>
                    <Textarea
                      placeholder="Any specific points to include in your reply..."
                      rows={2}
                      value={replyInput.additionalNotes}
                      onChange={(e) => setReplyInput({ ...replyInput, additionalNotes: e.target.value })}
                    />
                  </div>
                </TabsContent>

                {/* Tone Mode */}
                <TabsContent value="tone" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>Original Email</Label>
                    <Textarea
                      placeholder="Paste the email whose tone you want to adjust..."
                      rows={6}
                      value={toneInput.originalEmail}
                      onChange={(e) => setToneInput({ ...toneInput, originalEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Tone</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {tones.map(t => (
                        <Button
                          key={t.id}
                          variant={toneInput.targetTone === t.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setToneInput({ ...toneInput, targetTone: t.id })}
                          className={`justify-start ${toneInput.targetTone === t.id ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                        >
                          {t.icon}
                          <div className="ml-2 text-left">
                            <div className="text-xs font-medium">{t.name}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  onClick={generateEmail}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Email
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Generated Email</CardTitle>
                  {result && (
                    <Button variant="outline" size="sm" onClick={copyEmail}>
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Subject</Label>
                      <p className="font-medium">{result.subject}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Body</Label>
                      <div className="mt-2 p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap">
                        {result.body}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {tones.find(t => t.id === result.tone)?.name || result.tone} tone
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Your generated email will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Templates Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {emailTemplates.map(template => (
                  <button
                    key={template.name}
                    className="p-3 border rounded-lg text-left hover:border-blue-500/50 hover:bg-muted/30 transition-colors"
                    onClick={() => {
                      setActiveMode('draft');
                      setDraftInput({
                        purpose: template.name,
                        recipient: '',
                        keyPoints: template.preview,
                        tone: 'professional'
                      });
                    }}
                  >
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{template.preview}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
