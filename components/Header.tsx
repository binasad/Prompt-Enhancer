import React from 'react';
import ThemeToggle from './ThemeToggle';

type Theme = 'light' | 'dark';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onNavigate: (view: 'main' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, onNavigate }) => {
  return (
    <header className="relative text-center p-4 sm:p-6 border-b border-light-secondary dark:border-brand-secondary/50">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button 
          onClick={() => onNavigate('history')}
          className="p-2 rounded-full bg-light-secondary dark:bg-brand-secondary text-light-subtle dark:text-brand-subtle hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="View prompt history"
          title="View prompt history"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div 
        className="flex items-center justify-center gap-2 sm:gap-4 mb-2 cursor-pointer"
        onClick={() => onNavigate('main')}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 7L12 12M12 22V12M22 7L12 12M17 4.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-accent-light" style={{ filter: 'drop-shadow(0 0 15px var(--tw-shadow-color))' }}>
            Prompt Perfect
          </span>
        </h1>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-light-subtle dark:text-brand-subtle max-w-2xl mx-auto">
        Transform your simple ideas into powerful, detailed, and creative AI prompts.
      </p>
    </header>
  );
};

export default Header;