import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSession: ChatSession;

/**
 * Generates a new, random Group Discussion topic.
 * @returns {Promise<string>} The topic as a string.
 */
export const generateGdTopic = async (): Promise<string> => {
  const prompt = "Generate a single, interesting, and debatable group discussion topic suitable for a job interview context. Provide only the topic name as a string, and nothing else.";
  const result = await model.generateContent(prompt);
  // We trim() to remove any potential leading/trailing whitespace
  return result.response.text().trim();
};

/**
 * Starts a new chat session with a specific set of rules and a topic.
 * @param {string} topic - The topic for the discussion.
 * @returns {Promise<string>} The initial message from the AI.
 */
export const startGdChat = async (topic: string): Promise<string> => {
  chatSession = model.startChat({
    history: [
      {
        role: "user",  
        parts: [{ text: `
          ** GD Simulation Rules **
          1.  You are simulating a Group Discussion with two distinct AI participants: "AI Candidate 1" and "AI Candidate 2".
          2.  **Etiquette is critical:** Do NOT directly address participants by name (e.g., "What do you think, Candidate 2?"). Instead, pose questions to the group. Use phrases like "I agree with that point...", "Building on what was said...", "I have a different perspective...". The tone should be a collaborative debate.
          3.  **Flow Control:** After an AI makes a point and wants the *other AI* to respond immediately, end your response with the special token: "[AI_CONTINUES]".
          4.  If you want the human "User" to speak, make a general statement and DO NOT end with the token.
          5.  The topic is: "${topic}".
          6.  Your first task: Have AI Candidate 1 make a brief opening statement. Then, have AI Candidate 2 immediately follow up.
        `}],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will follow all rules, manage the two AI personas, and use the [AI_CONTINUES] token to control the conversation flow." }],
      },
    ],
  });

  const result = await chatSession.sendMessage("Start the discussion now.");
  return result.response.text();
};

/**
 * Continues the chat, either based on user input or an AI-to-AI turn.
 * @param {string | null} userMessage - The user's message, or null if the AI is continuing.
 * @returns {Promise<string>} The AI's next response.
 */
export const continueGdChat = async (userMessage: string | null): Promise<string> => {
  // If userMessage is null, it means AI is continuing its turn.
  const prompt = userMessage
    ? `The human "User" has just said: "${userMessage}". Now, continue the discussion following the rules.`
    : `That was a good point. Let the next AI candidate continue the discussion now, following all the rules.`;

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};

/**
 * Gets the final performance feedback for the user.
 * @returns {Promise<string>} A string containing structured feedback.
 */
export const getGdFeedback = async (): Promise<string> => {
   if (!chatSession) {
    return "Chat session not found. Could not generate feedback.";
  }

  const history = await chatSession.getHistory();
  const userHistory = history
    .filter(item => item.role === 'user' && item.parts.some(part => part.text?.includes('The human "User" has just said:')))
    .map(item => item.parts.map(part => part.text?.replace('The human "User" has just said: "', '').slice(0, -1)).join(''))
    .join('\n');

  if (!userHistory.trim()) {
    return "No user participation was recorded to generate feedback.";
  }

  // Use a new, clean model instance for unbiased feedback
  const feedbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    You are an expert HR evaluator. Based on the user's contributions in the following transcript, 
    provide constructive feedback on their performance. Evaluate communication, clarity, relevance to the topic, and collaborative ability.
    
    User's Transcript:
    ${userHistory}
  `;
      
  const result = await feedbackModel.generateContent(prompt);
  return result.response.text();
};