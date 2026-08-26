import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Snippet } from '../../types';

interface ExportCardProps {
  snippet: Snippet;
  onExportClick: (snippet: Snippet) => void;
}

export const ExportCard: React.FC<ExportCardProps> = ({ snippet, onExportClick }) => {
  const formattedDate = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md flex flex-col h-full relative overflow-hidden transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#6D5DF6]/10 flex items-center justify-center group-hover:bg-[#6D5DF6]/20 transition-colors">
          <FileText className="h-5 w-5 text-[#6D5DF6]" />
        </div>
        <div>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg uppercase tracking-wider">
            {snippet.language}
          </span>
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={snippet.title}>
          {snippet.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2" title={snippet.description}>
          {snippet.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>

        <button 
          onClick={() => onExportClick(snippet)}
          className="flex items-center gap-2 text-sm font-medium text-white bg-[#6D5DF6] hover:bg-[#5b4be2] transition-colors px-4 py-2 rounded-xl shadow-sm shadow-[#6D5DF6]/20"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </motion.div>
  );
};
