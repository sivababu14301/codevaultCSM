import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  getText: () => string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ getText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg border transition-colors shadow-sm flex items-center gap-1.5 text-sm font-semibold ${
        copied 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
          : 'bg-white border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50'
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};
