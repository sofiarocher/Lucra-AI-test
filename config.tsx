import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { formatResponseText } from "./validations";
import { ERROR_MESSAGE } from "./constant";

// Function to generate a response from AI based on the user's input
export const generateAIResponse = async (promptValue: string) => {
  try {
    const chatSession = await initializeChatSession();
    const result = await sendMessageToAI(chatSession, promptValue);
    const formattedResponse = formatResponseText(result.response.text());
    return {
      content: formattedResponse,
      timestamp: new Date().toISOString(), 
      sender: "ai",
    };
  } catch (error) {
    console.error("Error in generateAIResponse:", error);
    // Return a predefined error message if the process fails
    return {
      content: ERROR_MESSAGE,
      timestamp: new Date().toISOString(),
      sender: "ai",
    };
  }
};

// Function to initialize the chat session with Google Generative AI
export const initializeChatSession = async () => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  return model.startChat({
    generationConfig: {
      temperature: 0.9,
      topK: 1, 
      topP: 1, 
      maxOutputTokens: 2048, 
    },
    safetySettings: [ // Configure content filters to block harmful content
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
    history: [], // Initial chat history (if any)
  });
};

// Function to send a message to the AI and receive its response
export const sendMessageToAI = async (chatSession: any, promptValue: string) => {
  const result = await chatSession.sendMessage(promptValue);
  return result; 
};
