import React from 'react';
import { Type, Minus, Plus } from 'lucide-react';

interface FontSizeSelectorProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ fontSize, setFontSize }) => {
  const decrease = () => setFontSize(Math.max(10, fontSize - 1));
  const increase = () => setFontSize(Math.min(32, fontSize + 1));

  return (
    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
      <Type className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
      <button 
        onClick={decrease}
        className="p-1 hover:bg-slate-200 text-slate-600 rounded transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="text-xs font-mono w-5 text-center text-slate-700">{fontSize}</span>
      <button 
        onClick={increase}
        className="p-1 hover:bg-slate-200 text-slate-600 rounded transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
