// Comprehensive Knowledge Base for Interview Question Generation and Answer Evaluation

export type Role =
  | 'software-developer'
  | 'frontend-developer'
  | 'backend-developer'
  | 'fullstack-developer'
  | 'devops-engineer'
  | 'data-scientist'
  | 'data-analyst'
  | 'product-manager'
  | 'engineering-manager'
  | 'mobile-developer'
  | 'qa-engineer'
  | 'system-architect';

export type Category = 'behavioral' | 'technical' | 'system';
export type Difficulty = 'entry' | 'mid' | 'senior';

export interface Topic {
  name: string;
  keywords: string[];
  concepts: string[];
  relatedTopics: string[];
}

export interface RoleKnowledge {
  title: string;
  description: string;
  topics: {
    technical: Topic[];
    behavioral: Topic[];
    system: Topic[];
  };
  keySkills: string[];
  commonTools: string[];
  idealAnswerPatterns: {
    structure: string[];
    mustMention: string[];
    bonusPoints: string[];
  };
}

// Behavioral question templates
export const behavioralTemplates = {
  situation: [
    "Tell me about a time when you {action} in a {context} situation.",
    "Describe a situation where you had to {action}. What was the outcome?",
    "Give me an example of when you {action}. How did you handle it?",
    "Share an experience where you faced {challenge}. How did you resolve it?",
    "Can you walk me through a time when you had to {action} with {stakeholder}?"
  ],
  challenge: [
    "What was the most challenging {aspect} you've faced, and how did you overcome it?",
    "Describe a project where things didn't go as planned. How did you adapt?",
    "Tell me about a time when you had to make a difficult decision with limited information.",
    "How have you handled a situation where you disagreed with a team member or stakeholder?",
    "Describe a time when you had to balance competing priorities. How did you manage?"
  ],
  growth: [
    "How have you grown professionally in your role as a {role}?",
    "Tell me about a skill you developed recently. How did you approach learning it?",
    "Describe a situation where you received critical feedback. How did you respond?",
    "What's a mistake you made that taught you an important lesson?",
    "How do you stay current with developments in {field}?"
  ],
  leadership: [
    "Tell me about a time you led a team or project. What was your approach?",
    "How have you mentored or helped junior team members grow?",
    "Describe a situation where you had to influence others without formal authority.",
    "Give an example of how you've contributed to improving team processes.",
    "How do you handle conflict within your team?"
  ],
  problemSolving: [
    "Describe a complex problem you solved. What was your approach?",
    "Tell me about a time when you had to think creatively to solve an issue.",
    "How have you handled a situation where you didn't have all the information needed?",
    "Give an example of when you had to make a trade-off between speed and quality.",
    "Describe a time when you identified and fixed a significant bug or issue."
  ]
};

// Technical question templates by category
export const technicalTemplates = {
  concept: [
    "Explain {concept} and how it applies to {context}.",
    "What is {concept} and when would you use it in {context}?",
    "Can you describe how {concept} works? Provide an example.",
    "Compare and contrast {concept1} and {concept2}. When would you use each?",
    "What are the trade-offs when using {concept} in a production environment?"
  ],
  implementation: [
    "How would you implement {feature} in a {context} application?",
    "Walk me through how you would build {system} from scratch.",
    "Describe the steps to optimize {aspect} in a {context} system.",
    "How would you refactor legacy code that {issue}?",
    "What approach would you take to add {feature} to an existing {system}?"
  ],
  debugging: [
    "How would you debug an issue where {symptom}?",
    "A user reports {problem}. How would you investigate and resolve it?",
    "How would you troubleshoot a performance issue in {context}?",
    "What steps would you take to identify the root cause of {issue}?",
    "Describe your approach to fixing a critical bug in production."
  ],
  bestPractices: [
    "What are the best practices for {practice} in {context}?",
    "How do you ensure code quality when {activity}?",
    "What security considerations should you keep in mind when {activity}?",
    "How do you approach testing for {feature}?",
    "What documentation practices do you follow for {context}?"
  ]
};

// System design question templates
export const systemDesignTemplates = {
  architecture: [
    "Design a {system} that can handle {scale}.",
    "How would you architect a {system} from scratch?",
    "Design the system architecture for {application}.",
    "How would you design a {system} that needs to support {requirement}?",
    "Create a high-level design for {system} with {constraints}."
  ],
  scalability: [
    "How would you scale a {system} to handle {load}?",
    "Design a system that can handle {scale} concurrent users.",
    "What strategies would you use to scale {component}?",
    "How would you design for {scale} while maintaining {quality}?",
    "Explain how you would handle traffic spikes in {system}."
  ],
  dataDesign: [
    "Design a database schema for {application}.",
    "How would you structure data for {useCase}?",
    "Design a caching strategy for {system}.",
    "How would you handle data consistency in a distributed {system}?",
    "Design an API for {service}."
  ],
  tradeoffs: [
    "What trade-offs would you consider when designing {system}?",
    "Compare different approaches for implementing {feature}.",
    "How would you decide between {option1} and {option2} for {context}?",
    "What are the pros and cons of {approach} for {useCase}?",
    "How do you balance {quality1} vs {quality2} in system design?"
  ]
};

// Role-specific knowledge bases
export const roleKnowledgeBase: Record<Role, RoleKnowledge> = {
  'software-developer': {
    title: 'Software Developer',
    description: 'General software development including coding, debugging, and building applications',
    topics: {
      technical: [
        {
          name: 'Programming Fundamentals',
          keywords: ['variables', 'functions', 'loops', 'conditions', 'data types', 'algorithms', 'complexity'],
          concepts: ['time complexity', 'space complexity', 'big O notation', 'data structures', 'recursion', 'iteration'],
          relatedTopics: ['Algorithms', 'Data Structures']
        },
        {
          name: 'Object-Oriented Programming',
          keywords: ['class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction'],
          concepts: ['SOLID principles', 'design patterns', 'composition over inheritance', 'dependency injection'],
          relatedTopics: ['Design Patterns', 'Software Architecture']
        },
        {
          name: 'Version Control',
          keywords: ['git', 'branch', 'merge', 'commit', 'pull request', 'conflict', 'rebase'],
          concepts: ['branching strategies', 'code review', 'continuous integration', 'versioning'],
          relatedTopics: ['DevOps', 'Team Collaboration']
        },
        {
          name: 'APIs and Web Services',
          keywords: ['REST', 'API', 'endpoint', 'HTTP', 'JSON', 'authentication', 'authorization'],
          concepts: ['RESTful design', 'API versioning', 'rate limiting', 'caching', 'pagination'],
          relatedTopics: ['Backend Development', 'Microservices']
        },
        {
          name: 'Testing',
          keywords: ['unit test', 'integration test', 'TDD', 'mock', 'assertion', 'coverage'],
          concepts: ['test-driven development', 'test coverage', 'mocking', 'test automation', 'regression testing'],
          relatedTopics: ['Quality Assurance', 'CI/CD']
        }
      ],
      behavioral: [
        {
          name: 'Problem Solving',
          keywords: ['challenge', 'solution', 'approach', 'outcome', 'learned', 'resolved'],
          concepts: ['analytical thinking', 'root cause analysis', 'creative problem solving', 'decision making'],
          relatedTopics: ['Leadership', 'Communication']
        },
        {
          name: 'Teamwork',
          keywords: ['collaboration', 'team', 'communicate', 'together', 'support', 'contribute'],
          concepts: ['collaboration', 'conflict resolution', 'knowledge sharing', 'mentorship'],
          relatedTopics: ['Communication', 'Leadership']
        },
        {
          name: 'Adaptability',
          keywords: ['change', 'adapt', 'new', 'learn', 'flexible', 'pivot'],
          concepts: ['continuous learning', 'embrace change', 'growth mindset', 'resilience'],
          relatedTopics: ['Growth', 'Learning']
        }
      ],
      system: [
        {
          name: 'Application Architecture',
          keywords: ['architecture', 'components', 'modules', 'layers', 'separation', 'concerns'],
          concepts: ['layered architecture', 'modular design', 'separation of concerns', 'dependency management'],
          relatedTopics: ['Software Design', 'System Design']
        }
      ]
    },
    keySkills: ['coding', 'debugging', 'problem-solving', 'version control', 'testing', 'documentation'],
    commonTools: ['Git', 'VS Code', 'Docker', 'JIRA', 'CI/CD tools'],
    idealAnswerPatterns: {
      structure: ['situation', 'task', 'action', 'result'],
      mustMention: ['specific example', 'outcome', 'learnings'],
      bonusPoints: ['metrics', 'quantified results', 'reflection']
    }
  },

  'frontend-developer': {
    title: 'Frontend Developer',
    description: 'Building user interfaces and client-side applications',
    topics: {
      technical: [
        {
          name: 'JavaScript Fundamentals',
          keywords: ['closures', 'prototypes', 'async', 'promise', 'event loop', 'hoisting', 'scope'],
          concepts: ['event loop', 'asynchronous programming', 'prototypal inheritance', 'closures', 'event delegation'],
          relatedTopics: ['TypeScript', 'Node.js']
        },
        {
          name: 'React & State Management',
          keywords: ['components', 'hooks', 'state', 'props', 'redux', 'context', 'effect', 'render'],
          concepts: ['virtual DOM', 'component lifecycle', 'state management', 'hooks', 'reconciliation'],
          relatedTopics: ['Next.js', 'Vue', 'Angular']
        },
        {
          name: 'CSS & Styling',
          keywords: ['flexbox', 'grid', 'responsive', 'animation', 'sass', 'tailwind', 'bootstrap'],
          concepts: ['responsive design', 'CSS-in-JS', 'CSS modules', 'accessibility', 'cross-browser compatibility'],
          relatedTopics: ['UI/UX', 'Design Systems']
        },
        {
          name: 'Performance Optimization',
          keywords: ['lazy loading', 'code splitting', 'bundling', 'caching', 'optimization', 'rendering'],
          concepts: ['critical rendering path', 'lazy loading', 'memoization', 'virtual scrolling', 'web vitals'],
          relatedTopics: ['Web Performance', 'Core Web Vitals']
        },
        {
          name: 'Web APIs & Browser',
          keywords: ['DOM', 'localStorage', 'fetch', 'WebSocket', 'service worker', 'indexedDB'],
          concepts: ['browser storage', 'service workers', 'PWA', 'WebSockets', 'browser rendering'],
          relatedTopics: ['Progressive Web Apps', 'Web Standards']
        }
      ],
      behavioral: [
        {
          name: 'User Focus',
          keywords: ['user experience', 'accessibility', 'usability', 'feedback', 'testing', 'user'],
          concepts: ['user-centric design', 'accessibility', 'performance for users', 'responsive design'],
          relatedTopics: ['UX Design', 'Product Thinking']
        },
        {
          name: 'Collaboration with Designers',
          keywords: ['design', 'mockup', 'prototype', 'figma', 'implementation', 'feedback'],
          concepts: ['design handoff', 'design systems', 'prototyping', 'designer-developer collaboration'],
          relatedTopics: ['UI/UX', 'Design Systems']
        }
      ],
      system: [
        {
          name: 'Frontend Architecture',
          keywords: ['architecture', 'components', 'modules', 'micro-frontend', 'monorepo', 'bundling'],
          concepts: ['component architecture', 'micro-frontends', 'module federation', 'design systems'],
          relatedTopics: ['Software Architecture', 'Team Structure']
        }
      ]
    },
    keySkills: ['JavaScript/TypeScript', 'React/Vue/Angular', 'CSS', 'responsive design', 'performance optimization', 'accessibility'],
    commonTools: ['React', 'Vue', 'Webpack', 'Vite', 'Tailwind CSS', 'Figma', 'Chrome DevTools'],
    idealAnswerPatterns: {
      structure: ['context', 'challenge', 'solution', 'result'],
      mustMention: ['specific technology', 'performance impact', 'user benefit'],
      bonusPoints: ['metrics', 'accessibility consideration', 'cross-browser testing']
    }
  },

  'backend-developer': {
    title: 'Backend Developer',
    description: 'Building server-side applications and APIs',
    topics: {
      technical: [
        {
          name: 'API Design',
          keywords: ['REST', 'GraphQL', 'endpoint', 'routing', 'middleware', 'authentication', 'authorization'],
          concepts: ['RESTful principles', 'API versioning', 'rate limiting', 'pagination', 'error handling'],
          relatedTopics: ['Microservices', 'System Design']
        },
        {
          name: 'Databases',
          keywords: ['SQL', 'NoSQL', 'indexing', 'query', 'transaction', 'ACID', 'normalization', 'MongoDB', 'PostgreSQL'],
          concepts: ['database design', 'indexing strategies', 'query optimization', 'data modeling', 'sharding'],
          relatedTopics: ['Data Engineering', 'System Design']
        },
        {
          name: 'Server & Infrastructure',
          keywords: ['server', 'container', 'Docker', 'Kubernetes', 'load balancer', 'nginx', 'apache'],
          concepts: ['containerization', 'orchestration', 'load balancing', 'reverse proxy', 'auto-scaling'],
          relatedTopics: ['DevOps', 'Cloud Computing']
        },
        {
          name: 'Caching & Performance',
          keywords: ['Redis', 'Memcached', 'cache', 'CDN', 'latency', 'throughput', 'optimization'],
          concepts: ['caching strategies', 'cache invalidation', 'distributed caching', 'CDN optimization'],
          relatedTopics: ['System Performance', 'Scalability']
        },
        {
          name: 'Security',
          keywords: ['authentication', 'authorization', 'OAuth', 'JWT', 'encryption', 'SQL injection', 'XSS', 'CSRF'],
          concepts: ['authentication flows', 'authorization patterns', 'security best practices', 'OWASP'],
          relatedTopics: ['Web Security', 'Identity Management']
        }
      ],
      behavioral: [
        {
          name: 'System Reliability',
          keywords: ['uptime', 'monitoring', 'alerting', 'incident', 'recovery', 'reliability'],
          concepts: ['incident response', 'post-mortems', 'SLOs', 'error budgets', 'monitoring'],
          relatedTopics: ['DevOps', 'SRE']
        }
      ],
      system: [
        {
          name: 'Distributed Systems',
          keywords: ['distributed', 'microservices', 'consistency', 'availability', 'partition', 'CAP'],
          concepts: ['CAP theorem', 'eventual consistency', 'distributed transactions', 'message queues', 'event sourcing'],
          relatedTopics: ['System Design', 'Architecture']
        },
        {
          name: 'Scalability',
          keywords: ['scale', 'horizontal', 'vertical', 'sharding', 'replication', 'partitioning'],
          concepts: ['horizontal scaling', 'vertical scaling', 'database sharding', 'read replicas', 'auto-scaling'],
          relatedTopics: ['Cloud Architecture', 'Performance']
        }
      ]
    },
    keySkills: ['API development', 'database design', 'server management', 'security', 'performance optimization', 'testing'],
    commonTools: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS/GCP/Azure'],
    idealAnswerPatterns: {
      structure: ['requirements', 'design', 'implementation', 'testing', 'deployment'],
      mustMention: ['scalability consideration', 'security', 'error handling'],
      bonusPoints: ['trade-offs discussed', 'monitoring strategy', 'cost optimization']
    }
  },

  'fullstack-developer': {
    title: 'Full Stack Developer',
    description: 'Building complete web applications across frontend and backend',
    topics: {
      technical: [
        {
          name: 'Full Stack Architecture',
          keywords: ['frontend', 'backend', 'database', 'API', 'integration', 'architecture', 'stack'],
          concepts: ['application architecture', 'data flow', 'API integration', 'state management', 'deployment'],
          relatedTopics: ['System Design', 'Software Architecture']
        },
        {
          name: 'Database Integration',
          keywords: ['ORM', 'query', 'migration', 'schema', 'relation', 'model', 'connection'],
          concepts: ['ORM patterns', 'database migrations', 'connection pooling', 'query optimization'],
          relatedTopics: ['Backend Development', 'Data Modeling']
        },
        {
          name: 'Authentication & Authorization',
          keywords: ['auth', 'session', 'token', 'JWT', 'OAuth', 'login', 'permission', 'role'],
          concepts: ['authentication flows', 'session management', 'token-based auth', 'role-based access control'],
          relatedTopics: ['Security', 'Identity Management']
        }
      ],
      behavioral: [
        {
          name: 'End-to-End Ownership',
          keywords: ['ownership', 'feature', 'end-to-end', 'responsibility', 'delivery', 'complete'],
          concepts: ['feature ownership', 'cross-functional collaboration', 'delivery mindset', 'product thinking'],
          relatedTopics: ['Leadership', 'Product Development']
        }
      ],
      system: [
        {
          name: 'Application Architecture',
          keywords: ['monolith', 'microservice', 'layered', 'modular', 'scalable', 'maintainable'],
          concepts: ['monolithic architecture', 'microservices', 'layered architecture', 'modular design'],
          relatedTopics: ['System Design', 'Architecture Patterns']
        }
      ]
    },
    keySkills: ['frontend frameworks', 'backend development', 'database management', 'API design', 'deployment', 'testing'],
    commonTools: ['React/Vue', 'Node.js/Python/Java', 'PostgreSQL/MongoDB', 'Docker', 'Git', 'CI/CD'],
    idealAnswerPatterns: {
      structure: ['frontend approach', 'backend approach', 'integration', 'testing', 'deployment'],
      mustMention: ['both frontend and backend perspective', 'data flow', 'user experience'],
      bonusPoints: ['optimization strategies', 'security considerations', 'scalability']
    }
  },

  'devops-engineer': {
    title: 'DevOps Engineer',
    description: 'Building and maintaining CI/CD pipelines, infrastructure, and deployment automation',
    topics: {
      technical: [
        {
          name: 'CI/CD Pipelines',
          keywords: ['pipeline', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'build', 'deploy', 'automation'],
          concepts: ['continuous integration', 'continuous deployment', 'pipeline stages', 'artifact management', 'deployment strategies'],
          relatedTopics: ['Automation', 'Software Delivery']
        },
        {
          name: 'Containerization & Orchestration',
          keywords: ['Docker', 'Kubernetes', 'container', 'pod', 'service', 'deployment', 'helm', 'orchestration'],
          concepts: ['containerization', 'orchestration', 'service mesh', 'auto-scaling', 'health checks'],
          relatedTopics: ['Cloud Native', 'Infrastructure']
        },
        {
          name: 'Infrastructure as Code',
          keywords: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi', 'infrastructure', 'provisioning', 'IaC'],
          concepts: ['infrastructure as code', 'state management', 'modules', 'resource provisioning', 'drift detection'],
          relatedTopics: ['Cloud Computing', 'Automation']
        },
        {
          name: 'Monitoring & Observability',
          keywords: ['Prometheus', 'Grafana', 'logging', 'metrics', 'tracing', 'alerting', 'monitoring', 'observability'],
          concepts: ['observability', 'monitoring strategies', 'alerting', 'distributed tracing', 'log aggregation'],
          relatedTopics: ['SRE', 'Operations']
        },
        {
          name: 'Cloud Platforms',
          keywords: ['AWS', 'Azure', 'GCP', 'cloud', 'EC2', 'S3', 'Lambda', 'serverless', 'VPC'],
          concepts: ['cloud services', 'serverless computing', 'networking', 'security groups', 'cost optimization'],
          relatedTopics: ['Cloud Architecture', 'Infrastructure']
        }
      ],
      behavioral: [
        {
          name: 'Incident Response',
          keywords: ['incident', 'outage', 'response', 'postmortem', 'recovery', 'blameless'],
          concepts: ['incident management', 'blameless postmortems', 'runbooks', 'on-call', 'communication during incidents'],
          relatedTopics: ['SRE', 'Operations']
        },
        {
          name: 'Automation Mindset',
          keywords: ['automate', 'manual', 'script', 'efficiency', 'repeatable', 'reliability'],
          concepts: ['automation first', 'toil reduction', 'self-service', 'documentation as code'],
          relatedTopics: ['Efficiency', 'Engineering Culture']
        }
      ],
      system: [
        {
          name: 'Infrastructure Architecture',
          keywords: ['architecture', 'infrastructure', 'networking', 'security', 'multi-region', 'high availability'],
          concepts: ['high availability', 'disaster recovery', 'multi-region deployment', 'network architecture'],
          relatedTopics: ['System Design', 'Cloud Architecture']
        }
      ]
    },
    keySkills: ['CI/CD', 'containerization', 'cloud platforms', 'infrastructure as code', 'monitoring', 'scripting'],
    commonTools: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'AWS/Azure/GCP', 'Prometheus', 'Grafana'],
    idealAnswerPatterns: {
      structure: ['problem', 'solution', 'automation', 'monitoring', 'outcome'],
      mustMention: ['automation approach', 'reliability consideration', 'scalability'],
      bonusPoints: ['cost optimization', 'security practices', 'disaster recovery']
    }
  },

  'data-scientist': {
    title: 'Data Scientist',
    description: 'Building machine learning models and extracting insights from data',
    topics: {
      technical: [
        {
          name: 'Machine Learning',
          keywords: ['model', 'training', 'validation', 'testing', 'features', 'prediction', 'algorithm', 'ML'],
          concepts: ['supervised learning', 'unsupervised learning', 'model selection', 'hyperparameter tuning', 'cross-validation'],
          relatedTopics: ['Deep Learning', 'Statistics']
        },
        {
          name: 'Data Processing',
          keywords: ['pandas', 'numpy', 'ETL', 'pipeline', 'cleaning', 'transformation', 'feature engineering'],
          concepts: ['data preprocessing', 'feature engineering', 'data validation', 'pipeline automation'],
          relatedTopics: ['Data Engineering', 'Analytics']
        },
        {
          name: 'Model Evaluation',
          keywords: ['accuracy', 'precision', 'recall', 'F1', 'AUC', 'ROC', 'confusion matrix', 'metrics'],
          concepts: ['evaluation metrics', 'model comparison', 'bias-variance tradeoff', 'overfitting', 'underfitting'],
          relatedTopics: ['Statistics', 'Machine Learning']
        },
        {
          name: 'Deep Learning',
          keywords: ['neural network', 'CNN', 'RNN', 'transformer', 'TensorFlow', 'PyTorch', 'deep learning'],
          concepts: ['neural network architectures', 'transfer learning', 'model optimization', 'GPU training'],
          relatedTopics: ['Computer Vision', 'NLP']
        },
        {
          name: 'Statistical Analysis',
          keywords: ['hypothesis', 'test', 'p-value', 'distribution', 'correlation', 'regression', 'significance'],
          concepts: ['hypothesis testing', 'statistical significance', 'probability distributions', 'correlation analysis'],
          relatedTopics: ['Statistics', 'Research Methods']
        }
      ],
      behavioral: [
        {
          name: 'Data-Driven Decision Making',
          keywords: ['data', 'decision', 'insight', 'analysis', 'recommendation', 'stakeholder', 'evidence'],
          concepts: ['stakeholder communication', 'translating insights to actions', 'data storytelling'],
          relatedTopics: ['Communication', 'Product']
        },
        {
          name: 'Problem Framing',
          keywords: ['problem', 'define', 'scope', 'requirements', 'business', 'objective', 'metric'],
          concepts: ['problem decomposition', 'business understanding', 'success criteria definition'],
          relatedTopics: ['Product Thinking', 'Analytics']
        }
      ],
      system: [
        {
          name: 'ML Systems',
          keywords: ['ML pipeline', 'model serving', 'inference', 'deployment', 'monitoring', 'versioning'],
          concepts: ['MLOps', 'model deployment', 'feature stores', 'model monitoring', 'A/B testing'],
          relatedTopics: ['DevOps', 'Software Engineering']
        }
      ]
    },
    keySkills: ['Python', 'machine learning', 'statistics', 'data analysis', 'visualization', 'SQL'],
    commonTools: ['Python', 'R', 'pandas', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Jupyter', 'SQL', 'Tableau'],
    idealAnswerPatterns: {
      structure: ['business problem', 'data approach', 'modeling', 'evaluation', 'deployment'],
      mustMention: ['business impact', 'validation approach', 'limitations'],
      bonusPoints: ['ethical considerations', 'scalability', 'monitoring strategy']
    }
  },

  'data-analyst': {
    title: 'Data Analyst',
    description: 'Analyzing data to provide insights and support business decisions',
    topics: {
      technical: [
        {
          name: 'SQL & Databases',
          keywords: ['SQL', 'query', 'JOIN', 'GROUP BY', 'subquery', 'window function', 'CTE', 'optimization'],
          concepts: ['query optimization', 'complex joins', 'window functions', 'data aggregation', 'database design'],
          relatedTopics: ['Databases', 'Data Engineering']
        },
        {
          name: 'Data Visualization',
          keywords: ['visualization', 'chart', 'dashboard', 'Tableau', 'Power BI', 'plot', 'graph', 'insight'],
          concepts: ['data storytelling', 'visualization best practices', 'dashboard design', 'interactive reporting'],
          relatedTopics: ['Business Intelligence', 'Communication']
        },
        {
          name: 'Statistical Analysis',
          keywords: ['statistics', 'mean', 'median', 'trend', 'correlation', 'distribution', 'hypothesis', 'significance'],
          concepts: ['descriptive statistics', 'inferential statistics', 'trend analysis', 'anomaly detection'],
          relatedTopics: ['Statistics', 'Data Science']
        },
        {
          name: 'Excel & Spreadsheets',
          keywords: ['Excel', 'spreadsheet', 'formula', 'pivot', 'VLOOKUP', 'macro', 'analysis'],
          concepts: ['advanced formulas', 'pivot tables', 'data cleaning', 'automation', 'financial modeling'],
          relatedTopics: ['Business Analysis', 'Reporting']
        }
      ],
      behavioral: [
        {
          name: 'Stakeholder Communication',
          keywords: ['stakeholder', 'communicate', 'present', 'report', 'explain', 'translate', 'business'],
          concepts: ['translating data to insights', 'presentation skills', 'managing expectations', 'documentation'],
          relatedTopics: ['Communication', 'Business Analysis']
        },
        {
          name: 'Problem Solving',
          keywords: ['problem', 'analysis', 'investigate', 'root cause', 'question', 'hypothesis'],
          concepts: ['analytical thinking', 'root cause analysis', 'hypothesis-driven approach', 'critical thinking'],
          relatedTopics: ['Analysis', 'Research']
        }
      ],
      system: [
        {
          name: 'Data Pipelines',
          keywords: ['pipeline', 'ETL', 'data warehouse', 'integration', 'automation', 'scheduling'],
          concepts: ['ETL processes', 'data warehousing', 'data quality', 'automated reporting'],
          relatedTopics: ['Data Engineering', 'Infrastructure']
        }
      ]
    },
    keySkills: ['SQL', 'Excel', 'data visualization', 'statistics', 'Python/R', 'communication', 'critical thinking'],
    commonTools: ['SQL', 'Excel', 'Tableau', 'Power BI', 'Python', 'R', 'Google Analytics'],
    idealAnswerPatterns: {
      structure: ['business question', 'data gathering', 'analysis', 'insights', 'recommendations'],
      mustMention: ['business context', 'data quality checks', 'actionable insights'],
      bonusPoints: ['stakeholder impact', 'automation opportunity', 'data storytelling']
    }
  },

  'product-manager': {
    title: 'Product Manager',
    description: 'Defining product strategy, roadmap, and working with cross-functional teams',
    topics: {
      technical: [
        {
          name: 'Product Strategy',
          keywords: ['strategy', 'vision', 'roadmap', 'market', 'competition', 'positioning', 'differentiation'],
          concepts: ['product-market fit', 'competitive analysis', 'strategic planning', 'OKRs', 'KPIs'],
          relatedTopics: ['Strategy', 'Business']
        },
        {
          name: 'User Research',
          keywords: ['user', 'research', 'interview', 'survey', 'persona', 'journey', 'feedback', 'usability'],
          concepts: ['user interviews', 'persona development', 'customer journey mapping', 'usability testing'],
          relatedTopics: ['UX Research', 'Design Thinking']
        },
        {
          name: 'Prioritization',
          keywords: ['prioritize', 'priority', 'backlog', 'MoSCoW', 'RICE', 'impact', 'effort', 'stakeholder'],
          concepts: ['prioritization frameworks', 'stakeholder management', 'trade-off decisions', 'resource allocation'],
          relatedTopics: ['Agile', 'Planning']
        },
        {
          name: 'Analytics & Metrics',
          keywords: ['metrics', 'KPI', 'analytics', 'conversion', 'retention', 'engagement', 'funnel', 'A/B test'],
          concepts: ['product metrics', 'funnel analysis', 'cohort analysis', 'experimentation', 'data-driven decisions'],
          relatedTopics: ['Data Analysis', 'Growth']
        }
      ],
      behavioral: [
        {
          name: 'Leadership Without Authority',
          keywords: ['influence', 'persuade', 'align', 'consensus', 'stakeholder', 'collaborate', 'cross-functional'],
          concepts: ['influence without authority', 'stakeholder alignment', 'cross-functional collaboration', 'communication'],
          relatedTopics: ['Leadership', 'Communication']
        },
        {
          name: 'Decision Making',
          keywords: ['decision', 'trade-off', 'data', 'intuition', 'stakeholder', 'impact', 'risk'],
          concepts: ['data-driven decisions', 'trade-off analysis', 'risk assessment', 'decision frameworks'],
          relatedTopics: ['Strategy', 'Analysis']
        }
      ],
      system: [
        {
          name: 'Product Architecture',
          keywords: ['platform', 'ecosystem', 'integration', 'scalability', 'architecture', 'modular'],
          concepts: ['platform thinking', 'product ecosystem', 'integration strategy', 'scalability planning'],
          relatedTopics: ['System Design', 'Strategy']
        }
      ]
    },
    keySkills: ['strategy', 'communication', 'analytics', 'prioritization', 'user research', 'stakeholder management'],
    commonTools: ['Jira', 'Confluence', 'Figma', 'Amplitude', 'Mixpanel', 'Google Analytics', 'Notion'],
    idealAnswerPatterns: {
      structure: ['context', 'problem', 'solution', 'impact', 'learnings'],
      mustMention: ['user impact', 'business metrics', 'cross-functional collaboration'],
      bonusPoints: ['data-driven approach', 'trade-off analysis', 'long-term thinking']
    }
  },

  'engineering-manager': {
    title: 'Engineering Manager',
    description: 'Leading engineering teams and driving technical excellence',
    topics: {
      technical: [
        {
          name: 'Technical Leadership',
          keywords: ['architecture', 'design', 'technical', 'review', 'standards', 'best practices', 'guidance'],
          concepts: ['technical vision', 'architecture decisions', 'code review culture', 'technical debt management'],
          relatedTopics: ['Architecture', 'Leadership']
        },
        {
          name: 'Team Processes',
          keywords: ['agile', 'scrum', 'sprint', 'standup', 'retrospective', 'process', 'efficiency'],
          concepts: ['agile methodologies', 'continuous improvement', 'team ceremonies', 'process optimization'],
          relatedTopics: ['Agile', 'Project Management']
        }
      ],
      behavioral: [
        {
          name: 'People Management',
          keywords: ['mentor', 'grow', 'feedback', 'career', 'develop', 'performance', 'review', '1:1'],
          concepts: ['career development', 'performance management', 'mentorship', 'team building', 'retention'],
          relatedTopics: ['Leadership', 'HR']
        },
        {
          name: 'Hiring & Team Building',
          keywords: ['hire', 'recruit', 'interview', 'team', 'onboard', 'culture', 'diversity'],
          concepts: ['hiring process', 'interviewing', 'onboarding', 'team culture', 'diversity and inclusion'],
          relatedTopics: ['HR', 'Leadership']
        },
        {
          name: 'Stakeholder Management',
          keywords: ['stakeholder', 'communicate', 'expectation', 'alignment', 'executive', 'priorities'],
          concepts: ['executive communication', 'expectation management', 'cross-team collaboration', 'influence'],
          relatedTopics: ['Communication', 'Leadership']
        },
        {
          name: 'Conflict Resolution',
          keywords: ['conflict', 'resolve', 'mediate', 'disagreement', 'team', 'communication', 'understand'],
          concepts: ['mediation', 'active listening', 'constructive feedback', 'team dynamics'],
          relatedTopics: ['Communication', 'Leadership']
        }
      ],
      system: [
        {
          name: 'Organizational Design',
          keywords: ['organization', 'structure', 'team', 'scaling', 'autonomy', 'alignment', 'efficiency'],
          concepts: ['team topology', 'organizational scaling', 'autonomy vs alignment', 'distributed teams'],
          relatedTopics: ['Strategy', 'Leadership']
        }
      ]
    },
    keySkills: ['leadership', 'communication', 'technical guidance', 'people development', 'hiring', 'strategic planning'],
    commonTools: ['Jira', 'Confluence', 'GitHub', 'Slack', 'Linear', 'Lattice', 'Culture Amp'],
    idealAnswerPatterns: {
      structure: ['situation', 'action', 'outcome', 'team impact', 'organizational impact'],
      mustMention: ['people focus', 'business alignment', 'technical excellence'],
      bonusPoints: ['metrics', 'long-term impact', 'lessons learned']
    }
  },

  'mobile-developer': {
    title: 'Mobile Developer',
    description: 'Building native and cross-platform mobile applications',
    topics: {
      technical: [
        {
          name: 'Mobile Frameworks',
          keywords: ['iOS', 'Android', 'React Native', 'Flutter', 'Swift', 'Kotlin', 'native', 'cross-platform'],
          concepts: ['native development', 'cross-platform development', 'platform-specific features', 'app lifecycle'],
          relatedTopics: ['Frontend Development', 'UI/UX']
        },
        {
          name: 'Mobile UI/UX',
          keywords: ['UI', 'UX', 'responsive', 'gesture', 'animation', 'navigation', 'accessibility', 'design'],
          concepts: ['mobile-first design', 'gesture handling', 'animations', 'responsive layouts', 'accessibility'],
          relatedTopics: ['UI/UX', 'Design']
        },
        {
          name: 'Performance & Battery',
          keywords: ['performance', 'battery', 'memory', 'optimization', 'profiling', 'network', 'offline'],
          concepts: ['memory management', 'battery optimization', 'network optimization', 'offline support', 'app size'],
          relatedTopics: ['Performance', 'Optimization']
        },
        {
          name: 'App Distribution',
          keywords: ['App Store', 'Play Store', 'deployment', 'release', 'CI/CD', 'TestFlight', 'beta'],
          concepts: ['app store guidelines', 'release management', 'beta testing', 'CI/CD for mobile', 'code signing'],
          relatedTopics: ['DevOps', 'Release Management']
        }
      ],
      behavioral: [
        {
          name: 'Platform Decisions',
          keywords: ['platform', 'decision', 'native', 'cross-platform', 'trade-off', 'requirement', 'budget'],
          concepts: ['platform selection', 'build vs buy', 'native vs cross-platform', 'technical trade-offs'],
          relatedTopics: ['Architecture', 'Decision Making']
        }
      ],
      system: [
        {
          name: 'Mobile Architecture',
          keywords: ['architecture', 'MVVM', 'MVC', 'Clean', 'modular', 'offline-first', 'sync'],
          concepts: ['mobile architecture patterns', 'offline-first design', 'data synchronization', 'modular architecture'],
          relatedTopics: ['Architecture', 'System Design']
        }
      ]
    },
    keySkills: ['mobile development', 'iOS/Android', 'React Native/Flutter', 'UI/UX', 'performance optimization', 'API integration'],
    commonTools: ['Xcode', 'Android Studio', 'React Native', 'Flutter', 'Fastlane', 'Firebase', 'TestFlight'],
    idealAnswerPatterns: {
      structure: ['feature requirement', 'platform consideration', 'implementation', 'testing', 'release'],
      mustMention: ['platform specifics', 'performance impact', 'user experience'],
      bonusPoints: ['cross-platform consideration', 'accessibility', 'offline support']
    }
  },

  'qa-engineer': {
    title: 'QA Engineer',
    description: 'Ensuring software quality through testing and quality assurance practices',
    topics: {
      technical: [
        {
          name: 'Testing Types',
          keywords: ['unit', 'integration', 'e2e', 'regression', 'smoke', 'UAT', 'performance', 'security'],
          concepts: ['testing pyramid', 'test levels', 'test types', 'test coverage', 'risk-based testing'],
          relatedTopics: ['Software Testing', 'Quality Assurance']
        },
        {
          name: 'Test Automation',
          keywords: ['Selenium', 'Cypress', 'Playwright', 'automation', 'framework', 'script', 'CI/CD'],
          concepts: ['test automation frameworks', 'page object model', 'test data management', 'parallel execution'],
          relatedTopics: ['Automation', 'CI/CD']
        },
        {
          name: 'API Testing',
          keywords: ['API', 'REST', 'Postman', 'Newman', 'contract', 'validation', 'response', 'status'],
          concepts: ['API testing strategies', 'contract testing', 'load testing', 'security testing'],
          relatedTopics: ['APIs', 'Integration Testing']
        },
        {
          name: 'Performance Testing',
          keywords: ['load', 'stress', 'JMeter', 'Gatling', 'performance', 'benchmark', 'throughput', 'latency'],
          concepts: ['load testing', 'stress testing', 'performance benchmarking', 'bottleneck identification'],
          relatedTopics: ['Performance', 'Scalability']
        }
      ],
      behavioral: [
        {
          name: 'Quality Advocacy',
          keywords: ['quality', 'advocate', 'culture', 'prevent', 'collaborate', 'shift-left', 'team'],
          concepts: ['quality culture', 'shift-left testing', 'prevention over detection', 'team collaboration'],
          relatedTopics: ['Team Culture', 'Process Improvement']
        },
        {
          name: 'Bug Advocacy',
          keywords: ['bug', 'report', 'prioritize', 'reproduce', 'impact', 'stakeholder', 'release'],
          concepts: ['effective bug reporting', 'risk assessment', 'prioritization', 'stakeholder communication'],
          relatedTopics: ['Communication', 'Process']
        }
      ],
      system: [
        {
          name: 'Test Architecture',
          keywords: ['architecture', 'framework', 'pipeline', 'infrastructure', 'parallel', 'scalable'],
          concepts: ['test framework design', 'test infrastructure', 'parallel execution', 'test environment management'],
          relatedTopics: ['Architecture', 'Infrastructure']
        }
      ]
    },
    keySkills: ['test automation', 'manual testing', 'API testing', 'performance testing', 'test planning', 'bug tracking'],
    commonTools: ['Selenium', 'Cypress', 'Playwright', 'JMeter', 'Postman', 'JIRA', 'TestRail', 'Jenkins'],
    idealAnswerPatterns: {
      structure: ['test scenario', 'approach', 'execution', 'findings', 'recommendations'],
      mustMention: ['test coverage', 'risk assessment', 'reproducibility'],
      bonusPoints: ['automation opportunity', 'process improvement', 'preventive measures']
    }
  },

  'system-architect': {
    title: 'System Architect',
    description: 'Designing large-scale distributed systems and technical architecture',
    topics: {
      technical: [
        {
          name: 'Architecture Patterns',
          keywords: ['microservices', 'monolith', 'event-driven', 'CQRS', 'hexagonal', 'layered', 'pattern'],
          concepts: ['architecture patterns', 'domain-driven design', 'service boundaries', 'coupling and cohesion'],
          relatedTopics: ['System Design', 'Software Architecture']
        },
        {
          name: 'Distributed Systems',
          keywords: ['distributed', 'consistency', 'availability', 'partition', 'CAP', 'eventual', 'consensus'],
          concepts: ['CAP theorem', 'distributed consensus', 'eventual consistency', 'distributed transactions'],
          relatedTopics: ['System Design', 'Cloud Architecture']
        },
        {
          name: 'Data Architecture',
          keywords: ['database', 'sharding', 'replication', 'partitioning', 'polyglot', 'cache', 'data lake'],
          concepts: ['data modeling', 'database selection', 'data partitioning', 'caching strategies', 'data governance'],
          relatedTopics: ['Databases', 'Data Engineering']
        },
        {
          name: 'Security Architecture',
          keywords: ['security', 'encryption', 'identity', 'zero-trust', 'compliance', 'audit', 'threat'],
          concepts: ['security by design', 'zero-trust architecture', 'threat modeling', 'compliance frameworks'],
          relatedTopics: ['Security', 'Compliance']
        }
      ],
      behavioral: [
        {
          name: 'Technical Decision Making',
          keywords: ['decision', 'trade-off', 'stakeholder', 'document', 'ADR', 'consensus', 'influence'],
          concepts: ['architecture decision records', 'trade-off analysis', 'stakeholder alignment', 'technical leadership'],
          relatedTopics: ['Leadership', 'Decision Making']
        },
        {
          name: 'Cross-Team Collaboration',
          keywords: ['collaborate', 'team', 'align', 'communicate', 'standard', 'governance', 'evangelize'],
          concepts: ['cross-team alignment', 'architecture governance', 'technical standards', 'evangelism'],
          relatedTopics: ['Leadership', 'Communication']
        }
      ],
      system: [
        {
          name: 'Enterprise Architecture',
          keywords: ['enterprise', 'integration', 'governance', 'standard', 'portfolio', 'roadmap', 'strategy'],
          concepts: ['enterprise integration', 'architecture governance', 'technology roadmap', 'portfolio management'],
          relatedTopics: ['Strategy', 'Governance']
        }
      ]
    },
    keySkills: ['system design', 'distributed systems', 'cloud architecture', 'technical leadership', 'documentation', 'strategic thinking'],
    commonTools: ['AWS/Azure/GCP', 'Kubernetes', 'Terraform', 'Confluence', 'Lucidchart', 'Draw.io', 'ArchUnit'],
    idealAnswerPatterns: {
      structure: ['requirements', 'constraints', 'options', 'decision', 'implementation', 'monitoring'],
      mustMention: ['trade-offs', 'scalability', 'security', 'cost'],
      bonusPoints: ['disaster recovery', 'compliance', 'future considerations', 'documentation']
    }
  }
};

// Question generation patterns by difficulty
export const difficultyPatterns = {
  entry: {
    depthKeywords: ['basic', 'fundamental', 'introduction', 'simple', 'core'],
    complexity: 1,
    minConcepts: 1,
    maxConcepts: 2,
    expectedDepth: 'surface-level understanding'
  },
  mid: {
    depthKeywords: ['practical', 'implementation', 'experience', 'intermediate', 'applied'],
    complexity: 2,
    minConcepts: 2,
    maxConcepts: 3,
    expectedDepth: 'working knowledge with practical application'
  },
  senior: {
    depthKeywords: ['advanced', 'architect', 'strategic', 'leadership', 'complex', 'scale'],
    complexity: 3,
    minConcepts: 3,
    maxConcepts: 5,
    expectedDepth: 'deep expertise with strategic thinking'
  }
};

// Keywords that indicate irrelevant or low-quality answers
export const irrelevantPatterns = [
  /^(I don't know|I'm not sure|No idea|Don't know|Skip|Pass)$/i,
  /^(asdf|qwerty|test|hello|hi|hey|lol|random).*$/i,
  /^.{0,10}$/,  // Very short answers
  /(blah blah|lorem ipsum|gibberish|random)/i,
  /^(yes|no|maybe|ok|sure|fine)$/i
];

// Quality indicators for answers
export const qualityIndicators = {
  high: {
    keywords: ['because', 'therefore', 'however', 'additionally', 'furthermore', 'specifically', 'for example', 'in my experience', 'consequently', 'result'],
    minLength: 100
  },
  medium: {
    keywords: ['so', 'then', 'also', 'when', 'while', 'after', 'before'],
    minLength: 50
  },
  low: {
    keywords: [],
    minLength: 20
  }
};

// Follow-up question triggers based on answer content
export const followUpTriggers = {
  tooBrief: "You've given a brief answer. Could you elaborate more on",
  missingExample: "That's a good start. Can you provide a specific example of",
  needsDepth: "Interesting point. Could you dive deeper into",
  needsAlternative: "Good answer. What alternative approaches did you consider for",
  needsOutcome: "Great explanation. What was the outcome of",
  needsChallenge: "Thank you for sharing. What challenges did you face with",
  needsMetrics: "Well explained. Do you have any metrics or measurable outcomes from"
};

export default roleKnowledgeBase;
