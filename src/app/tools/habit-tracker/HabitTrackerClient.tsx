'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  Flame, 
  Calendar,
  TrendingUp,
  Target
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
  color: string;
}

const colors = ['bg-violet-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500'];

export default function HabitTrackerClient() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Morning Exercise', streak: 12, completedToday: false, totalCompletions: 45, color: 'bg-violet-500' },
    { id: '2', name: 'Read 30 minutes', streak: 8, completedToday: true, totalCompletions: 32, color: 'bg-pink-500' },
    { id: '3', name: 'Meditate', streak: 5, completedToday: false, totalCompletions: 20, color: 'bg-blue-500' },
  ]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      {
        id: Date.now().toString(),
        name: newHabit,
        streak: 0,
        completedToday: false,
        totalCompletions: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    ]);
    setNewHabit('');
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            totalCompletions: !habit.completedToday ? habit.totalCompletions + 1 : habit.totalCompletions - 1
          }
        : habit
    ));
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Habit Tracker
          </CardTitle>
          <Badge variant="secondary">
            {completedToday}/{habits.length} today
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full bg-green-500/10 flex items-center justify-center">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">{completionRate}%</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </Card>
          <Card className="p-3 sm:p-4 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </Card>
          <Card className="p-3 sm:p-4 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full bg-violet-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">{habits.reduce((sum, h) => sum + h.totalCompletions, 0)}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </Card>
        </div>

        {/* Add Habit */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <Input
            placeholder="Add a new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            className="min-h-[44px]"
          />
          <Button onClick={addHabit} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 min-h-[44px] min-w-[44px] shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Habits List */}
        <div className="space-y-2 sm:space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30" />
              <p>No habits yet</p>
              <p className="text-sm">Add your first habit to get started</p>
            </div>
          ) : (
            habits.map(habit => (
              <div
                key={habit.id}
                className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all ${
                  habit.completedToday 
                    ? 'bg-green-500/10 border border-green-500/20' 
                    : 'bg-muted/50 border border-transparent'
                }`}
              >
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all shrink-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 ${
                    habit.completedToday
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-muted-foreground/30 hover:border-violet-500'
                  }`}
                >
                  {habit.completedToday && <CheckCircle className="w-4 h-4" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm sm:text-base truncate ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}>
                    {habit.name}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-orange-500">
                      <Flame className="w-3 h-3" />
                      {habit.streak}d
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {habit.totalCompletions} total
                    </span>
                  </div>
                </div>

                <div className={`w-12 sm:w-16 h-2 rounded-full bg-muted overflow-hidden hidden sm:block`}>
                  <div 
                    className={`h-full ${habit.color} transition-all`}
                    style={{ width: `${Math.min(habit.streak * 10, 100)}%` }}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHabit(habit.id)}
                  className="text-muted-foreground hover:text-red-500 shrink-0 min-h-[44px] min-w-[44px]"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Progress */}
        {habits.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-sm mb-2">
              <span>Today's Progress</span>
              <span>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
