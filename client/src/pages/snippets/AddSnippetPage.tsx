import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, ArrowLeft } from 'lucide-react';
import { SnippetForm } from '../../components/snippets/SnippetForm';
import { useSnippets } from '../../hooks/useSnippets';
import { useCollections } from '../../hooks/useCollections';
import { useAuth } from '../../hooks/useAuth';

export const AddSnippetPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addSnippet } = useSnippets();
  const { addSnippetToCollection } = useCollections();
  const { user } = useAuth();
  
  const initialData = location.state?.initialData || {
    language: user?.defaultProgrammingLanguage || 'JavaScript'
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Use context to save the snippet globally
    try {
      const newSnippet = await addSnippet({
        title: data.title,
        description: data.description,
        code: data.code,
        language: data.language,
        category: data.category,
        categoryId: data.categoryId,
        tags: data.tags,
        isPublic: data.isPublic,
        author: user,
        isFavorited: false
      });
      
      // Add to collection if selected
      if (data.collectionId && newSnippet) {
        addSnippetToCollection(data.collectionId, newSnippet);
      }
      
      setIsSubmitting(false);
      navigate('/snippets');
    } catch (error) {
      console.error('Failed to create snippet', error);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/snippets')}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-600" /> Add New Snippet
          </h1>
          <p className="text-sm text-slate-500">Create a new code snippet and save it to your vault.</p>
        </div>
      </div>

      <SnippetForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={initialData} />
    </motion.div>
  );
};
