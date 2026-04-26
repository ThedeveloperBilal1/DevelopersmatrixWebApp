export interface MicroLearning {
  id: string;
  topic: string;
  summary: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
}

export const microLearningLessons: MicroLearning[] = [
  {
    id: 'ml-1',
    topic: 'React Hooks Deep Dive',
    summary: 'Master React Hooks including useState, useEffect, useContext, and custom hooks for building modern React applications.',
    content: `
# React Hooks Deep Dive

React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing classes. Let's explore the most important hooks.

## useState

The useState hook lets you add state to functional components:

\`\`\`jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// Updating state
setCount(prev => prev + 1);
setUser(prev => ({ ...prev, name: 'John' }));
\`\`\`

**Key Points:**
- State updates trigger re-renders
- Updates are asynchronous
- Use functional updates when new state depends on previous state

## useEffect

The useEffect hook handles side effects in functional components:

\`\`\`jsx
// Run on every render
useEffect(() => {
  console.log('Component rendered');
});

// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  fetchUserData(userId);
}, [userId]);

// Cleanup function
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
\`\`\`

## useContext

Access context values without wrapping in consumers:

\`\`\`jsx
const ThemeContext = createContext('light');

function Component() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
\`\`\`

## Custom Hooks

Extract and reuse stateful logic:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [name, setName] = useLocalStorage('name', '');
\`\`\`

## Best Practices

1. **Keep hooks at the top level** - Never call hooks inside loops, conditions, or nested functions
2. **Use the dependency array wisely** - Include all values from the component scope that change over time
3. **Create custom hooks** for reusable stateful logic
4. **Use useCallback and useMemo** for expensive computations and stable function references
    `,
    questions: [
      {
        question: 'What will happen if you call useState inside a conditional statement?',
        options: [
          'It will work normally',
          'It will throw an error',
          'It will cause inconsistent behavior and bugs',
          'It will be ignored'
        ],
        correctAnswer: 2,
        explanation: 'React relies on the order in which Hooks are called. If you call useState conditionally, the order can change between renders, causing bugs and inconsistent state management.'
      },
      {
        question: 'What is the correct way to update state based on previous state?',
        options: [
          'setState(state + 1)',
          'setState(prev => prev + 1)',
          'setState(prevState + 1)',
          'setState.update(1)'
        ],
        correctAnswer: 1,
        explanation: 'Using the functional update form (prev => prev + 1) ensures you always have the latest state value, avoiding race conditions in rapid updates.'
      },
      {
        question: 'When does useEffect cleanup function run?',
        options: [
          'Only when component mounts',
          'Before every re-render and on unmount',
          'Only when component unmounts',
          'After every render'
        ],
        correctAnswer: 1,
        explanation: 'The cleanup function runs before every re-render (to clean up the previous effect) and when the component unmounts.'
      },
      {
        question: 'What is a custom hook?',
        options: [
          'A built-in React hook',
          'A function that uses other hooks',
          'A class component method',
          'A lifecycle method'
        ],
        correctAnswer: 1,
        explanation: 'Custom hooks are JavaScript functions that use other hooks. They allow you to extract and reuse stateful logic between components.'
      }
    ],
    duration: '15 min',
    difficulty: 'Intermediate',
    tags: ['React', 'JavaScript', 'Frontend'],
    dayOfWeek: 0 // Sunday
  },
  {
    id: 'ml-2',
    topic: 'TypeScript Generics',
    summary: 'Learn how to use TypeScript generics to create reusable and type-safe components, functions, and classes.',
    content: `
# TypeScript Generics

Generics allow you to write flexible, reusable code while maintaining type safety. They let you create components that work with any type while still knowing what that type is.

## Basic Generics

\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);      // number
const str = identity<string>("hello"); // string
\`\`\`

## Generic Interfaces

\`\`\`typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
\`\`\`

## Generic Constraints

Limit what types can be used with constraints:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");  // Works - string has length
logLength([1, 2, 3]); // Works - array has length
logLength(42);        // Error - number has no length
\`\`\`

## Generic Classes

\`\`\`typescript
class Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const numberStorage = new Storage<number>();
numberStorage.add(1);
numberStorage.add(2);
\`\`\`

## Multiple Type Parameters

\`\`\`typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const userPair = pair("name", "John");
// [string, string]
\`\`\`

## Utility Types with Generics

\`\`\`typescript
// Partial - make all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

const partialUser: Partial<User> = { name: "John" };

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record - create object type
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
\`\`\`
    `,
    questions: [
      {
        question: 'What is the purpose of TypeScript generics?',
        options: [
          'To create dynamic types at runtime',
          'To write reusable code while maintaining type safety',
          'To remove types from the code',
          'To make JavaScript run faster'
        ],
        correctAnswer: 1,
        explanation: 'Generics allow you to create reusable components that work with any type while still maintaining type safety and avoiding the use of "any".'
      },
      {
        question: 'What does <T extends Lengthwise> mean?',
        options: [
          'T must be exactly Lengthwise',
          'T can be any type',
          'T must have a length property',
          'T extends the Lengthwise class'
        ],
        correctAnswer: 2,
        explanation: 'The extends keyword in generics creates a constraint. T extends Lengthwise means T must have at least the properties defined in Lengthwise (in this case, a length property).'
      },
      {
        question: 'What is the correct way to create a generic array?',
        options: [
          'let arr: T[]',
          'let arr: Array<T>',
          'Both A and B are correct',
          'Neither is correct'
        ],
        correctAnswer: 2,
        explanation: 'Both T[] and Array<T> are valid syntax for creating generic arrays in TypeScript. They are functionally equivalent.'
      },
      {
        question: 'What does Partial<T> do?',
        options: [
          'Creates a new type from partial string of T',
          'Makes all properties of T required',
          'Makes all properties of T optional',
          'Removes half of the properties'
        ],
        correctAnswer: 2,
        explanation: 'Partial<T> is a utility type that constructs a type with all properties of T set to optional. Useful for update operations.'
      }
    ],
    duration: '20 min',
    difficulty: 'Intermediate',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    dayOfWeek: 1 // Monday
  },
  {
    id: 'ml-3',
    topic: 'SQL Joins Explained',
    summary: 'Master SQL joins including INNER, LEFT, RIGHT, and FULL JOIN with practical examples and use cases.',
    content: `
# SQL Joins Explained

SQL joins allow you to combine data from multiple tables based on related columns. Understanding joins is essential for effective database querying.

## INNER JOIN

Returns rows when there's a match in BOTH tables:

\`\`\`sql
SELECT users.name, orders.product
FROM users
INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

**Result:** Only users who have placed orders will appear.

## LEFT JOIN (LEFT OUTER JOIN)

Returns ALL rows from the left table, and matched rows from right:

\`\`\`sql
SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

**Result:** All users appear, even those without orders (NULL for order columns).

## RIGHT JOIN

Returns ALL rows from the right table, and matched rows from left:

\`\`\`sql
SELECT users.name, orders.product
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
\`\`\`

**Result:** All orders appear, even those without users.

## FULL JOIN (FULL OUTER JOIN)

Returns rows when there's a match in EITHER table:

\`\`\`sql
SELECT users.name, orders.product
FROM users
FULL JOIN orders ON users.id = orders.user_id;
\`\`\`

**Result:** All users and all orders appear, with NULLs where no match exists.

## CROSS JOIN

Returns Cartesian product of both tables:

\`\`\`sql
SELECT users.name, products.name
FROM users
CROSS JOIN products;
\`\`\`

**Result:** Every user paired with every product.

## Self Join

Join a table to itself:

\`\`\`sql
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

## Performance Tips

1. **Index join columns** - Create indexes on columns used in joins
2. **Use appropriate join types** - Don't use LEFT JOIN when INNER suffices
3. **Limit result sets** - Use WHERE clauses before joins when possible
4. **Avoid joining too many tables** - Consider denormalization for complex queries
    `,
    questions: [
      {
        question: 'Which join returns only matching rows from both tables?',
        options: [
          'LEFT JOIN',
          'RIGHT JOIN',
          'INNER JOIN',
          'FULL JOIN'
        ],
        correctAnswer: 2,
        explanation: 'INNER JOIN returns only the rows where there is a match in both tables. Rows without matches are excluded from the result.'
      },
      {
        question: 'What will a LEFT JOIN return for columns from the right table when there is no match?',
        options: [
          'Empty string',
          'Zero or empty value',
          'NULL',
          'Default value'
        ],
        correctAnswer: 2,
        explanation: 'When there is no matching row in the right table for a LEFT JOIN, all columns from the right table will be NULL in the result set.'
      },
      {
        question: 'When would you use a self join?',
        options: [
          'To join two identical tables',
          'To compare rows within the same table',
          'To duplicate table data',
          'To create a backup'
        ],
        correctAnswer: 1,
        explanation: 'Self joins are used when you need to compare rows within the same table, such as finding employees and their managers from a single employees table.'
      },
      {
        question: 'What does CROSS JOIN produce?',
        options: [
          'Only matching rows',
          'Cartesian product of all rows',
          'First 100 rows',
          'Unique combinations only'
        ],
        correctAnswer: 1,
        explanation: 'CROSS JOIN produces a Cartesian product - every row from the first table combined with every row from the second table. If table A has 10 rows and B has 5, the result has 50 rows.'
      }
    ],
    duration: '15 min',
    difficulty: 'Beginner',
    tags: ['SQL', 'Database', 'Backend'],
    dayOfWeek: 2 // Tuesday
  },
  {
    id: 'ml-4',
    topic: 'Docker Fundamentals',
    summary: 'Learn Docker basics including containers, images, Dockerfile, and docker-compose for application deployment.',
    content: `
# Docker Fundamentals

Docker revolutionized application deployment by introducing containers - lightweight, portable, and self-sufficient environments.

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with all its dependencies.

## Key Concepts

### Images
Read-only templates used to create containers. Built from Dockerfile.

### Containers
Running instances of images. Isolated environments with their own filesystem.

### Dockerfile
Text file with instructions to build an image:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Essential Commands

\`\`\`bash
# Build an image
docker build -t myapp:1.0 .

# Run a container
docker run -d -p 3000:3000 myapp:1.0

# List running containers
docker ps

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id

# List images
docker images

# Remove an image
docker rmi image_id

# View logs
docker logs container_id

# Execute command in container
docker exec -it container_id /bin/sh
\`\`\`

## Docker Compose

Define multi-container applications:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

\`\`\`bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
\`\`\`

## Volumes

Persist data beyond container lifecycle:

\`\`\`bash
# Create a volume
docker volume create mydata

# Use volume
docker run -v mydata:/app/data myapp
\`\`\`

## Networks

Enable communication between containers:

\`\`\`bash
# Create network
docker network create mynetwork

# Connect container to network
docker run --network mynetwork myapp
\`\`\`
    `,
    questions: [
      {
        question: 'What is the difference between a Docker image and a container?',
        options: [
          'They are the same thing',
          'Image is a template, container is a running instance',
          'Container is a template, image is running',
          'Images are for production, containers for development'
        ],
        correctAnswer: 1,
        explanation: 'A Docker image is a read-only template with instructions for creating a container. A container is a runnable instance of an image - it adds a writable layer on top of the image.'
      },
      {
        question: 'What does the CMD instruction in Dockerfile do?',
        options: [
          'Builds the image',
          'Sets environment variables',
          'Specifies the command to run when container starts',
          'Copies files into the image'
        ],
        correctAnswer: 2,
        explanation: 'CMD specifies the default command to run when a container is started from the image. It can be overridden when running the container.'
      },
      {
        question: 'Why would you use Docker Compose?',
        options: [
          'To build single images',
          'To define multi-container applications',
          'To replace Docker',
          'To create Dockerfiles'
        ],
        correctAnswer: 1,
        explanation: 'Docker Compose is used to define and run multi-container Docker applications. It allows you to configure services, networks, and volumes in a single YAML file.'
      },
      {
        question: 'What is the purpose of Docker volumes?',
        options: [
          'To increase container speed',
          'To persist data beyond container lifecycle',
          'To secure containers',
          'To reduce image size'
        ],
        correctAnswer: 1,
        explanation: 'Volumes are used to persist data generated by and used by Docker containers. They survive container restarts and removal, allowing data to persist independently of containers.'
      }
    ],
    duration: '20 min',
    difficulty: 'Intermediate',
    tags: ['Docker', 'DevOps', 'Deployment'],
    dayOfWeek: 3 // Wednesday
  },
  {
    id: 'ml-5',
    topic: 'REST API Design Best Practices',
    summary: 'Learn how to design clean, intuitive, and scalable REST APIs following industry best practices.',
    content: `
# REST API Design Best Practices

Well-designed APIs are crucial for building maintainable and scalable applications. Let's explore best practices for REST API design.

## Resource Naming

Use nouns, not verbs. Use plural forms for collections:

\`\`\`
Good: GET /users, GET /users/123, GET /users/123/orders
Bad:  GET /getUsers, GET /user/123, GET /getUserOrders
\`\`\`

## HTTP Methods

Use appropriate HTTP methods for operations:

- **GET** - Retrieve resources (safe, idempotent)
- **POST** - Create new resources
- **PUT** - Update entire resources (idempotent)
- **PATCH** - Partial update
- **DELETE** - Remove resources (idempotent)

## Status Codes

Use proper HTTP status codes:

\`\`\`
200 OK - Successful GET, PUT, PATCH
201 Created - Successful POST
204 No Content - Successful DELETE
400 Bad Request - Invalid request
401 Unauthorized - Authentication required
403 Forbidden - No permission
404 Not Found - Resource doesn't exist
422 Unprocessable Entity - Validation errors
500 Internal Server Error - Server error
\`\`\`

## Versioning

Include API version in URL:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

## Pagination

For large collections, implement pagination:

\`\`\`
GET /users?page=2&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
\`\`\`

## Filtering, Sorting, Searching

\`\`\`
# Filter
GET /users?status=active&role=admin

# Sort
GET /users?sort=-createdAt,name

# Search
GET /users?search=john
\`\`\`

## Error Handling

Return consistent error format:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
\`\`\`

## Authentication

Use standard authentication methods:
- **Bearer Token** (JWT) for user authentication
- **API Keys** for service-to-service

\`\`\`
Authorization: Bearer <token>
X-API-Key: <api_key>
\`\`\`
    `,
    questions: [
      {
        question: 'Which HTTP method should be used to create a new resource?',
        options: [
          'GET',
          'POST',
          'PUT',
          'PATCH'
        ],
        correctAnswer: 1,
        explanation: 'POST is used to create new resources. The server creates the resource and typically returns a 201 Created status with the new resource location.'
      },
      {
        question: 'What HTTP status code should be returned when a resource is not found?',
        options: [
          '400 Bad Request',
          '401 Unauthorized',
          '404 Not Found',
          '500 Internal Server Error'
        ],
        correctAnswer: 2,
        explanation: '404 Not Found indicates that the requested resource does not exist. This is different from 400 (client error) or 500 (server error).'
      },
      {
        question: 'Why should you use nouns instead of verbs in API endpoints?',
        options: [
          'Verbs are not supported by HTTP',
          'Nouns represent resources, verbs are handled by HTTP methods',
          'Verbs make URLs too long',
          'Nouns are easier to cache'
        ],
        correctAnswer: 1,
        explanation: 'REST APIs represent resources (nouns). The action to perform on those resources is indicated by the HTTP method (GET, POST, PUT, DELETE), not the URL path.'
      },
      {
        question: 'What is the correct way to implement pagination?',
        options: [
          'GET /users/all?page=1',
          'GET /users?page=1&limit=20',
          'GET /users/pagination/1/20',
          'POST /users with pagination body'
        ],
        correctAnswer: 1,
        explanation: 'Query parameters are the standard way to implement pagination. The page number and limit should be passed as query parameters for stateless, cacheable requests.'
      }
    ],
    duration: '15 min',
    difficulty: 'Beginner',
    tags: ['API', 'REST', 'Backend'],
    dayOfWeek: 4 // Thursday
  },
  {
    id: 'ml-6',
    topic: 'Git Advanced Techniques',
    summary: 'Master advanced Git commands including rebase, cherry-pick, stash, and interactive rebasing for better workflow.',
    content: `
# Git Advanced Techniques

Beyond basic commit and push, Git offers powerful tools for managing complex workflows.

## Rebasing

Rebase moves or combines commits:

\`\`\`bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (edit, squash, reorder commits)
git rebase -i HEAD~5
\`\`\`

**Rebase vs Merge:**
- Rebase creates linear history
- Merge preserves branch history
- Never rebase shared branches

## Cherry-Pick

Apply specific commits to another branch:

\`\`\`bash
# Cherry-pick a single commit
git cherry-pick abc123

# Cherry-pick a range
git cherry-pick abc123..def456
\`\`\`

## Stashing

Save uncommitted changes temporarily:

\`\`\`bash
# Stash current changes
git stash

# Stash with message
git stash save "work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Drop a stash
git stash drop stash@{0}
\`\`\`

## Reset and Reflog

Undo changes with reset:

\`\`\`bash
# Undo commit, keep changes staged
git reset --soft HEAD~1

# Undo commit, keep changes unstaged
git reset --mixed HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1
\`\`\`

Recover with reflog:

\`\`\`bash
# View reflog
git reflog

# Reset to a previous state
git reset --hard HEAD@{5}
\`\`\`

## Interactive Staging

Stage parts of files:

\`\`\`bash
# Interactively stage changes
git add -p

# Interactively reset
git reset -p
\`\`\`

## Aliases

Create shortcuts:

\`\`\`bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
\`\`\`

## Bisect

Find the commit that introduced a bug:

\`\`\`bash
git bisect start
git bisect bad          # Current version has bug
git bisect good v1.0    # This version was good
# Git will checkout commits, test each:
git bisect good  # or git bisect bad
# When found:
git bisect reset
\`\`\`
    `,
    questions: [
      {
        question: 'When should you use git rebase instead of merge?',
        options: [
          'When working on a shared branch',
          'When you want a linear commit history',
          'When merging into production',
          'Never, rebase is dangerous'
        ],
        correctAnswer: 1,
        explanation: 'Rebase creates a linear history by moving your commits onto the tip of the target branch. However, never rebase commits that have been pushed to a shared repository as it rewrites history.'
      },
      {
        question: 'What does git stash do?',
        options: [
          'Deletes uncommitted changes',
          'Commits changes to a temporary branch',
          'Saves uncommitted changes to apply later',
          'Creates a backup of the repository'
        ],
        correctAnswer: 2,
        explanation: 'git stash saves your uncommitted changes temporarily, allowing you to switch branches or pull changes without committing half-done work. You can apply stashed changes later with git stash pop.'
      },
      {
        question: 'What is the difference between git reset --soft and --hard?',
        options: [
          '--soft is faster than --hard',
          '--soft keeps changes staged, --hard discards them',
          '--hard is for branches, --soft for files',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'git reset --soft HEAD~1 undoes the commit but keeps changes staged. git reset --hard HEAD~1 undoes the commit AND discards all changes, making it more destructive.'
      },
      {
        question: 'What is git cherry-pick used for?',
        options: [
          'Selecting which files to commit',
          'Applying specific commits to another branch',
          'Deleting commits',
          'Merging two branches'
        ],
        correctAnswer: 1,
        explanation: 'git cherry-pick applies the changes introduced by specific commits to your current branch. This is useful when you want to bring specific fixes or features from one branch to another without merging the entire branch.'
      }
    ],
    duration: '20 min',
    difficulty: 'Advanced',
    tags: ['Git', 'Version Control', 'DevOps'],
    dayOfWeek: 5 // Friday
  },
  {
    id: 'ml-7',
    topic: 'Node.js Event Loop',
    summary: 'Understand how Node.js handles asynchronous operations through the event loop, callbacks, and promises.',
    content: `
# Node.js Event Loop

The event loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded.

## How It Works

1. **Call Stack** - Where function execution contexts are stored
2. **Web APIs** - Browser/Node APIs handle async operations
3. **Callback Queue** - Waiting callbacks wait here
4. **Event Loop** - Moves callbacks from queue to stack

## Event Loop Phases

\`\`\`
   ┌───────────────────────┐
┌─>│        timers         │
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │   pending callbacks   │
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │       idle,prepare    │
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │         poll          │
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │        check          │
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
└──┤    close callbacks    │
   └───────────────────────┘
\`\`\`

## Microtasks vs Macrotasks

\`\`\`javascript
console.log('1. Script start');

setTimeout(() => {
  console.log('2. setTimeout'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise'); // Microtask
});

console.log('4. Script end');

// Output: 1, 4, 3, 2
\`\`\`

**Microtasks** have priority over macrotasks:
- Microtasks: Promises, queueMicrotask
- Macrotasks: setTimeout, setInterval, I/O

## Common Pitfalls

\`\`\`javascript
// Blocking the event loop
const start = Date.now();
while (Date.now() - start < 1000) {
  // Blocks for 1 second!
}

// Better: Use async approach
await new Promise(resolve => setTimeout(resolve, 1000));
\`\`\`

## Best Practices

1. **Don't block the event loop** - Keep callbacks fast
2. **Use async/await** for readable async code
3. **Handle errors** in promises
4. **Use worker threads** for CPU-intensive tasks
5. **Monitor memory** - Detect leaks with --inspect
    `,
    questions: [
      {
        question: 'What is the main purpose of the Node.js event loop?',
        options: [
          'To create multiple threads',
          'To handle async operations non-blockingly',
          'To compile JavaScript',
          'To manage database connections'
        ],
        correctAnswer: 1,
        explanation: 'The event loop allows Node.js to perform non-blocking I/O operations despite being single-threaded. It offloads operations to the system kernel when possible and executes callbacks when operations complete.'
      },
      {
        question: 'Which executes first: Promise.then() or setTimeout(..., 0)?',
        options: [
          'setTimeout executes first',
          'Promise.then() executes first',
          'They execute at the same time',
          'It depends on the code'
        ],
        correctAnswer: 1,
        explanation: 'Promise callbacks (microtasks) have priority over setTimeout callbacks (macrotasks). The event loop processes all microtasks before moving to the next macrotask.'
      },
      {
        question: 'Why is blocking the event loop bad?',
        options: [
          'It uses too much memory',
          'It prevents other code from executing',
          'It causes security issues',
          'It makes code harder to read'
        ],
        correctAnswer: 1,
        explanation: 'Since Node.js is single-threaded, blocking the event loop prevents ALL other code from executing - including handling new requests, running callbacks, and processing I/O events.'
      },
      {
        question: 'How many threads does Node.js use for JavaScript execution?',
        options: [
          'Multiple threads (one per CPU)',
          'Two threads',
          'One single thread',
          'Unlimited threads'
        ],
        correctAnswer: 2,
        explanation: 'Node.js uses a single thread for JavaScript execution. However, it uses a thread pool for certain operations (file I/O, DNS lookups, etc.) through libuv, and can leverage worker threads for CPU-intensive tasks.'
      }
    ],
    duration: '20 min',
    difficulty: 'Advanced',
    tags: ['Node.js', 'JavaScript', 'Backend'],
    dayOfWeek: 6 // Saturday
  }
];

export function getTodayLesson(): MicroLearning {
  const today = new Date().getDay();
  const lesson = microLearningLessons.find(l => l.dayOfWeek === today);
  return lesson || microLearningLessons[0];
}

export function getLessonById(id: string): MicroLearning | undefined {
  return microLearningLessons.find(l => l.id === id);
}
