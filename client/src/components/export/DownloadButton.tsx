import React, { useState } from 'react';
import { DownloadCloud, Check, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  disabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload, disabled }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleClick = async () => {
    if (disabled || status !== 'idle') return;
    
    setStatus('processing');
    try {
      await onDownload();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || status !== 'idle'}
      className={`px-6 py-2.5 font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-w-[140px] ${
        status === 'success'
          ? 'bg-green-500 text-white shadow-green-500/20'
          : status === 'processing' || disabled
          ? 'bg-[#6D5DF6]/70 text-white cursor-not-allowed'
          : 'bg-[#6D5DF6] hover:bg-[#5b4be2] text-white shadow-[#6D5DF6]/20'
      }`}
    >
      {status === 'success' ? (
        <>
          <Check className="h-5 w-5" />
          <span>Success</span>
        </>
      ) : status === 'processing' ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <DownloadCloud className="h-5 w-5" />
          <span>Download</span>
        </>
      )}
    </button>
  );
};
