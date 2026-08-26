import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface CopyToastProps {
  isVisible: boolean;
  message?: string;
  onClose: () => void;
  duration?: number;
}

export const CopyToast: React.FC<CopyToastProps> = ({ 
  isVisible, 
  message = "Code copied to clipboard!", 
  onClose,
  duration = 2000
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-xl shadow-gray-900/20"
        >
          <div className="bg-green-500/20 text-green-400 p-1 rounded-full">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <span className="font-medium text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
