import React from 'react';

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  React: '#61dafb',
  Python: '#3776ab',
  'Node.js': '#339933',
  CSS: '#1572b6',
  HTML: '#e34f26',
  Go: '#00add8',
  Rust: '#dea584',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  SQL: '#e38c00',
  Shell: '#89e051',
  JSON: '#292929',
  YAML: '#cb171e',
  Markdown: '#083fa1',
  Other: '#94a3b8' // Slate 400
};

interface LanguageBadgeProps {
  language: string;
  className?: string;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, className = '' }) => {
  const color = LANGUAGE_COLORS[language] || LANGUAGE_COLORS['Other'];

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 w-fit ${className}`}>
      <span 
        className="w-2 h-2 rounded-full shadow-sm" 
        style={{ backgroundColor: color }} 
      />
      <span className="text-xs font-semibold text-slate-700">{language}</span>
    </div>
  );
};
