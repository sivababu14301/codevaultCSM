import React from 'react';

export const LanguageBadge: React.FC<{ language: string }> = ({ language }) => {
  const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-500',
      'React': 'bg-cyan-400',
      'Node.js': 'bg-green-500',
      'Python': 'bg-blue-600',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-400',
      'Java': 'bg-red-500',
      'C++': 'bg-indigo-600',
      'C': 'bg-gray-600',
      'SQL': 'bg-blue-300',
      'JSON': 'bg-yellow-200',
      'Markdown': 'bg-slate-800'
    };
    return colors[lang] || 'bg-slate-400';
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
      <span className={`w-2.5 h-2.5 rounded-full ${getLangColor(language)} shadow-sm`}></span>
      <span className="text-xs font-semibold text-slate-700">{language}</span>
    </div>
  );
};
