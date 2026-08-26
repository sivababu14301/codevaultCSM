import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { CopyAnimation } from './CopyAnimation';

interface CopyButtonProps {
  code: string;
  onCopySuccess?: () => void;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ code, onCopySuccess, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      if (onCopySuccess) onCopySuccess();
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`relative flex items-center justify-center p-2 rounded-xl transition-all ${
        isCopied 
          ? 'bg-green-100 text-green-600 border border-green-200' 
          : 'bg-white border border-gray-200 text-gray-500 hover:bg-[#6D5DF6]/5 hover:text-[#6D5DF6] hover:border-[#6D5DF6]/30'
      } ${className}`}
      title="Copy Code"
    >
      <Copy className={`h-4 w-4 ${isCopied ? 'opacity-0' : 'opacity-100'}`} />
      <div className="absolute inset-0">
        <CopyAnimation isCopied={isCopied} />
      </div>
    </button>
  );
};
