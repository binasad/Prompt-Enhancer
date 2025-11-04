import React, { useState, useCallback, useEffect } from 'react';
import { RefinementOptions, GeneratedOutput } from './types';
import { enhancePrompt } from './services/geminiService';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import RefinementControls from './components/RefinementControls';
import GeneratedContent from './components/GeneratedContent';
import HistoryToggle from './components/HistoryToggle';
import HistoryPage from './components/HistoryPage';

type Theme = 'light' | 'dark';
type View = 'main' | 'history';

const App: React.FC = () => {
  const [initialPrompt, setInitialPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedOutput | null>(null);
  
  const [refinementOptions, setRefinementOptions] = useState<RefinementOptions>({
    creativity: 50,
    structure: 50,
    addExamples: false,
    addVisuals: false,
  });

  const [useHistory, setUseHistory] = useState<boolean>(() => {
    return localStorage.getItem('prompt-perfect-useHistory') === 'true';
  });
  const [promptHistory, setPromptHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('prompt-perfect-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('prompt-perfect-theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [view, setView] = useState<View>('main');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('prompt-perfect-theme', theme);
  }, [theme]);


  useEffect(() => {
    localStorage.setItem('prompt-perfect-useHistory', String(useHistory));
    if (!useHistory) {
      localStorage.removeItem('prompt-perfect-history');
      setPromptHistory([]);
    }
  }, [useHistory]);

  const handleEnhance = useCallback(async () => {
    if (!initialPrompt.trim()) {
      setError('Please enter a prompt to enhance.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedOutput(null);

    try {
      const historyToUse = useHistory ? promptHistory : [];
      const result = await enhancePrompt(initialPrompt, refinementOptions, historyToUse);
      setGeneratedOutput(result);

      if (useHistory) {
        const updatedHistory = [initialPrompt, ...promptHistory].slice(0, 50); // Keep last 50
        setPromptHistory(updatedHistory);
        localStorage.setItem('prompt-perfect-history', JSON.stringify(updatedHistory));
      }

    } catch (e) {
      console.error(e);
      setError('Failed to enhance prompt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [initialPrompt, refinementOptions, useHistory, promptHistory]);
  
  const clearHistory = useCallback(() => {
    setPromptHistory([]);
    localStorage.removeItem('prompt-perfect-history');
  }, []);

  return (
    <div className="min-h-screen">
      {view === 'main' && <Header theme={theme} setTheme={setTheme} onNavigate={setView} />}
      {view === 'main' ? (
        <main className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4">
              <div className="bg-light-secondary dark:bg-brand-secondary rounded-xl shadow-lg p-6 space-y-8 sticky top-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-brand-accent bg-light-primary dark:bg-brand-primary p-2 rounded-md">1</span>
                    Your Prompt
                  </h2>
                  <PromptInput
                    value={initialPrompt}
                    onChange={setInitialPrompt}
                    onSubmit={handleEnhance}
                    isLoading={isLoading}
                  />
                </div>
                <div className="border-t border-gray-200 dark:border-brand-primary/50"></div>
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-brand-accent bg-light-primary dark:bg-brand-primary p-2 rounded-md">2</span>
                    Refine
                  </h2>
                  <RefinementControls 
                    options={refinementOptions}
                    setOptions={setRefinementOptions}
                  />
                </div>
                <div className="border-t border-gray-200 dark:border-brand-primary/50"></div>
                 <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-brand-accent bg-light-primary dark:bg-brand-primary p-2 rounded-md">3</span>
                    Settings
                  </h2>
                  <HistoryToggle
                    useHistory={useHistory}
                    setUseHistory={setUseHistory}
                    history={promptHistory}
                    setPrompt={setInitialPrompt}
                    onViewHistory={() => setView('history')}
                  />
                </div>
              </div>
            </aside>
            <div className="lg:col-span-8">
              <GeneratedContent 
                isLoading={isLoading}
                error={error}
                output={generatedOutput}
              />
            </div>
          </div>
        </main>
      ) : (
        <HistoryPage 
          history={promptHistory}
          onSelectPrompt={(prompt) => {
            setInitialPrompt(prompt);
            setView('main');
          }}
          onClearHistory={clearHistory}
          onBack={() => setView('main')}
        />
      )}
    </div>
  );
};

export default App;