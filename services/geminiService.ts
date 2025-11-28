import { GoogleGenAI, Schema, Type } from "@google/genai";
import { ChatMessage } from "../types";
import { NPCS, ITEMS } from "../constants";

// Note: In a real app, never expose API keys on the client side like this unless strictly for a demo/hackathon environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FLASH = 'gemini-2.5-flash';

// Helper to strip markdown code blocks if present
const cleanJSON = (text: string) => {
  // Try to find JSON inside code blocks first
  const match = text.match(/```json([\s\S]*?)```/);
  if (match) return match[1].trim();
  // Fallback: strip all markdown ticks
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

const FALLBACK_SORTING_QUESTIONS = [
  {
    question: "面對一隻巨怪闖入地下室，你會怎麼做？",
    options: [
      { text: "拔出魔杖衝上去戰鬥", weight: { Gryffindor: 10, Slytherin: 2, Ravenclaw: 0, Hufflepuff: 5 } },
      { text: "分析巨怪的弱點並設下陷阱", weight: { Gryffindor: 2, Slytherin: 5, Ravenclaw: 10, Hufflepuff: 0 } },
      { text: "立刻跑去通知教授", weight: { Gryffindor: 5, Slytherin: 0, Ravenclaw: 5, Hufflepuff: 10 } },
      { text: "為了自保躲起來", weight: { Gryffindor: 0, Slytherin: 10, Ravenclaw: 2, Hufflepuff: 0 } }
    ]
  },
  {
    question: "如果你撿到一個裝滿加隆的錢包，你會？",
    options: [
      { text: "試著找到失主", weight: { Gryffindor: 5, Slytherin: 0, Ravenclaw: 2, Hufflepuff: 10 } },
      { text: "把它留下來，誰撿到算誰的", weight: { Gryffindor: 0, Slytherin: 10, Ravenclaw: 5, Hufflepuff: 0 } },
      { text: "大聲詢問是誰掉的", weight: { Gryffindor: 10, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 5 } },
      { text: "思考這是否是某種魔法測試", weight: { Gryffindor: 2, Slytherin: 5, Ravenclaw: 10, Hufflepuff: 2 } }
    ]
  },
  {
    question: "你最希望擁有哪種能力？",
    options: [
      { text: "讀心術", weight: { Gryffindor: 0, Slytherin: 5, Ravenclaw: 10, Hufflepuff: 0 } },
      { text: "隱形", weight: { Gryffindor: 5, Slytherin: 5, Ravenclaw: 2, Hufflepuff: 2 } },
      { text: "超人般的力量", weight: { Gryffindor: 10, Slytherin: 2, Ravenclaw: 0, Hufflepuff: 5 } },
      { text: "跟動物說話", weight: { Gryffindor: 5, Slytherin: 0, Ravenclaw: 5, Hufflepuff: 10 } }
    ]
  }
];

export const generateSortingHatQuestions = async (): Promise<any[]> => {
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              weight: {
                type: Type.OBJECT,
                properties: {
                  Gryffindor: { type: Type.NUMBER },
                  Slytherin: { type: Type.NUMBER },
                  Ravenclaw: { type: Type.NUMBER },
                  Hufflepuff: { type: Type.NUMBER },
                }
              }
            }
          }
        }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      // Increased to 10 questions as requested.
      contents: "Generate 10 multiple-choice questions for the Sorting Hat ceremony. Questions must be short (under 20 words). Options must be short (under 10 words). Return in Traditional Chinese (zh-TW).",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        maxOutputTokens: 8192, // Maximize token limit for larger JSON
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    
    return JSON.parse(cleanJSON(text));
  } catch (error) {
    console.warn("Sorting Hat API Error (Using Fallback):", error);
    // Return fallback questions so the game can continue
    return FALLBACK_SORTING_QUESTIONS;
  }
};

export const generateClassQuiz = async (subject: string): Promise<any[]> => {
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        answer: { type: Type.STRING },
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      // Increased to 10 questions as requested.
      contents: `Generate 10 short-answer quiz questions for a Hogwarts class on the subject: ${subject}. 
      The questions should be challenging but answerable with 1-3 words. 
      Return in Traditional Chinese (zh-TW).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        maxOutputTokens: 8192,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(cleanJSON(text));
  } catch (error) {
    console.error("Quiz Error:", error);
    return [
      { question: "What spell is used to disarm an opponent?", answer: "Expelliarmus" },
      { question: "What creature guards Azkaban?", answer: "Dementor" },
      { question: "Who is the Half-Blood Prince?", answer: "Snape" }
    ]; // Simple fallback
  }
};

export const checkQuizAnswer = async (question: string, userAnswer: string, correctAnswer: string): Promise<{ correct: boolean, feedback: string }> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      correct: { type: Type.BOOLEAN },
      feedback: { type: Type.STRING }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: `Context: Hogwarts Class Quiz. 
      Question: "${question}"
      Correct Answer: "${correctAnswer}"
      Student Answer: "${userAnswer}"
      
      Task: Determine if the student's answer is semantically correct (even if phrased differently). 
      Provide a brief feedback message from the Professor's perspective (strict but fair).
      Return in Traditional Chinese (zh-TW).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) return { correct: false, feedback: "Error grading." };
    return JSON.parse(cleanJSON(text));
  } catch (error) {
    return { correct: false, feedback: "The magic faded... (API Error)" };
  }
};

export const generateNPCResponse = async (
  npcName: string, 
  personality: string, 
  history: ChatMessage[], 
  lastInput: string
): Promise<{ text: string, emotion: string }> => {
  
  const conversation = history.map(m => `${m.sender}: ${m.text}`).join('\n');
  const prompt = `
    You are roleplaying as ${npcName} from Harry Potter.
    Personality: ${personality}.
    Current Conversation History:
    ${conversation}
    
    Player: ${lastInput}
    
    Respond as ${npcName}. Keep it immersive and relatively short (under 50 words).
    Also, indicate your facial expression from this list: [NEUTRAL, HAPPY, ANGRY, SURPRISED, SAD].
    
    Return JSON format: {"emotion": "string", "text": "string"}
    Language: Traditional Chinese (zh-TW).
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      emotion: { type: Type.STRING },
      text: { type: Type.STRING }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    const text = response.text;
    if(!text) return { text: "...", emotion: "NEUTRAL" };
    return JSON.parse(cleanJSON(text));
  } catch (error) {
    console.error("NPC Chat Error", error);
    return { text: "The character stares at you blankly.", emotion: "NEUTRAL" };
  }
};

export const generateNewQuest = async (completedQuests: string[], currentQuests: any[] = []): Promise<any> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      reward: { type: Type.NUMBER, description: "Amount of Galleons between 5 and 50" },
      type: { type: Type.STRING, enum: ["Class", "Job", "Story"] },
      requirementType: { type: Type.STRING, enum: ["Talk", "Find"] },
      targetId: { type: Type.STRING, description: "The ID of the NPC or Item required" }
    }
  };

  const npcIdList = NPCS.map(n => n.id).join(', ');
  const itemIdList = ITEMS.map(i => i.id).join(', ');

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: `Generate a new, random side quest for a Hogwarts student. 
      Avoid these previously completed quests: ${completedQuests.join(', ')}.
      Avoid these active quests: ${currentQuests.map(q => q.title).join(', ')}.
      
      Requirements:
      1. If requirementType is 'Talk', targetId MUST be one of these NPC IDs: ${npcIdList}.
      2. If requirementType is 'Find', targetId MUST be one of these Item IDs: ${itemIdList}.
      3. Language: Traditional Chinese (zh-TW).
      4. Make the quest title and description immersive.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(cleanJSON(text));
  } catch (e) {
    console.error(e);
    return null;
  }
};