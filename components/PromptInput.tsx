import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., write a marketing post about my new coffee shop"
        className="w-full h-32 p-3 bg-light-primary dark:bg-brand-primary border-2 border-light-secondary dark:border-brand-secondary rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all duration-300 resize-none text-light-text dark:text-brand-text placeholder-light-subtle dark:placeholder-brand-subtle"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="w-full flex items-center justify-center bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 hover:shadow-lg hover:shadow-brand-glow"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enhancing...
          </>
        ) : 'Enhance Prompt'}
      </button>
      <p className="text-xs text-light-subtle dark:text-brand-subtle text-center">Pro-tip: Use <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="font-sans px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd> to submit.</p>
    </div>
  );
};

export default PromptInput;