import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface FullscreenViewerProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const FullscreenViewer: React.FC<FullscreenViewerProps> = ({ isFullscreen, toggleFullscreen }) => {
  return (
    <button
      onClick={toggleFullscreen}
      className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 border border-transparent hover:border-purple-200"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
    </button>
  );
};
