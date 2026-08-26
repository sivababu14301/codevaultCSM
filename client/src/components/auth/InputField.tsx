import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className={`w-full ${className}`}>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
        <div className="relative">
          {/* Icon (Left) */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full bg-slate-50 border px-4 py-2.5 rounded-xl text-slate-900 text-sm outline-none transition-all duration-200
              ${icon ? 'pl-11' : 'pl-4'}
              ${isPassword ? 'pr-11' : 'pr-4'}
              ${error 
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:border-slate-300'
              }
            `}
            {...props}
          />
          
          {/* Show/Hide Password Toggle (Right) */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4.5 h-4.5" />
              ) : (
                <Eye className="w-4.5 h-4.5" />
              )}
            </button>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-500"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
