'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Gamepad2, 
  Cpu, 
  HardDrive, 
  Monitor, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Search,
  ArrowUpRight,
  Zap,
  Loader2,
  Info,
  TrendingUp,
  Gauge,
  MonitorPlay
} from 'lucide-react';
import { gamesDatabase, Game } from '@/data/games-database';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserSpecs {
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
}

interface PerformanceResult {
  cpu: 'excellent' | 'good' | 'pass' | 'fail';
  gpu: 'excellent' | 'good' | 'pass' | 'fail';
  ram: 'excellent' | 'good' | 'pass' | 'fail';
  storage: 'excellent' | 'good' | 'pass' | 'fail';
  score: number;
  settings: string;
  fps_estimate: string;
}

interface CompatibilityResult {
  game: { id: string; name: string };
  canRun: boolean;
  performance: PerformanceResult;
  upgrades: string[];
  requirements: {
    minimum: Game['minimumRequirements'];
    recommended: Game['recommendedRequirements'];
  };
}

export default function CanYouRunItClient() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [userSpecs, setUserSpecs] = useState<UserSpecs>({
    cpu: '',
    gpu: '',
    ram: 16,
    storage: 500
  });
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const filteredGames = gamesDatabase.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTrending = showTrendingOnly ? game.trending : true;
    return matchesSearch && matchesTrending;
  }).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  const checkCompatibility = async () => {
    if (!selectedGame) return;
    if (!userSpecs.cpu.trim() || !userSpecs.gpu.trim()) {
      setError('Please enter your CPU and GPU specifications');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/system-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: selectedGame.id,
          userSpecs
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check compatibility');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to check compatibility. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: 'excellent' | 'good' | 'pass' | 'fail') => {
    switch (status) {
      case 'excellent':
        return <Zap className="w-5 h-5 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: 'excellent' | 'good' | 'pass' | 'fail') => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-green-400">Good</Badge>;
      case 'pass':
        return <Badge className="bg-yellow-500">Playable</Badge>;
      case 'fail':
        return <Badge className="bg-red-500">Below Min</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Can You Run It? - System Requirements Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Game Selection */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select a Game</Label>
                
                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search games..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant={showTrendingOnly ? "default" : "outline"}
                    size="icon"
                    onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                    className={showTrendingOnly ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Games Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {filteredGames.map(game => (
                    <button
                      key={game.id}
                      onClick={() => {
                        setSelectedGame(game);
                        setResult(null);
                        setShowForm(true);
                      }}
                      className={`p-2 rounded-lg border text-left transition-all hover:border-purple-500/50 overflow-hidden ${
                        selectedGame?.id === game.id ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/10' : 'border-border'
                      }`}
                    >
                      <div className="relative h-20 mb-2 rounded overflow-hidden bg-muted">
                        {game.imageUrl ? (
                          <img 
                            src={game.imageUrl} 
                            alt={game.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/games/generic-game.png';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gamepad2 className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-1 left-2 right-2">
                          <p className="font-medium text-xs text-white truncate">{game.name}</p>
                        </div>
                        {game.trending && (
                          <div className="absolute top-1 right-1">
                            <Badge className="bg-orange-500 text-[10px] px-1 py-0">HOT</Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                        <span>{game.releaseDate}</span>
                        <span className="font-medium">{game.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Game Info */}
              {selectedGame && (
                <Card className="bg-muted/30 overflow-hidden">
                  <div className="relative h-32">
                    {selectedGame.imageUrl ? (
                      <img 
                        src={selectedGame.imageUrl} 
                        alt={selectedGame.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Gamepad2 className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-muted/30 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{selectedGame.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedGame.developer}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">{selectedGame.price}</Badge>
                          {selectedGame.genre.slice(0, 2).map(g => (
                            <Badge key={g} variant="secondary">{g}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-background rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Minimum Requirements</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-muted-foreground">CPU:</span> {selectedGame.minimumRequirements.processor}</div>
                        <div><span className="text-muted-foreground">GPU:</span> {selectedGame.minimumRequirements.graphics}</div>
                        <div><span className="text-muted-foreground">RAM:</span> {selectedGame.minimumRequirements.memory}</div>
                        <div><span className="text-muted-foreground">Storage:</span> {selectedGame.minimumRequirements.storage}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* User Specs Input & Results */}
            <div className="space-y-6">
              {showForm && selectedGame ? (
                <>
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Your PC Specifications</Label>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> CPU (Processor)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px] text-xs">Enter your full CPU name, e.g., "Intel Core i5-12400" or "AMD Ryzen 5 5600X"</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          placeholder="e.g., Intel Core i5-12400 or Ryzen 5 5600X"
                          value={userSpecs.cpu}
                          onChange={(e) => setUserSpecs({ ...userSpecs, cpu: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> GPU (Graphics Card)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px] text-xs">Enter your GPU model, e.g., "NVIDIA RTX 3060" or "AMD RX 6700 XT"</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          placeholder="e.g., NVIDIA RTX 3060 or AMD RX 6700 XT"
                          value={userSpecs.gpu}
                          onChange={(e) => setUserSpecs({ ...userSpecs, gpu: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <HardDrive className="w-4 h-4" /> RAM (GB)
                          </Label>
                          <Input
                            type="number"
                            placeholder="16"
                            value={userSpecs.ram}
                            onChange={(e) => setUserSpecs({ ...userSpecs, ram: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Storage (GB)</Label>
                          <Input
                            type="number"
                            placeholder="500"
                            value={userSpecs.storage}
                            onChange={(e) => setUserSpecs({ ...userSpecs, storage: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-sm text-destructive">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {error}
                      </div>
                    )}
                    
                    <Button 
                      onClick={checkCompatibility}
                      disabled={!userSpecs.cpu || !userSpecs.gpu || isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Check Compatibility
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Results */}
                  {result && (
                    <Card className={`${result.canRun ? 'border-green-500/50' : 'border-red-500/50'}`}>
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          {result.canRun ? (
                            <>
                              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-3" />
                              <h3 className="text-xl font-bold text-green-500">Yes, You Can Run It!</h3>
                              <p className="text-muted-foreground">
                                {result.performance.settings}
                              </p>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-16 h-16 mx-auto text-red-500 mb-3" />
                              <h3 className="text-xl font-bold text-red-500">PC Doesn't Meet Requirements</h3>
                              <p className="text-muted-foreground">You may need to upgrade your hardware</p>
                            </>
                          )}
                        </div>
                        
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <Gauge className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                            <p className="text-xs text-muted-foreground">Performance</p>
                            <p className="font-bold text-lg">{result.performance.score}/100</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg text-center">
                            <MonitorPlay className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                            <p className="text-xs text-muted-foreground">Expected FPS</p>
                            <p className="font-medium text-sm">{result.performance.fps_estimate}</p>
                          </div>
                        </div>
                        
                        {/* Component Status */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(result.performance.cpu)}
                              <span className="font-medium">CPU</span>
                            </div>
                            {getStatusBadge(result.performance.cpu)}
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(result.performance.gpu)}
                              <span className="font-medium">GPU</span>
                            </div>
                            {getStatusBadge(result.performance.gpu)}
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(result.performance.ram)}
                              <span className="font-medium">RAM</span>
                            </div>
                            {getStatusBadge(result.performance.ram)}
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(result.performance.storage)}
                              <span className="font-medium">Storage</span>
                            </div>
                            {getStatusBadge(result.performance.storage)}
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Compatibility</span>
                            <span className={getScoreColor(result.performance.score)}>{result.performance.score}%</span>
                          </div>
                          <Progress value={result.performance.score} className="h-3" />
                        </div>
                        
                        {/* Upgrade Suggestions */}
                        {result.upgrades.length > 0 && (
                          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            <p className="font-medium text-sm mb-2 flex items-center gap-2">
                              <ArrowUpRight className="w-4 h-4" /> Suggested Upgrades
                            </p>
                            <ul className="space-y-1">
                              {result.upgrades.map((upgrade, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-amber-500 mt-1">•</span>
                                  {upgrade}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-64 bg-muted/30 rounded-xl">
                  <div className="text-center text-muted-foreground">
                    <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a game to check compatibility</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
