import { useState, useCallback, useEffect } from 'react';
import { startGdChat, continueGdChat, getGdFeedback, generateGdTopic } from '../services/gemini.service';

export type Message = {
  speaker: 'AI' | 'User';
  text: string;
};

const DISCUSSION_DURATION = 300; // 10 minutes in seconds

export const useGroupDiscussion = () => {
  const [discussionHistory, setDiscussionHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGdRunning, setIsGdRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DISCUSSION_DURATION);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Handles processing AI responses and checking for the [AI_CONTINUES] token
  const handleAiResponse = useCallback(async (userMessage: string | null) => {
    setIsLoading(true);
    
    const aiResponseText = await continueGdChat(userMessage);
    let cleanText = aiResponseText;

    // Check if the AI wants to continue the conversation by itself
    if (aiResponseText.endsWith("[AI_CONTINUES]")) {
      cleanText = aiResponseText.replace("[AI_CONTINUES]", "").trim();
      setDiscussionHistory(prev => [...prev, { speaker: 'AI', text: cleanText }]);
      
      // If the token is found, call the function again immediately for the next AI's turn
      handleAiResponse(null);
    } else {
      // If no token, the AI's turn is over, and it's time for the user to speak
      setDiscussionHistory(prev => [...prev, { speaker: 'AI', text: cleanText }]);
      setIsLoading(false);
    }
  }, []);

  // Handles the user's voice input
  const handleSpeechSubmit = useCallback(async (transcript: string) => {
    if (!transcript.trim() || isLoading) return;

    const userMessage: Message = { speaker: 'User', text: transcript };
    setDiscussionHistory(prev => [...prev, userMessage]);
    
    // After user speaks, trigger the AI response flow
    handleAiResponse(transcript);
  }, [isLoading, handleAiResponse]);

  // Handles the end of the discussion when the timer runs out
  const handleEndGD = useCallback(async () => {
    setIsGdRunning(false);
    setIsLoading(true);
    const finalFeedback = await getGdFeedback();
    setFeedback(finalFeedback);
    setShowFeedbackModal(true);
    setIsLoading(false);
  }, []);

  // Effect for the countdown timer
  useEffect(() => {
    if (!isGdRunning) return;

    if (timeLeft <= 0) {
      handleEndGD();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isGdRunning, timeLeft, handleEndGD]);

  // Handles the start of the entire discussion
  const handleStart = useCallback(async () => {
    // Reset all state for a fresh start
    setTimeLeft(DISCUSSION_DURATION);
    setDiscussionHistory([]);
    setFeedback('');
    setShowFeedbackModal(false);
    
    setIsGdRunning(true);
    setIsLoading(true);
    
    const topic = await generateGdTopic();
    const firstAiMessage = await startGdChat(topic);
    
    setDiscussionHistory([
      { speaker: 'AI', text: `Today's discussion topic is: "${topic}"` },
      { speaker: 'AI', text: firstAiMessage }
    ]);

    // Check if the very first response also requires an immediate AI follow-up
    if (firstAiMessage.endsWith("[AI_CONTINUES]")) {
        const cleanText = firstAiMessage.replace("[AI_CONTINUES]", "").trim();
        // Update the last message to be clean
        setDiscussionHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { speaker: 'AI', text: cleanText };
            return newHistory;
        });
        handleAiResponse(null);
    } else {
        setIsLoading(false);
    }
  }, [handleAiResponse]);

  return {
    discussionHistory,
    isLoading,
    isGdRunning,
    timeLeft,
    showFeedbackModal,
    feedback,
    handleStart,
    handleSpeechSubmit,
    closeFeedbackModal: () => setShowFeedbackModal(false),
  };
};