import React from 'react';
import { RefinementOptions } from '../types';

interface RefinementControlsProps {
  options: RefinementOptions;
  setOptions: React.Dispatch<React.SetStateAction<RefinementOptions>>;
}

const Slider: React.FC<{ label: string; value: number; onChange: (value: number) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-light-subtle dark:text-brand-subtle">{label}</label>
      <span className="text-sm font-bold w-8 text-center">{value}</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="w-full h-2 bg-light-secondary dark:bg-brand-primary rounded-lg appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #22c55e ${value}%, transparent ${value}%)`
      }}
    />
  </div>
);

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-light-subtle dark:text-brand-subtle">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 dark:bg-brand-primary rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-accent-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent"></div>
    </label>
  </div>
);

const RefinementControls: React.FC<RefinementControlsProps> = ({ options, setOptions }) => {
  return (
    <div className="space-y-6">
      <Slider
        label="Creativity"
        value={options.creativity}
        onChange={(v) => setOptions(prev => ({ ...prev, creativity: v }))}
      />
      <Slider
        label="Structure"
        value={options.structure}
        onChange={(v) => setOptions(prev => ({ ...prev, structure: v }))}
      />
      <div className="border-t border-gray-200 dark:border-brand-primary my-4"></div>
      <div className="space-y-4">
        <Toggle
          label="Add Industry Examples"
          checked={options.addExamples}
          onChange={(c) => setOptions(prev => ({ ...prev, addExamples: c }))}
        />
        <Toggle
          label="Include Visuals/Data"
          checked={options.addVisuals}
          onChange={(c) => setOptions(prev => ({ ...prev, addVisuals: c }))}
        />
      </div>
    </div>
  );
};

export default RefinementControls;