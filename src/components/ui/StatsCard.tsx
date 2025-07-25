import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  glowColor?: 'pink' | 'purple' | undefined;
  progress?: number;
}

export default function StatsCard({ 
  title, 
  value, 
  subtitle,
  icon, 
  trend, 
  glowColor,
  progress
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        relative bg-huzz-dark-purple rounded-2xl p-6 border border-white/10
        ${glowColor ? `shadow-glow-${glowColor}` : ''}
      `}
    >
      {/* Background glow effect - only show if glowColor is specified */}
      {glowColor && (
        <div 
          className={`absolute inset-0 bg-gradient-radial rounded-2xl opacity-5 from-${glowColor === 'pink' ? 'huzz-pink' : 'huzz-purple'} to-transparent`}
        />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white/60">{title}</span>
          <div className="text-white/80">{icon}</div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{value}</span>
            {subtitle && (
              <span className="text-sm text-white/60 mt-1">{subtitle}</span>
            )}
          </div>
          
          {/* Trend indicator */}
          {trend && trend.value !== 0 && !isNaN(trend.value) && (
            <div 
              className={`flex items-center text-sm font-medium ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <motion.span
                initial={{ y: 0 }}
                animate={{ y: trend.isPositive ? -2 : 2 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                {trend.isPositive ? '↑' : '↓'}
              </motion.span>
              <span className="ml-1">{trend.value}%</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {typeof progress === 'number' && (
          <div className="mt-4">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-huzz"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
} 