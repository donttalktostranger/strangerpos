import { GoogleGenAI } from "@google/genai";
import { Product, Sale } from "../types";

// Initialize the client.
// Note: In a real scenario, the API key is strictly environment variable based.
// We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBusinessInsight = async (sales: Sale[], products: Product[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure the environment variable to use AI insights.";
  }

  const salesSummary = sales.slice(-50).map(s => ({
    date: s.date,
    total: s.totalAmount,
    items: s.items.length
  }));

  const inventorySummary = products.map(p => ({
    name: p.name,
    stock: p.stock
  }));

  const prompt = `
    You are a business analyst for a coffee shop.
    Analyze the following data:
    1. Recent Sales (Sample): ${JSON.stringify(salesSummary)}
    2. Current Inventory: ${JSON.stringify(inventorySummary)}

    Provide a concise, professional executive summary (max 100 words).
    Identify one sales trend and one inventory warning/recommendation.
    Use a professional tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate insight.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate AI insights at this time. Please check your network or API quota.";
  }
};

export const askAssistant = async (question: string, contextData: string): Promise<string> => {
    if (!process.env.API_KEY) return "API Key missing.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Context: ${contextData}\n\nUser Question: ${question}\n\nAnswer briefly as a helpful POS assistant.`,
        });
        return response.text || "I'm not sure.";
    } catch (e) {
        return "Error contacting AI assistant.";
    }
}