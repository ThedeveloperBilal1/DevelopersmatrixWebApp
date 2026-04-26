// Comprehensive games database with system requirements
// Includes trending and upcoming games for 2025-2026

export interface GameRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  directX: string;
  storage: string;
}

export interface Game {
  id: string;
  name: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  genre: string[];
  rating: number;
  price: string;
  platforms: string[];
  imageUrl: string;
  description: string;
  minimumRequirements: GameRequirement;
  recommendedRequirements: GameRequirement;
  features: string[];
  tags: string[];
  trending?: boolean;
  popularity?: number; // 0-100 score
}

export const gamesDatabase: Game[] = [
  // ==================== UPCOMING/TRENDING GAMES 2025-2026 ====================
  {
    id: 'arc-raiders',
    name: 'Arc Raiders',
    developer: 'Embark Studios',
    publisher: 'Embark Studios',
    releaseDate: '2025',
    genre: ['Action', 'Third-Person Shooter', 'Co-op'],
    rating: 0,
    price: 'Free to Play',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/arc-raiders.jpg',
    description: 'Arc Raiders is a third-person cooperative action game where you and your squad of Raiders fight to protect your home from the menacing ARC, a mechanized threat descending from space.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-6600K / AMD Ryzen 5 2600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      directX: 'Version 12',
      storage: '80 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800 XT',
      directX: 'Version 12',
      storage: '80 GB SSD'
    },
    features: [
      'Third-person co-op action',
      'Unique retro-futuristic aesthetic',
      'Strategic gameplay with physics-based mechanics',
      'Free to play model'
    ],
    tags: ['Co-op', 'Shooter', 'Action', 'Free to Play', 'Multiplayer'],
    trending: true,
    popularity: 85
  },
  {
    id: 'battlefield-6',
    name: 'Battlefield 6',
    developer: 'DICE',
    publisher: 'Electronic Arts',
    releaseDate: '2025',
    genre: ['FPS', 'Military', 'Multiplayer'],
    rating: 0,
    price: '$69.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/battlefield6.jpg',
    description: 'The next generation of Battlefield returns to modern warfare with massive 128-player battles, destructible environments, and the signature all-out warfare experience.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT',
      directX: 'Version 12',
      storage: '100 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i7-12700K / AMD Ryzen 7 7800X3D',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 4070 Ti / AMD Radeon RX 7900 XT',
      directX: 'Version 12',
      storage: '100 GB SSD'
    },
    features: [
      '128-player battles',
      'Fully destructible environments',
      'Modern military setting',
      'Next-gen graphics with ray tracing'
    ],
    tags: ['FPS', 'Multiplayer', 'Military', 'Action', 'Competitive'],
    trending: true,
    popularity: 95
  },
  {
    id: 'strands',
    name: 'Strands',
    developer: 'Heart Machine',
    publisher: 'Heart Machine',
    releaseDate: '2025',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 0,
    price: '$29.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/strands.jpg',
    description: 'A surreal sci-fi action adventure from the creators of Hyper Light Drifter. Explore a strange world where reality itself is unraveling.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      directX: 'Version 12',
      storage: '50 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-9700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800',
      directX: 'Version 12',
      storage: '50 GB SSD'
    },
    features: [
      'Unique surreal art style',
      'Challenging combat',
      'Atmospheric storytelling',
      'Original soundtrack'
    ],
    tags: ['Action', 'Adventure', 'Indie', 'Sci-Fi', 'Atmospheric'],
    trending: true,
    popularity: 72
  },
  {
    id: 'split-fiction',
    name: 'Split Fiction',
    developer: 'Hazelight Studios',
    publisher: 'Electronic Arts',
    releaseDate: '2025',
    genre: ['Action', 'Adventure', 'Co-op'],
    rating: 0,
    price: '$39.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/split-fiction.jpg',
    description: 'From the creators of It Takes Two comes a new co-op adventure that blurs the lines between reality and fiction. Two players must navigate shifting genres and storylines.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-6600K / AMD Ryzen 5 2600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580',
      directX: 'Version 12',
      storage: '70 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-8700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6700 XT',
      directX: 'Version 12',
      storage: '70 GB SSD'
    },
    features: [
      'Mandatory 2-player co-op',
      'Genre-shifting gameplay',
      'Award-winning developer',
      'Friend pass system'
    ],
    tags: ['Co-op', 'Adventure', 'Action', 'Multiplayer', 'Story Rich'],
    trending: true,
    popularity: 88
  },
  {
    id: 'clair-obscur-expedition-33',
    name: 'Clair Obscur: Expedition 33',
    developer: 'Sandfall Interactive',
    publisher: 'Sandfall Interactive',
    releaseDate: '2025',
    genre: ['RPG', 'Turn-Based', 'Fantasy'],
    rating: 0,
    price: '$49.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/clair-obscur.jpg',
    description: 'A unique turn-based RPG with stunning visuals inspired by Belle Époque France. Lead Expedition 33 to stop the Paintress from painting death upon the world.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1070 / AMD Radeon RX Vega 56',
      directX: 'Version 12',
      storage: '80 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 Ti / AMD Radeon RX 6800 XT',
      directX: 'Version 12',
      storage: '80 GB SSD'
    },
    features: [
      'Unique turn-based combat',
      'Stunning artistic direction',
      'Dark fantasy setting',
      'Compelling narrative'
    ],
    tags: ['RPG', 'Turn-Based', 'Fantasy', 'Story Rich', 'Indie'],
    trending: true,
    popularity: 78
  },
  {
    id: 'path-of-exile-2',
    name: 'Path of Exile 2',
    developer: 'Grinding Gear Games',
    publisher: 'Grinding Gear Games',
    releaseDate: '2025',
    genre: ['ARPG', 'Action', 'Free to Play'],
    rating: 0,
    price: 'Free to Play',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/poe2.jpg',
    description: 'The highly anticipated sequel to Path of Exile. A new campaign, new classes, and refined combat systems make this the ultimate ARPG experience.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      directX: 'Version 11',
      storage: '90 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800 XT',
      directX: 'Version 11',
      storage: '90 GB SSD'
    },
    features: [
      '7-act campaign',
      '12 new character classes',
      'Overhauled combat system',
      'Free to play with fair monetization'
    ],
    tags: ['ARPG', 'Free to Play', 'Loot', 'Dark Fantasy', 'Multiplayer'],
    trending: true,
    popularity: 92
  },
  {
    id: 'gta-6',
    name: 'Grand Theft Auto VI',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: 'Fall 2025',
    genre: ['Action', 'Adventure', 'Open World'],
    rating: 0,
    price: '$69.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/gta6.png',
    description: 'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-8600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      directX: 'Version 12',
      storage: '150 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT',
      directX: 'Version 12',
      storage: '150 GB SSD'
    },
    features: [
      'Massive open world map covering Vice City and beyond',
      'Dual protagonist system with Lucia and Jason',
      'Next-gen graphics with ray tracing support',
      'Enhanced physics and destruction system',
      'Expanded multiplayer with GTA Online integration',
      'Dynamic weather and day/night cycle',
      'Hundreds of vehicles including cars, boats, and aircraft'
    ],
    tags: ['Open World', 'Action', 'Crime', 'Multiplayer', 'Third-Person'],
    trending: true,
    popularity: 100
  },
  {
    id: 'pokemon-legends-za',
    name: 'Pokémon Legends: Z-A',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    releaseDate: '2025',
    genre: ['RPG', 'Adventure', 'Action'],
    rating: 0,
    price: '$59.99',
    platforms: ['Switch'],
    imageUrl: '/images/games/pokemon-za.jpg',
    description: 'Return to the Kalos region in this new Legends-style adventure. Explore Lumiose City and uncover the mysteries of Mega Evolution in a redesigned open-world experience.',
    minimumRequirements: {
      os: 'Nintendo Switch',
      processor: 'NVIDIA Tegra X1',
      memory: '4 GB RAM',
      graphics: 'Integrated',
      directX: 'N/A',
      storage: '32 GB available space'
    },
    recommendedRequirements: {
      os: 'Nintendo Switch OLED',
      processor: 'NVIDIA Tegra X1',
      memory: '4 GB RAM',
      graphics: 'Integrated',
      directX: 'N/A',
      storage: '64 GB microSD'
    },
    features: [
      'Open-world Lumiose City',
      'Mega Evolution focus',
      'Real-time battle elements',
      'New regional variants'
    ],
    tags: ['RPG', 'Adventure', 'Pokémon', 'Nintendo', 'Open World'],
    trending: true,
    popularity: 88
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    developer: 'Mojang Studios',
    publisher: 'Microsoft',
    releaseDate: 'November 18, 2011',
    genre: ['Sandbox', 'Survival', 'Adventure'],
    rating: 4.9,
    price: '$29.99',
    platforms: ['PC', 'PS5', 'PS4', 'Xbox Series X', 'Xbox One', 'Switch', 'Mobile'],
    imageUrl: '/images/games/minecraft.jpg',
    description: 'The best-selling video game of all time. Explore infinite worlds and build everything from the simplest of homes to the grandest of castles.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i3-3210 / AMD A8-7600 APU',
      memory: '4 GB RAM',
      graphics: 'Intel HD Graphics 4000 / AMD Radeon R5',
      directX: 'Version 11',
      storage: '1 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i5-4690 / AMD A10-7800 APU',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce 700 Series / AMD Radeon Rx 200 Series',
      directX: 'Version 11',
      storage: '4 GB SSD'
    },
    features: [
      'Infinite procedurally generated worlds',
      'Creative and Survival modes',
      'Multiplayer support',
      'Massive modding community',
      'Educational versions available'
    ],
    tags: ['Sandbox', 'Survival', 'Creative', 'Multiplayer', 'Family Friendly'],
    trending: false,
    popularity: 96
  },
  {
    id: 'roblox',
    name: 'Roblox',
    developer: 'Roblox Corporation',
    publisher: 'Roblox Corporation',
    releaseDate: 'September 1, 2006',
    genre: ['Sandbox', 'Platform', 'Social'],
    rating: 4.5,
    price: 'Free to Play',
    platforms: ['PC', 'PS4', 'Xbox One', 'Mobile'],
    imageUrl: '/images/games/roblox.jpg',
    description: 'A platform where millions of players create and share experiences. Play games created by other users or build your own with Roblox Studio.',
    minimumRequirements: {
      os: 'Windows 7 64-bit',
      processor: 'Intel Celeron / AMD Athlon II X2',
      memory: '1 GB RAM',
      graphics: 'Intel HD Graphics 4000 / AMD Radeon HD 7750',
      directX: 'Version 10',
      storage: '1 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i3 / AMD Ryzen 3',
      memory: '4 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1050 / AMD Radeon RX 560',
      directX: 'Version 11',
      storage: '4 GB SSD'
    },
    features: [
      'Millions of user-created games',
      'Built-in game creation tools',
      'Social platform with friends',
      'Avatar customization',
      'Cross-platform play'
    ],
    tags: ['Sandbox', 'Social', 'Platform', 'Free to Play', 'Family Friendly'],
    trending: false,
    popularity: 94
  },
  // ==================== EXISTING POPULAR GAMES ====================
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt',
    releaseDate: 'December 10, 2020',
    genre: ['RPG', 'Action', 'Open World'],
    rating: 4.2,
    price: '$29.99',
    platforms: ['PC', 'PS5', 'Xbox Series X', 'PS4', 'Xbox One'],
    imageUrl: '/images/games/cyberpunk.png',
    description: 'Cyberpunk 2077 is an open-world action-adventure RPG set in the megalopolis of Night City. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-6700 / AMD Ryzen 5 1600',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      directX: 'Version 12',
      storage: '70 GB SSD'
    },
    recommendedRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-12700 / AMD Ryzen 7 7800X3D',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3080 / AMD Radeon RX 6800 XT',
      directX: 'Version 12',
      storage: '70 GB SSD'
    },
    features: [
      'Deep character customization',
      'Branching storylines with multiple endings',
      'Ray tracing and DLSS support',
      'Phantom Liberty expansion available',
      'First-person perspective with dialogue choices'
    ],
    tags: ['RPG', 'Sci-Fi', 'Open World', 'FPS', 'Story Rich'],
    trending: false,
    popularity: 82
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    releaseDate: 'February 25, 2022',
    genre: ['Action RPG', 'Open World', 'Souls-like'],
    rating: 4.8,
    price: '$59.99',
    platforms: ['PC', 'PS5', 'PS4', 'Xbox Series X', 'Xbox One'],
    imageUrl: '/images/games/eldenring.png',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB',
      directX: 'Version 12',
      storage: '60 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1070 8GB / AMD Radeon RX Vega 56 8GB',
      directX: 'Version 12',
      storage: '60 GB SSD'
    },
    features: [
      'Vast open world designed by Hidetaka Miyazaki and George R.R. Martin',
      'Challenging combat with variety of builds',
      'Multiplayer co-op and PvP',
      'Shadow of the Erdtree expansion available',
      'Over 100 hours of content'
    ],
    tags: ['Souls-like', 'Open World', 'Difficult', 'RPG', 'Fantasy'],
    trending: false,
    popularity: 91
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    releaseDate: 'August 3, 2023',
    genre: ['RPG', 'Turn-Based', 'Strategy'],
    rating: 4.9,
    price: '$59.99',
    platforms: ['PC', 'PS5', 'Mac'],
    imageUrl: '/images/games/bg3.png',
    description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-4690 / AMD FX 8350',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon RX 480',
      directX: 'Version 11',
      storage: '150 GB SSD'
    },
    recommendedRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1080 Ti / AMD Radeon RX 5700 XT',
      directX: 'Version 11',
      storage: '150 GB SSD'
    },
    features: [
      'D&D 5th Edition ruleset',
      'Online co-op with up to 4 players',
      'Thousands of choices and consequences',
      '12 classes and 11 races',
      '200+ hours of content'
    ],
    tags: ['Turn-Based', 'RPG', 'Fantasy', 'Co-op', 'Story Rich'],
    trending: false,
    popularity: 93
  },
  {
    id: 'hogwarts-legacy',
    name: 'Hogwarts Legacy',
    developer: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    releaseDate: 'February 10, 2023',
    genre: ['Action RPG', 'Adventure', 'Open World'],
    rating: 4.5,
    price: '$59.99',
    platforms: ['PC', 'PS5', 'PS4', 'Xbox Series X', 'Xbox One', 'Switch'],
    imageUrl: '/images/games/hogwarts.png',
    description: 'Experience the wizarding world in the 1800s as a student who holds the key to an ancient secret that threatens to tear the wizarding world apart.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-6600 / AMD Ryzen 5 2600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960 4GB / AMD Radeon RX 470 4GB',
      directX: 'Version 12',
      storage: '85 GB SSD'
    },
    recommendedRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-8700 / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1080 Ti / AMD Radeon RX 5700 XT',
      directX: 'Version 12',
      storage: '85 GB SSD'
    },
    features: [
      'Explore Hogwarts castle and surrounding areas',
      'Learn spells, brew potions, and tame beasts',
      'Make choices that affect your story',
      'Dynamic seasons and weather',
      'Deep combat system with combos'
    ],
    tags: ['Magic', 'Open World', 'RPG', 'Adventure', 'Fantasy'],
    trending: false,
    popularity: 85
  },
  {
    id: 'starfield',
    name: 'Starfield',
    developer: 'Bethesda Game Studios',
    publisher: 'Bethesda Softworks',
    releaseDate: 'September 6, 2023',
    genre: ['RPG', 'Space Sim', 'Open World'],
    rating: 4.0,
    price: '$69.99',
    platforms: ['PC', 'Xbox Series X'],
    imageUrl: '/images/games/starfield.jpg',
    description: 'Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-10600K / AMD Ryzen 5 3600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1070 Ti / AMD Radeon RX 5700 XT',
      directX: 'Version 12',
      storage: '140 GB SSD'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-12700K / AMD Ryzen 7 5800X',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 4080 / AMD Radeon RX 7900 XT',
      directX: 'Version 12',
      storage: '140 GB SSD'
    },
    features: [
      'Explore over 1000 planets',
      'Build and customize spaceships',
      'Deep character progression',
      'Multiple factions and storylines',
      'Mod support via Creation Kit'
    ],
    tags: ['Space', 'RPG', 'Open World', 'Sci-Fi', 'Exploration'],
    trending: false,
    popularity: 75
  },
  {
    id: 'alan-wake-2',
    name: 'Alan Wake 2',
    developer: 'Remedy Entertainment',
    publisher: 'Epic Games Publishing',
    releaseDate: 'October 27, 2023',
    genre: ['Horror', 'Action', 'Adventure'],
    rating: 4.7,
    price: '$59.99',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    imageUrl: '/images/games/alanwake2.jpg',
    description: 'A string of ritualistic murders threatens Bright Falls. To stop the darkness, FBI Agent Saga Anderson must investigate and Alan Wake must write his way to freedom.',
    minimumRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i5-7600K / AMD Ryzen 5 2600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
      directX: 'Version 12',
      storage: '90 GB SSD'
    },
    recommendedRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 3700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 / AMD Radeon RX 6700 XT',
      directX: 'Version 12',
      storage: '90 GB SSD'
    },
    features: [
      'Dual protagonist campaign',
      'Psychological horror experience',
      'Ray tracing and DLSS 3.5 support',
      'Live-action sequences',
      'Mind Place investigation mechanics'
    ],
    tags: ['Horror', 'Thriller', 'Mystery', 'Third-Person', 'Psychological'],
    trending: false,
    popularity: 86
  },
  {
    id: 'counter-strike-2',
    name: 'Counter-Strike 2',
    developer: 'Valve Corporation',
    publisher: 'Valve Corporation',
    releaseDate: 'September 27, 2023',
    genre: ['FPS', 'Competitive', 'Tactical'],
    rating: 4.5,
    price: 'Free to Play',
    platforms: ['PC'],
    imageUrl: '/images/games/cs2.jpg',
    description: 'Counter-Strike 2 is the largest technical leap forward in Counter-Strike history, ensuring new features and updates for years to come.',
    minimumRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-4430 / AMD FX-6300',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon RX 470',
      directX: 'Version 11',
      storage: '60 GB available space'
    },
    recommendedRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i7-8700K / AMD Ryzen 7 2700X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6600 XT',
      directX: 'Version 11',
      storage: '60 GB SSD'
    },
    features: [
      'Completely rebuilt on Source 2 engine',
      'Sub-tick server architecture',
      'Premier competitive mode',
      'Overhauled smoke grenades',
      'CS Rating system'
    ],
    tags: ['FPS', 'Competitive', 'Esports', 'Free to Play', 'Tactical'],
    trending: false,
    popularity: 90
  }
];

// Helper functions
export const getTrendingGames = () => gamesDatabase.filter(game => game.trending);
export const getGameById = (id: string) => gamesDatabase.find(game => game.id === id);
export const searchGames = (query: string) => 
  gamesDatabase.filter(game => 
    game.name.toLowerCase().includes(query.toLowerCase()) ||
    game.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
    game.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );
export const getGamesByGenre = (genre: string) => 
  gamesDatabase.filter(game => 
    game.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  );

// Export for backward compatibility
export const popularGames = gamesDatabase;
export type { Game } from './games-database';
