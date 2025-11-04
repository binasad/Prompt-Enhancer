import React from 'react';

interface HistoryToggleProps {
    useHistory: boolean;
    setUseHistory: (value: boolean) => void;
    history: string[];
    setPrompt: (value: string) => void;
    onViewHistory: () => void;
}

const HistoryToggle: React.FC<HistoryToggleProps> = ({ useHistory, setUseHistory, history, setPrompt, onViewHistory }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-medium text-light-subtle dark:text-brand-subtle">Context Memory</span>
                    <p className="text-sm text-light-subtle/70 dark:text-brand-subtle/70">Remember previous prompts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={useHistory} onChange={(e) => setUseHistory(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-brand-primary rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-accent-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent"></div>
                </label>
            </div>
            {useHistory && (
                <div className="animate-fade-in space-y-2 pt-2">
                    <h4 className="font-semibold text-light-subtle dark:text-brand-subtle">Recent Prompts:</h4>
                    {history.length > 0 ? (
                        <>
                            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {history.slice(0, 5).map((prompt, index) => (
                                    <li key={index} 
                                        onClick={() => setPrompt(prompt)}
                                        className="group flex items-center justify-between text-sm p-2 bg-light-primary dark:bg-brand-primary rounded-md truncate cursor-pointer hover:bg-brand-accent hover:text-white transition-colors duration-200">
                                        <span className="truncate pr-2">{prompt}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
                                    </li>
                                ))}
                            </ul>
                             <button 
                                onClick={onViewHistory}
                                className="w-full text-center text-sm font-semibold text-brand-accent hover:underline mt-2 pt-2"
                            >
                                View full history
                            </button>
                        </>
                    ) : (
                        <p className="text-sm text-light-subtle/70 dark:text-brand-subtle/70 italic p-2 bg-light-primary dark:bg-brand-primary rounded-md">No history yet. Your next prompt will be saved here.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryToggle;