import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface InterviewRequest {
  question?: string;
  answer?: string;
  role?: string;
  difficulty?: 'entry' | 'mid' | 'senior';
  mode?: 'question' | 'feedback' | 'followup';
  category?: 'behavioral' | 'technical' | 'system';
}

// Fallback questions in case API fails
function getFallbackQuestion(category: string, role: string, difficulty: string): string {
  const questions: Record<string, Record<string, string[]>> = {
    behavioral: {
      entry: [
        `Tell me about a time you had to learn something new quickly. How did you approach it?`,
        `Describe a situation where you had to work with a difficult team member. How did you handle it?`,
        `Give me an example of a project you're particularly proud of. What was your role?`,
        `Tell me about a time you had to adapt to a significant change at work.`,
        `Describe a situation where you had to prioritize tasks under a tight deadline.`
      ],
      mid: [
        `Tell me about a time you had to influence a team decision without formal authority.`,
        `Describe a situation where you had to balance multiple competing priorities. How did you manage?`,
        `Give me an example of how you've mentored or helped a junior colleague grow.`,
        `Tell me about a time you had to push back on a deadline or scope. How did you handle it?`,
        `Describe a situation where you had to resolve a conflict between team members.`
      ],
      senior: [
        `Tell me about a time you had to make a difficult decision with incomplete information.`,
        `Describe a situation where you had to drive organizational change. What was your approach?`,
        `Give me an example of how you've built or transformed a team culture.`,
        `Tell me about a time you had to deliver difficult feedback to a senior stakeholder.`,
        `Describe a situation where you had to align multiple teams with conflicting goals.`
      ]
    },
    technical: {
      entry: [
        `Explain the difference between let, const, and var in JavaScript. When would you use each?`,
        `What is REST API? Can you explain the basic principles?`,
        `How do you handle errors in your code? Give me an example.`,
        `What's the difference between SQL and NoSQL databases? When would you use each?`,
        `Explain the concept of version control and why it's important.`
      ],
      mid: [
        `How would you design a caching strategy for a high-traffic web application?`,
        `Explain the concept of database indexing. When should you create an index?`,
        `What's your approach to writing maintainable and testable code?`,
        `Describe the difference between horizontal and vertical scaling. When would you use each?`,
        `How would you implement authentication and authorization in a web application?`
      ],
      senior: [
        `How would you architect a microservices system for an e-commerce platform?`,
        `Explain your approach to technical debt. How do you balance new features vs. refactoring?`,
        `How would you design a system that needs to handle 10x traffic spikes?`,
        `Describe your strategy for ensuring high availability in distributed systems.`,
        `How would you approach migrating a monolithic application to microservices?`
      ]
    },
    system: {
      entry: [
        `How would you design a simple URL shortener service?`,
        `Design a basic chat application. What components would you need?`,
        `How would you structure a simple e-commerce product catalog?`,
        `Design a basic user authentication system.`,
        `How would you design a simple blog platform?`
      ],
      mid: [
        `Design a real-time notification system for a social media platform.`,
        `How would you design a rate limiter for a public API?`,
        `Design a content delivery system for a media streaming service.`,
        `How would you design a distributed cache system?`,
        `Design a job queue system for background task processing.`
      ],
      senior: [
        `Design a distributed job scheduling system that can handle millions of jobs.`,
        `How would you architect a multi-region database system with low latency requirements?`,
        `Design a system that can process and analyze real-time streaming data at scale.`,
        `Design a globally distributed content delivery network from scratch.`,
        `How would you design a system that can handle millions of concurrent WebSocket connections?`
      ]
    }
  };

  const categoryQuestions = questions[category] || questions.behavioral;
  const difficultyQuestions = categoryQuestions[difficulty] || categoryQuestions.mid;
  const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);

  return difficultyQuestions[randomIndex];
}

// Fallback feedback for when API fails
function getFallbackFeedback(): object {
  return {
    mode: 'feedback',
    score: 7,
    strengths: [
      'Clear communication of your thought process',
      'Good structure in your response'
    ],
    improvements: [
      'Consider adding more specific metrics or outcomes',
      'Try using the STAR method more explicitly (Situation, Task, Action, Result)'
    ],
    detailedFeedback: 'Your answer shows good understanding of the situation. To improve, try to quantify your impact with specific numbers or outcomes, and structure your response using the STAR method for clarity.',
    sampleAnswer: 'For behavioral questions, use: "In my previous role at [Company], I faced [Situation]. My task was to [Task]. I took action by [Action], which resulted in [Result with metrics]."'
  };
}

// Fallback follow-up question
function getFallbackFollowUp(question: string): string {
  const followUps = [
    `That's interesting. Can you tell me more about the challenges you faced during that process?`,
    `What would you do differently if you encountered a similar situation again?`,
    `How did that experience change your approach to similar problems?`,
    `What was the most difficult part of that situation, and how did you handle it?`,
    `Who else was involved, and how did you collaborate with them?`
  ];
  return followUps[Math.floor(Math.random() * followUps.length)];
}

export async function POST(request: NextRequest) {
  // Parse body first so it's available in catch block
  let body: InterviewRequest = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const {
    question,
    answer,
    role = 'Software Developer',
    difficulty = 'mid',
    mode = 'question',
    category = 'behavioral'
  } = body;

  if (!mode) {
    return NextResponse.json(
      { error: 'Mode is required (question, feedback, or followup)' },
      { status: 400 }
    );
  }

  try {
    const zai = await ZAI.create();

    let systemPrompt = '';
    let userPrompt = '';

    switch (mode) {
      case 'question':
        systemPrompt = `You are an experienced interviewer for ${role} positions. Generate a realistic, challenging ${category} interview question for a ${difficulty}-level candidate.

IMPORTANT GUIDELINES:
- Make questions specific and relevant to the role
- For behavioral: Focus on real-world scenarios, teamwork, problem-solving
- For technical: Focus on practical knowledge, not just definitions
- For system design: Focus on scalability, trade-offs, real-world constraints

Return ONLY the question text, nothing else. No explanations, no labels, just the question.`;

        userPrompt = `Generate a ${category} interview question for a ${difficulty}-level ${role} position. Make it specific and realistic.`;
        break;

      case 'feedback':
        if (!question || !answer) {
          return NextResponse.json(
            { error: 'Question and answer are required for feedback mode' },
            { status: 400 }
          );
        }

        systemPrompt = `You are a supportive but honest interview coach. Provide constructive feedback on interview answers.

FEEDBACK GUIDELINES:
- Be encouraging but honest about weaknesses
- Give specific, actionable improvement suggestions
- For behavioral answers: Check if STAR method was used effectively
- For technical answers: Check accuracy, depth, and clarity
- For system design: Check requirements gathering, trade-off discussion

RESPONSE FORMAT (use this exact JSON structure):
{
  "score": <number 1-10>,
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"],
  "detailedFeedback": "<2-3 sentence personalized feedback>",
  "sampleAnswer": "<brief example of a stronger answer approach>"
}

Be conversational and human-like. Avoid robotic or overly formal language.`;

        userPrompt = `I was asked this interview question for a ${role} position:

"${question}"

My answer was:
"${answer}"

Please provide feedback on my answer.`;
        break;

      case 'followup':
        if (!question || !answer) {
          return NextResponse.json(
            { error: 'Question and answer are required for followup mode' },
            { status: 400 }
          );
        }

        systemPrompt = `You are an experienced interviewer who asks insightful follow-up questions based on candidate answers.

FOLLOW-UP GUIDELINES:
- Dig deeper into specific points mentioned
- Challenge assumptions or explore edge cases
- Ask about trade-offs or alternatives
- Make it feel like a natural conversation

Return ONLY the follow-up question text, nothing else.`;

        userPrompt = `The candidate answered this ${category} question for a ${role} position:

Question: "${question}"

Their answer: "${answer}"

What would be a good follow-up question to dig deeper?`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid mode. Use "question", "feedback", or "followup"' },
          { status: 400 }
        );
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });

    // Check if API returned an error object
    if (completion.error) {
      console.error('API returned error:', completion.error);
      // Return fallback based on mode
      if (mode === 'question') {
        return NextResponse.json({
          mode: 'question',
          content: getFallbackQuestion(category, role, difficulty)
        });
      }
      if (mode === 'feedback') {
        return NextResponse.json(getFallbackFeedback());
      }
      if (mode === 'followup') {
        return NextResponse.json({
          mode: 'followup',
          content: getFallbackFollowUp(question || '')
        });
      }
    }

    const responseContent = completion.choices?.[0]?.message?.content;

    if (!responseContent) {
      // Return fallback response instead of error
      if (mode === 'question') {
        return NextResponse.json({
          mode: 'question',
          content: getFallbackQuestion(category, role, difficulty)
        });
      }
      if (mode === 'feedback') {
        return NextResponse.json(getFallbackFeedback());
      }
      if (mode === 'followup') {
        return NextResponse.json({
          mode: 'followup',
          content: getFallbackFollowUp(question || '')
        });
      }
      return NextResponse.json(
        { error: 'Failed to generate response. Please try again.' },
        { status: 500 }
      );
    }

    // For feedback mode, try to parse as JSON
    if (mode === 'feedback') {
      try {
        // Try to extract JSON from the response
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            mode: 'feedback',
            ...parsed
          });
        }
      } catch {
        // If JSON parsing fails, return as text feedback
        return NextResponse.json({
          mode: 'feedback',
          score: 7,
          strengths: ['Clear communication'],
          improvements: ['Could provide more specific examples'],
          detailedFeedback: responseContent,
          sampleAnswer: ''
        });
      }
    }

    return NextResponse.json({
      mode,
      content: responseContent
    });

  } catch (error) {
    console.error('Interview API error:', error);

    // Return fallback based on mode - body is now available here
    if (mode === 'question') {
      return NextResponse.json({
        mode: 'question',
        content: getFallbackQuestion(category, role, difficulty)
      });
    }
    if (mode === 'feedback') {
      return NextResponse.json(getFallbackFeedback());
    }
    if (mode === 'followup') {
      return NextResponse.json({
        mode: 'followup',
        content: getFallbackFollowUp(question || '')
      });
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
