// Main Interview Engine - Orchestrates question generation and answer evaluation

import {
  Role,
  Category,
  Difficulty,
  roleKnowledgeBase
} from './knowledge-base';
import { generateQuestion, generateFollowUpQuestion, adjustDifficulty, GeneratedQuestion } from './question-engine';
import { evaluateAnswer, EvaluationResult, detectIrrelevantInput } from './evaluation-engine';

export interface InterviewSession {
  id: string;
  role: Role;
  currentDifficulty: Difficulty;
  questionsAsked: number;
  questionsAnswered: number;
  scoreHistory: number[];
  totalScore: number;
  averageScore: number;
  startTime: Date;
  lastActivityTime: Date;
}

export interface QuestionResponse {
  success: true;
  question: GeneratedQuestion;
  session: InterviewSession;
}

export interface FeedbackResponse {
  success: true;
  evaluation: EvaluationResult;
  session: InterviewSession;
  suggestedDifficulty?: Difficulty;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

// In-memory session storage (in production, use a database)
const sessions = new Map<string, InterviewSession>();

// Create a new interview session
export function createSession(role: Role, difficulty: Difficulty = 'mid'): InterviewSession {
  const session: InterviewSession = {
    id: generateSessionId(),
    role,
    currentDifficulty: difficulty,
    questionsAsked: 0,
    questionsAnswered: 0,
    scoreHistory: [],
    totalScore: 0,
    averageScore: 0,
    startTime: new Date(),
    lastActivityTime: new Date()
  };
  
  sessions.set(session.id, session);
  return session;
}

// Get session by ID
export function getSession(sessionId: string): InterviewSession | undefined {
  return sessions.get(sessionId);
}

// Update session
export function updateSession(session: InterviewSession): void {
  session.lastActivityTime = new Date();
  sessions.set(session.id, session);
}

// Generate a new question for the session
export function getQuestion(
  role: Role,
  category: Category,
  difficulty: Difficulty,
  sessionId?: string
): QuestionResponse {
  let session = sessionId ? sessions.get(sessionId) : undefined;
  
  if (!session) {
    session = createSession(role, difficulty);
  }
  
  // Use adaptive difficulty if session has history
  const effectiveDifficulty = session.scoreHistory.length >= 2
    ? adjustDifficulty(session.currentDifficulty, session.scoreHistory.slice(-3))
    : difficulty;
  
  session.currentDifficulty = effectiveDifficulty;
  session.questionsAsked++;
  
  const question = generateQuestion(role, category, effectiveDifficulty);
  
  updateSession(session);
  
  return {
    success: true,
    question,
    session
  };
}

// Submit an answer and get feedback
export function submitAnswer(
  question: string,
  answer: string,
  role: Role,
  category: Category,
  difficulty: Difficulty,
  sessionId?: string,
  questionTopics?: any[]
): FeedbackResponse | ErrorResponse {
  let session = sessionId ? sessions.get(sessionId) : undefined;
  
  if (!session) {
    session = createSession(role, difficulty);
  }
  
  // Check for irrelevant input first
  const irrelevantCheck = detectIrrelevantInput(answer, question);
  
  // Get role knowledge for topics
  const roleKnowledge = roleKnowledgeBase[role];
  const topics = questionTopics || roleKnowledge.topics[category] || roleKnowledge.topics.technical;
  
  // Evaluate the answer
  const evaluation = evaluateAnswer(answer, {
    question,
    role,
    category,
    difficulty: session.currentDifficulty,
    topics
  });
  
  // Update session stats
  if (evaluation.isRelevant) {
    session.questionsAnswered++;
    session.scoreHistory.push(evaluation.overallScore);
    session.totalScore = session.scoreHistory.reduce((a, b) => a + b, 0);
    session.averageScore = session.totalScore / session.scoreHistory.length;
  }
  
  // Determine if difficulty should be adjusted
  let suggestedDifficulty: Difficulty | undefined;
  if (session.scoreHistory.length >= 2) {
    const newDifficulty = adjustDifficulty(session.currentDifficulty, session.scoreHistory.slice(-3));
    if (newDifficulty !== session.currentDifficulty) {
      suggestedDifficulty = newDifficulty;
      session.currentDifficulty = newDifficulty;
    }
  }
  
  updateSession(session);
  
  return {
    success: true,
    evaluation,
    session,
    suggestedDifficulty
  };
}

// Generate a follow-up question
export function getFollowUpQuestion(
  originalQuestion: string,
  previousAnswer: string,
  role: Role,
  category: Category,
  difficulty: Difficulty,
  sessionId?: string
): QuestionResponse {
  let session = sessionId ? sessions.get(sessionId) : undefined;
  
  if (!session) {
    session = createSession(role, difficulty);
  }
  
  const question = generateFollowUpQuestion(
    originalQuestion,
    previousAnswer,
    role,
    category,
    session.currentDifficulty
  );
  
  session.questionsAsked++;
  updateSession(session);
  
  return {
    success: true,
    question,
    session
  };
}

// Get interview summary
export function getInterviewSummary(sessionId: string): {
  totalQuestions: number;
  answeredQuestions: number;
  averageScore: number;
  performance: 'excellent' | 'good' | 'needs-improvement' | 'insufficient';
  strengths: string[];
  areasToImprove: string[];
  duration: number;
} | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  
  const duration = Math.floor((session.lastActivityTime.getTime() - session.startTime.getTime()) / 1000 / 60);
  
  let performance: 'excellent' | 'good' | 'needs-improvement' | 'insufficient';
  if (session.averageScore >= 8) {
    performance = 'excellent';
  } else if (session.averageScore >= 6) {
    performance = 'good';
  } else if (session.averageScore >= 4) {
    performance = 'needs-improvement';
  } else {
    performance = 'insufficient';
  }
  
  const roleKnowledge = roleKnowledgeBase[session.role];
  
  return {
    totalQuestions: session.questionsAsked,
    answeredQuestions: session.questionsAnswered,
    averageScore: Math.round(session.averageScore * 10) / 10,
    performance,
    strengths: roleKnowledge.keySkills.slice(0, 3),
    areasToImprove: roleKnowledge.topics.technical[0]?.concepts.slice(0, 2) || [],
    duration
  };
}

// Helper function to generate session ID
function generateSessionId(): string {
  return `interview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Clean up old sessions (run periodically)
export function cleanupOldSessions(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.lastActivityTime.getTime() > maxAgeMs) {
      sessions.delete(id);
    }
  }
}

// Export types
export type { Role, Category, Difficulty, GeneratedQuestion, EvaluationResult };
