import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ThumbsUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';

export const RecentSnippetsTable: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  const navigate = useNavigate();

  if (isLoading || !data) return <div className="p-4">Loading...</div>;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#1F2937]">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Snippets</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-purple-600 dark:text-purple-400"
          onClick={() => navigate('/admin/snippets')}
        >
          View All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-[#0B1120] border-b border-slate-100 dark:border-[#1F2937]">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Snippet</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Language</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Author</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stats</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
            {data.recentSnippets.map((snippet) => (
              <tr key={snippet.id} className="hover:bg-slate-50 dark:hover:bg-[#0B1120] transition-colors">
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                    {snippet.title}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {snippet.language}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">
                  {snippet.author}
                </td>
                <td className="py-4 px-6">
                  <Badge 
                    variant={snippet.status === 'public' ? 'success' : snippet.status === 'private' ? 'secondary' : 'danger'}
                    className="capitalize"
                  >
                    {snippet.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {snippet.views}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {snippet.likes}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors"
                    onClick={() => navigate(`/admin/snippets?review=${snippet.id}`)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
