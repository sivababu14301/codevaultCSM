import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import languages
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', jsx);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

import { LanguageBadge } from './LanguageBadge';
import { ThemeSwitcher } from './ThemeSwitcher';
import { CopyCodeButton } from './CopyCodeButton';
import { DownloadButton } from './DownloadButton';
import { FullscreenViewer } from './FullscreenViewer';
import { LineNumberToggle } from './LineNumberToggle';
import { WrapText } from 'lucide-react';

interface SyntaxViewerProps {
  code: string;
  language: string;
  filename?: string;
}

export const SyntaxViewer: React.FC<SyntaxViewerProps> = ({ code, language, filename }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wrapLines, setWrapLines] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getSyntaxLanguage = (lang: string) => {
    const map: Record<string, string> = {
      'JavaScript': 'javascript',
      'Node.js': 'javascript',
      'TypeScript': 'typescript',
      'React': 'jsx',
      'Python': 'python',
      'Java': 'java',
      'C': 'c',
      'C++': 'cpp',
      'HTML': 'html',
      'CSS': 'css',
      'SQL': 'sql',
      'JSON': 'json',
      'Markdown': 'markdown'
    };
    return map[lang] || 'javascript';
  };

  return (
    <div className={`flex flex-col border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-white' : 'w-full rounded-2xl bg-white'
    }`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-slate-50 border-b border-slate-200 gap-3">
        <div className="flex items-center gap-3">
          <LanguageBadge language={language} />
          {filename && <span className="text-sm text-slate-500 font-medium">{filename}</span>}
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setWrapLines(!wrapLines)}
            className={`p-1.5 rounded-lg flex items-center gap-1.5 border transition-all ${
              wrapLines 
                ? 'bg-purple-50 border-purple-200 text-purple-600' 
                : 'bg-transparent border-transparent text-slate-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200'
            }`}
            title="Toggle Word Wrap"
          >
            <WrapText className="w-4 h-4" />
          </button>
          
          <LineNumberToggle showLineNumbers={showLineNumbers} toggleLineNumbers={() => setShowLineNumbers(!showLineNumbers)} />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <div className="w-px h-5 bg-slate-300 mx-1 hidden sm:block"></div>
          <CopyCodeButton code={code} />
          <DownloadButton code={code} language={language} filename={filename} />
          <FullscreenViewer isFullscreen={isFullscreen} toggleFullscreen={() => setIsFullscreen(!isFullscreen)} />
        </div>
      </div>

      {/* Code Area */}
      <div 
        className="flex-1 overflow-auto relative" 
        style={{ backgroundColor: theme === 'light' ? '#fafafa' : '#1e1e1e', minHeight: '300px' }}
      >
        <SyntaxHighlighter
          language={getSyntaxLanguage(language)}
          style={theme === 'light' ? oneLight : vscDarkPlus}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          wrapLongLines={wrapLines}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '14px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: theme === 'light' ? '#adb5bd' : '#6e7681',
            textAlign: 'right',
            borderRight: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
            marginRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
