
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeCode(code: string): Promise<AIAnalysisResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza el siguiente código JavaScript y proporciona una evaluación estructurada:\n\n${code}`,
      config: {
        thinkingConfig: { thinkingBudget: 5000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'Calificación de 0 a 100 basada en calidad, eficiencia y mejores prácticas.'
            },
            bugs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Lista de errores encontrados o riesgos potenciales.'
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Sugerencias para mejorar el código.'
            },
            explanation: {
              type: Type.STRING,
              description: 'Explicación detallada del análisis.'
            }
          },
          required: ["score", "bugs", "improvements", "explanation"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Error al procesar la respuesta de la IA.");
    }
  }
}

export const geminiService = new GeminiService();
