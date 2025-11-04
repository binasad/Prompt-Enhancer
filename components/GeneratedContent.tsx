import React, { useState, useEffect } from 'react';
import { GeneratedOutput } from '../types';
import AnalysisCard from './AnalysisCard';
import PromptCard from './PromptCard';

const loadingMessages = [
  "Perfecting your prompt...",
  "Brewing creative ideas...",
  "Consulting the prompt oracle...",
  "Structuring genius...",
  "Adding a touch of magic..."
];

const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-light-secondary dark:bg-brand-secondary rounded-lg">
       <svg className="animate-spin-slow h-16 w-16 text-brand-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h3 className="text-xl font-semibold transition-all duration-300">{message}</h3>
      <p className="text-light-subtle dark:text-brand-subtle mt-2">The AI is analyzing, expanding, and creating variations.</p>
    </div>
  );
};

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-light-secondary dark:bg-brand-secondary rounded-lg border-2 border-dashed border-gray-300 dark:border-brand-primary/80">
    <div className="relative mb-6">
        <div className="absolute -inset-2 bg-brand-glow blur-xl rounded-full animate-pulse"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="relative h-20 w-20 text-brand-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    </div>
    <h3 className="text-2xl font-bold">Your Enhanced Prompts Will Appear Here</h3>
    <p className="text-light-subtle dark:text-brand-subtle mt-2 max-w-md">Enter a prompt, adjust the refinement controls, and click "Enhance Prompt" to see the magic happen.</p>
  </div>
);

// FIX: Define props interface for GeneratedContent component.
interface GeneratedContentProps {
  isLoading: boolean;
  error: string | null;
  output: GeneratedOutput | null;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ isLoading, error, output }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 p-6 rounded-lg text-center animate-fade-in">
        <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }
  if (!output) return <InitialState />;

  return (
    <div className="space-y-8 animate-fade-in">
      <AnalysisCard analysis={output.analysis} />
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-brand-accent tracking-wide">Generated Prompt Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromptCard title="Concise" content={output.prompt_variations.concise} />
          <PromptCard title="Detailed" content={output.prompt_variations.detailed} />
          <PromptCard title="Creative" content={output.prompt_variations.creative} />
          <PromptCard title="Persona-Driven" content={output.prompt_variations.persona_driven} />
        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;