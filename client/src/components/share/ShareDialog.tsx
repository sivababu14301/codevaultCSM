import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snippet } from '../../types';
import { ShareOptions } from './ShareOptions';
import { SharePreview } from './SharePreview';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: Snippet | null;
  onGenerateLink: (visibility: 'public' | 'private') => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ 
  isOpen, 
  onClose, 
  snippet,
  onGenerateLink
}) => {
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  if (!isOpen || !snippet) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[24px] shadow-xl w-full max-w-md relative overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Share Snippet</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <ShareOptions visibility={visibility} setVisibility={setVisibility} />
            <SharePreview snippet={snippet} />
            
            {/* Dummy QR Code Placeholder */}
            <div className="mt-6 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400">
              <QrCode className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm font-medium">QR Code Preview</p>
              <p className="text-xs text-center mt-1 max-w-[200px] opacity-70">
                A QR code will be generated once you create the link.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onGenerateLink(visibility);
                onClose();
              }}
              className="px-6 py-2 bg-[#6D5DF6] hover:bg-[#5b4be2] text-white font-medium rounded-xl transition-colors shadow-sm shadow-[#6D5DF6]/20"
            >
              Generate Link
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
