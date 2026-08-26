import React from 'react';

export const AnalyticsHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Reports & Analytics
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mt-1">
        Track platform performance, user engagement, and snippet statistics.
      </p>
    </div>
  );
};
