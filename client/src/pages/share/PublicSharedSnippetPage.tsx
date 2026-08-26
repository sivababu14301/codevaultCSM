import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ArrowLeft, Copy, Check } from 'lucide-react';
import { SyntaxViewer } from '../../components/syntax/SyntaxViewer';
import { Snippet } from '../../types';
import { snippetService } from '../../services/snippetService';

export const PublicSharedSnippetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedSnippet = async () => {
      try {
        const cleanId = id?.replace('-pub', '').replace('-priv', '') || '';
        const data = await snippetService.getSnippetById(cleanId);
        setSnippet(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedSnippet();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading shared snippet...</div>;
  }

  if (!snippet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-slate-800">Snippet Not Found</h1>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6D5DF6] rounded-xl flex items-center justify-center shadow-lg shadow-[#6D5DF6]/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CodeVault</h1>
              <p className="text-sm text-slate-500 font-medium">Shared Snippet</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go to App
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{snippet.title}</h2>
            <p className="text-slate-600">{snippet.description}</p>
          </div>
          <div className="p-0">
            <SyntaxViewer code={snippet.code} language={snippet.language} filename={snippet.title} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
