import { motion } from 'framer-motion';

export default function MessageReaction({ reaction }: { reaction: string }) {
  return (
    <motion.div
      initial={{ scale: 0, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      className="absolute -bottom-4 right-0 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 text-sm shadow-lg"
    >
      {reaction}
    </motion.div>
  );
} 