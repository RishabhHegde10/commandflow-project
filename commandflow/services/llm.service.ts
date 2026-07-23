import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({
  apiKey,
});

function normalizeModelName(model?: string): string {
  const trimmed = model?.trim();

  if (!trimmed) {
    return "gemini-flash-latest";
  }

  return trimmed
    .replace(/^models\//i, "")
    .replace(/^publishers\/google\/models\//i, "")
    .replace(/^google\//i, "")
    .trim();
}

const MODEL = normalizeModelName(process.env.GEMINI_MODEL);

export interface LLMResponse {
  success: boolean;
  text: string;
}

export async function generateResponse(
  prompt: string
): Promise<LLMResponse> {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });

      return {
        success: true,
        text: response.text ?? "",
      };
    } catch (error: any) {
      lastError = error;
      if (error?.status === 429 && attempt < 3) {
        console.warn(`Gemini Rate Limit hit (Attempt ${attempt}/3). Retrying in 35 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 35000));
        continue;
      }
      console.error("Gemini Error:", error);
      throw error;
    }
  }
  
  throw lastError;
}