import React from 'react';
import { FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyCollectionProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyCollection: React.FC<EmptyCollectionProps> = ({ 
  title = "No collections yet", 
  description = "Create your first collection to start organizing your snippets.",
  action 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-[20px] shadow-sm border border-gray-100"
    >
      <div className="w-24 h-24 bg-[#6D5DF6]/10 rounded-full flex items-center justify-center mb-6">
        <FolderOpen className="h-10 w-10 text-[#6D5DF6]" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-8">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </motion.div>
  );
};
