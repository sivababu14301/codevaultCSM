import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-slate-50 dark:bg-[#0B1120] border ${
              error ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-200 dark:border-[#1F2937] focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20'
            } rounded-lg ${
              icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition focus:outline-none focus:ring-2 ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-400">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
