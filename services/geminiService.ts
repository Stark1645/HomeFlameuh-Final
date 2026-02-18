
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY =
  (typeof import.meta !== 'undefined' &&
    (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
  '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDishDescription = async (dishName: string, ingredients: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Generate an appetizing and professional description for a dish named "${dishName}" containing these ingredients: ${ingredients}. Keep it under 150 characters.`,
    });
    return response.text || "Freshly prepared homemade dish.";
  } catch (error) {
    console.error("Gemini failed to generate description", error);
    return "Delicious home-cooked meal prepared with fresh ingredients.";
  }
};

export const generateChefBio = async (name: string, specialty: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Write a short, professional and warm bio for a home chef named ${name} who specializes in ${specialty} cuisine. Focus on hygiene and passion for cooking.`,
    });
    return response.text || "Passionate home chef dedicated to quality food.";
  } catch (error) {
    console.error("Gemini failed to generate bio", error);
    return "Passionate about serving high-quality home-cooked meals.";
  }
};

export const getMealRecommendation = async (preferences: string, dishes: any[]): Promise<string> => {
  try {
    const dishList = dishes.map(d => `${d.name} (${d.description})`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `A user is looking for a meal with these preferences: "${preferences}". Based on this menu: [${dishList}], which dish should they choose and why? Keep it short and friendly.`,
    });
    return response.text || "I recommend trying our chef's signature special!";
  } catch (error) {
    return "The Classic Lasagna is always a crowd favorite!";
  }
};

export const getOrderStatusCommentary = async (status: string, chefName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `The order status is "${status}" for Chef ${chefName}'s kitchen. Write a reassuring, mouth-watering 1-sentence update for the customer.`,
    });
    return response.text || "Your meal is being prepared with the utmost care.";
  } catch (error) {
    return "Chef is working hard to ensure your meal is perfect.";
  }
};

export const smartSearchChefs = async (query: string, chefs: any[]): Promise<number[]> => {
  try {
    const chefData = chefs.map(c => ({ id: c.id, specialty: c.cuisineSpecialty, bio: c.bio }));
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Query: "${query}". Based on this list of chefs: ${JSON.stringify(chefData)}, return ONLY a JSON array of chef IDs that best match the query. If none match, return an empty array [].`,
      config: { responseMimeType: "application/json" }
    });
    const ids = JSON.parse(response.text || "[]");
    return Array.isArray(ids) ? ids : [];
  } catch (error) {
    return chefs.map(c => c.id);
  }
};

export const generateWeeklyMealPlan = async (userPreferences: string, availableDishes: any[]): Promise<string> => {
  try {
    const dishContext = availableDishes.map(d => d.name).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `User Preferences: "${userPreferences}". Available Dishes: ${dishContext}. Create a balanced 7-day dinner meal plan using these dishes. Include a brief health tip for each. Format as markdown.`,
    });
    return response.text || "Contact our support for a personalized plan.";
  } catch (error) {
    return "Unable to generate meal plan at this moment.";
  }
};

export const optimizeMenuDescription = async (currentDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Rewrite this dish description to be more enticing, premium, and sophisticated: "${currentDescription}". Keep it under 200 characters.`,
    });
    return response.text || currentDescription;
  } catch (error) {
    return currentDescription;
  }
};
