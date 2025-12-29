import { GoogleGenAI, Type } from "@google/genai";
import { RemoteCommand } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const interpretVoiceCommand = async (transcript: string): Promise<RemoteCommand[]> => {
  try {
    const validCommands = Object.values(RemoteCommand).join(', ');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User said: "${transcript}". Map this to a sequential list of remote control commands.
      Valid commands are: ${validCommands}.
      If the user wants to watch a specific app, map it to the app button if available (NETFLIX, YOUTUBE).
      If the user says "Turn it up a lot", map to multiple VOL_UP commands.
      Example: "Mute and go home" -> ["MUTE", "HOME"].
      Example: "Turn volume up 3 times" -> ["VOL_UP", "VOL_UP", "VOL_UP"].
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            enum: Object.values(RemoteCommand)
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const commands = JSON.parse(jsonStr) as RemoteCommand[];
    return commands;
  } catch (error) {
    console.error("Gemini interpretation failed:", error);
    return [];
  }
};