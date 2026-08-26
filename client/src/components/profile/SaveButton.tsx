import React from 'react';
import { Loader2, Check, Save } from 'lucide-react';

interface SaveButtonProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  disabled?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ isSubmitting, isSuccess, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className={`px-6 py-2.5 font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-w-[140px] ${
        isSuccess
          ? 'bg-green-500 text-white shadow-green-500/20'
          : isSubmitting || disabled
          ? 'bg-[#6D5DF6]/70 text-white cursor-not-allowed'
          : 'bg-[#6D5DF6] hover:bg-[#5b4be2] text-white shadow-[#6D5DF6]/20'
      }`}
    >
      {isSuccess ? (
        <>
          <Check className="h-4 w-4" />
          <span>Saved!</span>
        </>
      ) : isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </>
      )}
    </button>
  );
};
