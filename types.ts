
export interface RefinementOptions {
  creativity: number;
  structure: number;
  addExamples: boolean;
  addVisuals: boolean;
}

export interface GeneratedOutput {
  analysis: {
    inferred_intent: string;
    context_expansion_suggestions: string[];
    suggested_directions: string[];
  };
  prompt_variations: {
    concise: string;
    detailed: string;
    creative: string;
    persona_driven: string;
  };
}
