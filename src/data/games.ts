// Re-export from the comprehensive games database
export { 
  gamesDatabase as popularGames,
  getTrendingGames,
  getGameById,
  searchGames,
  getGamesByGenre,
  type Game,
  type GameRequirement
} from './games-database';

// Popular GPUs for comparison
export const gpuHierarchy = [
  { tier: 'Enthusiast', gpus: ['RTX 4090', 'RTX 4080 Super', 'RX 7900 XTX'] },
  { tier: 'High-End', gpus: ['RTX 4070 Ti Super', 'RTX 4070 Ti', 'RX 7900 XT', 'RX 7800 XT'] },
  { tier: 'Mid-Range', gpus: ['RTX 4070 Super', 'RTX 4070', 'RTX 3080', 'RX 6800 XT'] },
  { tier: 'Entry-Mid', gpus: ['RTX 3060 Ti', 'RTX 3060', 'RTX 2070 Super', 'RX 6700 XT'] },
  { tier: 'Budget', gpus: ['GTX 1660 Super', 'GTX 1060 6GB', 'RX 580', 'RX 570'] }
];

// Popular CPUs for comparison
export const cpuHierarchy = [
  { tier: 'Enthusiast', cpus: ['i9-14900K', 'Ryzen 9 7950X3D', 'i9-13900K'] },
  { tier: 'High-End', cpus: ['i7-14700K', 'Ryzen 7 7800X3D', 'i7-13700K'] },
  { tier: 'Mid-Range', cpus: ['i5-14600K', 'Ryzen 7 7700X', 'i5-13600K'] },
  { tier: 'Entry-Mid', cpus: ['i5-12400', 'Ryzen 5 5600X', 'i5-11400'] },
  { tier: 'Budget', cpus: ['i3-12100F', 'Ryzen 5 3600', 'i5-9400F'] }
];
