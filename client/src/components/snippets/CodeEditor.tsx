import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  readOnly = false
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800 text-xs text-gray-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 font-semibold text-gray-300 uppercase">{language}</span>
        </div>
        <span>{readOnly ? 'View Only' : 'Monaco Editor'}</span>
      </div>
      <div className="h-64 sm:h-80 w-full">
        <Editor
          height="100%"
          language={language.toLowerCase()}
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            readOnly,
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>
    </div>
  );
};
