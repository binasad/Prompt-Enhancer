import React from 'react';

interface HistoryPageProps {
  history: string[];
  onSelectPrompt: (prompt: string) => void;
  onClearHistory: () => void;
  onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onSelectPrompt, onClearHistory, onBack }) => {
  return (
    <main className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-light-secondary dark:bg-brand-secondary text-light-subtle dark:text-brand-subtle hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200"
            aria-label="Go back to main page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Prompt History</h2>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="bg-red-500/10 text-red-500 font-semibold py-2 px-4 rounded-md hover:bg-red-500/20 transition-colors self-end sm:self-auto"
            aria-label="Clear all prompt history"
          >
            Clear History
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-16 bg-light-secondary dark:bg-brand-secondary rounded-lg border-2 border-dashed border-gray-300 dark:border-brand-primary/80">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold mt-4">No History Found</h3>
          <p className="text-light-subtle dark:text-brand-subtle mt-2">Your refined prompts will appear here once you start using the app.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((prompt, index) => (
            <div 
              key={index}
              className="bg-light-secondary dark:bg-brand-secondary p-5 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-xl hover:ring-2 hover:ring-brand-accent"
              onClick={() => onSelectPrompt(prompt)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectPrompt(prompt)}
              role="button"
              aria-label={`Use prompt: ${prompt}`}
            >
              <p className="text-light-text dark:text-brand-text whitespace-pre-wrap">{prompt}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default HistoryPage;