import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CopyCodeButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg flex items-center gap-1.5 border transition-all ${
        copied 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
          : 'bg-transparent border-transparent text-slate-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200'
      }`}
      title="Copy Code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};
