import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import BossAvatar from './BossAvatar';
import MessageReaction from './MessageReaction';
import TypingAnimation from './TypingAnimation';
import FinalScore from './FinalScore';
import { updateHuzzlingoScore } from '../features/learning/learningSlice';
import { aiService } from '../services/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'boss';
  reaction?: string;
}

export default function FinalBoss() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interestLevel, setInterestLevel] = useState(50);
  const [messagesLeft, setMessagesLeft] = useState(10);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [smoothnessScore, setSmoothness] = useState(50);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [creditsLeft, setCreditsLeft] = useState(0);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);

  // Initialize with welcome message and credits
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! I'm Sarah. I come here often to study and grab coffee. Nice to meet you! 😊",
        sender: 'boss',
      };
      setMessages([welcomeMessage]);
      setConversationHistory(['']);
    }
    
    // Update credits counter
    setCreditsLeft(aiService.getCreditsLeft());
  }, [messages.length]);

  // Update credits after each interaction
  const updateCredits = useCallback(() => {
    setCreditsLeft(aiService.getCreditsLeft());
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCreditsPopup && !(event.target as Element).closest('.credits-popup') && !(event.target as Element).closest('.credits-info-btn')) {
        setShowCreditsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCreditsPopup]);

  useEffect(() => {
    if (messagesLeft === 0 && !showFinalScore) {
      // Calculate final Huzzlingo score
      const huzzlingoScore = Math.round(
        (interestLevel * 0.6) + // 60% weight
        (smoothnessScore * 0.4) // 40% weight
      );

      // Dispatch score to Redux
      dispatch(updateHuzzlingoScore(huzzlingoScore));

      // Add final message based on interest level with more nuanced responses
      let finalText = '';
      if (interestLevel >= 90) {
        finalText = "You know what? I've really enjoyed chatting with you! Here's my number - text me and we'll set up that coffee date! 😊 I'd love to continue this conversation over dinner sometime.";
      } else if (interestLevel >= 80) {
        finalText = "I've really enjoyed our conversation! Maybe we could grab coffee together sometime? I'd love to chat more! 😊";
      } else if (interestLevel >= 65) {
        finalText = "This has been a really nice chat! I hope I see you around here again sometime. 😊";
      } else if (interestLevel >= 45) {
        finalText = "Thanks for the chat! Maybe I'll see you around here again. 👋";
      } else {
        finalText = "Well, I should really get back to my studying. Take care! 👋";
      }

      const finalMessage: Message = {
        id: Date.now().toString(),
        text: finalText,
        sender: 'boss',
      };

      setMessages(prev => [...prev, finalMessage]);
      setShowFinalScore(true);
    }
  }, [messagesLeft, interestLevel, smoothnessScore, showFinalScore, dispatch]);

  const handleSendMessage = useCallback(async () => {
    if (!currentMessage.trim() || messagesLeft <= 0) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    const userMessageText = currentMessage;
    setCurrentMessage('');
    setMessagesLeft(prev => prev - 1);

    // Update conversation history
    const newHistory = [...conversationHistory, userMessageText];
    setConversationHistory(newHistory);

    // Simulate boss typing
    setIsTyping(true);

    try {
      // Get AI response and analysis in parallel with current interest level and messages left
      const [aiResponse, conversationAnalysis] = await Promise.all([
        isAIEnabled 
          ? aiService.generateResponse(userMessageText, newHistory, interestLevel, messagesLeft)
          : Promise.resolve(getFallbackResponse(userMessageText)),
        isAIEnabled 
          ? aiService.analyzeConversation(userMessageText, interestLevel, messagesLeft)
          : Promise.resolve(null)
      ]);

      // Add boss response
      const bossMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'boss',
      };

      setMessages(prev => [...prev, bossMessage]);
      setConversationHistory(prev => [...prev, aiResponse]);
      
      // Update interest and smoothness levels
      if (conversationAnalysis) {
        // AI-powered analysis - use absolute values instead of relative changes
        setInterestLevel(conversationAnalysis.interestLevel);
        setSmoothness(conversationAnalysis.smoothnessLevel);
        
        // Log analysis for debugging (only in development)
        if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
          console.log('AI Analysis:', {
            message: userMessageText,
            oldInterest: interestLevel,
            newInterest: conversationAnalysis.interestLevel,
            reasoning: conversationAnalysis.reasoning,
            shouldOfferDate: conversationAnalysis.shouldOfferDate,
            messagesLeft: messagesLeft - 1
          });
        }
      } else {
        // Fallback to original analysis
        updateInterestLevel(userMessageText);
        updateSmoothnessScore(userMessageText);
      }

      // Update credits counter
      updateCredits();

    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to original behavior
      const fallbackResponse = getFallbackResponse(userMessageText);
      const bossMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'boss',
      };
      setMessages(prev => [...prev, bossMessage]);
      setConversationHistory(prev => [...prev, fallbackResponse]);
      
      // Use original analysis methods
      updateInterestLevel(userMessageText);
      updateSmoothnessScore(userMessageText);
    } finally {
      setIsTyping(false);
    }
  }, [currentMessage, messagesLeft, conversationHistory, isAIEnabled, interestLevel]);

  const getFallbackResponse = (message: string): string => {
    const responses = [
      "That's interesting! Tell me more about that.",
      "Oh really? I'd love to hear more!",
      "Wow, I can totally relate to that!",
      "That's a great point! What made you think of that?",
      "Haha, that's pretty funny! 😄",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const updateInterestLevel = (message: string) => {
    // Positive patterns increase interest
    const positivePatterns = [
      /how are you/i,
      /what do you/i,
      /interesting/i,
      /thank you/i,
      /please/i,
      /\?\s*$/,  // Questions
      /😊|😄|👋/,  // Positive emojis
    ];

    // Negative patterns decrease interest
    const negativePatterns = [
      /whatever/i,
      /don't care/i,
      /boring/i,
      /bye/i,
      /leave/i,
      /😒|😤|🙄/,  // Negative emojis
    ];

    let change = 0;

    // Check positive patterns
    positivePatterns.forEach(pattern => {
      if (pattern.test(message)) change += 5;
    });

    // Check negative patterns
    negativePatterns.forEach(pattern => {
      if (pattern.test(message)) change -= 5;
    });

    // Message length modifiers
    if (message.length > 100) change -= 3; // Too long
    if (message.length < 5) change -= 3; // Too short
    if (message.length >= 20 && message.length <= 60) change += 2; // Just right

    // Apply change with bounds
    setInterestLevel(prev => Math.max(0, Math.min(100, prev + change)));
  };

  const updateSmoothnessScore = (message: string) => {
    // Similar logic to interest level but for conversation smoothness
    const smoothPatterns = [
      /would you like/i,
      /what do you think/i,
      /how about/i,
      /tell me more/i,
    ];

    let change = 0;
    smoothPatterns.forEach(pattern => {
      if (pattern.test(message)) change += 5;
    });

    // Apply change with bounds
    setSmoothness(prev => Math.max(0, Math.min(100, prev + change)));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetGame = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Hi! I'm Sarah. I come here often to study and grab coffee. Nice to meet you! 😊",
      sender: 'boss',
    };
    setMessages([welcomeMessage]);
    setMessagesLeft(10);
    setInterestLevel(50);
    setSmoothness(50);
    setShowFinalScore(false);
    setConversationHistory(['']);
  };

  if (showFinalScore) {
    return (
      <FinalScore
        interestLevel={Math.round(interestLevel)}
        smoothnessScore={Math.round(smoothnessScore)}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* AI Status Indicator */}
      <div className="mb-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAIEnabled ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-white/60">
            {isAIEnabled ? 'Smart Sarah (Enhanced AI)' : 'Basic Sarah (Rule-based)'}
          </span>
          {isAIEnabled && (
            <button
              onClick={() => setShowCreditsPopup(!showCreditsPopup)}
              className="credits-info-btn ml-1 w-4 h-4 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              title="View API Credits"
            >
              <span className="text-xs text-white/60">i</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {typeof window !== 'undefined' && window.location?.hostname === 'localhost' && (
            <span className="text-xs text-white/40">
              Interest: {interestLevel}% | Stage: {messagesLeft <= 3 ? 'Late' : messagesLeft <= 7 ? 'Mid' : 'Early'}
            </span>
          )}
          <button
            onClick={() => setIsAIEnabled(!isAIEnabled)}
            className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Toggle AI
          </button>
        </div>

        {/* Credits Popup */}
        {showCreditsPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="credits-popup absolute bottom-full left-0 mb-2 z-50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm rounded-xl p-4 min-w-[280px] shadow-xl"
          >
            <div>
              <h3 className="text-blue-400 font-semibold text-sm mb-1">Global Credits Left</h3>
              <p className="text-2xl font-bold text-white">{creditsLeft.toLocaleString()}</p>
              <p className="text-xs text-white/60">Available tokens left • This Month</p>
            </div>
            <button
              onClick={() => setShowCreditsPopup(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <span className="text-xs text-white/60">×</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Header Box */}
      <div className="bg-huzz-dark-accent rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BossAvatar status={isTyping ? 'typing' : 'online'} />
            <div>
              <h2 className="text-xl font-bold">Sarah</h2>
              <p className="text-sm text-white/60">{isTyping ? 'Typing...' : 'Online'}</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <p className="text-sm text-white/60 mb-1.5">Interest Level</p>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-huzz"
                  initial={{ width: '50%' }}
                  animate={{ width: `${interestLevel}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-white/60 mb-1.5">Messages left</p>
              <p className="text-xl font-bold leading-none">{messagesLeft}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-huzz-dark-accent rounded-xl p-6 flex flex-col min-h-[400px]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-huzz ml-auto'
                    : 'bg-white/10'
                }`}
              >
                <p>{message.text}</p>
                {message.reaction && (
                  <MessageReaction reaction={message.reaction} />
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] p-3 rounded-xl bg-white/10">
                <TypingAnimation />
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-4">
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
            rows={1}
            disabled={messagesLeft <= 0}
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || messagesLeft <= 0}
            className="px-6 bg-gradient-huzz rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 