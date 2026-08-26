import React from 'react';
import { Filter } from 'lucide-react';

interface SnippetFilterProps {
  languageFilter: string;
  visibilityFilter: string;
  categoryFilter: string;
  onLanguageChange: (lang: string) => void;
  onVisibilityChange: (vis: string) => void;
  onCategoryChange: (cat: string) => void;
}

export const SnippetFilter: React.FC<SnippetFilterProps> = ({
  languageFilter,
  visibilityFilter,
  categoryFilter,
  onLanguageChange,
  onVisibilityChange,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mr-2">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">Filters:</span>
      </div>
      
      <select
        value={languageFilter}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="block pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      >
        <option value="all">All Languages</option>
        <option value="TypeScript">TypeScript</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Go">Go</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="YAML">YAML</option>
      </select>

      <select
        value={visibilityFilter}
        onChange={(e) => onVisibilityChange(e.target.value)}
        className="block pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      >
        <option value="all">All Status</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="flagged">Flagged</option>
        <option value="hidden">Hidden</option>
        <option value="approved">Approved</option>
      </select>
      
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="block pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      >
        <option value="all">All Categories</option>
        <option value="Hooks">Hooks</option>
        <option value="Middleware">Middleware</option>
        <option value="Data Science">Data Science</option>
        <option value="Backend">Backend</option>
        <option value="Auth">Auth</option>
        <option value="API">API</option>
        <option value="Security">Security</option>
        <option value="UI">UI</option>
        <option value="DevOps">DevOps</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};
