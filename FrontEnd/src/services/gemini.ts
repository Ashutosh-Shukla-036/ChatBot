// services/gemini.ts
import { generateContent } from "../components/Model" // Adjust the import path as needed

export async function getGeminiResponse(prompt: string) {
  try {
    // Call the generateContent function from Model.jsx
    const result = await generateContent(prompt);
    return result;
  } catch (error) {
    // Handle any errors that may occur
    console.error('Error generating content:', error);
    throw new Error('Failed to get Gemini response');
  }
}
