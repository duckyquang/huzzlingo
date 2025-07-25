import axios from 'axios';

// Credit tracking for HuggingFace API usage
const INITIAL_CREDITS = 1000; // HuggingFace free tier monthly limit
const CREDITS_PER_REQUEST = 1; // Approximate cost per API call

// Sarah's dynamic personality system based on interest level and conversation context
const getSarahPersonality = (interestLevel: number, messagesLeft: number, conversationHistory: string[]) => {
  const totalMessages = 10 - messagesLeft;
  const conversationStage = totalMessages <= 3 ? 'early' : totalMessages <= 7 ? 'middle' : 'late';
  
  let personalityTraits = '';
  let responseStyle = '';
  let currentMood = '';

  // Base personality
  const basePersonality = `You are Sarah, a 22-year-old psychology student at the local university. You're sitting in your favorite coffee shop taking a study break when someone approaches you for conversation.

Core personality:
- Intelligent and well-read, studying psychology and literature
- Naturally curious about people and human behavior
- Values genuine conversation over small talk
- Has a subtle sense of humor and enjoys witty exchanges
- Confident but not arrogant, friendly but not desperate`;

  // Dynamic traits based on interest level
  if (interestLevel >= 80) {
    personalityTraits = `
Current state: HIGHLY INTERESTED - You find this person genuinely fascinating and engaging.
- You're genuinely excited to talk to them
- You ask follow-up questions and show real curiosity
- You share personal stories and opinions more freely
- You might hint at wanting to continue the conversation beyond today
- Your responses are warm, animated, and encouraging`;
    
    currentMood = interestLevel >= 90 ? 'captivated and smitten' : 'very interested and engaged';
  } else if (interestLevel >= 60) {
    personalityTraits = `
Current state: MODERATELY INTERESTED - You find this person pleasant and worth talking to.
- You're engaged but not overly enthusiastic
- You respond thoughtfully but don't always ask follow-up questions
- You share some personal details but keep some boundaries
- You're open to seeing where the conversation goes
- Your responses are friendly and genuine`;
    
    currentMood = 'pleasantly interested';
  } else if (interestLevel >= 40) {
    personalityTraits = `
Current state: NEUTRAL - You're being polite but not particularly impressed.
- You respond politely but without much enthusiasm
- You give shorter, more surface-level responses
- You don't volunteer much personal information
- You're friendly but somewhat reserved
- Your responses are cordial but not particularly encouraging`;
    
    currentMood = 'politely neutral';
  } else {
    personalityTraits = `
Current state: LOW INTEREST - You're being polite but this person isn't engaging you.
- You give brief, polite responses
- You don't ask follow-up questions
- You might check your phone or mention your studies
- You're looking for polite ways to end the conversation
- Your responses are courteous but clearly disinterested`;
    
    currentMood = 'politely disinterested';
  }

  // Conversation stage adjustments
  if (conversationStage === 'early') {
    responseStyle = `
Conversation stage: GETTING TO KNOW EACH OTHER
- You're still forming first impressions
- You're slightly cautious but open
- You ask getting-to-know-you questions
- You share basic information about yourself`;
  } else if (conversationStage === 'middle') {
    responseStyle = `
Conversation stage: DEEPER CONVERSATION
- You've formed an initial impression
- You're more comfortable sharing opinions and stories
- You might reference things mentioned earlier
- The conversation can go into more interesting topics`;
  } else {
    responseStyle = `
Conversation stage: DECIDING MOMENT
- This is when you decide if you want to see them again
- If highly interested, you might give hints about future meetings
- If uninterested, you start signaling the conversation should end
- Your responses reflect your final judgment of this person`;
  }

  return `${basePersonality}

${personalityTraits}

${responseStyle}

Current mood: ${currentMood}
Messages remaining in conversation: ${messagesLeft}

IMPORTANT RESPONSE GUIDELINES:
1. Keep responses natural and conversational (1-2 sentences typically)
2. Match your enthusiasm level to your interest level
3. If interest is very high (85+) and it's late in conversation, consider dropping hints about meeting again
4. If interest is low (30-) and it's late in conversation, start wrapping up politely
5. Remember details from earlier in the conversation
6. Respond as Sarah would in this exact moment with this exact level of interest
7. Use occasional emojis that match your mood level
8. Stay in character as a real person having a real conversation`;
};

interface HuggingFaceResponse {
  generated_text: string;
}

interface ConversationAnalysis {
  interestLevel: number;
  smoothnessLevel: number;
  reasoning: string;
  shouldOfferDate?: boolean;
  conversationTone: 'positive' | 'neutral' | 'negative';
}

class AIService {
  private apiKey: string;
  private baseURL = 'https://api-inference.huggingface.co/models';
  private conversationModel = 'microsoft/DialoGPT-large';
  private analysisModel = 'cardiffnlp/twitter-roberta-base-sentiment-latest';

  constructor() {
    this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
    console.log('AI Service - API Key Status:', {
      hasKey: !!this.apiKey,
      keyStart: this.apiKey ? this.apiKey.substring(0, 6) + '...' : 'none',
      isValid: this.isAPIKeyValid()
    });
    
    if (!this.apiKey || this.apiKey === 'your_huggingface_api_key_here' || this.apiKey === 'hf_your_actual_token_here') {
      console.warn('HuggingFace API key not found. AI responses will fall back to default behavior.');
    }

    // Initialize credits if not set
    this.initializeCredits();
  }

  // Credit management methods
  private initializeCredits(): void {
    const savedCredits = localStorage.getItem('huzzlingo_hf_credits');
    if (!savedCredits) {
      localStorage.setItem('huzzlingo_hf_credits', INITIAL_CREDITS.toString());
      console.log('🎯 Initialized credits:', INITIAL_CREDITS);
    }
  }

  public getCreditsLeft(): number {
    const savedCredits = localStorage.getItem('huzzlingo_hf_credits');
    return savedCredits ? parseInt(savedCredits, 10) : INITIAL_CREDITS;
  }

  private consumeCredits(amount: number = CREDITS_PER_REQUEST): boolean {
    const currentCredits = this.getCreditsLeft();
    if (currentCredits >= amount) {
      const newCredits = currentCredits - amount;
      localStorage.setItem('huzzlingo_hf_credits', newCredits.toString());
      console.log(`💳 Credits consumed: ${amount}. Remaining: ${newCredits}`);
      return true;
    }
    console.warn('⚠️ Insufficient credits for API call');
    return false;
  }

  public resetCredits(): void {
    localStorage.setItem('huzzlingo_hf_credits', INITIAL_CREDITS.toString());
    console.log('🔄 Credits reset to:', INITIAL_CREDITS);
  }

  /**
   * Generate Sarah's response with dynamic personality based on interest level
   */
    async generateResponse(
    userMessage: string, 
    conversationHistory: string[] = [], 
    currentInterestLevel: number = 50,
    messagesLeft: number = 10
  ): Promise<string> {
    console.log('AI Service - Generating response for:', userMessage);
    console.log('AI Service - Current interest level:', currentInterestLevel);
    
    // For now, use our enhanced fallback system instead of external API
    // This provides intelligent, dynamic responses without relying on external models
    return this.getEnhancedFallbackResponse(userMessage, currentInterestLevel, messagesLeft, conversationHistory);
  }

  /**
   * Analyze conversation with enhanced interest tracking
   */
  async analyzeConversation(
    userMessage: string, 
    currentInterestLevel: number = 50,
    messagesLeft: number = 10
  ): Promise<ConversationAnalysis> {
    console.log('AI Service - Analyzing conversation:', userMessage);
    
    // Use our enhanced local analysis instead of external API
    return this.getEnhancedAnalysis(userMessage, currentInterestLevel, messagesLeft);
  }

  /**
   * Build simple prompt for AI generation
   */
  private buildSimplePrompt(userMessage: string, interestLevel: number, messagesLeft: number): string {
    let response = '';
    if (interestLevel >= 80) {
      response = `Person: ${userMessage}\nSarah: That's really interesting! `;
    } else if (interestLevel >= 60) {
      response = `Person: ${userMessage}\nSarah: That's a good point. `;
    } else if (interestLevel >= 40) {
      response = `Person: ${userMessage}\nSarah: I see. `;
    } else {
      response = `Person: ${userMessage}\nSarah: Oh, okay. `;
    }
    return response;
  }

  /**
   * Build dynamic conversation context with Sarah's personality
   */
  private buildDynamicConversationContext(
    userMessage: string, 
    history: string[], 
    interestLevel: number, 
    messagesLeft: number
  ): string {
    const personality = getSarahPersonality(interestLevel, messagesLeft, history);
    
    let context = `${personality}\n\nConversation so far:\n`;
    
    // Add recent conversation history (last 4 exchanges)
    const recentHistory = history.slice(-8);
    for (let i = 0; i < recentHistory.length; i += 2) {
      if (recentHistory[i]) {
        context += `Person: ${recentHistory[i]}\n`;
      }
      if (recentHistory[i + 1]) {
        context += `Sarah: ${recentHistory[i + 1]}\n`;
      }
    }

    context += `Person: ${userMessage}\nSarah:`;
    return context;
  }

  /**
   * Process AI response with interest-based filtering
   */
  private processResponse(generatedText: string, context: string, interestLevel: number): string {
    let response = this.extractSarahResponse(generatedText, context);
    
    // Clean and validate response
    response = this.cleanResponse(response);
    
    // Ensure response matches interest level
    response = this.adjustResponseToInterestLevel(response, interestLevel);
    
    if (response.length < 10) {
      return this.getFallbackResponse('', interestLevel);
    }

    return response;
  }

  /**
   * Extract Sarah's response from generated text
   */
  private extractSarahResponse(generatedText: string, context: string): string {
    console.log('AI Service - Extracting from:', generatedText);
    console.log('AI Service - Context was:', context);
    
    // For GPT-2, look for the continuation after "Sarah:"
    const sarahIndex = generatedText.lastIndexOf('Sarah:');
    let response = '';
    
    if (sarahIndex !== -1) {
      response = generatedText.substring(sarahIndex + 6).trim();
    } else {
      // If no "Sarah:" found, take everything after the context
      response = generatedText.replace(context, '').trim();
    }

    // Clean up the response
    response = response.split('\n')[0]; // Take only the first line
    response = response.split('Person:')[0]; // Remove if AI continued
    response = response.replace(/^["\s]+|["\s]+$/g, ''); // Remove quotes and extra spaces
    
    console.log('AI Service - Extracted response:', response);
    return response.trim();
  }

  /**
   * Clean response text
   */
  private cleanResponse(response: string): string {
    // Remove quotes and extra whitespace
    response = response.replace(/^["']|["']$/g, '').trim();
    
    // Ensure reasonable length
    if (response.length > 250) {
      response = response.substring(0, 250).trim();
      const lastSentence = Math.max(
        response.lastIndexOf('.'),
        response.lastIndexOf('!'),
        response.lastIndexOf('?')
      );
      if (lastSentence > 100) {
        response = response.substring(0, lastSentence + 1);
      }
    }

    return response;
  }

  /**
   * Adjust response tone based on interest level
   */
  private adjustResponseToInterestLevel(response: string, interestLevel: number): string {
    // If response doesn't match interest level, modify slightly
    if (interestLevel > 80 && response.length < 30) {
      // High interest should have more substantial responses
      return response + " I'd love to hear more about that!";
    }
    
    if (interestLevel < 30 && response.length > 100) {
      // Low interest should have shorter responses
      const firstSentence = response.split(/[.!?]/)[0];
      return firstSentence + (firstSentence.endsWith('.') ? '' : '.');
    }

    return response;
  }

  /**
   * Advanced sentiment analysis with context
   */
  private processAdvancedSentimentAnalysis(
    userMessage: string, 
    sentimentData: any, 
    currentInterestLevel: number,
    messagesLeft: number
  ): ConversationAnalysis {
    let interestChange = 0;
    let smoothnessChange = 0;
    let conversationTone: 'positive' | 'neutral' | 'negative' = 'neutral';

    // Base analysis on AI sentiment
    if (sentimentData.label === 'LABEL_2') { // Positive
      interestChange = Math.round(sentimentData.score * 15); // 0-15 point increase
      smoothnessChange = Math.round(sentimentData.score * 12);
      conversationTone = 'positive';
    } else if (sentimentData.label === 'LABEL_1') { // Neutral
      interestChange = Math.round((sentimentData.score - 0.5) * 8); // -4 to +4
      smoothnessChange = Math.round((sentimentData.score - 0.5) * 6);
      conversationTone = 'neutral';
    } else { // Negative
      interestChange = -Math.round(sentimentData.score * 20); // -20 to 0
      smoothnessChange = -Math.round(sentimentData.score * 15);
      conversationTone = 'negative';
    }

    // Enhanced pattern analysis
    const patternAnalysis = this.analyzeMessagePatterns(userMessage);
    interestChange += patternAnalysis.interestBonus;
    smoothnessChange += patternAnalysis.smoothnessBonus;

    // Calculate new levels
    const newInterestLevel = Math.max(0, Math.min(100, currentInterestLevel + interestChange));
    const newSmoothnessLevel = Math.max(0, Math.min(100, 50 + smoothnessChange));

    // Determine if should offer date (late in conversation + high interest)
    const shouldOfferDate = messagesLeft <= 2 && newInterestLevel >= 85;

    return {
      interestLevel: newInterestLevel,
      smoothnessLevel: newSmoothnessLevel,
      reasoning: `AI: ${sentimentData.label} (${Math.round(sentimentData.score * 100)}% confidence), Pattern analysis: ${patternAnalysis.reasoning}`,
      shouldOfferDate,
      conversationTone
    };
  }

  /**
   * Analyze message patterns for interest/smoothness
   */
  private analyzeMessagePatterns(message: string): { interestBonus: number; smoothnessBonus: number; reasoning: string } {
    let interestBonus = 0;
    let smoothnessBonus = 0;
    const reasons: string[] = [];

    // Positive patterns
    const positivePatterns = [
      { pattern: /\b(interesting|fascinating|amazing|incredible)\b/i, bonus: 8, reason: 'expressed fascination' },
      { pattern: /\b(you seem|you're)\s+(smart|intelligent|thoughtful|insightful)\b/i, bonus: 10, reason: 'complimented intelligence' },
      { pattern: /\b(tell me more|what do you think|how do you)\b/i, bonus: 6, reason: 'asked engaging question' },
      { pattern: /\b(coffee|study|psychology|literature|books)\b/i, bonus: 5, reason: 'showed interest in her interests' },
      { pattern: /\?\s*$/i, bonus: 4, reason: 'asked question' },
      { pattern: /😊|😄|👋|❤️/g, bonus: 3, reason: 'used positive emoji' },
    ];

    // Negative patterns
    const negativePatterns = [
      { pattern: /\b(whatever|boring|don't care|who cares)\b/i, bonus: -15, reason: 'dismissive language' },
      { pattern: /\b(hot|sexy|beautiful)\b/i, bonus: -8, reason: 'inappropriate comment' },
      { pattern: /\b(wanna hook up|netflix and chill|come over)\b/i, bonus: -20, reason: 'inappropriate advance' },
      { pattern: /😒|😤|🙄/g, bonus: -5, reason: 'negative emoji' },
      { pattern: /\b(busy|gotta go|whatever)\b/i, bonus: -10, reason: 'dismissive' },
    ];

    // Smoothness patterns
    const smoothPatterns = [
      { pattern: /\b(would you like|how about|what if we)\b/i, bonus: 8, reason: 'smooth suggestion' },
      { pattern: /\b(by the way|speaking of|that reminds me)\b/i, bonus: 5, reason: 'smooth transition' },
      { pattern: /\b(I noticed|I saw|I heard)\b/i, bonus: 4, reason: 'observational opener' },
    ];

    // Check patterns
    [...positivePatterns, ...negativePatterns].forEach(({ pattern, bonus, reason }) => {
      if (pattern.test(message)) {
        interestBonus += bonus;
        reasons.push(reason);
      }
    });

    smoothPatterns.forEach(({ pattern, bonus, reason }) => {
      if (pattern.test(message)) {
        smoothnessBonus += bonus;
        reasons.push(reason);
      }
    });

    // Length analysis
    if (message.length > 150) {
      interestBonus -= 5;
      reasons.push('message too long');
    } else if (message.length < 10) {
      interestBonus -= 8;
      smoothnessBonus -= 5;
      reasons.push('message too short');
    } else if (message.length >= 30 && message.length <= 100) {
      interestBonus += 3;
      smoothnessBonus += 3;
      reasons.push('good message length');
    }

    return {
      interestBonus,
      smoothnessBonus,
      reasoning: reasons.join(', ') || 'standard message'
    };
  }

  /**
   * Check if API key is valid
   */
  private isAPIKeyValid(): boolean {
    return !!(this.apiKey && 
             this.apiKey !== 'your_huggingface_api_key_here' && 
             this.apiKey !== 'hf_your_actual_token_here' &&
             this.apiKey.startsWith('hf_'));
  }

  /**
   * Enhanced fallback response with dynamic personality and context awareness
   */
  private getEnhancedFallbackResponse(
    userMessage: string, 
    interestLevel: number = 50, 
    messagesLeft: number = 10,
    conversationHistory: string[] = []
  ): string {
    console.log('AI Service - Enhanced fallback response, interest:', interestLevel);
    
    // Determine conversation stage and mood
    const totalMessages = 10 - messagesLeft;
    const conversationStage = totalMessages <= 3 ? 'early' : totalMessages <= 7 ? 'middle' : 'late';
    
    // Context-aware responses based on message content
    const lowerMessage = userMessage.toLowerCase();
    
    // Coffee/drink related responses
    if (lowerMessage.includes('coffee') || lowerMessage.includes('drink') || lowerMessage.includes('latte') || lowerMessage.includes('tea')) {
      if (interestLevel >= 80) {
        return "I love coffee! This place has amazing latte art. We should definitely grab coffee together sometime! ☕ What's your favorite type of coffee?";
      } else if (interestLevel >= 60) {
        return "The coffee here is really good! I usually get their vanilla latte. What about you? ☕";
      } else if (interestLevel >= 40) {
        return "Yeah, the coffee here is decent. I come here pretty regularly. ☕";
      } else {
        return "Mm-hmm, it's okay. I'm not too particular about coffee. ☕";
      }
    }
    
    // Study/academic related responses
    if (lowerMessage.includes('study') || lowerMessage.includes('psychology') || lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('major')) {
      if (interestLevel >= 80) {
        return "Psychology is so fascinating! I love understanding how people think and behave. What got you interested in that topic?";
      } else if (interestLevel >= 60) {
        return "I'm studying psychology! It's really interesting learning about human behavior. Are you in school too?";
      } else if (interestLevel >= 40) {
        return "Yeah, I'm a psychology major. Just taking a break from studying right now.";
      } else {
        return "I study psychology. Just trying to get through my coursework.";
      }
    }
    
    // Personal questions/compliments
    if (lowerMessage.includes('you seem') || lowerMessage.includes('you look') || lowerMessage.includes('you\'re') || lowerMessage.includes('smart') || lowerMessage.includes('interesting')) {
      if (interestLevel >= 80) {
        return "That's so sweet of you to say! I really appreciate that. You seem pretty thoughtful yourself! 😊";
      } else if (interestLevel >= 60) {
        return "Thank you! That's really nice of you to say. 😊";
      } else if (interestLevel >= 40) {
        return "Thanks, I appreciate that.";
      } else {
        return "Oh, thanks. That's nice of you to say.";
      }
    }
    
    // Questions
    if (lowerMessage.includes('?')) {
      if (interestLevel >= 80) {
        return "That's such a great question! I love that you asked that. " + this.getRandomEngagedResponse();
      } else if (interestLevel >= 60) {
        return this.getRandomInterestedResponse() + " What made you think of that?";
      } else if (interestLevel >= 40) {
        return this.getRandomNeutralResponse();
      } else {
        return this.getRandomDisinterestedResponse();
      }
    }
    
    // Late conversation stage - decision time
    if (conversationStage === 'late') {
      if (interestLevel >= 85) {
        return "You know what? I've really enjoyed talking with you! Maybe we could continue this conversation over dinner sometime? 😊";
      } else if (interestLevel >= 70) {
        return "This has been a really nice chat! I hope we run into each other here again. 😊";
      } else if (interestLevel >= 50) {
        return "Thanks for the chat! Maybe I'll see you around here again.";
      } else {
        return "Well, I should probably get back to my studying. Take care!";
      }
    }
    
    // Default responses based on interest level
    if (interestLevel >= 80) {
      return this.getRandomEngagedResponse() + " Tell me more about that!";
    } else if (interestLevel >= 60) {
      return this.getRandomInterestedResponse();
    } else if (interestLevel >= 40) {
      return this.getRandomNeutralResponse();
    } else {
      return this.getRandomDisinterestedResponse();
    }
  }

  /**
   * Enhanced conversation analysis without external APIs
   */
  private getEnhancedAnalysis(
    userMessage: string, 
    currentInterestLevel: number, 
    messagesLeft: number
  ): ConversationAnalysis {
    console.log('AI Service - Enhanced analysis for:', userMessage);
    
    const patternAnalysis = this.analyzeMessagePatterns(userMessage);
    
    // Calculate new interest level
    const newInterestLevel = Math.max(0, Math.min(100, currentInterestLevel + patternAnalysis.interestBonus));
    const newSmoothnessLevel = Math.max(0, Math.min(100, 50 + patternAnalysis.smoothnessBonus));
    
    // Determine if should offer date
    const shouldOfferDate = messagesLeft <= 2 && newInterestLevel >= 85;
    
    // Determine conversation tone
    let conversationTone: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (patternAnalysis.interestBonus > 5) conversationTone = 'positive';
    else if (patternAnalysis.interestBonus < -5) conversationTone = 'negative';
    
    console.log('AI Service - Analysis result:', {
      oldInterest: currentInterestLevel,
      newInterest: newInterestLevel,
      bonus: patternAnalysis.interestBonus,
      reasoning: patternAnalysis.reasoning
    });
    
    return {
      interestLevel: newInterestLevel,
      smoothnessLevel: newSmoothnessLevel,
      reasoning: `Enhanced AI: ${patternAnalysis.reasoning}`,
      shouldOfferDate,
      conversationTone
    };
  }

  /**
   * Get random engaged responses for high interest
   */
  private getRandomEngagedResponse(): string {
    const responses = [
      "That's really fascinating!",
      "Oh wow, I love that perspective!",
      "That's such an interesting way to think about it!",
      "You have such thoughtful insights!",
      "I'm really enjoying our conversation!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get random interested responses for medium interest
   */
  private getRandomInterestedResponse(): string {
    const responses = [
      "That's interesting!",
      "I can see what you mean.",
      "That's a good point.",
      "That makes sense.",
      "I hadn't thought of it that way."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get random neutral responses
   */
  private getRandomNeutralResponse(): string {
    const responses = [
      "I see.",
      "That's nice.",
      "Mm-hmm.",
      "Okay.",
      "Right."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get random disinterested responses for low interest
   */
  private getRandomDisinterestedResponse(): string {
    const responses = [
      "Oh, okay.",
      "I see.",
      "That's... interesting.",
      "Mm-hmm.",
      "Right."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Enhanced fallback response based on interest level
   */
  private getFallbackResponse(userMessage: string, interestLevel: number = 50): string {
    const highInterestResponses = [
      "That's really fascinating! Tell me more about that.",
      "Oh wow, I never thought about it that way! What made you think of that?",
      "That's such an interesting perspective! I'd love to hear more.",
      "You have such thoughtful insights! What else do you think about this?",
      "I'm really enjoying our conversation! That's a great point.",
    ];

    const mediumInterestResponses = [
      "That's interesting! Tell me more about that.",
      "Oh really? I'd like to hear more about that.",
      "That's a good point. What do you think about it?",
      "Hmm, that's worth thinking about.",
      "I see what you mean. That makes sense.",
    ];

    const lowInterestResponses = [
      "Oh, okay. That's nice.",
      "Mm-hmm, I see.",
      "That's... interesting.",
      "Oh, alright then.",
      "Yeah, I guess so.",
    ];

    let responses = mediumInterestResponses;
    if (interestLevel >= 70) {
      responses = highInterestResponses;
    } else if (interestLevel <= 40) {
      responses = lowInterestResponses;
    }

    // Context-based responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('coffee') || lowerMessage.includes('drink')) {
      return interestLevel > 60 
        ? "I love coming here for the coffee! Their latte art is amazing. Do you come here often? ☕"
        : "Yeah, the coffee here is decent. ☕";
    }
    if (lowerMessage.includes('study') || lowerMessage.includes('school') || lowerMessage.includes('book')) {
      return interestLevel > 60
        ? "I'm actually taking a break from studying psychology right now. What do you study or what kind of books do you like?"
        : "I'm studying psychology. Just taking a quick break.";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Enhanced fallback analysis
   */
  private getFallbackAnalysis(userMessage: string, currentInterestLevel: number, messagesLeft: number): ConversationAnalysis {
    const patternAnalysis = this.analyzeMessagePatterns(userMessage);
    
    const newInterestLevel = Math.max(0, Math.min(100, currentInterestLevel + patternAnalysis.interestBonus));
    const newSmoothnessLevel = Math.max(0, Math.min(100, 50 + patternAnalysis.smoothnessBonus));
    
    const shouldOfferDate = messagesLeft <= 2 && newInterestLevel >= 85;
    
    let conversationTone: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (patternAnalysis.interestBonus > 5) conversationTone = 'positive';
    else if (patternAnalysis.interestBonus < -5) conversationTone = 'negative';

    return {
      interestLevel: newInterestLevel,
      smoothnessLevel: newSmoothnessLevel,
      reasoning: `Rule-based: ${patternAnalysis.reasoning}`,
      shouldOfferDate,
      conversationTone
    };
  }
}

export const aiService = new AIService();
export type { ConversationAnalysis }; 