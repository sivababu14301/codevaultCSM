import React from 'react';
import { motion } from 'framer-motion';

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111827] rounded-[24px] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2937] shadow-sm mb-6 transition-colors duration-200"
    >
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-[#1F2937]">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100/50 dark:border-purple-800/30">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-slate-100/80 dark:divide-[#1F2937]/80">
        {children}
      </div>
    </motion.div>
  );
};
