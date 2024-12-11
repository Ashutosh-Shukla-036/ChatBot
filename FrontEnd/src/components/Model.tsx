// components/Model.tsx
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define types for the response format (optional, but recommended for TypeScript)
interface GeminiResponse {
  response: {
    text: () => string; // text is a function, not a direct string
  };
}

// Initialize the Gemini model with your API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the function to generate content from the model
export const generateContent = async (prompt: string): Promise<string> => {
  try {
    // Generate content using the model
    const result: GeminiResponse = await model.generateContent(prompt);

    // Log and return the response text by calling the function
    const responseText = result.response.text(); // Call text to get the string
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error; // Re-throw the error after logging
  }
};
