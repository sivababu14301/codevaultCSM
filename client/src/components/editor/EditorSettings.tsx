import React, { useState, useRef, useEffect } from 'react';
import { Settings, AlignLeft, LayoutPanelLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorSettingsProps {
  wordWrap: boolean;
  setWordWrap: (val: boolean) => void;
  minimap: boolean;
  setMinimap: (val: boolean) => void;
  lineNumbers: boolean;
  setLineNumbers: (val: boolean) => void;
}

export const EditorSettings: React.FC<EditorSettingsProps> = ({
  wordWrap, setWordWrap,
  minimap, setMinimap,
  lineNumbers, setLineNumbers
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg border transition-colors shadow-sm ${
          isOpen ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Settings className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 origin-top-right"
          >
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Editor Settings</h4>
            
            <div className="space-y-1">
              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <AlignLeft className="w-4 h-4 text-slate-400" />
                  <span>Word Wrap</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={wordWrap}
                  onChange={(e) => setWordWrap(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <LayoutPanelLeft className="w-4 h-4 text-slate-400" />
                  <span>Minimap</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={minimap}
                  onChange={(e) => setMinimap(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                />
              </label>
              
              <label className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="font-mono text-slate-400 text-xs w-4 text-center">12</span>
                  <span>Line Numbers</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={lineNumbers}
                  onChange={(e) => setLineNumbers(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
