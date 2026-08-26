import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({ isFullscreen, toggleFullscreen }) => {
  return (
    <button
      onClick={toggleFullscreen}
      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-colors shadow-sm"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
    </button>
  );
};
