import React from 'react';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyCopyState: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-[20px] flex items-center justify-center mb-6">
        <Copy className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Code Available</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        There are currently no snippets available to copy. Try creating or importing some snippets first!
      </p>
    </motion.div>
  );
};
