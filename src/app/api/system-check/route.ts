import { NextRequest, NextResponse } from 'next/server';
import { gamesDatabase } from '@/data/games-database';

interface SystemSpecs {
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
}

interface GameRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  directX: string;
  storage: string;
}

// GPU performance database (relative performance scores)
const gpuScores: Record<string, number> = {
  // NVIDIA RTX 40 Series
  'rtx 4090': 100, 'rtx 4080 super': 95, 'rtx 4080': 90, 
  'rtx 4070 ti super': 85, 'rtx 4070 ti': 80, 'rtx 4070 super': 75, 'rtx 4070': 70,
  'rtx 4060 ti': 60, 'rtx 4060': 55,
  // NVIDIA RTX 30 Series
  'rtx 3090 ti': 88, 'rtx 3090': 85, 'rtx 3080 ti': 82, 'rtx 3080': 78,
  'rtx 3070 ti': 70, 'rtx 3070': 65, 'rtx 3060 ti': 60, 'rtx 3060': 50,
  'rtx 3050': 35,
  // NVIDIA RTX 20 Series
  'rtx 2080 ti': 65, 'rtx 2080 super': 60, 'rtx 2080': 55, 
  'rtx 2070 super': 50, 'rtx 2070': 45, 'rtx 2060 super': 42, 'rtx 2060': 40,
  // NVIDIA GTX 16/10 Series
  'gtx 1660 ti': 38, 'gtx 1660 super': 35, 'gtx 1660': 32,
  'gtx 1080 ti': 50, 'gtx 1080': 45, 'gtx 1070 ti': 40, 'gtx 1070': 38,
  'gtx 1060': 28, 'gtx 1050 ti': 18, 'gtx 1050': 15,
  // AMD RX 7000 Series
  'rx 7900 xtx': 98, 'rx 7900 xt': 92, 'rx 7900 gre': 85,
  'rx 7800 xt': 78, 'rx 7700 xt': 70, 'rx 7600 xt': 58, 'rx 7600': 55,
  // AMD RX 6000 Series
  'rx 6950 xt': 85, 'rx 6900 xt': 82, 'rx 6800 xt': 75, 'rx 6800': 70,
  'rx 6750 xt': 55, 'rx 6700 xt': 52, 'rx 6700': 48, 'rx 6650 xt': 45,
  'rx 6600 xt': 42, 'rx 6600': 40, 'rx 6500 xt': 28,
  // AMD RX 5000/500 Series
  'rx 580': 28, 'rx 570': 22, 'rx 560': 18,
  'rx 5700 xt': 55, 'rx 5700': 50, 'rx 5600 xt': 45,
  // Intel Arc
  'arc a770': 48, 'arc a750': 42, 'arc a580': 35, 'arc a380': 18
};

// CPU performance database
const cpuScores: Record<string, number> = {
  // Intel 14th Gen
  'i9-14900k': 100, 'i9-14900kf': 98, 'i7-14700k': 92, 'i7-14700kf': 90,
  'i5-14600k': 80, 'i5-14600kf': 78,
  // Intel 13th Gen
  'i9-13900k': 98, 'i9-13900kf': 96, 'i7-13700k': 88, 'i7-13700kf': 86,
  'i5-13600k': 75, 'i5-13600kf': 73, 'i5-13400': 55, 'i5-13400f': 53,
  // Intel 12th Gen
  'i9-12900k': 85, 'i9-12900kf': 83, 'i7-12700k': 75, 'i7-12700kf': 73,
  'i5-12600k': 65, 'i5-12600kf': 63, 'i5-12400': 50, 'i5-12400f': 48,
  // Intel 11th Gen
  'i9-11900k': 70, 'i7-11700k': 60, 'i5-11600k': 50, 'i5-11400': 40,
  // Intel 10th Gen
  'i9-10900k': 68, 'i7-10700k': 58, 'i5-10600k': 48, 'i5-10400': 38,
  // Intel 9th/8th Gen
  'i9-9900k': 60, 'i7-9700k': 52, 'i5-9600k': 42, 'i5-8400': 35,
  // Intel 7th/6th Gen
  'i7-7700k': 45, 'i5-7600k': 32, 'i5-6600k': 28,
  // AMD Ryzen 9000 Series
  'ryzen 9 9950x': 100, 'ryzen 9 9900x': 95, 'ryzen 7 9700x': 82,
  // AMD Ryzen 7000 Series
  'ryzen 9 7950x3d': 98, 'ryzen 9 7950x': 95, 'ryzen 9 7900x3d': 90,
  'ryzen 9 7900x': 88, 'ryzen 7 7800x3d': 85, 'ryzen 7 7700x': 72,
  'ryzen 5 7600x': 58, 'ryzen 5 7600': 55,
  // AMD Ryzen 5000 Series
  'ryzen 9 5950x': 82, 'ryzen 9 5900x': 78, 'ryzen 7 5800x3d': 75,
  'ryzen 7 5800x': 62, 'ryzen 7 5700x': 58, 'ryzen 5 5600x': 50,
  'ryzen 5 5600': 48, 'ryzen 5 5500': 42,
  // AMD Ryzen 3000 Series
  'ryzen 9 3950x': 65, 'ryzen 7 3800x': 52, 'ryzen 7 3700x': 48,
  'ryzen 5 3600': 38, 'ryzen 5 3600x': 40, 'ryzen 5 3500': 30,
  // AMD Ryzen 2000 Series
  'ryzen 7 2700x': 40, 'ryzen 5 2600': 30, 'ryzen 5 2600x': 32,
  // AMD Ryzen 1000 Series
  'ryzen 7 1800x': 35, 'ryzen 5 1600': 25
};

function getGPUScore(gpuName: string): number {
  const normalized = gpuName.toLowerCase()
    .replace(/nvidia|geforce|amd|radeon|intel|arc/gi, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
  
  // Direct match
  if (gpuScores[normalized]) {
    return gpuScores[normalized];
  }
  
  // Partial match
  for (const [key, score] of Object.entries(gpuScores)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return score;
    }
  }
  
  // Try to match first 2 words
  const words = normalized.split(' ').slice(0, 2).join(' ');
  for (const [key, score] of Object.entries(gpuScores)) {
    if (key.includes(words) || words.includes(key)) {
      return score;
    }
  }
  
  return 30; // Default score for unknown GPUs
}

function getCPUScore(cpuName: string): number {
  const normalized = cpuName.toLowerCase()
    .replace(/intel|core|amd|ryzen|processor/gi, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
  
  // Direct match
  if (cpuScores[normalized]) {
    return cpuScores[normalized];
  }
  
  // Partial match
  for (const [key, score] of Object.entries(cpuScores)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return score;
    }
  }
  
  // Try to match first 2 words
  const words = normalized.split(' ').slice(0, 2).join(' ');
  for (const [key, score] of Object.entries(cpuScores)) {
    if (key.includes(words) || words.includes(key)) {
      return score;
    }
  }
  
  return 30; // Default score for unknown CPUs
}

function parseRequirement(req: string): number {
  const match = req.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function analyzeRequirements(req: GameRequirement): { minCpu: number; minGpu: number; minRam: number; recCpu: number; recGpu: number; recRam: number } {
  return {
    minCpu: getCPUScore(req.processor),
    minGpu: getGPUScore(req.graphics),
    minRam: parseRequirement(req.memory),
    recCpu: getCPUScore(req.processor) * 1.3, // Estimate recommended is ~30% higher
    recGpu: getGPUScore(req.graphics) * 1.3,
    recRam: parseRequirement(req.memory) * 1.5
  };
}

function calculatePerformance(userSpecs: SystemSpecs, gameReq: GameRequirement): {
  cpu: 'excellent' | 'good' | 'pass' | 'fail';
  gpu: 'excellent' | 'good' | 'pass' | 'fail';
  ram: 'excellent' | 'good' | 'pass' | 'fail';
  storage: 'excellent' | 'good' | 'pass' | 'fail';
  score: number;
  settings: string;
  fps_estimate: string;
} {
  const userCpuScore = getCPUScore(userSpecs.cpu);
  const userGpuScore = getGPUScore(userSpecs.gpu);
  const minRam = parseRequirement(gameReq.memory);
  const minStorage = parseRequirement(gameReq.storage);
  
  const minCpuScore = getCPUScore(gameReq.processor);
  const minGpuScore = getGPUScore(gameReq.graphics);
  
  // CPU Analysis
  const cpuRatio = userCpuScore / Math.max(minCpuScore, 1);
  let cpu: 'excellent' | 'good' | 'pass' | 'fail';
  if (cpuRatio >= 1.5) cpu = 'excellent';
  else if (cpuRatio >= 1.2) cpu = 'good';
  else if (cpuRatio >= 1.0) cpu = 'pass';
  else cpu = 'fail';
  
  // GPU Analysis
  const gpuRatio = userGpuScore / Math.max(minGpuScore, 1);
  let gpu: 'excellent' | 'good' | 'pass' | 'fail';
  if (gpuRatio >= 1.5) gpu = 'excellent';
  else if (gpuRatio >= 1.2) gpu = 'good';
  else if (gpuRatio >= 1.0) gpu = 'pass';
  else gpu = 'fail';
  
  // RAM Analysis
  let ram: 'excellent' | 'good' | 'pass' | 'fail';
  if (userSpecs.ram >= minRam * 1.5) ram = 'excellent';
  else if (userSpecs.ram >= minRam * 1.25) ram = 'good';
  else if (userSpecs.ram >= minRam) ram = 'pass';
  else ram = 'fail';
  
  // Storage Analysis
  let storage: 'excellent' | 'good' | 'pass' | 'fail';
  if (userSpecs.storage >= minStorage * 1.5) storage = 'excellent';
  else if (userSpecs.storage >= minStorage * 1.2) storage = 'good';
  else if (userSpecs.storage >= minStorage) storage = 'pass';
  else storage = 'fail';
  
  // Overall Score (0-100)
  const score = Math.round(
    (cpuRatio > 2 ? 100 : cpuRatio > 1.5 ? 90 : cpuRatio > 1.2 ? 80 : cpuRatio >= 1 ? 70 : cpuRatio * 60) * 0.3 +
    (gpuRatio > 2 ? 100 : gpuRatio > 1.5 ? 90 : gpuRatio > 1.2 ? 80 : gpuRatio >= 1 ? 70 : gpuRatio * 60) * 0.4 +
    (ram === 'excellent' ? 100 : ram === 'good' ? 85 : ram === 'pass' ? 70 : 40) * 0.15 +
    (storage === 'excellent' ? 100 : storage === 'good' ? 85 : storage === 'pass' ? 70 : 40) * 0.15
  );
  
  // Settings Recommendation
  let settings: string;
  if (gpuRatio >= 1.8 && cpuRatio >= 1.5) settings = 'Ultra (4K 60+ FPS)';
  else if (gpuRatio >= 1.4 && cpuRatio >= 1.2) settings = 'High (1440p 60+ FPS)';
  else if (gpuRatio >= 1.0 && cpuRatio >= 1.0) settings = 'Medium (1080p 60 FPS)';
  else if (gpuRatio >= 0.7) settings = 'Low (1080p 30-45 FPS)';
  else settings = 'Below Minimum';
  
  // FPS Estimate
  let fps_estimate: string;
  if (gpuRatio >= 1.8) fps_estimate = '100+ FPS at 1440p Ultra';
  else if (gpuRatio >= 1.4) fps_estimate = '60-80 FPS at 1440p High';
  else if (gpuRatio >= 1.0) fps_estimate = '50-60 FPS at 1080p Medium';
  else if (gpuRatio >= 0.7) fps_estimate = '30-45 FPS at 1080p Low';
  else fps_estimate = 'Unplayable';
  
  return { cpu, gpu, ram, storage, score, settings, fps_estimate };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, userSpecs } = body as { gameId: string; userSpecs: SystemSpecs };
    
    if (!gameId || !userSpecs) {
      return NextResponse.json(
        { error: 'Game ID and user specs are required' },
        { status: 400 }
      );
    }
    
    const game = gamesDatabase.find(g => g.id === gameId);
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found in database' },
        { status: 404 }
      );
    }
    
    const performance = calculatePerformance(userSpecs, game.minimumRequirements);
    
    // Generate upgrade suggestions
    const upgrades: string[] = [];
    if (performance.gpu === 'fail') {
      upgrades.push(`GPU: Upgrade to at least ${game.minimumRequirements.graphics} for playable performance`);
    } else if (performance.gpu === 'pass') {
      upgrades.push(`GPU: Consider upgrading to ${game.recommendedRequirements.graphics} for better visuals`);
    }
    
    if (performance.cpu === 'fail') {
      upgrades.push(`CPU: Upgrade to at least ${game.minimumRequirements.processor}`);
    }
    
    const minRam = parseRequirement(game.minimumRequirements.memory);
    if (performance.ram === 'fail') {
      upgrades.push(`RAM: Upgrade to at least ${minRam} GB`);
    } else if (performance.ram === 'pass') {
      upgrades.push(`RAM: Consider ${Math.ceil(minRam * 1.5)} GB for smoother multitasking`);
    }
    
    const minStorage = parseRequirement(game.minimumRequirements.storage);
    if (performance.storage === 'fail') {
      upgrades.push(`Storage: Free up at least ${minStorage} GB or upgrade your storage`);
    }
    
    return NextResponse.json({
      game: {
        id: game.id,
        name: game.name
      },
      canRun: performance.cpu !== 'fail' && performance.gpu !== 'fail' && performance.ram !== 'fail',
      performance,
      upgrades,
      requirements: {
        minimum: game.minimumRequirements,
        recommended: game.recommendedRequirements
      }
    });
    
  } catch (error) {
    console.error('System check error:', error);
    return NextResponse.json(
      { error: 'An error occurred while checking compatibility' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const trending = searchParams.get('trending');
  
  let games = gamesDatabase;
  
  if (trending === 'true') {
    games = games.filter(g => g.trending);
  }
  
  if (query) {
    const searchQuery = query.toLowerCase();
    games = games.filter(g => 
      g.name.toLowerCase().includes(searchQuery) ||
      g.genre.some(genre => genre.toLowerCase().includes(searchQuery))
    );
  }
  
  return NextResponse.json({
    games: games.map(g => ({
      id: g.id,
      name: g.name,
      genre: g.genre,
      releaseDate: g.releaseDate,
      price: g.price,
      imageUrl: g.imageUrl,
      trending: g.trending,
      popularity: g.popularity
    }))
  });
}
