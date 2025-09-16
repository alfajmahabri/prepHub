// src/routes/GroupDiscussionPage.tsx
import React from 'react';
import { useGroupDiscussion } from '../hooks/useGroupDiscussion';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import Timer from '../components/Timer';
import FeedbackModal from '../components/FeedbackModal';
import { Container } from '../components/ui/container';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RainbowButton } from '../components/ui/rainbow-button';
import { cn } from '../lib/utils';

// You can move this type to a central types/index.ts file if you prefer
export type Message = {
  speaker: 'AI' | 'User';
  text: string;
};

const GroupDiscussionPage = () => {
  // Call the main logic hook
  const {
    discussionHistory,
    isLoading,
    isGdRunning,
    timeLeft,
    showFeedbackModal,
    feedback,
    handleStart,
    handleSpeechSubmit,
    closeFeedbackModal,
  } = useGroupDiscussion();

  // Call the speech recognition hook, passing the submit handler as a callback
  const { isListening, startListening, isSpeechSupported } = useSpeechRecognition(handleSpeechSubmit);

  return (
    <Container className="py-8">
      <Card className="p-6 shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Group Discussion
        </h1>

        {/* Show Start button only when the GD isn't running and the modal is closed */}
        {!isGdRunning && !showFeedbackModal && (
          <div className="flex justify-center mb-6">
            <RainbowButton onClick={handleStart} className="text-lg px-8 py-4">
              Start 10-Minute Discussion
            </RainbowButton>
          </div>
        )}

        {/* Show the main discussion UI only when it's running */}
        {isGdRunning && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Timer seconds={timeLeft} />
            </div>

            {/* Transcript Area */}
            <Card className="p-4 h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-900 shadow-inner">
              <div className="space-y-4">
                {discussionHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-3 rounded-lg",
                      msg.speaker === 'AI' 
                        ? "bg-blue-100 dark:bg-blue-900/30 ml-4" 
                        : "bg-green-100 dark:bg-green-900/30 mr-4"
                    )}
                  >
                    <span className={cn(
                      "font-semibold",
                      msg.speaker === 'AI' ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
                    )}>
                      {msg.speaker}:
                    </span>{' '}
                    <span className="text-gray-700 dark:text-gray-300">{msg.text}</span>
                  </div>
                ))}
                {isLoading && (
                  <div className="italic text-gray-500 dark:text-gray-400 text-center py-2">
                    AI is thinking...
                  </div>
                )}
              </div>
            </Card>

            {/* Voice Input Area */}
            <div className="flex justify-center mt-6">
              {isSpeechSupported ? (
                <Button
                  onClick={startListening}
                  disabled={isLoading || isListening}
                  className={cn(
                    "rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300",
                    isListening 
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  <span className="text-2xl">
                    {isListening ? '🎙️' : '🎤'}
                  </span>
                </Button>
              ) : (
                <p className="text-red-500 dark:text-red-400">
                  Voice input is not supported in your browser.
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Conditionally render the feedback modal */}
        {showFeedbackModal && <FeedbackModal feedback={feedback} onClose={closeFeedbackModal} />}
      </Card>
    </Container>
  );
};

export default GroupDiscussionPage;