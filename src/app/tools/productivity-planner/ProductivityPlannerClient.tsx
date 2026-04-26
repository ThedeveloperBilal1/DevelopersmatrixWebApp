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
  Calendar,
  Clock,
  AlertCircle,
  Star,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  completed: boolean;
  category: string;
}

export default function ProductivityPlannerClient() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review pull requests', priority: 'high', estimatedTime: 30, completed: false, category: 'Development' },
    { id: '2', title: 'Team standup meeting', priority: 'medium', estimatedTime: 15, completed: true, category: 'Meetings' },
    { id: '3', title: 'Write documentation', priority: 'low', estimatedTime: 60, completed: false, category: 'Documentation' },
    { id: '4', title: 'Code review for feature branch', priority: 'high', estimatedTime: 45, completed: false, category: 'Development' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask,
        priority: newPriority,
        estimatedTime: 30,
        completed: false,
        category: 'General'
      }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (id: string, direction: 'up' | 'down') => {
    const index = tasks.findIndex(t => t.id === id);
    if (direction === 'up' && index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      setTasks(newTasks);
    } else if (direction === 'down' && index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      setTasks(newTasks);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalTime = tasks.filter(t => !t.completed).reduce((sum, t) => sum + t.estimatedTime, 0);

  const priorityColors = {
    high: 'bg-red-500/10 border-red-500/20 text-red-500',
    medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600',
    low: 'bg-green-500/10 border-green-500/20 text-green-600'
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Productivity Planner
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {completedTasks}/{totalTasks} done
            </Badge>
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-500">
              <Clock className="w-3 h-3 mr-1" />
              {totalTime} min left
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <div className="flex gap-1">
            {(['high', 'medium', 'low'] as const).map(p => (
              <Button
                key={p}
                variant={newPriority === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNewPriority(p)}
                className={newPriority === p ? 
                  (p === 'high' ? 'bg-red-500 hover:bg-red-600' : 
                   p === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 
                   'bg-green-500 hover:bg-green-600') : ''}
              >
                {p === 'high' ? <AlertCircle className="w-3 h-3" /> : 
                 p === 'medium' ? <Star className="w-3 h-3" /> : 
                 <CheckCircle className="w-3 h-3" />}
              </Button>
            ))}
          </div>
          <Button onClick={addTask} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No tasks yet</p>
              <p className="text-sm">Add your first task to get started</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  task.completed 
                    ? 'bg-muted/30 opacity-60' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <button
                  onClick={() => moveTask(task.id, 'up')}
                  disabled={index === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveTask(task.id, 'down')}
                  disabled={index === tasks.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : `border-2 ${task.priority === 'high' ? 'border-red-500' : task.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}`
                  }`}
                >
                  {task.completed && <CheckCircle className="w-3 h-3" />}
                </button>

                <div className="flex-1">
                  <p className={`font-medium text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {task.estimatedTime} min
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task.id)}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {tasks.length > 0 && (
          <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-500">{tasks.length}</p>
              <p className="text-xs text-muted-foreground">Total Tasks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">{totalTime}</p>
              <p className="text-xs text-muted-foreground">Minutes Left</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
