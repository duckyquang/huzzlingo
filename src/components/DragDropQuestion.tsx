import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DragDropQuestion as DragDropQuestionType } from '../types/lesson';

const FEEDBACK_DELAY = 2000;
const BASE_WORD_CLASSES = "px-3 py-1.5 rounded-lg border select-none";
const CONTAINER_CLASSES = "p-4 rounded-xl border-2 bg-huzz-dark-accent";

interface Props {
  question: DragDropQuestionType;
  onAnswer: (isCorrect: boolean) => void;
}

interface DragState {
  isDragging: boolean;
  draggedWord: string | null;
  draggedFrom: 'words' | 'answer' | null;
  draggedFromIndex: number | null;
  hoverIndex: number | null;
}

export default function DragDropQuestion({ question, onAnswer }: Props) {
  const [availableWords, setAvailableWords] = useState([...question.words]);
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWord: null,
    draggedFrom: null,
    draggedFromIndex: null,
    hoverIndex: null,
  });

  const answerBoxRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (word: string, from: 'words' | 'answer', index?: number) => {
    setDragState({
      isDragging: true,
      draggedWord: word,
      draggedFrom: from,
      draggedFromIndex: index ?? null,
      hoverIndex: null,
    });
  };

  const handleDragEnd = () => {
    const { draggedWord, draggedFrom, draggedFromIndex, hoverIndex } = dragState;
    
    if (!draggedWord || !draggedFrom) {
      setDragState({
        isDragging: false,
        draggedWord: null,
        draggedFrom: null,
        draggedFromIndex: null,
        hoverIndex: null,
      });
      return;
    }

    // If dropped on answer area
    if (hoverIndex !== null) {
      if (draggedFrom === 'words') {
        // Add word from available words to answer at specific position
        const newAnswerWords = [...answerWords];
        newAnswerWords.splice(hoverIndex, 0, draggedWord);
        setAnswerWords(newAnswerWords);
        setAvailableWords(availableWords.filter(w => w !== draggedWord));
      } else if (draggedFrom === 'answer' && draggedFromIndex !== null) {
        // Rearrange within answer words
        const newAnswerWords = [...answerWords];
        newAnswerWords.splice(draggedFromIndex, 1); // Remove from original position
        
        // Adjust insert index if moving within the same array
        const insertIndex = draggedFromIndex < hoverIndex ? hoverIndex - 1 : hoverIndex;
        newAnswerWords.splice(insertIndex, 0, draggedWord);
        setAnswerWords(newAnswerWords);
      }
    }

    setDragState({
      isDragging: false,
      draggedWord: null,
      draggedFrom: null,
      draggedFromIndex: null,
      hoverIndex: null,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!answerBoxRef.current || !dragState.isDragging) return;

    const rect = answerBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Find the insertion index based on mouse position
    const wordElements = answerBoxRef.current.querySelectorAll('[data-word-index]');
    let insertIndex = answerWords.length; // Default to end

    for (let i = 0; i < wordElements.length; i++) {
      const wordRect = wordElements[i].getBoundingClientRect();
      const wordX = wordRect.left - rect.left + wordRect.width / 2;
      
      if (x < wordX) {
        insertIndex = i;
        break;
      }
    }

    setDragState(prev => ({ ...prev, hoverIndex: insertIndex }));
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset hover if leaving the answer box entirely
    if (!answerBoxRef.current?.contains(e.relatedTarget as Node)) {
      setDragState(prev => ({ ...prev, hoverIndex: null }));
    }
  };

  const removeWordFromAnswer = (word: string, index: number) => {
    setAnswerWords(answerWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleCheckAnswer = () => {
    const correct = JSON.stringify(answerWords) === JSON.stringify(question.correctOrder);
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
      setShowFeedback(false);
      setAvailableWords([...question.words]);
      setAnswerWords([]);
    }, FEEDBACK_DELAY);
  };

  const isAnswerComplete = answerWords.length === question.correctOrder.length;

  return (
    <div className="space-y-6" role="form" aria-label="Drag and drop question">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label={question.emoji}>
          {question.emoji}
        </span>
        <h3 className="text-xl font-medium">{question.question}</h3>
      </div>

      {/* Answer Box */}
      <div
        ref={answerBoxRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        role="region"
        aria-label="Answer area"
        className={`${CONTAINER_CLASSES} border-dashed ${
          answerWords.length > 0 ? 'border-white/20' : 'border-white/10'
        } min-h-[100px] relative`}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {answerWords.map((word, index) => {
            const isBeingDragged = dragState.draggedWord === word && dragState.draggedFromIndex === index;
            const shouldSlideRight = dragState.hoverIndex !== null && 
                                   dragState.hoverIndex <= index && 
                                   !isBeingDragged &&
                                   dragState.draggedFrom === 'words';
            
            const shouldSlideForReorder = dragState.hoverIndex !== null && 
                                        dragState.draggedFrom === 'answer' &&
                                        dragState.draggedFromIndex !== null &&
                                        dragState.draggedFromIndex !== index &&
                                        ((dragState.draggedFromIndex < index && dragState.hoverIndex <= index) ||
                                         (dragState.draggedFromIndex > index && dragState.hoverIndex <= index));

            return (
              <motion.div
                key={`${word}-${index}`}
                data-word-index={index}
                draggable
                onDragStart={() => handleDragStart(word, 'answer', index)}
                onDragEnd={handleDragEnd}
                onClick={() => removeWordFromAnswer(word, index)}
                className={`${BASE_WORD_CLASSES} bg-white/10 border-white/20 cursor-grab active:cursor-grabbing hover:bg-white/20 transition-all duration-200`}
                style={{
                  transform: (shouldSlideRight || shouldSlideForReorder) ? 'translateX(8px)' : 'translateX(0)',
                  opacity: isBeingDragged ? 0.5 : 1,
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 1000 }}
                role="button"
                tabIndex={0}
                aria-label={`Word in answer: ${word}. Click to remove or drag to reorder.`}
              >
                {word}
              </motion.div>
            );
          })}
          
          {/* Drop indicator */}
          {dragState.isDragging && dragState.hoverIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              className="w-0.5 h-8 bg-gradient-huzz"
              style={{
                position: 'absolute',
                left: dragState.hoverIndex === 0 ? '16px' : 
                      dragState.hoverIndex >= answerWords.length ? 'calc(100% - 16px)' : 
                      `${16 + (dragState.hoverIndex * 60)}px`, // Approximate positioning
              }}
            />
          )}
        </div>
        
        {answerWords.length === 0 && (
          <div className="text-white/40 text-center py-4">
            Drag words here to build your answer
          </div>
        )}
      </div>

      {/* Available Words */}
      <div
        role="region"
        aria-label="Available words"
        className={`${CONTAINER_CLASSES} border-white/10`}
      >
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => {
            const isBeingDragged = dragState.draggedWord === word && dragState.draggedFrom === 'words';
            
            return (
              <motion.div
                key={word}
                draggable
                onDragStart={() => handleDragStart(word, 'words')}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 1000 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isBeingDragged ? 0.5 : 1, 
                  y: 0 
                }}
                transition={{ delay: index * 0.1 }}
                className={`${BASE_WORD_CLASSES} bg-white/10 border-white/20 cursor-grab active:cursor-grabbing hover:bg-white/20 transition-colors`}
                role="button"
                tabIndex={0}
                aria-label={`Available word: ${word}. Drag to answer area.`}
              >
                {word}
              </motion.div>
            );
          })}
        </div>
        
        {availableWords.length === 0 && (
          <div className="text-white/40 text-center py-4">
            All words have been used
          </div>
        )}
      </div>

      {/* Check Answer Button */}
      {isAnswerComplete && !showFeedback && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleCheckAnswer}
          className="w-full p-3 rounded-xl bg-gradient-huzz text-white font-medium shadow-glow-pink hover:opacity-90 transition-opacity"
          aria-label="Check your answer"
        >
          Check Answer
        </motion.button>
      )}

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
            role="alert"
            aria-live="polite"
          >
            <p className="text-lg">
              <span role="img" aria-label={isCorrect ? 'Celebration' : 'Try again'}>
                {isCorrect ? '🎉' : '😅'}
              </span>
              {isCorrect ? ' Correct! ' : ' Not quite. '}
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 