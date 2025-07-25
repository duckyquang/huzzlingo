import { motion } from 'framer-motion';

export default function TypingAnimation() {
  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-white/5 rounded-2xl w-16">
      <motion.div
        className="w-2 h-2 bg-white/60 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-white/60 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-white/60 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
} 