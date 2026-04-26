// Answer Evaluation Engine - Analyzes user answers and generates intelligent feedback

import {
  Role,
  Category,
  Difficulty,
  roleKnowledgeBase,
  irrelevantPatterns,
  qualityIndicators,
  followUpTriggers,
  Topic
} from './knowledge-base';

export interface EvaluationResult {
  isRelevant: boolean;
  relevanceScore: number;
  qualityScore: number;
  depthScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  coveredConcepts: string[];
  missedConcepts: string[];
  feedback: string;
  sampleAnswer: string;
  followUpSuggestion?: string;
}

export interface QuestionContext {
  question: string;
  role: Role;
  category: Category;
  difficulty: Difficulty;
  topics: Topic[];
}

// Normalize text for analysis
function normalizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Calculate word frequency
function getWordFrequency(words: string[]): Map<string, number> {
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });
  return frequency;
}

// Check if answer is irrelevant
export function detectIrrelevantInput(answer: string, question: string): { isIrrelevant: boolean; reason: string } {
  const trimmedAnswer = answer.trim();
  
  // Check against known irrelevant patterns
  for (const pattern of irrelevantPatterns) {
    if (pattern.test(trimmedAnswer)) {
      return { isIrrelevant: true, reason: 'Your answer appears to be too brief or generic. Please provide a more detailed and relevant response.' };
    }
  }
  
  // Check for random character sequences
  const words = normalizeText(trimmedAnswer);
  if (words.length < 5) {
    return { isIrrelevant: true, reason: 'Your answer is too short. Please provide a more comprehensive response with specific details.' };
  }
  
  // Check for keyboard mashing patterns
  const keyboardPatterns = /([qwertyuiop]{4,}|[asdfghjkl]{4,}|[zxcvbnm]{4,})/i;
  if (keyboardPatterns.test(trimmedAnswer)) {
    return { isIrrelevant: true, reason: 'Your answer appears to contain random text. Please provide a meaningful response to the question.' };
  }
  
  // Check word variety (real answers have diverse vocabulary)
  const uniqueWords = new Set(words);
  const varietyRatio = uniqueWords.size / words.length;
  if (varietyRatio < 0.3 && words.length > 20) {
    return { isIrrelevant: true, reason: 'Your answer appears repetitive. Please provide more diverse and meaningful content.' };
  }
  
  // Check semantic relevance to question
  const questionWords = normalizeText(question);
  const answerWords = normalizeText(trimmedAnswer);
  const overlap = questionWords.filter(w => answerWords.includes(w)).length;
  const relevanceRatio = overlap / Math.max(questionWords.length, 1);
  
  // If very low overlap with question keywords, might be irrelevant
  if (relevanceRatio < 0.1 && words.length > 30) {
    // But check if they're discussing related concepts
    const roleKnowledge = roleKnowledgeBase['software-developer'];
    const allKeywords = roleKnowledge.topics.technical
      .flatMap(t => [...t.keywords, ...t.concepts]);
    const keywordMatch = words.filter(w => allKeywords.includes(w)).length;
    
    if (keywordMatch < 2) {
      return { isIrrelevant: true, reason: 'Your answer does not seem directly relevant to the question asked. Please address the specific topic in the question.' };
    }
  }
  
  return { isIrrelevant: false, reason: '' };
}

// Calculate relevance score based on topic coverage
function calculateRelevanceScore(
  answer: string,
  topics: Topic[],
  category: Category
): { score: number; coveredConcepts: string[]; missedConcepts: string[] } {
  const answerLower = answer.toLowerCase();
  const words = normalizeText(answer);
  const wordFreq = getWordFrequency(words);
  
  const coveredConcepts: string[] = [];
  const missedConcepts: string[] = [];
  let totalRelevance = 0;
  let totalWeight = 0;
  
  for (const topic of topics) {
    // Check keyword matches
    let keywordMatches = 0;
    for (const keyword of topic.keywords) {
      if (answerLower.includes(keyword.toLowerCase())) {
        keywordMatches++;
        if (!coveredConcepts.includes(keyword)) {
          coveredConcepts.push(keyword);
        }
      }
    }
    
    // Check concept matches
    let conceptMatches = 0;
    for (const concept of topic.concepts) {
      const conceptWords = concept.toLowerCase().split(' ');
      const conceptFound = conceptWords.some(w => answerLower.includes(w));
      if (conceptFound) {
        conceptMatches++;
        if (!coveredConcepts.includes(concept)) {
          coveredConcepts.push(concept);
        }
      } else {
        missedConcepts.push(concept);
      }
    }
    
    // Calculate topic coverage
    const keywordScore = keywordMatches / Math.max(topic.keywords.length, 1);
    const conceptScore = conceptMatches / Math.max(topic.concepts.length, 1);
    const topicScore = (keywordScore * 0.4 + conceptScore * 0.6);
    
    totalRelevance += topicScore * topic.keywords.length;
    totalWeight += topic.keywords.length;
  }
  
  const score = totalWeight > 0 ? (totalRelevance / totalWeight) * 10 : 0;
  
  return {
    score: Math.min(10, Math.max(0, score)),
    coveredConcepts,
    missedConcepts: missedConcepts.slice(0, 5) // Limit to top 5 missed concepts
  };
}

// Analyze answer quality based on structure and depth
function analyzeQuality(answer: string, category: Category): { score: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 5; // Base score
  
  // Length analysis
  const wordCount = answer.split(/\s+/).length;
  if (wordCount >= 100) {
    score += 1;
    indicators.push('Comprehensive answer length');
  } else if (wordCount >= 50) {
    score += 0.5;
    indicators.push('Adequate answer length');
  } else if (wordCount < 20) {
    score -= 1;
    indicators.push('Answer is too brief');
  }
  
  // Check for quality keywords
  const answerLower = answer.toLowerCase();
  
  // High quality indicators
  const highQualityMatches = qualityIndicators.high.keywords.filter(k => 
    answerLower.includes(k.toLowerCase())
  );
  if (highQualityMatches.length >= 3) {
    score += 1.5;
    indicators.push('Strong analytical reasoning');
  } else if (highQualityMatches.length >= 1) {
    score += 0.5;
    indicators.push('Good analytical structure');
  }
  
  // Category-specific analysis
  if (category === 'behavioral') {
    // Check for STAR method
    const hasSituation = /situation|when|time|scenario|context/i.test(answer);
    const hasTask = /task|goal|objective|responsibility|needed to/i.test(answer);
    const hasAction = /action|i did|i implemented|i created|i led|i worked/i.test(answer);
    const hasResult = /result|outcome|impact|achieved|improved|delivered|success/i.test(answer);
    
    if (hasSituation && hasTask && hasAction && hasResult) {
      score += 1.5;
      indicators.push('Effective use of STAR method');
    } else if ((hasSituation && hasAction) || (hasAction && hasResult)) {
      score += 0.5;
      indicators.push('Partial story structure');
    } else {
      indicators.push('Consider using STAR method (Situation, Task, Action, Result)');
    }
    
    // Check for quantification
    if (/\d+%|\d+ percent|\d+ times|\d+ hours|\$[\d,]+|\d+ users|\d+ projects/i.test(answer)) {
      score += 0.5;
      indicators.push('Good use of quantification');
    }
  } else if (category === 'technical') {
    // Check for technical depth
    const hasCodeExample = /```|function|class|const|let|var|import|export/i.test(answer);
    const hasComplexity = /O\(|complexity|efficient|optimize|trade-off|time|space/i.test(answer);
    const hasExample = /for example|instance|such as|e\.g\.|specifically/i.test(answer);
    
    if (hasCodeExample) {
      score += 0.5;
      indicators.push('Provided code example');
    }
    if (hasComplexity) {
      score += 0.5;
      indicators.push('Discussed complexity/efficiency');
    }
    if (hasExample) {
      score += 0.5;
      indicators.push('Provided specific examples');
    }
  } else if (category === 'system') {
    // Check for system design elements
    const hasComponents = /component|service|database|cache|queue|api|server|client/i.test(answer);
    const hasScalability = /scale|scalability|load|traffic|concurrent|distributed/i.test(answer);
    const hasTradeoffs = /trade-off|tradeoff|pro|con|advantage|disadvantage|versus|vs/i.test(answer);
    const hasDiagram = /diagram|architecture|flow|draw|figure/i.test(answer);
    
    if (hasComponents) {
      score += 0.5;
      indicators.push('Identified system components');
    }
    if (hasScalability) {
      score += 0.5;
      indicators.push('Addressed scalability');
    }
    if (hasTradeoffs) {
      score += 0.5;
      indicators.push('Discussed trade-offs');
    }
  }
  
  return {
    score: Math.min(10, Math.max(1, score)),
    indicators
  };
}

// Analyze answer depth
function analyzeDepth(answer: string, difficulty: Difficulty): number {
  const wordCount = answer.split(/\s+/).length;
  const sentenceCount = answer.split(/[.!?]+/).filter(s => s.trim()).length;
  const avgWordsPerSentence = wordCount / Math.max(sentenceCount, 1);
  
  let depthScore = 5;
  
  // Adjust based on difficulty expectations
  if (difficulty === 'senior') {
    if (wordCount >= 150) depthScore += 2;
    else if (wordCount >= 100) depthScore += 1;
    else depthScore -= 1;
    
    if (avgWordsPerSentence >= 15) depthScore += 1;
  } else if (difficulty === 'mid') {
    if (wordCount >= 100) depthScore += 1.5;
    else if (wordCount >= 60) depthScore += 0.5;
    else depthScore -= 0.5;
    
    if (avgWordsPerSentence >= 12) depthScore += 0.5;
  } else {
    if (wordCount >= 50) depthScore += 1;
    else if (wordCount >= 30) depthScore += 0.5;
    
    if (avgWordsPerSentence >= 10) depthScore += 0.5;
  }
  
  return Math.min(10, Math.max(1, depthScore));
}

// Generate strengths based on analysis
function generateStrengths(
  coveredConcepts: string[],
  qualityIndicators: string[],
  category: Category,
  relevanceScore: number
): string[] {
  const strengths: string[] = [];
  
  if (relevanceScore >= 7) {
    strengths.push('Strong understanding of the core concepts');
  } else if (relevanceScore >= 5) {
    strengths.push('Good grasp of relevant topics');
  }
  
  if (coveredConcepts.length >= 3) {
    strengths.push(`Covered key concepts: ${coveredConcepts.slice(0, 3).join(', ')}`);
  }
  
  // Add quality indicators as strengths
  const positiveIndicators = qualityIndicators.filter(i => 
    !i.includes('too brief') && !i.includes('Consider')
  );
  strengths.push(...positiveIndicators);
  
  // Category-specific strengths
  if (category === 'behavioral') {
    if (qualityIndicators.some(i => i.includes('STAR'))) {
      strengths.push('Well-structured response using STAR method');
    }
    if (qualityIndicators.some(i => i.includes('quantification'))) {
      strengths.push('Provided measurable outcomes');
    }
  }
  
  return strengths.slice(0, 4);
}

// Generate improvements based on analysis
function generateImprovements(
  missedConcepts: string[],
  qualityIndicators: string[],
  category: Category,
  depthScore: number,
  relevanceScore: number
): string[] {
  const improvements: string[] = [];
  
  if (relevanceScore < 5) {
    improvements.push('Focus more directly on the question topic');
  }
  
  if (depthScore < 5) {
    improvements.push('Provide more detailed explanation with specific examples');
  }
  
  if (missedConcepts.length > 0) {
    improvements.push(`Consider discussing: ${missedConcepts.slice(0, 2).join(', ')}`);
  }
  
  // Add improvement suggestions from quality analysis
  const negativeIndicators = qualityIndicators.filter(i => 
    i.includes('too brief') || i.includes('Consider')
  );
  improvements.push(...negativeIndicators);
  
  // Category-specific improvements
  if (category === 'behavioral') {
    if (!qualityIndicators.some(i => i.includes('STAR'))) {
      improvements.push('Structure your answer using STAR method (Situation, Task, Action, Result)');
    }
    if (!qualityIndicators.some(i => i.includes('quantification'))) {
      improvements.push('Add quantifiable metrics to demonstrate impact');
    }
  } else if (category === 'technical') {
    improvements.push('Include code examples or pseudo-code when applicable');
    improvements.push('Discuss time/space complexity for algorithm questions');
  } else if (category === 'system') {
    improvements.push('Address scalability and fault tolerance');
    improvements.push('Discuss trade-offs between different approaches');
  }
  
  return improvements.slice(0, 4);
}

// Generate sample answer hints
function generateSampleAnswerHint(
  question: string,
  category: Category,
  role: Role,
  coveredConcepts: string[]
): string {
  const roleKnowledge = roleKnowledgeBase[role];
  
  if (category === 'behavioral') {
    return `A strong answer would use the STAR method:
- Situation: Describe a specific context or challenge
- Task: Explain what you needed to accomplish
- Action: Detail the steps you took
- Result: Share the outcome with quantifiable metrics

For your role as ${roleKnowledge.title}, focus on examples that demonstrate: ${roleKnowledge.keySkills.slice(0, 3).join(', ')}.`;
  } else if (category === 'technical') {
    return `A comprehensive technical answer should:
1. Define the core concept clearly
2. Explain how it works in practice
3. Provide a concrete example
4. Discuss trade-offs or best practices
5. Mention relevant tools: ${roleKnowledge.commonTools.slice(0, 3).join(', ')}`;
  } else {
    return `A good system design answer includes:
1. Requirements clarification
2. High-level architecture overview
3. Component breakdown
4. Scalability considerations
5. Trade-offs and alternatives
6. Potential bottlenecks and solutions

Key technologies for ${roleKnowledge.title}: ${roleKnowledge.commonTools.slice(0, 5).join(', ')}`;
  }
}

// Generate follow-up question suggestion
function generateFollowUpSuggestion(
  answer: string,
  category: Category,
  coveredConcepts: string[]
): string {
  const wordCount = answer.split(/\s+/).length;
  
  if (wordCount < 50) {
    return `${followUpTriggers.tooBrief} the technical aspects of your approach?`;
  }
  
  if (!/for example|instance|such as|specifically/i.test(answer)) {
    return `${followUpTriggers.missingExample} a situation where you applied this?`;
  }
  
  if (!/result|outcome|impact|achieved|improved/i.test(answer)) {
    return `${followUpTriggers.needsOutcome} your approach?`;
  }
  
  if (!/challenge|difficult|problem|issue|blocker/i.test(answer)) {
    return `${followUpTriggers.needsChallenge} implementing this solution?`;
  }
  
  return `${followUpTriggers.needsDepth} the decision-making process?`;
}

// Main evaluation function
export function evaluateAnswer(
  answer: string,
  context: QuestionContext
): EvaluationResult {
  // First check for irrelevant input
  const irrelevantCheck = detectIrrelevantInput(answer, context.question);
  
  if (irrelevantCheck.isIrrelevant) {
    return {
      isRelevant: false,
      relevanceScore: 0,
      qualityScore: 0,
      depthScore: 0,
      overallScore: 0,
      strengths: [],
      improvements: [irrelevantCheck.reason],
      coveredConcepts: [],
      missedConcepts: [],
      feedback: irrelevantCheck.reason,
      sampleAnswer: 'Please try again with a relevant and detailed answer to the question asked.'
    };
  }
  
  // Calculate relevance score
  const { score: relevanceScore, coveredConcepts, missedConcepts } = calculateRelevanceScore(
    answer,
    context.topics,
    context.category
  );
  
  // Analyze quality
  const { score: qualityScore, indicators: qualityIndicators } = analyzeQuality(
    answer,
    context.category
  );
  
  // Analyze depth
  const depthScore = analyzeDepth(answer, context.difficulty);
  
  // Calculate overall score
  const overallScore = (
    relevanceScore * 0.4 +
    qualityScore * 0.35 +
    depthScore * 0.25
  );
  
  // Generate feedback components
  const strengths = generateStrengths(
    coveredConcepts,
    qualityIndicators,
    context.category,
    relevanceScore
  );
  
  const improvements = generateImprovements(
    missedConcepts,
    qualityIndicators,
    context.category,
    depthScore,
    relevanceScore
  );
  
  const sampleAnswer = generateSampleAnswerHint(
    context.question,
    context.category,
    context.role,
    coveredConcepts
  );
  
  const followUpSuggestion = generateFollowUpSuggestion(
    answer,
    context.category,
    coveredConcepts
  );
  
  // Generate main feedback
  let feedback = '';
  
  if (overallScore >= 8) {
    feedback = `Excellent answer! You demonstrated strong understanding and provided comprehensive coverage of the topic. ${strengths[0] || 'Your response was well-structured and relevant.'}`;
  } else if (overallScore >= 6) {
    feedback = `Good answer with solid understanding. ${strengths[0] || 'You covered the main points well.'} ${improvements[0] || 'Consider adding more specific examples.'}`;
  } else if (overallScore >= 4) {
    feedback = `Your answer shows basic understanding but needs improvement. ${improvements[0] || 'Try to provide more specific examples and details.'} ${improvements[1] || ''}`;
  } else {
    feedback = `Your answer needs significant improvement. Focus on addressing the core question more directly. ${improvements.slice(0, 2).join(' ')}`;
  }
  
  return {
    isRelevant: true,
    relevanceScore: Math.round(relevanceScore * 10) / 10,
    qualityScore: Math.round(qualityScore * 10) / 10,
    depthScore: Math.round(depthScore * 10) / 10,
    overallScore: Math.round(overallScore * 10) / 10,
    strengths,
    improvements,
    coveredConcepts,
    missedConcepts,
    feedback,
    sampleAnswer,
    followUpSuggestion
  };
}

export default evaluateAnswer;
