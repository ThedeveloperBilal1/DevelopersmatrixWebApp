'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  RefreshCw, 
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Sparkles,
  Loader2,
  AlertCircle,
  Target,
  CheckCircle,
  XCircle,
  Lightbulb,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeedbackResponse {
  score: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  sampleAnswer: string;
}

type Category = 'behavioral' | 'technical' | 'system';
type Difficulty = 'entry' | 'mid' | 'senior';

const categoryDescriptions: Record<Category, string> = {
  behavioral: 'Questions about your past experiences, teamwork, and soft skills. Use the STAR method.',
  technical: 'Questions about programming concepts, architecture, and technical problem-solving.',
  system: 'System design questions focused on scalability, trade-offs, and real-world architecture.'
};

const difficultyLabels: Record<Difficulty, string> = {
  entry: 'Entry Level (0-2 years)',
  mid: 'Mid Level (2-5 years)',
  senior: 'Senior Level (5+ years)'
};

const roleOptions = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'Engineering Manager',
  'Mobile Developer',
  'QA Engineer'
];

export default function InterviewSimulatorClient() {
  const [category, setCategory] = useState<Category>('behavioral');
  const [difficulty, setDifficulty] = useState<Difficulty>('mid');
  const [role, setRole] = useState('Software Developer');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFollowUpMode, setIsFollowUpMode] = useState(false);

  const generateQuestion = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setFeedback(null);
    setFollowUpQuestion('');
    setIsFollowUpMode(false);
    
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'question',
          category,
          difficulty,
          role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate question');
      }

      const data = await response.json();
      setCurrentQuestion(data.content);
      setAnswer('');
    } catch (err) {
      setError('Failed to generate question. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [category, difficulty, role]);

  const submitAnswer = async () => {
    if (!answer.trim() || !currentQuestion) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'feedback',
          question: currentQuestion,
          answer: answer.trim(),
          category,
          difficulty,
          role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      const data = await response.json();
      setFeedback(data);
      setQuestionsAnswered(prev => prev + 1);
    } catch (err) {
      setError('Failed to get feedback. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFollowUp = async () => {
    if (!answer.trim() || !currentQuestion) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'followup',
          question: currentQuestion,
          answer: answer.trim(),
          category,
          difficulty,
          role
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate follow-up');
      }

      const data = await response.json();
      setFollowUpQuestion(data.content);
      setCurrentQuestion(data.content);
      setAnswer('');
      setFeedback(null);
      setIsFollowUpMode(true);
    } catch (err) {
      setError('Failed to generate follow-up. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startNew = () => {
    setCurrentQuestion('');
    setAnswer('');
    setFeedback(null);
    setFollowUpQuestion('');
    setIsFollowUpMode(false);
    setQuestionsAnswered(0);
    setError('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              AI Interview Simulator
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Questions: {questionsAnswered}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Target Role</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[200px] text-xs">Questions will be tailored to your target role</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {roleOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Experience Level</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[200px] text-xs">Adjusts question complexity based on experience</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {Object.entries(difficultyLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question Type</Label>
              <div className="flex gap-1">
                {[
                  { id: 'behavioral', label: 'Behavioral' },
                  { id: 'technical', label: 'Technical' },
                  { id: 'system', label: 'System Design' }
                ].map(cat => (
                  <Button
                    key={cat.id}
                    variant={category === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCategory(cat.id as Category);
                      if (currentQuestion) {
                        setCurrentQuestion('');
                        setFeedback(null);
                      }
                    }}
                    className={`${category === cat.id ? 'bg-orange-500 hover:bg-orange-600' : ''} text-xs flex-1`}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {!currentQuestion ? (
            <div className="text-center py-8 sm:py-16">
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-muted-foreground/30" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready to Practice?</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
                {categoryDescriptions[category]}
              </p>
              <Button 
                onClick={generateQuestion} 
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Practice
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Question */}
              <div className="p-4 sm:p-6 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Badge className="bg-orange-500">{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>
                  {isFollowUpMode && <Badge variant="outline" className="text-purple-500 border-purple-500">Follow-up</Badge>}
                  <Badge variant="outline">{difficultyLabels[difficulty]}</Badge>
                </div>
                <p className="text-base sm:text-lg font-medium">{currentQuestion}</p>
              </div>

              {/* Answer Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Answer</label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={
                    category === 'behavioral' 
                      ? "Use the STAR method: Describe the Situation, Task, Action you took, and the Result..."
                      : category === 'technical'
                      ? "Explain your approach step by step, considering edge cases and trade-offs..."
                      : "Start with requirements, then high-level design, dive into components..."
                  }
                  rows={6}
                  disabled={!!feedback || isLoading}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {answer.length} characters • {answer.split(/\s+/).filter(Boolean).length} words
                </p>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="p-4 bg-violet-500/10 dark:bg-violet-500/10 border border-violet-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">AI Feedback</span>
                    <div className={`text-xl font-bold ${getScoreColor(feedback.score)}`}>
                      Score: {feedback.score}/10
                    </div>
                  </div>
                  
                  {/* Strengths */}
                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Strengths
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {feedback.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Improvements */}
                  {feedback.improvements && feedback.improvements.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                        <Target className="w-4 h-4" /> Areas to Improve
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {feedback.improvements.map((i, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Detailed Feedback */}
                  {feedback.detailedFeedback && (
                    <p className="text-sm text-muted-foreground mb-3">{feedback.detailedFeedback}</p>
                  )}

                  {/* Sample Answer Hint */}
                  {feedback.sampleAnswer && (
                    <div className="p-3 bg-muted/50 rounded-lg mb-3">
                      <p className="text-sm font-medium mb-1 flex items-center gap-1">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Sample Approach
                      </p>
                      <p className="text-xs text-muted-foreground">{feedback.sampleAnswer}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-3 h-3 mr-1" /> Helpful
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="w-3 h-3 mr-1" /> Not Helpful
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!feedback ? (
                  <Button 
                    onClick={submitAnswer}
                    disabled={!answer.trim() || isLoading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 min-h-[44px]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    Submit Answer
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={generateFollowUp}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <MessageSquare className="w-4 h-4 mr-2" />
                      )}
                      Ask Follow-up
                    </Button>
                    <Button 
                      onClick={generateQuestion}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 min-h-[44px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Next Question
                    </Button>
                  </>
                )}
              </div>

              {/* Tips */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Tip</p>
                <p className="text-xs text-muted-foreground">
                  {category === 'behavioral' 
                    ? "Use the STAR method: Situation (set the context), Task (what you needed to do), Action (what you actually did), Result (the outcome with quantifiable metrics if possible)."
                    : category === 'technical'
                    ? "Explain your thought process clearly. Start with what you know, mention edge cases, discuss time/space complexity, and don't be afraid to say 'I'm not sure but I would...'"
                    : "Start by clarifying requirements and constraints. Then outline a high-level design, discuss component interactions, address scalability, and mention trade-offs for each decision."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
