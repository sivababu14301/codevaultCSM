import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CodeEditor } from '../editor/CodeEditor';
import { Save, Folder, Plus, X, Check } from 'lucide-react';
import { TagChip } from './TagChip';
import { useCollections } from '../../hooks/useCollections';

interface SnippetFormProps {
  initialData?: {
    title: string;
    description: string;
    code: string;
    language: string;
    category: string;
    categoryId?: string;
    collectionId?: string;
    tags: string[];
    isPublic: boolean;
  };
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export const SnippetForm: React.FC<SnippetFormProps> = ({ initialData, onSubmit, isSubmitting = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [language, setLanguage] = useState(initialData?.language || 'JavaScript');
  const [category, setCategory] = useState(initialData?.category || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [collectionId, setCollectionId] = useState(initialData?.collectionId || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const { collections, addCollection } = useCollections();
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setDbCategories(res.data);
        if (res.data.length > 0 && !initialData?.categoryId) {
          setCategoryId(res.data[0].id);
          setCategory(res.data[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, [initialData]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    const newId = `col_${Date.now()}`;
    addCollection({
      name: newCollectionName.trim(),
      description: '',
      isPublic: false
    });
    setCollectionId(newId);
    setNewCollectionName('');
    setIsCreatingCollection(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, code, language, category, categoryId, collectionId, tags, isPublic });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Snippet Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                placeholder="e.g. JWT Authentication Middleware"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
                placeholder="Briefly describe what this snippet does..."
              />
            </div>
          </div>

          <div className="bg-white p-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <CodeEditor 
              initialCode={code} 
              initialLanguage={language}
              onChange={(v) => setCode(v || '')} 
              onLanguageChange={(l) => setLanguage(l || 'JavaScript')}
            />
          </div>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select 
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  const selectedCat = dbCategories.find(c => c.id === e.target.value);
                  if (selectedCat) setCategory(selectedCat.name);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              >
                {dbCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-purple-600" />
                  Collection (Optional)
                </label>
                {!isCreatingCollection && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingCollection(true)}
                    className="text-xs font-semibold text-[#6D5DF6] flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3 h-3" /> New
                  </button>
                )}
              </div>
              
              {isCreatingCollection ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Collection name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateCollection}
                    disabled={!newCollectionName.trim()}
                    className="p-2 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5b4be2] disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCollection(false);
                      setNewCollectionName('');
                    }}
                    className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <select 
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                >
                  <option value="">None</option>
                  {collections.map(col => (
                    <option key={col._id} value={col._id}>{col.name}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all mb-3"
                placeholder="Add a tag and press Enter"
              />
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <TagChip key={tag} tag={tag} onRemove={() => removeTag(tag)} />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Visibility</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="text-purple-600 focus:ring-purple-500 border-slate-300"
                  />
                  <span className="text-sm text-slate-700">Private</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="text-purple-600 focus:ring-purple-500 border-slate-300"
                  />
                  <span className="text-sm text-slate-700">Public</span>
                </label>
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Snippet</span>
              </>
            )}
          </button>
        </div>
        
      </div>
    </form>
  );
};
