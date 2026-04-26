'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Calendar, 
  MapPin,
  DollarSign,
  Star,
  Users,
  Clock,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Newspaper,
  Building,
  Image as ImageIcon
} from 'lucide-react';

interface GTANews {
  title: string;
  source: string;
  date: string;
  url: string;
  snippet: string;
}

interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export default function GTA6Client() {
  const [userSpecs, setUserSpecs] = useState({ cpu: '', gpu: '', ram: 16, storage: 500 });
  const [compatibilityResult, setCompatibilityResult] = useState<null | {
    canRun: boolean;
    cpu: 'pass' | 'fail' | 'recommended';
    gpu: 'pass' | 'fail' | 'recommended';
    ram: 'pass' | 'fail' | 'recommended';
    storage: 'pass' | 'fail' | 'recommended';
    overallScore: number;
  }>(null);
  const [news, setNews] = useState<GTANews[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [activeTab, setActiveTab] = useState('requirements');

  // GTA 6 system requirements (based on leaks and estimates)
  const requirements: SystemRequirements = {
    minimum: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-8600K / AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      storage: '150 GB available space (SSD recommended)'
    },
    recommended: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT',
      storage: '150 GB SSD'
    }
  };

  const gameInfo = {
    title: "Grand Theft Auto VI",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "Fall 2025",
    price: "$69.99",
    platforms: ["PlayStation 5", "Xbox Series X|S", "PC (Later)"],
    genres: ["Action", "Adventure", "Open World"],
    rating: "Rating Pending",
    location: "Vice City (Leonida State)",
    protagonists: ["Lucia", "Jason"],
    features: [
      "Massive open world map - Vice City and beyond",
      "Dual protagonist system with Lucia and Jason",
      "Next-gen graphics with ray tracing",
      "Enhanced physics and destruction",
      "Dynamic weather and day/night cycle",
      "Expanded GTA Online integration",
      "Hundreds of vehicles, boats, and aircraft",
      "Next-gen AI and NPC behaviors",
      "Realistic water physics and underwater exploration",
      "Interactive interior spaces"
    ]
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await fetch('/api/gta6-news');
      if (response.ok) {
        const data = await response.json();
        setNews(data.news || []);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const gpuScores: Record<string, number> = {
    'rtx 4090': 100, 'rtx 4080': 90, 'rtx 4070 ti': 80, 'rtx 4070': 70,
    'rtx 4060 ti': 60, 'rtx 4060': 55, 'rtx 3090': 85, 'rtx 3080': 75,
    'rtx 3070': 65, 'rtx 3060 ti': 60, 'rtx 3060': 50, 'rtx 2080 ti': 60,
    'rtx 2080': 55, 'rtx 2070': 45, 'rtx 2060': 40, 'gtx 1080 ti': 50,
    'gtx 1080': 45, 'gtx 1070': 40, 'gtx 1660 ti': 35, 'gtx 1660': 30,
    'gtx 1060': 25, 'gtx 1050 ti': 18, 'rx 7900 xtx': 95, 'rx 7900 xt': 88,
    'rx 7800 xt': 75, 'rx 6800 xt': 70, 'rx 6700 xt': 55, 'rx 580': 28,
  };

  const cpuScores: Record<string, number> = {
    'i9-14900k': 100, 'i9-13900k': 95, 'i7-14700k': 90, 'i7-13700k': 85,
    'i5-14600k': 75, 'i5-13600k': 70, 'i5-12600k': 60, 'i5-12400': 50,
    'i7-12700k': 70, 'i7-10700k': 55, 'i5-10600k': 45, 'i5-9600k': 38,
    'i5-8400': 32, 'ryzen 9 7950x3d': 98, 'ryzen 9 7900x': 90,
    'ryzen 7 7800x3d': 85, 'ryzen 7 7700x': 70, 'ryzen 7 5800x': 60,
    'ryzen 5 7600x': 55, 'ryzen 5 5600x': 48, 'ryzen 5 3600': 35,
  };

  const getGPUScore = (gpuName: string): number => {
    const normalized = gpuName.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    for (const [key, score] of Object.entries(gpuScores)) {
      if (normalized.includes(key)) return score;
    }
    return 30;
  };

  const getCPUScore = (cpuName: string): number => {
    const normalized = cpuName.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    for (const [key, score] of Object.entries(cpuScores)) {
      if (normalized.includes(key)) return score;
    }
    return 30;
  };

  const checkCompatibility = () => {
    const userCpuScore = getCPUScore(userSpecs.cpu);
    const userGpuScore = getGPUScore(userSpecs.gpu);

    // Minimum requirements
    const minCpuScore = 35; // ~Ryzen 5 3600
    const minGpuScore = 25; // ~GTX 1060
    const minRam = 16;

    // Recommended requirements
    const recCpuScore = 55; // ~Ryzen 7 5800X
    const recGpuScore = 70; // ~RTX 4070
    const recRam = 32;

    const cpuResult = userCpuScore >= recCpuScore ? 'recommended' : userCpuScore >= minCpuScore ? 'pass' : 'fail';
    const gpuResult = userGpuScore >= recGpuScore ? 'recommended' : userGpuScore >= minGpuScore ? 'pass' : 'fail';
    const ramResult = userSpecs.ram >= recRam ? 'recommended' : userSpecs.ram >= minRam ? 'pass' : 'fail';
    const storageResult = userSpecs.storage >= 150 ? 'recommended' : userSpecs.storage >= 100 ? 'pass' : 'fail';

    const canRun = cpuResult !== 'fail' && gpuResult !== 'fail' && ramResult !== 'fail';
    const overallScore = Math.round(
      ((cpuResult === 'recommended' ? 100 : cpuResult === 'pass' ? 70 : 0) +
       (gpuResult === 'recommended' ? 100 : gpuResult === 'pass' ? 70 : 0) +
       (ramResult === 'recommended' ? 100 : ramResult === 'pass' ? 70 : 0) +
       (storageResult === 'recommended' ? 100 : storageResult === 'pass' ? 70 : 0)) / 4
    );

    setCompatibilityResult({ canRun, cpu: cpuResult, gpu: gpuResult, ram: ramResult, storage: storageResult, overallScore });
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'recommended') => {
    switch (status) {
      case 'recommended': return <Zap className="w-5 h-5 text-green-500" />;
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: 'pass' | 'fail' | 'recommended') => {
    switch (status) {
      case 'recommended': return <Badge className="bg-green-500">Optimal</Badge>;
      case 'pass': return <Badge className="bg-yellow-500">Playable</Badge>;
      case 'fail': return <Badge className="bg-red-500">Below Minimum</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-background to-background">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        
        {/* Game Cover Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/games/gta6.png" 
            alt="GTA 6 Cover"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-purple-300 text-xs sm:text-sm font-medium">Most Anticipated Game of 2025</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Grand Theft Auto <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">VI</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-4 sm:mb-8">
                Check if your PC can run GTA 6 and get the latest news, system requirements, and features.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4">
                <Badge variant="outline" className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-purple-400" />
                  Release: {gameInfo.releaseDate}
                </Badge>
                <Badge variant="outline" className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
                  {gameInfo.price}
                </Badge>
                <Badge variant="outline" className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-400" />
                  {gameInfo.developer}
                </Badge>
                <Badge variant="outline" className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-400" />
                  {gameInfo.location}
                </Badge>
              </div>
            </div>
            
            {/* Game Cover */}
            <div className="hidden md:block">
              <div className="relative">
                <img 
                  src="/images/games/gta6.png" 
                  alt="GTA 6 Cover Art"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  Coming Fall 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 sm:mb-8 bg-muted/50 p-1 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="requirements" className="px-3 sm:px-6 py-2 text-xs sm:text-sm">
              <Monitor className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">System </span>Requirements
            </TabsTrigger>
            <TabsTrigger value="checker" className="px-3 sm:px-6 py-2 text-xs sm:text-sm">
              <Cpu className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Can I Run It?
            </TabsTrigger>
            <TabsTrigger value="features" className="px-3 sm:px-6 py-2 text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="news" className="px-3 sm:px-6 py-2 text-xs sm:text-sm">
              <Newspaper className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              News
            </TabsTrigger>
          </TabsList>

          {/* System Requirements Tab */}
          <TabsContent value="requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    Minimum Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">OS</p>
                      <p className="font-medium">{requirements.minimum.os}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Processor</p>
                      <p className="font-medium">{requirements.minimum.processor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Memory</p>
                      <p className="font-medium">{requirements.minimum.memory}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Graphics</p>
                      <p className="font-medium">{requirements.minimum.graphics}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Storage</p>
                      <p className="font-medium">{requirements.minimum.storage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Recommended Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">OS</p>
                      <p className="font-medium">{requirements.recommended.os}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Processor</p>
                      <p className="font-medium">{requirements.recommended.processor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Memory</p>
                      <p className="font-medium">{requirements.recommended.memory}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Graphics</p>
                      <p className="font-medium">{requirements.recommended.graphics}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Storage</p>
                      <p className="font-medium">{requirements.recommended.storage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Platform Availability
                </h3>
                <div className="flex flex-wrap gap-3">
                  {gameInfo.platforms.map(platform => (
                    <Badge key={platform} variant="secondary" className="px-4 py-2">
                      {platform}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Note: PC version may release later than consoles. Rockstar typically releases PC versions 6-12 months after console launch.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Can I Run It Tab */}
          <TabsContent value="checker">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  Can Your PC Run GTA 6?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Cpu className="w-4 h-4" /> CPU (Processor)
                        </label>
                        <input
                          type="text"
                          className="w-full h-10 sm:h-11 px-3 rounded-md border border-input bg-background text-sm min-h-[44px]"
                          placeholder="e.g., Intel Core i5-12400"
                          value={userSpecs.cpu}
                          onChange={(e) => {
                            setUserSpecs({ ...userSpecs, cpu: e.target.value });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Monitor className="w-4 h-4" /> GPU (Graphics Card)
                        </label>
                        <input
                          type="text"
                          className="w-full h-10 sm:h-11 px-3 rounded-md border border-input bg-background text-sm min-h-[44px]"
                          placeholder="e.g., NVIDIA RTX 3060"
                          value={userSpecs.gpu}
                          onChange={(e) => {
                            setUserSpecs({ ...userSpecs, gpu: e.target.value });
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                            <HardDrive className="w-3 h-3 sm:w-4 sm:h-4" /> RAM (GB)
                          </label>
                          <input
                            type="number"
                            className="w-full h-10 sm:h-11 px-3 rounded-md border border-input bg-background text-sm min-h-[44px]"
                            placeholder="16"
                            value={userSpecs.ram}
                            onChange={(e) => setUserSpecs({ ...userSpecs, ram: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium">Storage (GB)</label>
                          <input
                            type="number"
                            className="w-full h-10 sm:h-11 px-3 rounded-md border border-input bg-background text-sm min-h-[44px]"
                            placeholder="500"
                            value={userSpecs.storage}
                            onChange={(e) => setUserSpecs({ ...userSpecs, storage: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={checkCompatibility}
                      disabled={!userSpecs.cpu || !userSpecs.gpu}
                      className="w-full h-11 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-h-[44px]"
                    >
                      Check Compatibility
                    </Button>
                  </div>

                  {compatibilityResult ? (
                    <div className={`p-6 rounded-xl border ${compatibilityResult.canRun ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
                      <div className="text-center mb-6">
                        {compatibilityResult.canRun ? (
                          <>
                            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-3" />
                            <h3 className="text-xl font-bold text-green-500">Yes, You Can Run GTA 6!</h3>
                            <p className="text-muted-foreground">
                              {compatibilityResult.overallScore >= 85 ? 'Your PC exceeds recommended specs' : 'Your PC meets minimum requirements'}
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

                      <div className="space-y-3">
                        {[
                          { label: 'CPU', status: compatibilityResult.cpu },
                          { label: 'GPU', status: compatibilityResult.gpu },
                          { label: 'RAM', status: compatibilityResult.ram },
                          { label: 'Storage', status: compatibilityResult.storage },
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {getStatusBadge(item.status)}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Compatibility</span>
                          <span>{compatibilityResult.overallScore}%</span>
                        </div>
                        <Progress value={compatibilityResult.overallScore} className="h-3" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-muted/30 rounded-xl">
                      <div className="text-center text-muted-foreground">
                        <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>Enter your PC specs to check compatibility</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {gameInfo.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    Game Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold">{gameInfo.location}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Protagonists</p>
                      <p className="font-semibold">{gameInfo.protagonists.join(' & ')}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Developer</p>
                      <p className="font-semibold">{gameInfo.developer}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Release</p>
                      <p className="font-semibold">{gameInfo.releaseDate}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold mb-2">Dual Protagonist System</h4>
                    <p className="text-sm text-muted-foreground">
                      GTA 6 features Lucia and Jason as playable characters, with the ability to switch between them 
                      and experience the story from different perspectives. This builds on the successful formula 
                      from GTA 5 while adding new depth to character interactions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                    Latest GTA 6 News
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={fetchNews} disabled={loadingNews} className="w-full sm:w-auto min-h-[44px]">
                    <RefreshCw className={`w-4 h-4 mr-2 ${loadingNews ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingNews ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : news.length > 0 ? (
                  <div className="space-y-4">
                    {news.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium group-hover:text-purple-500 transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.snippet}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{item.source}</span>
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No news available. Click refresh to fetch the latest updates.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
