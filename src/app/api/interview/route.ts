import { NextRequest, NextResponse } from 'next/server';
import {
  getQuestion,
  submitAnswer,
  getFollowUpQuestion,
  getInterviewSummary,
  Role,
  Category,
  Difficulty
} from '@/lib/interview';

interface InterviewRequest {
  mode: 'question' | 'feedback' | 'followup' | 'summary';
  question?: string;
  answer?: string;
  role?: string;
  difficulty?: string;
  category?: string;
  sessionId?: string;
  questionTopics?: any[];
}

// Map display roles to internal role keys
const roleMapping: Record<string, Role> = {
  'Software Developer': 'software-developer',
  'Frontend Developer': 'frontend-developer',
  'Backend Developer': 'backend-developer',
  'Full Stack Developer': 'fullstack-developer',
  'DevOps Engineer': 'devops-engineer',
  'Data Scientist': 'data-scientist',
  'Data Analyst': 'data-analyst',
  'Product Manager': 'product-manager',
  'Engineering Manager': 'engineering-manager',
  'Mobile Developer': 'mobile-developer',
  'QA Engineer': 'qa-engineer',
  'System Architect': 'system-architect',
  // Also support direct keys
  'software-developer': 'software-developer',
  'frontend-developer': 'frontend-developer',
  'backend-developer': 'backend-developer',
  'fullstack-developer': 'fullstack-developer',
  'devops-engineer': 'devops-engineer',
  'data-scientist': 'data-scientist',
  'data-analyst': 'data-analyst',
  'product-manager': 'product-manager',
  'engineering-manager': 'engineering-manager',
  'mobile-developer': 'mobile-developer',
  'qa-engineer': 'qa-engineer',
  'system-architect': 'system-architect'
};

export async function POST(request: NextRequest) {
  try {
    const body: InterviewRequest = await request.json();
    const {
      mode = 'question',
      question,
      answer,
      role = 'Software Developer',
      difficulty = 'mid',
      category = 'behavioral',
      sessionId,
      questionTopics
    } = body;

    // Map the role to internal key
    const internalRole = roleMapping[role] || 'software-developer';
    const internalCategory = (category || 'behavioral') as Category;
    const internalDifficulty = (difficulty || 'mid') as Difficulty;

    switch (mode) {
      case 'question': {
        const result = getQuestion(
          internalRole,
          internalCategory,
          internalDifficulty,
          sessionId
        );

        return NextResponse.json({
          success: true,
          mode: 'question',
          content: result.question.question,
          questionData: result.question,
          session: result.session,
          hints: result.question.hints
        });
      }

      case 'feedback': {
        if (!question || !answer) {
          return NextResponse.json(
            { success: false, error: 'Question and answer are required for feedback mode' },
            { status: 400 }
          );
        }

        const result = submitAnswer(
          question,
          answer,
          internalRole,
          internalCategory,
          internalDifficulty,
          sessionId,
          questionTopics
        );

        if (!result.success) {
          return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json({
          success: true,
          mode: 'feedback',
          score: Math.round(result.evaluation.overallScore),
          relevanceScore: result.evaluation.relevanceScore,
          qualityScore: result.evaluation.qualityScore,
          depthScore: result.evaluation.depthScore,
          isRelevant: result.evaluation.isRelevant,
          strengths: result.evaluation.strengths,
          improvements: result.evaluation.improvements,
          coveredConcepts: result.evaluation.coveredConcepts,
          missedConcepts: result.evaluation.missedConcepts,
          detailedFeedback: result.evaluation.feedback,
          sampleAnswer: result.evaluation.sampleAnswer,
          followUpSuggestion: result.evaluation.followUpSuggestion,
          session: result.session,
          suggestedDifficulty: result.suggestedDifficulty
        });
      }

      case 'followup': {
        if (!question || !answer) {
          return NextResponse.json(
            { success: false, error: 'Question and answer are required for followup mode' },
            { status: 400 }
          );
        }

        const result = getFollowUpQuestion(
          question,
          answer,
          internalRole,
          internalCategory,
          internalDifficulty,
          sessionId
        );

        return NextResponse.json({
          success: true,
          mode: 'followup',
          content: result.question.question,
          questionData: result.question,
          session: result.session
        });
      }

      case 'summary': {
        if (!sessionId) {
          return NextResponse.json(
            { success: false, error: 'Session ID is required for summary mode' },
            { status: 400 }
          );
        }

        const summary = getInterviewSummary(sessionId);

        if (!summary) {
          return NextResponse.json(
            { success: false, error: 'Session not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          mode: 'summary',
          summary
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid mode. Use "question", "feedback", "followup", or "summary"' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Interview API error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
