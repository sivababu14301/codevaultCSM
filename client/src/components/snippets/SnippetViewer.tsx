import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SnippetViewerProps {
  code: string;
  language: string;
}

export const SnippetViewer: React.FC<SnippetViewerProps> = ({ code, language }) => {
  const getSyntaxLanguage = (lang: string) => {
    const l = lang.toLowerCase();
    if (l === 'node.js') return 'javascript';
    if (l === 'c++') return 'cpp';
    if (l === 'c#') return 'csharp';
    return l;
  };

  return (
    <div className="w-full border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-[#fafafa]">
      <SyntaxHighlighter
        language={getSyntaxLanguage(language)}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '14px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          backgroundColor: 'transparent'
        }}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
