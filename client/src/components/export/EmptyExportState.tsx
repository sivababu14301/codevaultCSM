import React from 'react';
import { DownloadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyExportState: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12"
    >
      <div className="w-20 h-20 bg-[#6D5DF6]/10 rounded-[20px] flex items-center justify-center mb-6">
        <DownloadCloud className="h-10 w-10 text-[#6D5DF6]" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Nothing to export</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        You don't have any snippets available for export yet. Create some snippets first!
      </p>
    </motion.div>
  );
};
