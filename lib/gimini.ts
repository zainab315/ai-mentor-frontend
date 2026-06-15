import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GOOGLE_AI_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Use gemini-2.0-flash model (fast and free)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateGeminiStream(prompt: string): Promise<any> {
  try {
    const result = await model.generateContentStream(prompt);
    return result;
  } catch (error) {
    console.error("Gemini API Stream Error:", error);
    throw error;
  }
}