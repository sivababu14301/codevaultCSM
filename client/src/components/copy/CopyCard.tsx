import React from 'react';
import { motion } from 'framer-motion';
import { Snippet } from '../../types';
import { CopyButton } from './CopyButton';
import { CopyStatus } from './CopyStatus';
import { Code2 } from 'lucide-react';

interface CopyCardProps {
  snippet: Snippet;
  onCopySuccess: () => void;
}

export const CopyCard: React.FC<CopyCardProps> = ({ snippet, onCopySuccess }) => {
  // Generate random stats for demo purposes
  const mockCopyCount = Math.floor(Math.random() * 100) + 1;
  const mockLastCopied = snippet.createdAt;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 hover:shadow-md flex flex-col h-full relative overflow-hidden transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
            <Code2 className="h-4 w-4 text-[#3B82F6]" />
          </div>
          <h3 className="text-base font-bold text-gray-900 line-clamp-1" title={snippet.title}>
            {snippet.title}
          </h3>
        </div>
        <CopyButton code={snippet.code} onCopySuccess={onCopySuccess} />
      </div>

      <div className="mb-4 flex-grow relative bg-gray-900 rounded-xl p-4 border border-gray-800">
        <pre className="font-mono text-xs text-gray-300 overflow-hidden max-h-24 relative">
          <code className="whitespace-pre-wrap">{snippet.code}</code>
          {/* Gradient fade out at bottom of code block */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </pre>
      </div>

      <div className="pt-3 border-t border-gray-100 mt-auto">
        <CopyStatus copyCount={mockCopyCount} lastCopied={mockLastCopied} />
      </div>
    </motion.div>
  );
};
