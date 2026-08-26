import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Tag, Layers } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CodeEditor } from '../../components/snippets/CodeEditor';
import { useSnippets } from '../../hooks/useSnippets';
import { useAuth } from '../../hooks/useAuth';

export const CreateSnippetPage: React.FC = () => {
  const navigate = useNavigate();
  const { addSnippet } = useSnippets();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [category, setCategory] = useState('React');
  const [tagsInput, setTagsInput] = useState('');
  const [code, setCode] = useState('// Write your snippet code here\nfunction helloVault() {\n  console.log("Hello from CodeVault!");\n}');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
    try {
      await addSnippet({
        title,
        description,
        code,
        language,
        category,
        tags: tags.length ? tags : ['code'],
        isPublic: true,
        author: user?.username || 'Alex Dev'
      });
      navigate('/snippets');
    } catch (error) {
      console.error('Failed to create snippet', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white border border-gray-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Snippet</h1>
          <p className="text-sm text-gray-400">Save code for quick reuse and sharing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Snippet Title"
            placeholder="e.g. Express Rate Limiter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="go">Go</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Category</label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-3.5 py-2 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="UI Components">UI Components</option>
                <option value="Database">Database</option>
                <option value="Algorithms">Algorithms</option>
              </select>
            </div>
          </div>

          <Input
            label="Tags (Comma Separated)"
            placeholder="react, auth, jwt"
            icon={<Tag className="w-4 h-4" />}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Description</label>
          <textarea
            rows={2}
            placeholder="Brief explanation of what this snippet does..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Code Content</label>
          <CodeEditor value={code} onChange={setCode} language={language} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button variant="secondary" onClick={() => navigate(-1)} type="button">
            Cancel
          </Button>
          <Button type="submit" icon={<Save className="w-4 h-4" />}>
            Save Snippet
          </Button>
        </div>
      </form>
    </div>
  );
};
