
import { GoogleGenAI, Type } from "@google/genai";
import { RefinementOptions, GeneratedOutput } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      properties: {
        inferred_intent: { type: Type.STRING, description: "The user's core goal." },
        context_expansion_suggestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Ideas or questions to add more context.",
        },
        suggested_directions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Creative or strategic directions for the prompt.",
        },
      },
    },
    prompt_variations: {
      type: Type.OBJECT,
      properties: {
        concise: { type: Type.STRING, description: "A clear, direct, and improved version." },
        detailed: { type: Type.STRING, description: "A comprehensive prompt with details." },
        creative: { type: Type.STRING, description: "An imaginative and unconventional take." },
        persona_driven: { type: Type.STRING, description: "A prompt that instructs the AI to adopt a specific persona." },
      },
    },
  },
};

const getSystemInstruction = (options: RefinementOptions, history: string[]): string => `
You are an expert prompt engineer named 'PromptPerfect'. Your task is to take a user's basic prompt and transform it into several high-quality, detailed, and effective prompts for a large language model.

Given the user's prompt, you must:
1.  **Analyze Intent**: Identify the user's core goal and any missing context (target audience, tone, format, key details).
2.  **Expand Context**: Formulate a list of clarifying questions or "infuse ideas" that the user might want to consider.
3.  **Suggest Directions**: Propose 2-3 creative or strategic directions the user could take their prompt (e.g., storytelling, technical explanation, promotional copy).
4.  **Generate Prompt Variations**: Create 4 distinct, improved versions of the prompt.

**Refinement Controls:**
The user has provided the following preferences. You must adhere to them when generating the prompt variations.
- Creativity Level: ${options.creativity}/100 (100 is highly imaginative, 0 is very straightforward).
- Structure Level: ${options.structure}/100 (100 is highly structured with clear sections, 0 is very loose and free-form).
- Add Industry Examples: ${options.addExamples ? 'Yes, include relevant examples.' : 'No, do not include examples.'}
- Request Visuals/Data: ${options.addVisuals ? 'Yes, include requests for visuals, tables, or data in the prompts.' : 'No, focus on text generation.'}

${history.length > 0 ? `
**Context Memory:**
The user has provided their recent prompt history for context. Maintain consistency in style or topic where relevant.
Previous prompts:
${history.map(p => `- "${p}"`).join('\n')}
` : ''}

Your final output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not add any text, explanations, or markdown formatting before or after the JSON block.
`;

export const enhancePrompt = async (
  prompt: string,
  options: RefinementOptions,
  history: string[]
): Promise<GeneratedOutput> => {
  try {
    const systemInstruction = getSystemInstruction(options, history);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: options.creativity / 100,
      },
    });

    const jsonText = response.text.trim();
    // In case the model still wraps it in markdown
    const cleanJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    
    const parsed = JSON.parse(cleanJsonText);
    return parsed as GeneratedOutput;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate prompt enhancements from the API.");
  }
};
