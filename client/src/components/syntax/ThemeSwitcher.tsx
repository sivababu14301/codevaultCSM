import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1.5 border border-transparent hover:border-purple-200"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
    >
      <Palette className="w-4 h-4" />
      <span className="text-xs font-medium hidden sm:inline capitalize">{theme}</span>
    </button>
  );
};
