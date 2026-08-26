import React from 'react';
import { Code2, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-800/80 bg-gray-950/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span>CodeVault MERN — Built with</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>for Developers</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
            <Github className="w-4 h-4" /> GitHub Repository
          </a>
          <span>© 2026 CodeVault</span>
        </div>
      </div>
    </footer>
  );
};
