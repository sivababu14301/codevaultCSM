import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

export const EmptyNotifications: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-[24px] border border-dashed border-slate-200 bg-slate-50/50"
    >
      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6">
        <Bell className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        No notifications yet
      </h3>
      <p className="text-slate-500 max-w-sm">
        You're all caught up! Check back later for updates, alerts, and new features.
      </p>
    </motion.div>
  );
};
