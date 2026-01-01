
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSecurityInsights = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: ${context}\n\nUser Query: ${prompt}`,
      config: {
        systemInstruction: `You are Penny, a world-class cybersecurity pentester and Crabby, a vigilant sentinel. 
        Analyze security events, suggest remediation, or explain reconnaissance findings.
        Keep responses professional, technical, and formatted for a terminal interface (markdown).
        Focus on domains like Reconnaissance, Influence Operations (bot farms), and Exploit analysis.`,
        temperature: 0.7,
      },
    });
    return response.text || "I was unable to process the security query. Check system logs.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERROR: Connection to Intelligence Core severed. Check API status.";
  }
};

export const analyzeBotClusters = async (clusterData: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these bot clusters and describe potential influence operations: ${clusterData}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            threatLevel: { type: Type.STRING },
            originInference: { type: Type.STRING },
            recommendedAction: { type: Type.STRING },
            coordinatedBehaviorScore: { type: Type.NUMBER }
          },
          required: ["threatLevel", "originInference", "recommendedAction", "coordinatedBehaviorScore"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
};
