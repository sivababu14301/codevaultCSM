import React from 'react';
import { Globe, Lock } from 'lucide-react';

interface ShareOptionsProps {
  visibility: 'public' | 'private';
  setVisibility: (visibility: 'public' | 'private') => void;
}

export const ShareOptions: React.FC<ShareOptionsProps> = ({ visibility, setVisibility }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Link Visibility</label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setVisibility('public')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            visibility === 'public'
              ? 'border-[#6D5DF6] bg-[#6D5DF6]/5 text-[#6D5DF6]'
              : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Globe className={`h-6 w-6 mb-2 ${visibility === 'public' ? 'text-[#6D5DF6]' : 'text-gray-400'}`} />
          <span className="font-semibold text-sm">Public</span>
          <span className="text-xs text-center mt-1 opacity-70">Anyone with the link can view</span>
        </button>

        <button
          type="button"
          onClick={() => setVisibility('private')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            visibility === 'private'
              ? 'border-[#6D5DF6] bg-[#6D5DF6]/5 text-[#6D5DF6]'
              : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Lock className={`h-6 w-6 mb-2 ${visibility === 'private' ? 'text-[#6D5DF6]' : 'text-gray-400'}`} />
          <span className="font-semibold text-sm">Private</span>
          <span className="text-xs text-center mt-1 opacity-70">Requires authentication</span>
        </button>
      </div>
    </div>
  );
};
