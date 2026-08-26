import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface CopyAnimationProps {
  isCopied: boolean;
}

export const CopyAnimation: React.FC<CopyAnimationProps> = ({ isCopied }) => {
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-green-100 rounded-lg text-green-600 z-10"
          >
            <Check className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
