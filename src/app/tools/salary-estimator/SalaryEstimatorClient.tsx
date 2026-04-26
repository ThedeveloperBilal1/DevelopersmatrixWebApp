'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Search,
  BarChart3,
  RefreshCw,
  Info,
  Building,
  Briefcase
} from 'lucide-react';

interface SalaryData {
  min: number;
  max: number;
  median: number;
  currency: string;
  source: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  insights: string;
  lastUpdated: string;
}

const popularRoles = [
  'Software Engineer',
  'Senior Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Product Manager',
  'Data Scientist',
  'Data Engineer',
  'Machine Learning Engineer',
  'Engineering Manager',
  'Tech Lead',
  'QA Engineer',
  'Mobile Developer',
];

const locations = [
  { name: 'San Francisco', country: 'USA' },
  { name: 'New York', country: 'USA' },
  { name: 'Seattle', country: 'USA' },
  { name: 'Austin', country: 'USA' },
  { name: 'Remote', country: 'Global' },
  { name: 'Los Angeles', country: 'USA' },
  { name: 'Boston', country: 'USA' },
  { name: 'Denver', country: 'USA' },
  { name: 'Chicago', country: 'USA' },
  { name: 'Miami', country: 'USA' },
];

export default function SalaryEstimatorClient() {
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [experience, setExperience] = useState('mid');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryData | null>(null);
  const [error, setError] = useState('');

  const activeRole = customRole || selectedRole;

  const fetchSalaryData = async () => {
    if (!activeRole || !selectedLocation) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/salary-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: activeRole,
          location: selectedLocation,
          experience
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch salary data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Unable to fetch real-time data. Using estimates.');
      // Use local estimates as fallback
      const localData = getLocalEstimate(activeRole, selectedLocation, experience);
      setResult(localData);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalEstimate = (role: string, location: string, exp: string): SalaryData => {
    const baseSalaries: Record<string, number> = {
      'software engineer': 130000,
      'senior software engineer': 180000,
      'full stack developer': 135000,
      'frontend developer': 120000,
      'backend developer': 135000,
      'devops engineer': 145000,
      'product manager': 150000,
      'data scientist': 140000,
    };

    const locationMultipliers: Record<string, number> = {
      'san francisco': 1.35,
      'new york': 1.25,
      'seattle': 1.20,
      'austin': 1.00,
      'remote': 1.05,
      'los angeles': 1.15,
      'boston': 1.15,
      'denver': 0.95,
      'chicago': 0.95,
      'miami': 0.95,
    };

    const experienceMultipliers: Record<string, number> = {
      'junior': 0.75,
      'mid': 1.0,
      'senior': 1.30,
    };

    const roleKey = role.toLowerCase();
    const locationKey = location.toLowerCase();
    
    let baseSalary = baseSalaries[roleKey] || 125000;
    const locMult = locationMultipliers[locationKey] || 1.0;
    const expMult = experienceMultipliers[exp] || 1.0;
    
    const median = Math.round(baseSalary * locMult * expMult);
    const variance = Math.round(median * 0.15);
    
    return {
      min: median - variance,
      max: median + variance,
      median,
      currency: 'USD',
      source: 'Market Estimates',
      trend: 'stable',
      trendPercent: 5,
      insights: `${role} positions in ${location} offer competitive compensation with strong demand for skilled professionals.`,
      lastUpdated: new Date().toISOString()
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Real-Time Salary Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Role
              </Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCustomRole('');
                  setResult(null);
                }}
              >
                <option value="">Select a role</option>
                {popularRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <div className="relative">
                <Input
                  placeholder="Or type a custom role..."
                  value={customRole}
                  onChange={(e) => {
                    setCustomRole(e.target.value);
                    setSelectedRole('');
                    setResult(null);
                  }}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Location
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {locations.map(loc => (
                  <Button
                    key={loc.name}
                    variant={selectedLocation === loc.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      setResult(null);
                    }}
                    className={`justify-start ${selectedLocation === loc.name ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {loc.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Experience Level</Label>
              <div className="flex gap-2">
                {[
                  { id: 'junior', label: 'Junior', years: '0-2 yrs' },
                  { id: 'mid', label: 'Mid', years: '2-5 yrs' },
                  { id: 'senior', label: 'Senior', years: '5+ yrs' }
                ].map(level => (
                  <Button
                    key={level.id}
                    variant={experience === level.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setExperience(level.id);
                      setResult(null);
                    }}
                    className={`flex-1 flex-col h-auto py-2 ${experience === level.id ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                  >
                    <span className="font-medium">{level.label}</span>
                    <span className="text-xs opacity-80">{level.years}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={fetchSalaryData}
              disabled={!activeRole || !selectedLocation || isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fetching Real-Time Data...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Get Real-Time Salary
                </>
              )}
            </Button>
            
            {error && (
              <p className="text-sm text-yellow-600 bg-yellow-500/10 p-2 rounded">{error}</p>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {result ? (
              <>
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Annual Salary</p>
                    <p className="text-4xl font-bold text-emerald-500">
                      ${result.median.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">per year (USD)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Entry Level</p>
                      <p className="text-lg font-semibold">${result.min.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Senior Level</p>
                      <p className="text-lg font-semibold">${result.max.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Salary Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>25th Percentile</span>
                          <span>${Math.round(result.min).toLocaleString()}</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Median (50th)</span>
                          <span>${result.median.toLocaleString()}</span>
                        </div>
                        <Progress value={50} className="h-2 bg-muted" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>75th Percentile</span>
                          <span>${result.max.toLocaleString()}</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-emerald-500/30 flex items-center gap-1">
                    {getTrendIcon(result.trend)}
                    {result.trend === 'up' ? '+' : result.trend === 'down' ? '-' : ''}{result.trendPercent}% {result.trend === 'up' ? 'YoY Growth' : result.trend === 'down' ? 'YoY Decline' : 'Stable'}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Source: {result.source}
                  </Badge>
                </div>

                {result.insights && (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Market Insight: </span>
                        {result.insights}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="text-xs text-muted-foreground text-center">
                  Data fetched in real-time • Refresh for latest estimates
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-muted/30 rounded-xl">
                <div className="text-center text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select role and location</p>
                  <p className="text-sm">to get real-time salary estimates</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
