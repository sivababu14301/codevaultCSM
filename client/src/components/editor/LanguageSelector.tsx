import React from 'react';
import { Code2 } from 'lucide-react';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages?: string[];
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, availableLanguages }) => {
  const defaultLanguages = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 
    'Python', 'Java', 'C', 'C++', 'HTML', 'CSS', 
    'SQL', 'JSON', 'Markdown'
  ];
  
  const languages = availableLanguages && availableLanguages.length > 0 ? availableLanguages : defaultLanguages;

  return (
    <div className="flex items-center gap-2">
      <Code2 className="w-4 h-4 text-slate-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer"
      >
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
};
