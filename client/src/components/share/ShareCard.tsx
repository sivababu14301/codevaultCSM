import React from 'react';
import { Share2, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Snippet } from '../../types';
import { CopyLinkButton } from './CopyLinkButton';
import { LinkStatusBadge } from './LinkStatusBadge';

export interface SharedSnippetInfo {
  snippet: Snippet;
  link: string;
  isActive: boolean;
  visibility: 'public' | 'private';
}

interface ShareCardProps {
  sharedSnippet: SharedSnippetInfo;
  onRevoke: (snippetId: string) => void;
  onOpenLink: (link: string) => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({ sharedSnippet, onRevoke, onOpenLink }) => {
  const { snippet, link, isActive, visibility } = sharedSnippet;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-[20px] p-6 shadow-sm border ${
        isActive ? 'border-gray-100 hover:shadow-md' : 'border-red-100 opacity-75'
      } flex flex-col h-full relative overflow-hidden transition-all`}
    >
      {/* Top Banner / Color Accents */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isActive ? 'bg-gradient-to-r from-[#3B82F6] to-[#6D5DF6]' : 'bg-red-300'}`} />

      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#3B82F6]/10' : 'bg-red-50'}`}>
            <Share2 className={`h-5 w-5 ${isActive ? 'text-[#3B82F6]' : 'text-red-400'}`} />
          </div>
          <div>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg uppercase tracking-wider">
              {snippet.language}
            </span>
          </div>
        </div>
        
        <LinkStatusBadge isActive={isActive} />
      </div>

      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={snippet.title}>
          {snippet.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-4">
          {visibility === 'public' ? (
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <ShieldAlert className="h-3.5 w-3.5 text-yellow-500" />
          )}
          <span className="capitalize">{visibility} Link</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-between gap-2">
          <p className="text-xs text-gray-500 font-mono truncate select-all">{link}</p>
          {isActive && <CopyLinkButton link={link} />}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <button 
          onClick={() => onRevoke(snippet._id)}
          disabled={!isActive}
          className={`text-sm font-medium transition-colors ${
            isActive 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {isActive ? 'Revoke Link' : 'Revoked'}
        </button>

        {isActive && (
          <button 
            onClick={() => onOpenLink(link)}
            className="flex items-center gap-1 text-sm font-medium text-[#6D5DF6] hover:text-[#5b4be2] transition-colors p-2 hover:bg-[#6D5DF6]/5 rounded-lg"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open Link</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
