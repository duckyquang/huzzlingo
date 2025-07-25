import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DragDropQuestion as DragDropQuestionType } from '../../../lib/types/lesson';

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
  const [forceReset, setForceReset] = useState(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWord: null,
    draggedFrom: null,
    draggedFromIndex: null,
    hoverIndex: null,
  });

  const answerBoxRef = useRef<HTMLDivElement>(null);
  const dragInProgressRef = useRef(false);

  const handleDragStart = useCallback((word: string, from: 'words' | 'answer', index?: number) => {
    // Prevent multiple drags at once
    if (dragInProgressRef.current) return;
    
    dragInProgressRef.current = true;
    setDragState({
      isDragging: true,
      draggedWord: word,
      draggedFrom: from,
      draggedFromIndex: index ?? null,
      hoverIndex: null,
    });
  }, []);

  const handleDrag = useCallback((event: any, info: any) => {
    if (!answerBoxRef.current || !dragState.isDragging) return;

    const rect = answerBoxRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    
    // Check if we're over the answer box
    const isOverAnswerBox = 
      info.point.x >= rect.left &&
      info.point.x <= rect.right &&
      info.point.y >= rect.top &&
      info.point.y <= rect.bottom;

    if (!isOverAnswerBox) {
      setDragState(prev => ({ ...prev, hoverIndex: null }));
      return;
    }

    // Find the insertion index based on mouse position
    const wordElements = answerBoxRef.current.querySelectorAll('[data-word-index]');
    let insertIndex = answerWords.length; // Default to end

    for (let i = 0; i < wordElements.length; i++) {
      const wordRect = wordElements[i].getBoundingClientRect();
      const wordCenter = wordRect.left - rect.left + wordRect.width / 2;
      
      if (x < wordCenter) {
        insertIndex = i;
        break;
      }
    }

    // Don't update if dragging from answer and trying to place in same position
    if (dragState.draggedFrom === 'answer' && dragState.draggedFromIndex === insertIndex) {
      return;
    }

    setDragState(prev => ({ ...prev, hoverIndex: insertIndex }));
  }, [dragState.isDragging, dragState.draggedFrom, dragState.draggedFromIndex, answerWords.length]);

  const handleDragEnd = useCallback((event: any, info: any) => {
    const { draggedWord, draggedFrom, draggedFromIndex, hoverIndex } = dragState;
    
    // Reset drag state immediately to prevent race conditions
    const resetDragState = () => {
      setDragState({
        isDragging: false,
        draggedWord: null,
        draggedFrom: null,
        draggedFromIndex: null,
        hoverIndex: null,
      });
      dragInProgressRef.current = false;
    };
    
    if (!draggedWord || !draggedFrom) {
      resetDragState();
      return;
    }

    // Get the answer box bounds
    const answerBox = answerBoxRef.current?.getBoundingClientRect();
    if (!answerBox) {
      resetDragState();
      return;
    }

    // Get available words box bounds
    const availableWordsBox = document.querySelector('.p-4.rounded-xl.border-2.border-white\\/10.bg-huzz-dark-accent:not([data-answer-box])')?.getBoundingClientRect();

    // Check overlap with both boxes
    const draggedElement = event.target.getBoundingClientRect();
    
    // Check if dragged word overlaps with answer box
    const overlapsAnswerBox = answerBox && !(
      draggedElement.right < answerBox.left || 
      draggedElement.left > answerBox.right || 
      draggedElement.bottom < answerBox.top || 
      draggedElement.top > answerBox.bottom
    );

    // Check if dragged word overlaps with available words box
    const overlapsAvailableBox = availableWordsBox && !(
      draggedElement.right < availableWordsBox.left || 
      draggedElement.left > availableWordsBox.right || 
      draggedElement.bottom < availableWordsBox.top || 
      draggedElement.top > availableWordsBox.bottom
    );

    // Priority logic: if overlapping both boxes, choose answer box
    let targetContainer = null;
    if (overlapsAnswerBox && overlapsAvailableBox) {
      targetContainer = 'answer';
    } else if (overlapsAnswerBox) {
      targetContainer = 'answer';
    } else if (overlapsAvailableBox) {
      targetContainer = 'available';
    }

    // If word is in a valid container, handle the placement
    if (targetContainer) {
      if (targetContainer === 'answer') {
        if (draggedFrom === 'words') {
          // Moving from available words to answer box
          const dropIndex = hoverIndex !== null ? hoverIndex : answerWords.length;
          
          setAnswerWords(prev => {
            const newAnswerWords = [...prev];
            newAnswerWords.splice(dropIndex, 0, draggedWord);
            return newAnswerWords;
          });
          
          setAvailableWords(prev => prev.filter(w => w !== draggedWord));
          
        } else if (draggedFrom === 'answer') {
          // Reordering within answer box or staying in same position
          if (hoverIndex !== null && draggedFromIndex !== null && hoverIndex !== draggedFromIndex) {
            setAnswerWords(prev => {
              const newAnswerWords = [...prev];
              newAnswerWords.splice(draggedFromIndex, 1); // Remove from original position
              
              // Adjust insert index if moving within the same array
              const insertIndex = draggedFromIndex < hoverIndex ? hoverIndex - 1 : hoverIndex;
              newAnswerWords.splice(insertIndex, 0, draggedWord);
              return newAnswerWords;
            });
          }
          // If no reordering needed, word stays in place (automatic alignment)
        }
        
      } else if (targetContainer === 'available') {
        if (draggedFrom === 'answer') {
          // Moving from answer box to available words
          if (draggedFromIndex !== null) {
            setAnswerWords(prev => prev.filter((_, i) => i !== draggedFromIndex));
            setAvailableWords(prev => [...prev, draggedWord]);
          }
        } else if (draggedFrom === 'words') {
          // Word was dragged within available words box but may be misaligned
          // Force re-render to reset position by removing and re-adding
          setAvailableWords(prev => {
            const filtered = prev.filter(w => w !== draggedWord);
            return [...filtered, draggedWord];
          });
        }
      }
    } else {
      // Word is not overlapping any container - return to most appropriate location
      const wordCenter = draggedElement.left + draggedElement.width / 2;
      const answerBoxCenter = answerBox.left + answerBox.width / 2;
      const availableBoxCenter = availableWordsBox ? availableWordsBox.left + availableWordsBox.width / 2 : 0;
      
      // Determine which box is closer
      const distanceToAnswer = Math.abs(wordCenter - answerBoxCenter);
      const distanceToAvailable = availableWordsBox ? Math.abs(wordCenter - availableBoxCenter) : Infinity;
      
      if (distanceToAnswer <= distanceToAvailable) {
        // Snap to answer box
        if (draggedFrom === 'words') {
          setAnswerWords(prev => [...prev, draggedWord]);
          setAvailableWords(prev => prev.filter(w => w !== draggedWord));
        } else if (draggedFrom === 'answer' && draggedFromIndex !== null) {
          // Word came from answer box, return it to answer box (stays in place)
          // Force re-render to reset position
          setAnswerWords(prev => {
            const filtered = prev.filter((_, i) => i !== draggedFromIndex);
            const newAnswerWords = [...filtered];
            newAnswerWords.splice(draggedFromIndex, 0, draggedWord);
            return newAnswerWords;
          });
        }
      } else {
        // Snap to available words box
        if (draggedFrom === 'answer' && draggedFromIndex !== null) {
          setAnswerWords(prev => prev.filter((_, i) => i !== draggedFromIndex));
          setAvailableWords(prev => [...prev, draggedWord]);
        } else if (draggedFrom === 'words') {
          // Word came from available words, return it there with proper alignment
          setAvailableWords(prev => {
            const filtered = prev.filter(w => w !== draggedWord);
            return [...filtered, draggedWord];
          });
        }
      }
    }

    resetDragState();
    
    // Force re-render to ensure proper positioning
    setForceReset(prev => prev + 1);
  }, [dragState, answerWords.length]);

  const removeWordFromAnswer = useCallback((index: number) => {
    // Prevent removal during drag
    if (dragInProgressRef.current) return;
    
    const word = answerWords[index];
    setAnswerWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  }, [answerWords]);

  const checkAnswer = useCallback(() => {
    const correct = JSON.stringify(answerWords) === JSON.stringify(question.correctOrder);
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(correct);
      setShowFeedback(false);
      setAvailableWords([...question.words]);
      setAnswerWords([]);
    }, 2000);
  }, [answerWords, question.correctOrder, question.words, onAnswer]);

  const getWordAnimation = (index: number, isInAnswer: boolean) => {
    if (!dragState.isDragging || !isInAnswer) return {};

    const { hoverIndex, draggedFromIndex, draggedFrom } = dragState;
    
    if (hoverIndex === null) return {};

    // Don't animate the word being dragged (keep it visible)
    if (draggedFrom === 'answer' && draggedFromIndex === index) {
      return {};
    }

    // If dragging from available words to answer
    if (draggedFrom === 'words') {
      // Move words to the right if hover index is before or at current position
      if (index >= hoverIndex) {
        return { 
          x: 90, // Move right to make space
          transition: { type: "spring", stiffness: 200, damping: 35 }
        };
      }
    }

    // If reordering within answer
    if (draggedFrom === 'answer' && draggedFromIndex !== null) {
      // Moving left (dragging from right to left)
      if (draggedFromIndex > hoverIndex) {
        if (index >= hoverIndex && index < draggedFromIndex) {
          return { 
            x: 90,
            transition: { type: "spring", stiffness: 200, damping: 35 }
          };
        }
      }
      // Moving right (dragging from left to right)
      else if (draggedFromIndex < hoverIndex) {
        if (index > draggedFromIndex && index < hoverIndex) {
          return { 
            x: -90,
            transition: { type: "spring", stiffness: 200, damping: 35 }
          };
        }
      }
    }

    return {};
  };

  const getInsertionIndicatorPosition = () => {
    if (!dragState.isDragging || dragState.hoverIndex === null || !answerBoxRef.current) {
      return null;
    }

    const wordElements = answerBoxRef.current.querySelectorAll('[data-word-index]');
    const hoverIndex = dragState.hoverIndex;

    if (hoverIndex === 0) {
      // Insert at the beginning
      return 16; // Left padding
    } else if (hoverIndex >= answerWords.length) {
      // Insert at the end
      if (wordElements.length > 0) {
        const lastElement = wordElements[wordElements.length - 1];
        const rect = lastElement.getBoundingClientRect();
        const containerRect = answerBoxRef.current.getBoundingClientRect();
        return rect.right - containerRect.left + 8; // Add some spacing
      }
      return 16;
    } else {
      // Insert between elements
      const targetElement = wordElements[hoverIndex];
      const rect = targetElement.getBoundingClientRect();
      const containerRect = answerBoxRef.current.getBoundingClientRect();
      return rect.left - containerRect.left - 4; // Position before the target
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{question.emoji}</span>
        <h3 className="text-xl font-medium">{question.question}</h3>
      </div>

      {/* Answer Box */}
      <motion.div
        ref={answerBoxRef}
        data-answer-box="true"
        className={`min-h-[100px] p-4 rounded-xl border-2 border-dashed ${
          answerWords.length > 0 ? 'border-white/20' : 'border-white/10'
        } bg-huzz-dark-accent relative`}
        layout
      >
        <div className="flex flex-wrap gap-2 items-center relative">
          {answerWords.map((word, index) => (
            <motion.div
              key={`answer-${word}-${index}-${forceReset}`}
              data-word-index={index}
              drag
              dragMomentum={false}
              dragElastic={0.2}
              onDragStart={() => handleDragStart(word, 'answer', index)}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onClick={() => removeWordFromAnswer(index)}
              className="relative cursor-grab active:cursor-grabbing"
              layout
              animate={getWordAnimation(index, true)}
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1, zIndex: 1000 }}
            >
              <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors select-none">
                {word}
              </div>
            </motion.div>
          ))}

        </div>
        
        {answerWords.length === 0 && (
          <div className="text-white/40 text-center py-4">
            Drag words here to build your answer
          </div>
        )}
      </motion.div>

      {/* Available Words */}
      <div className="p-4 rounded-xl border-2 border-white/10 bg-huzz-dark-accent">
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <motion.div
              key={`available-${word}-${index}-${forceReset}`}
              drag
              dragMomentum={false}
              dragElastic={0.2}
              onDragStart={() => handleDragStart(word, 'words')}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              className="touch-none cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.05 }}
              whileDrag={{ scale: 1.1, zIndex: 1000 }}
              style={{ x: 0, y: 0 }} // Force reset position
            >
              <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors select-none">
                {word}
              </div>
            </motion.div>
          ))}
        </div>
        
        {availableWords.length === 0 && (
          <div className="text-white/40 text-center py-4">
            All words have been used
          </div>
        )}
      </div>

      {/* Check Answer Button */}
      {answerWords.length === question.correctOrder.length && !showFeedback && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={checkAnswer}
          className="w-full p-3 rounded-xl bg-gradient-huzz text-white font-medium shadow-glow-pink hover:opacity-90 transition-opacity"
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