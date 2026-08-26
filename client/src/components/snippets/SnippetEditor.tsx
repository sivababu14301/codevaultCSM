import React from 'react';
import Editor from '@monaco-editor/react';

interface SnippetEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
}

export const SnippetEditor: React.FC<SnippetEditorProps> = ({ value, onChange, language }) => {
  // Map common languages to Monaco language IDs
  const getMonacoLanguage = (lang: string) => {
    const l = lang.toLowerCase();
    if (l === 'node.js') return 'javascript';
    if (l === 'c++') return 'cpp';
    if (l === 'c#') return 'csharp';
    return l;
  };

  return (
    <div className="w-full h-[500px] border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <Editor
        height="100%"
        language={getMonacoLanguage(language)}
        theme="light"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          roundedSelection: true,
        }}
      />
    </div>
  );
};
