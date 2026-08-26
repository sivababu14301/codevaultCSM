import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, CloudOff } from 'lucide-react';

export type SaveStatus = 'saved' | 'saving' | 'error' | 'idle';

interface AutoSaveIndicatorProps {
  status: SaveStatus;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-slate-500"
          >
            <span>Ready</span>
          </motion.div>
        )}
        {status === 'saving' && (
          <motion.div
            key="saving"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-blue-600"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Saving...</span>
          </motion.div>
        )}
        {status === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-emerald-600"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved</span>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-rose-600"
          >
            <CloudOff className="w-3.5 h-3.5" />
            <span>Save Failed</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
