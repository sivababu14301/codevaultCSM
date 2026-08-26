import React from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ isLoading, children, className = '', ...props }: SubmitButtonProps) {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`
        w-full relative flex items-center justify-center py-2.5 px-4 rounded-xl text-white text-sm font-bold
        bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
        shadow-[0_4px_14px_0_rgb(109,93,246,0.39)] hover:shadow-[0_6px_20px_rgba(109,93,246,0.23)]
        transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500/30
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <Loader2 className="absolute w-5 h-5 animate-spin text-white" />
        </>
      ) : (
        children
      )}
    </button>
  );
}
