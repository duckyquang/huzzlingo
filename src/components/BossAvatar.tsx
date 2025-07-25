import { motion } from 'framer-motion';

interface BossAvatarProps {
  status: 'online' | 'offline' | 'typing';
  size?: 'sm' | 'md' | 'lg';
}

export default function BossAvatar({ status, size = 'md' }: BossAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    typing: 'bg-yellow-500',
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-pink-500 to-purple-500`} />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${statusColors[status]} ring-2 ring-huzz-dark`}
      />
    </div>
  );
} 