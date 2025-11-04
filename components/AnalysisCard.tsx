import React from 'react';
import { GeneratedOutput } from '../types';

interface AnalysisCardProps {
  analysis: GeneratedOutput['analysis'];
}

const AnalysisSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="p-4 bg-light-primary/50 dark:bg-brand-primary/50 rounded-lg">
        <div className="flex items-center mb-2">
            <div className="text-brand-accent mr-3">{icon}</div>
            <h4 className="text-md font-semibold text-brand-accent-light">{title}</h4>
        </div>
        {children}
    </div>
);

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-light-secondary dark:bg-brand-secondary p-6 rounded-lg shadow-lg animate-slide-in-up relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-accent-light"></div>
      <h2 className="text-2xl font-bold text-brand-accent mb-6 tracking-wide">AI Analysis & Expansion</h2>
      <div className="space-y-4">
        <AnalysisSection title="Inferred Intent" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        }>
            <p className="text-light-subtle dark:text-brand-subtle italic">"{analysis.inferred_intent}"</p>
        </AnalysisSection>

        <AnalysisSection title="Context Expansion" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        }>
            <ul className="list-disc list-inside space-y-1 text-light-subtle dark:text-brand-subtle">
                {analysis.context_expansion_suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </AnalysisSection>

        <AnalysisSection title="Suggested Directions" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        }>
            <div className="flex flex-wrap gap-2">
            {analysis.suggested_directions.map((direction, index) => (
                <span key={index} className="bg-light-primary dark:bg-brand-primary text-brand-accent-light text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-accent/50">
                    {direction}
                </span>
            ))}
            </div>
        </AnalysisSection>
      </div>
    </div>
  );
};

export default AnalysisCard;