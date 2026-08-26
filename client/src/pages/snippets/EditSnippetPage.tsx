import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, ArrowLeft } from 'lucide-react';
import { SnippetForm } from '../../components/snippets/SnippetForm';
import { useAuth } from '../../hooks/useAuth';
import { snippetService } from '../../services/snippetService';
import { Snippet } from '../../types';

export const EditSnippetPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await snippetService.getSnippetById(id);
        
        // Ownership check
        const authorObj = typeof data.author === 'object' ? data.author : null;
        const isOwner = user && authorObj && authorObj._id === user._id;
        
        if (!isOwner) {
          setError('You are not authorized to edit this snippet.');
          setSnippet(null);
        } else {
          setSnippet(data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load snippet');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippet();
  }, [id, user]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await snippetService.updateSnippet(id, data);
      navigate(`/snippets/${id}`);
    } catch (err: any) {
      console.error('Failed to update snippet', err);
      alert(err.response?.data?.message || 'Failed to update snippet');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="text-center py-12">
        <p className="text-rose-500 font-medium mb-4">{error || 'Snippet not found'}</p>
        <button 
          onClick={() => navigate('/snippets')}
          className="text-purple-600 hover:underline"
        >
          Return to Snippets
        </button>
      </div>
    );
  }

  // Pre-fill SnippetForm initialData
  const initialData = {
    title: snippet.title,
    description: snippet.description,
    code: snippet.code,
    language: snippet.language,
    category: snippet.category,
    categoryId: snippet.categoryId,
    tags: snippet.tags || [],
    isPublic: snippet.isPublic,
    collectionId: '' // Note: Collections logic might need separate mapping if needed
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(`/snippets/${id}`)}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Edit className="w-6 h-6 text-purple-600" /> Edit Snippet
          </h1>
          <p className="text-sm text-slate-500">Modify your existing snippet details and code.</p>
        </div>
      </div>

      <SnippetForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </motion.div>
  );
};
