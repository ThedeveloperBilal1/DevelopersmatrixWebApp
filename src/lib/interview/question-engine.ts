// Question Generation Engine - Dynamically generates interview questions based on role, category, and difficulty

import {
  Role,
  Category,
  Difficulty,
  Topic,
  roleKnowledgeBase,
  behavioralTemplates,
  technicalTemplates,
  systemDesignTemplates,
  difficultyPatterns
} from './knowledge-base';

export interface GeneratedQuestion {
  question: string;
  category: Category;
  difficulty: Difficulty;
  role: Role;
  topics: Topic[];
  expectedConcepts: string[];
  hints: string[];
}

// Context fillers for question templates
const contextFillers = {
  actions: [
    'resolved a conflict',
    'made a difficult decision',
    'led a team',
    'implemented a new process',
    'handled a challenging situation',
    'dealt with a tight deadline',
    'collaborated with stakeholders',
    'overcame a technical challenge',
    'improved team productivity',
    'managed competing priorities'
  ],
  contexts: [
    'high-pressure',
    'cross-functional',
    'remote team',
    'startup',
    'enterprise',
    'agile',
    'fast-paced',
    'multicultural team',
    'distributed'
  ],
  challenges: [
    'a technical blocker',
    'a resource constraint',
    'a scope creep',
    'a team conflict',
    'a changing requirement',
    'a performance issue',
    'a tight budget',
    'a legacy codebase'
  ],
  stakeholders: [
    'senior leadership',
    'product managers',
    'designers',
    'customers',
    'cross-functional teams',
    'external vendors',
    'executive stakeholders'
  ],
  aspects: [
    'technical problem',
    'team dynamic',
    'project deadline',
    'stakeholder expectation',
    'performance optimization',
    'code quality',
    'system architecture'
  ],
  fields: [
    'software development',
    'web technologies',
    'cloud computing',
    'DevOps',
    'data engineering',
    'mobile development',
    'AI and machine learning'
  ],
  concepts: {
    frontend: [
      'React hooks',
      'CSS Grid',
      'responsive design',
      'state management',
      'component lifecycle',
      'virtual DOM',
      'server-side rendering',
      'progressive web apps'
    ],
    backend: [
      'REST APIs',
      'database indexing',
      'microservices',
      'caching strategies',
      'authentication flows',
      'message queues',
      'load balancing',
      'API rate limiting'
    ],
    fullstack: [
      'full-stack architecture',
      'API integration',
      'authentication systems',
      'database design',
      'deployment pipelines',
      'testing strategies'
    ],
    devops: [
      'CI/CD pipelines',
      'container orchestration',
      'infrastructure as code',
      'monitoring systems',
      'deployment strategies',
      'cloud infrastructure'
    ],
    datascience: [
      'feature engineering',
      'model validation',
      'hyperparameter tuning',
      'data preprocessing',
      'ensemble methods',
      'cross-validation'
    ],
    general: [
      'object-oriented programming',
      'design patterns',
      'version control',
      'code review',
      'testing methodologies',
      'agile practices'
    ]
  },
  features: [
    'real-time notifications',
    'search functionality',
    'user authentication',
    'data export',
    'dashboard analytics',
    'file upload system',
    'payment integration',
    'chat system'
  ],
  systems: [
    'e-commerce platform',
    'social media application',
    'content management system',
    'booking system',
    'analytics dashboard',
    'messaging platform',
    'streaming service'
  ],
  scales: [
    '1 million users',
    '1000 requests per second',
    'petabytes of data',
    'global traffic',
    'high availability',
    'multi-region deployment'
  ],
  requirements: [
    'low latency',
    'high availability',
    'data consistency',
    'real-time updates',
    'offline support',
    'security compliance'
  ],
  symptoms: [
    'the application is running slowly',
    'users are experiencing timeout errors',
    'data is not being saved correctly',
    'the page is not rendering properly',
    'API calls are failing intermittently',
    'memory usage keeps increasing',
    'the application crashes under load'
  ],
  problems: [
    'that the application is not loading',
    'slow response times on certain pages',
    'data inconsistency across different views',
    'authentication failures',
    'missing data in reports',
    'broken functionality after an update'
  ],
  issues: [
    'a memory leak',
    'a race condition',
    'an infinite loop',
    'incorrect data validation',
    'missing error handling',
    'improper resource cleanup'
  ],
  practices: [
    'error handling',
    'code organization',
    'API design',
    'database queries',
    'authentication',
    'testing',
    'code review'
  ],
  activities: [
    'building new features',
    'writing production code',
    'deploying to production',
    'reviewing code',
    'debugging issues',
    'optimizing performance'
  ]
};

// Select random items from array
function randomSelect<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Select random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a behavioral question
function generateBehavioralQuestion(
  role: Role,
  difficulty: Difficulty,
  topics: Topic[]
): { question: string; expectedConcepts: string[] } {
  const roleKnowledge = roleKnowledgeBase[role];
  const templateCategory = randomItem(['situation', 'challenge', 'growth', 'leadership', 'problemSolving'] as const);
  const templates = behavioralTemplates[templateCategory];
  const template = randomItem(templates);
  
  const action = randomItem(contextFillers.actions);
  const context = randomItem(contextFillers.contexts);
  const challenge = randomItem(contextFillers.challenges);
  const stakeholder = randomItem(contextFillers.stakeholders);
  const aspect = randomItem(contextFillers.aspects);
  const field = randomItem(contextFillers.fields);
  
  let question = template
    .replace('{action}', action)
    .replace('{context}', context)
    .replace('{challenge}', challenge)
    .replace('{stakeholder}', stakeholder)
    .replace('{aspect}', aspect)
    .replace('{field}', field)
    .replace('{role}', roleKnowledge.title.toLowerCase());
  
  // Add difficulty-specific elements
  if (difficulty === 'senior') {
    const seniorAdditions = [
      ' How did you ensure long-term sustainability of your solution?',
      ' What would you do differently if faced with a similar situation today?',
      ' How did this experience influence your approach to similar challenges?'
    ];
    question += randomItem(seniorAdditions);
  } else if (difficulty === 'mid') {
    const midAdditions = [
      ' What did you learn from this experience?',
      ' How did you measure the success of your approach?',
      ' What obstacles did you encounter along the way?'
    ];
    question += randomItem(midAdditions);
  }
  
  const expectedConcepts = [
    ...randomSelect(topics[0]?.keywords || roleKnowledge.keySkills, 3),
    ...randomSelect(roleKnowledge.idealAnswerPatterns.structure, 2)
  ];
  
  return { question, expectedConcepts };
}

// Generate a technical question
function generateTechnicalQuestion(
  role: Role,
  difficulty: Difficulty,
  topics: Topic[]
): { question: string; expectedConcepts: string[] } {
  const roleKnowledge = roleKnowledgeBase[role];
  const templateCategory = randomItem(['concept', 'implementation', 'debugging', 'bestPractices'] as const);
  const templates = technicalTemplates[templateCategory];
  const template = randomItem(templates);
  
  // Select appropriate concepts based on role
  let conceptCategory = 'general';
  if (role === 'frontend-developer') conceptCategory = 'frontend';
  else if (role === 'backend-developer') conceptCategory = 'backend';
  else if (role === 'fullstack-developer') conceptCategory = 'fullstack';
  else if (role === 'devops-engineer') conceptCategory = 'devops';
  else if (role === 'data-scientist' || role === 'data-analyst') conceptCategory = 'datascience';
  
  const concepts = contextFillers.concepts[conceptCategory as keyof typeof contextFillers.concepts] || contextFillers.concepts.general;
  const concept = randomItem(concepts);
  const concept1 = randomItem(concepts);
  let concept2 = randomItem(concepts.filter(c => c !== concept1));

  const feature = randomItem(contextFillers.features);
  const system = randomItem(contextFillers.systems);
  const practice = randomItem(contextFillers.practices);
  const symptom = randomItem(contextFillers.symptoms);
  const problem = randomItem(contextFillers.problems);
  const issue = randomItem(contextFillers.issues);
  const activity = randomItem(contextFillers.activities);

  let question = template
    .replace('{concept}', concept)
    .replace('{concept1}', concept1)
    .replace('{concept2}', concept2)
    .replace('{feature}', feature)
    .replace('{system}', system)
    .replace('{practice}', practice)
    .replace('{symptom}', symptom)
    .replace('{problem}', problem)
    .replace('{issue}', issue)
    .replace('{activity}', activity)
    .replace('{context}', roleKnowledge.title.toLowerCase())
    .replace('{aspect}', randomItem(['performance', 'security', 'scalability', 'maintainability']));

  // Add difficulty-specific depth
  if (difficulty === 'senior') {
    const seniorDeepeners = [
      ' Discuss the trade-offs involved.',
      ' How would this scale to production workloads?',
      ' What alternatives did you consider and why?',
      ' How would you handle edge cases and failure scenarios?'
    ];
    question += randomItem(seniorDeepeners);
  } else if (difficulty === 'mid') {
    const midDeepeners = [
      ' Provide a concrete example.',
      ' What are the common pitfalls to avoid?',
      ' How would you test this implementation?'
    ];
    question += randomItem(midDeepeners);
  }
  
  const topicKeywords = topics.flatMap(t => t.keywords);
  const expectedConcepts = randomSelect(topicKeywords.length > 0 ? topicKeywords : roleKnowledge.keySkills, 4);
  
  return { question, expectedConcepts };
}

// Generate a system design question
function generateSystemDesignQuestion(
  role: Role,
  difficulty: Difficulty,
  topics: Topic[]
): { question: string; expectedConcepts: string[] } {
  const roleKnowledge = roleKnowledgeBase[role];
  const templateCategory = randomItem(['architecture', 'scalability', 'dataDesign', 'tradeoffs'] as const);
  const templates = systemDesignTemplates[templateCategory];
  const template = randomItem(templates);
  
  const system = randomItem(contextFillers.systems);
  const scale = randomItem(contextFillers.scales);
  const requirement = randomItem(contextFillers.requirements);
  const feature = randomItem(contextFillers.features);
  
  let question = template
    .replace('{system}', system)
    .replace('{scale}', scale)
    .replace('{load}', scale)
    .replace('{requirement}', requirement)
    .replace('{application}', randomItem(['an e-commerce platform', 'a social network', 'a content platform', 'a SaaS product']))
    .replace('{useCase}', randomItem(['user management', 'content delivery', 'real-time updates', 'data analytics']))
    .replace('{component}', randomItem(['the database layer', 'the API gateway', 'the caching layer', 'the message queue']))
    .replace('{quality}', randomItem(['high availability', 'low latency', 'strong consistency', 'data durability']))
    .replace('{quality1}', randomItem(['performance', 'consistency', 'availability', 'simplicity']))
    .replace('{quality2}', randomItem(['simplicity', 'latency', 'cost', 'complexity']))
    .replace('{approach}', randomItem(['microservices', 'monolith', 'serverless', 'event-driven']))
    .replace('{option1}', randomItem(['SQL databases', 'microservices', 'synchronous communication']))
    .replace('{option2}', randomItem(['NoSQL databases', 'monolith', 'asynchronous messaging']))
    .replace('{service}', randomItem(['user authentication', 'payment processing', 'notification service', 'search service']))
    .replace('{constraints}', randomItem(['limited budget', 'strict compliance requirements', 'legacy integration needs']));
  
  // Add difficulty-specific requirements
  if (difficulty === 'senior') {
    const seniorAdditions = [
      ' Discuss failure modes and disaster recovery.',
      ' How would you handle multi-region deployment?',
      ' Include considerations for monitoring and observability.',
      ' Address security and compliance requirements.'
    ];
    question += randomItem(seniorAdditions);
  } else if (difficulty === 'mid') {
    const midAdditions = [
      ' What technologies would you choose and why?',
      ' How would you handle scaling to 10x traffic?',
      ' Include a discussion of potential bottlenecks.'
    ];
    question += randomItem(midAdditions);
  }
  
  const systemConcepts = [
    'scalability', 'availability', 'consistency', 'partitioning',
    'caching', 'load balancing', 'replication', 'sharding',
    'microservices', 'API design', 'database selection'
  ];
  
  const expectedConcepts = randomSelect(systemConcepts, 4);
  
  return { question, expectedConcepts };
}

// Generate hints based on question
function generateHints(
  category: Category,
  difficulty: Difficulty,
  expectedConcepts: string[]
): string[] {
  const hints: string[] = [];
  
  if (category === 'behavioral') {
    hints.push('Use the STAR method: Situation, Task, Action, Result');
    hints.push('Be specific about your role and contributions');
    if (difficulty === 'senior') {
      hints.push('Discuss the broader impact and lessons learned');
    }
  } else if (category === 'technical') {
    hints.push('Explain your thought process clearly');
    hints.push('Mention relevant trade-offs and alternatives');
    if (expectedConcepts.length > 0) {
      hints.push(`Consider discussing: ${expectedConcepts.slice(0, 2).join(', ')}`);
    }
  } else {
    hints.push('Start with requirements clarification');
    hints.push('Discuss components and their interactions');
    hints.push('Address scalability and reliability');
  }
  
  return hints.slice(0, 3);
}

// Main question generation function
export function generateQuestion(
  role: Role,
  category: Category,
  difficulty: Difficulty
): GeneratedQuestion {
  const roleKnowledge = roleKnowledgeBase[role];
  
  // Get topics for the category
  const topics = roleKnowledge.topics[category] || roleKnowledge.topics.technical;
  
  // Generate question based on category
  let questionResult: { question: string; expectedConcepts: string[] };
  
  switch (category) {
    case 'behavioral':
      questionResult = generateBehavioralQuestion(role, difficulty, topics);
      break;
    case 'technical':
      questionResult = generateTechnicalQuestion(role, difficulty, topics);
      break;
    case 'system':
      questionResult = generateSystemDesignQuestion(role, difficulty, topics);
      break;
    default:
      questionResult = generateBehavioralQuestion(role, difficulty, topics);
  }
  
  const hints = generateHints(category, difficulty, questionResult.expectedConcepts);
  
  return {
    question: questionResult.question,
    category,
    difficulty,
    role,
    topics,
    expectedConcepts: questionResult.expectedConcepts,
    hints
  };
}

// Generate a follow-up question based on previous answer
export function generateFollowUpQuestion(
  originalQuestion: string,
  answer: string,
  role: Role,
  category: Category,
  difficulty: Difficulty
): GeneratedQuestion {
  const roleKnowledge = roleKnowledgeBase[role];
  const topics = roleKnowledge.topics[category] || roleKnowledge.topics.technical;
  
  // Analyze what was covered in the answer
  const answerLower = answer.toLowerCase();
  
  // Generate contextual follow-up
  let followUpQuestion = '';
  let expectedConcepts: string[] = [];
  
  if (category === 'behavioral') {
    // Check what's missing
    if (!/result|outcome|impact|achieved/i.test(answer)) {
      followUpQuestion = "That's interesting. What was the final outcome or impact of your actions?";
      expectedConcepts = ['outcome', 'impact', 'results'];
    } else if (!/challenge|difficult|problem/i.test(answer)) {
      followUpQuestion = "What were the main challenges you faced during this process?";
      expectedConcepts = ['challenges', 'obstacles', 'solutions'];
    } else if (!/\d+%|\d+ percent|\d+ times|\d+ users/i.test(answer)) {
      followUpQuestion = "Can you quantify the results? Do you have any specific metrics or numbers to share?";
      expectedConcepts = ['metrics', 'quantification', 'measurement'];
    } else {
      followUpQuestion = "How has this experience influenced your approach to similar situations since then?";
      expectedConcepts = ['growth', 'learning', 'application'];
    }
  } else if (category === 'technical') {
    if (!/example|instance|specifically/i.test(answer)) {
      followUpQuestion = "Can you provide a concrete code example or specific implementation detail?";
      expectedConcepts = ['implementation', 'code example', 'specifics'];
    } else if (!/trade-off|advantage|disadvantage|pro|con/i.test(answer)) {
      followUpQuestion = "What are the trade-offs or alternatives to this approach?";
      expectedConcepts = ['trade-offs', 'alternatives', 'comparison'];
    } else if (!/scale|performance|optimize|efficient/i.test(answer)) {
      followUpQuestion = "How would this solution perform at scale? What optimizations would you consider?";
      expectedConcepts = ['scalability', 'performance', 'optimization'];
    } else {
      followUpQuestion = "How would you test this implementation? What edge cases would you consider?";
      expectedConcepts = ['testing', 'edge cases', 'validation'];
    }
  } else {
    // System design follow-ups
    if (!/scale|scalability|traffic/i.test(answer)) {
      followUpQuestion = "How would you scale this system to handle 10x the current load?";
      expectedConcepts = ['horizontal scaling', 'vertical scaling', 'partitioning'];
    } else if (!/fail|failure|reliability|available/i.test(answer)) {
      followUpQuestion = "How would you ensure high availability and handle potential failures?";
      expectedConcepts = ['redundancy', 'failover', 'disaster recovery'];
    } else if (!/cache|cache/i.test(answer)) {
      followUpQuestion = "What caching strategy would you implement to improve performance?";
      expectedConcepts = ['caching', 'CDN', 'read replicas'];
    } else {
      followUpQuestion = "What monitoring and observability would you implement for this system?";
      expectedConcepts = ['monitoring', 'logging', 'alerting', 'metrics'];
    }
  }
  
  // Adjust difficulty for follow-up
  const adjustedDifficulty = difficulty === 'entry' ? 'mid' : difficulty;
  
  return {
    question: followUpQuestion,
    category,
    difficulty: adjustedDifficulty,
    role,
    topics,
    expectedConcepts,
    hints: generateHints(category, adjustedDifficulty, expectedConcepts)
  };
}

// Adaptive difficulty adjustment
export function adjustDifficulty(
  currentDifficulty: Difficulty,
  recentScores: number[]
): Difficulty {
  if (recentScores.length < 2) return currentDifficulty;
  
  const avgScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  
  if (avgScore >= 8 && currentDifficulty !== 'senior') {
    // Performing well, increase difficulty
    return currentDifficulty === 'entry' ? 'mid' : 'senior';
  } else if (avgScore < 5 && currentDifficulty !== 'entry') {
    // Struggling, decrease difficulty
    return currentDifficulty === 'senior' ? 'mid' : 'entry';
  }
  
  return currentDifficulty;
}

export default generateQuestion;
