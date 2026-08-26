import React from 'react';
import { Code, Bookmark, Star, Share2 } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { useCollections } from '../../hooks/useCollections';

export const ProfileStats: React.FC = () => {
  const { snippets } = useSnippets();
  const { collections } = useCollections();

  const totalSnippets = snippets.length;
  const favoritesCount = snippets.filter(s => s.isFavorited).length;
  const collectionsCount = collections.length;
  const sharedCount = snippets.filter(s => s.isPublic).length;

  const stats = [
    { label: 'Total Snippets', value: totalSnippets, icon: Code, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
    { label: 'Collections', value: collectionsCount, icon: Bookmark, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
    { label: 'Favorites', value: favoritesCount, icon: Star, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    { label: 'Shared Snippets', value: sharedCount, icon: Share2, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`bg-white rounded-2xl p-4 border ${stat.border} hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center shadow-sm`}>
            <div className={`mb-3 p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};
