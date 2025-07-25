import { motion } from 'framer-motion';

interface ScoreSpeedometerProps {
  score: number;
}

export default function ScoreSpeedometer({ score }: ScoreSpeedometerProps) {
  // Calculate the arc path for the score
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - (score / 100));

  // Color based on score
  const getColor = (score: number) => {
    if (score >= 80) return '#FF00CC'; // Pink
    if (score >= 60) return '#B042FF'; // Purple
    return '#FF4242'; // Red
  };

  return (
    <div className="relative w-48 h-48">
      {/* Background circle */}
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="20"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="20"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="filter drop-shadow-glow"
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center"
        >
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-sm text-white/60">Score</div>
        </motion.div>
      </div>
    </div>
  );
} 