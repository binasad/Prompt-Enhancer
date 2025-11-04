import React, { useState } from 'react';

interface PromptCardProps {
  title: string;
  content: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-light-secondary dark:bg-brand-secondary rounded-lg shadow-lg p-5 flex flex-col h-full animate-slide-in-up transform transition-all duration-300 hover:shadow-2xl hover:shadow-brand-glow hover:-translate-y-1 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-light-subtle dark:text-brand-subtle hover:text-brand-accent transition-colors duration-200 p-1 rounded-full hover:bg-light-primary dark:hover:bg-brand-primary"
          title="Copy prompt"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-grow bg-light-primary dark:bg-brand-primary p-4 rounded-md text-light-subtle dark:text-brand-subtle text-sm whitespace-pre-wrap overflow-auto">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PromptCard;