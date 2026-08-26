import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  code: string;
  language: string;
  filename?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ code, language, filename }) => {
  const getExtension = (lang: string) => {
    const extMap: Record<string, string> = {
      'JavaScript': '.js',
      'TypeScript': '.ts',
      'React': '.jsx',
      'Node.js': '.js',
      'Python': '.py',
      'HTML': '.html',
      'CSS': '.css',
      'Java': '.java',
      'C++': '.cpp',
      'C': '.c',
      'SQL': '.sql',
      'JSON': '.json',
      'Markdown': '.md'
    };
    return extMap[lang] || '.txt';
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (filename || 'snippet') + getExtension(language);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 border border-transparent hover:border-purple-200"
      title="Download Snippet"
    >
      <Download className="w-4 h-4" />
    </button>
  );
};
