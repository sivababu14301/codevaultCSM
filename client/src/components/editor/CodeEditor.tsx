import React, { useState, useRef, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorToolbar } from './EditorToolbar';
import { SaveStatus } from './AutoSaveIndicator';

interface CodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
  onChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  onSave?: (code: string, language: string) => void;
  onCancel?: () => void;
  availableLanguages?: string[];
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '', 
  initialLanguage = 'JavaScript',
  onChange,
  onLanguageChange,
  onSave,
  onCancel,
  availableLanguages
}) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);

  // Sync upwards if handlers provided
  useEffect(() => {
    if (onChange) onChange(code);
  }, [code]);

  useEffect(() => {
    if (onLanguageChange) onLanguageChange(language);
  }, [language]);
  
  // Settings State
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(false);
  const [minimap, setMinimap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const getText = () => {
    return editorRef.current?.getValue() || '';
  };

  const handleSaveClick = () => {
    if (!onSave) return;
    setSaveStatus('saving');
    setTimeout(() => {
      onSave(code, language);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const getMonacoLanguage = (lang: string) => {
    const map: Record<string, string> = {
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'React': 'javascript',
      'Node.js': 'javascript',
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
    return map[lang] || lang.toLowerCase();
  };

  return (
    <div className={`flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px] relative'
    }`}>
      <EditorToolbar 
        language={language} setLanguage={setLanguage} availableLanguages={availableLanguages}
        theme={theme} setTheme={setTheme}
        fontSize={fontSize} setFontSize={setFontSize}
        wordWrap={wordWrap} setWordWrap={setWordWrap}
        minimap={minimap} setMinimap={setMinimap}
        lineNumbers={lineNumbers} setLineNumbers={setLineNumbers}
        isFullscreen={isFullscreen} toggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        saveStatus={saveStatus} getText={getText}
      />
      
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          theme={theme}
          value={code}
          onChange={(val) => setCode(val || '')}
          onMount={handleEditorMount}
          options={{
            fontSize: fontSize,
            wordWrap: wordWrap ? 'on' : 'off',
            minimap: { enabled: minimap },
            lineNumbers: lineNumbers ? 'on' : 'off',
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-400">
              <span className="animate-pulse">Initializing Editor...</span>
            </div>
          }
        />
      </div>

      {onSave && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 z-10">
          {onCancel && (
            <button 
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleSaveClick}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
