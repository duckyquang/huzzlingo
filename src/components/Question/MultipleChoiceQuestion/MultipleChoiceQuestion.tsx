import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../../../lib/types/lesson';

interface Props {
  question: MultipleChoiceQuestionType;
  onAnswer: (isCorrect: boolean) => void;
  lessonEmoji?: string;
}

export default function MultipleChoiceQuestion({ question, onAnswer, lessonEmoji = '💭' }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple answers
    
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Delay the next question to show feedback
    setTimeout(() => {
      onAnswer(correct);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{lessonEmoji}</span>
        <h3 className="text-xl font-medium">{question.question}</h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`
              relative p-4 text-left rounded-xl border-2 transition-colors
              flex items-center justify-between
              ${
                selectedAnswer
                  ? option === question.correctAnswer
                    ? 'border-green-500 bg-green-500/10'
                    : option === selectedAnswer
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-white/10 bg-huzz-dark-accent'
                  : 'border-white/10 bg-huzz-dark-accent hover:border-white/20'
              }
            `}
            disabled={!!selectedAnswer}
            whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
            whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="flex-1">{option}</span>
            
            {/* Correct/Incorrect Icons */}
            <AnimatePresence>
              {selectedAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center w-6 h-6"
                >
                  {option === question.correctAnswer ? (
                    <span className="text-green-500 text-xl">✓</span>
                  ) : option === selectedAnswer ? (
                    <span className="text-red-500 text-xl">✗</span>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-4 rounded-xl ${
              isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}
          >
            <p className="text-lg">
              {isCorrect ? '🎉 Correct! ' : '😅 Not quite. '}
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 