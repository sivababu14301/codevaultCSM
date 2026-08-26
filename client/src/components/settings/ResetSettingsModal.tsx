import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResetSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetSettingsModal: React.FC<ResetSettingsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111827] rounded-2xl shadow-xl border border-slate-100 dark:border-[#1F2937] overflow-hidden transition-colors duration-200"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-900/30">
                <AlertTriangle className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Reset all settings?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                This action cannot be undone. All your custom preferences, editor settings, and themes will be reset to their default values.
              </p>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-[#0B1120] border-t border-slate-100 dark:border-[#1F2937] flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onClose} className="text-slate-600 dark:text-slate-400">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white shadow-md"
              >
                Reset Settings
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
