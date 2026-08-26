import React from 'react';
import { ListOrdered } from 'lucide-react';

interface LineNumberToggleProps {
  showLineNumbers: boolean;
  toggleLineNumbers: () => void;
}

export const LineNumberToggle: React.FC<LineNumberToggleProps> = ({ showLineNumbers, toggleLineNumbers }) => {
  return (
    <button
      onClick={toggleLineNumbers}
      className={`p-1.5 rounded-lg flex items-center gap-1.5 border transition-all ${
        showLineNumbers 
          ? 'bg-purple-50 border-purple-200 text-purple-600' 
          : 'bg-transparent border-transparent text-slate-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200'
      }`}
      title="Toggle Line Numbers"
    >
      <ListOrdered className="w-4 h-4" />
    </button>
  );
};
