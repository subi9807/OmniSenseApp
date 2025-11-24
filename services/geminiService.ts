import { GoogleGenAI } from "@google/genai";
import { Language } from "../contexts/LanguageContext";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLanguageName = (lang: Language): string => {
    switch(lang) {
        case 'ko': return 'Korean';
        case 'ja': return 'Japanese';
        case 'en': default: return 'English';
    }
}

export const analyzeLocation = async (lat: number, lng: number, lang: Language): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const languageName = getLanguageName(lang);
    const prompt = `I am currently at Latitude: ${lat}, Longitude: ${lng}. 
    Based on these coordinates, broadly describe the likely environment (urban, rural, coastal, etc.) 
    and suggest 3 useful safety or preparation tips for this type of environment. 
    Keep the response concise, under 100 words, and formatted as a simple markdown list.
    IMPORTANT: Respond in ${languageName}.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to analyze location data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI analysis unavailable at this moment. Please check your API key.";
  }
};

export const analyzeBleSignal = async (devices: {name: string, rssi: number}[], lang: Language): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const languageName = getLanguageName(lang);
    const deviceList = devices.map(d => `${d.name} (Signal: ${d.rssi}dBm)`).join(', ');
    const prompt = `I have detected the following Bluetooth Low Energy devices with their signal strengths (RSSI):
    ${deviceList}.
    
    Analyze this environment. Is it crowded? Are the signals strong (>-60dBm) or weak? 
    What kind of environment might contain these device names?
    Keep it under 80 words.
    IMPORTANT: Respond in ${languageName}.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to analyze signal environment.";
  } catch (error) {
    return "AI signal analysis unavailable.";
  }
};