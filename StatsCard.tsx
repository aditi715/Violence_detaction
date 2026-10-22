import { Card, CardContent } from './ui/card';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: 'violet' | 'emerald' | 'red' | 'amber';
  trend?: string;
}

const colorClasses = {
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/30',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  red: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
    border: 'border-red-500/30',
    gradient: 'from-red-500/20 to-pink-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
};

export function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const colors = colorClasses[color];
  
  return (
    <Card className={`border-2 ${colors.border} bg-gradient-to-br ${colors.gradient} backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${colors.glow} hover:scale-105 group`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-violet-300/60 mb-2">{title}</p>
            <p className="text-4xl bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:rotate-12`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-sm text-violet-300/60">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
