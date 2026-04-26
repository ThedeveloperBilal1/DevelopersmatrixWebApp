'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Trophy,
  Sparkles,
  ChevronRight,
  BookOpen,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { microLearningLessons, getTodayLesson, MicroLearning } from '@/data/micro-learning';

export default function LearnClient() {
  const [lesson] = useState<MicroLearning>(() => getTodayLesson());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setAnswers(prev => [...prev, answerIndex]);
  };

  const nextQuestion = () => {
    if (currentQuestion < lesson!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getScore = () => {
    if (!lesson) return 0;
    return answers.reduce((score, answer, index) => {
      return score + (answer === lesson.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const score = getScore();
  const percentage = Math.round((score / lesson.questions.length) * 100);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <section className="bg-background border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-violet-500">
              <BookOpen className="w-3 h-3 mr-1" />
              Today's Lesson
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {lesson.duration}
            </Badge>
            <Badge variant="outline">{lesson.difficulty}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{lesson.topic}</h1>
          <p className="text-lg text-muted-foreground">{lesson.summary}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {lesson.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            {/* Lesson Content */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  Lesson Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: lesson.content
                        .replace(/^# .+$/gm, (match: string) => `<h1 class="text-2xl font-bold mt-6 mb-4">${match.slice(2)}</h1>`)
                        .replace(/^## .+$/gm, (match: string) => `<h2 class="text-xl font-semibold mt-6 mb-3">${match.slice(3)}</h2>`)
                        .replace(/^### .+$/gm, (match: string) => `<h3 class="text-lg font-medium mt-4 mb-2">${match.slice(4)}</h3>`)
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm my-4"><code>$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        .replace(/^- .+$/gm, (match: string) => `<li class="ml-4 text-muted-foreground">${match.slice(2)}</li>`)
                        .replace(/\n\n/g, '</p><p class="my-4 text-muted-foreground leading-relaxed">')
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-violet-500" />
                    Quiz - Question {currentQuestion + 1} of {lesson.questions.length}
                  </CardTitle>
                  <Badge variant="outline">
                    {Math.round(((currentQuestion + (answered ? 1 : 0)) / lesson.questions.length) * 100)}% Complete
                  </Badge>
                </div>
                <Progress 
                  value={((currentQuestion + (answered ? 1 : 0)) / lesson.questions.length) * 100} 
                  className="h-2 mt-2"
                />
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-6">
                  {lesson.questions[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  {lesson.questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === lesson.questions[currentQuestion].correctAnswer;
                    const isSelected = selectedAnswer === index;
                    
                    let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                    
                    if (answered) {
                      if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-500/10";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-500/10";
                      } else {
                        buttonClass += "border-border opacity-50";
                      }
                    } else if (isSelected) {
                      buttonClass += "border-violet-500 bg-violet-500/10";
                    } else {
                      buttonClass += "border-border hover:border-violet-500/50 hover:bg-muted/50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={buttonClass}
                        disabled={answered}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {answered && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                          {answered && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className="mt-6">
                    <div className={`p-4 rounded-lg ${selectedAnswer === lesson.questions[currentQuestion].correctAnswer ? 'bg-green-500/10 border border-green-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                      <p className="font-medium mb-1">
                        {selectedAnswer === lesson.questions[currentQuestion].correctAnswer ? '✅ Correct!' : '💡 Explanation'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.questions[currentQuestion].explanation}
                      </p>
                    </div>

                    <Button 
                      onClick={nextQuestion}
                      className="mt-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    >
                      {currentQuestion < lesson.questions.length - 1 ? (
                        <>Next Question <ChevronRight className="w-4 h-4 ml-2" /></>
                      ) : (
                        <>See Results <Trophy className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          /* Results */
          <Card className="text-center">
            <CardContent className="py-12">
              <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                percentage >= 75 ? 'bg-green-500/20' : percentage >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <Trophy className={`w-12 h-12 ${
                  percentage >= 75 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`} />
              </div>

              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-muted-foreground mb-6">
                You scored {score} out of {lesson.questions.length}
              </p>

              <div className="max-w-xs mx-auto mb-8">
                <Progress value={percentage} className="h-4 mb-2" />
                <p className="text-2xl font-bold">{percentage}%</p>
              </div>

              <div className={`inline-block px-6 py-3 rounded-lg mb-8 ${
                percentage >= 75 ? 'bg-green-500/10 text-green-600' : 
                percentage >= 50 ? 'bg-yellow-500/10 text-yellow-600' : 
                'bg-red-500/10 text-red-600'
              }`}>
                {percentage >= 75 ? '🎉 Excellent! You mastered this lesson!' : 
                 percentage >= 50 ? '👍 Good job! Room for improvement.' : 
                 '📚 Keep learning! You\'ll get it next time.'}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restartQuiz} variant="outline">
                  Try Again
                </Button>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Lessons */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Other Lessons This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {microLearningLessons.filter(l => l.id !== lesson.id).map(l => (
                <div 
                  key={l.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{l.topic}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {l.duration}
                      <span>•</span>
                      {l.difficulty}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][l.dayOfWeek]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
