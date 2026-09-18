import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Star, Bookmark, Activity, Plus, Sparkles, MoreVertical, Share2, Copy, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import { useSnippets } from '../../hooks/useSnippets';
import { useCollections } from '../../hooks/useCollections';
import { CreateCollectionModal } from '../../components/collections/CreateCollectionModal';
import { useToast } from '../../components/ui/Toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { snippets, favoriteSnippetIds } = useSnippets();
  const { collections, addCollection } = useCollections();
  const navigate = useNavigate();
  const [activityRange, setActivityRange] = React.useState('This Week');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const { showToast } = useToast();

  const handleCreateCollection = async (data: { name: string; description: string; isPublic: boolean }) => {
    try {
      await addCollection(data);
      setIsCreateModalOpen(false);
      showToast('Collection created successfully.', 'success');
    } catch (error) {
      showToast('Failed to create collection', 'error');
      // Re-throw to let the modal know there was an error (if it handles it)
      throw error;
    }
  };

  const activityData = React.useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    snippets.forEach(s => {
      if (s.createdAt) {
        counts[new Date(s.createdAt).getDay()]++;
      }
    });
    return [
      { name: 'Mon', snippets: counts[1] },
      { name: 'Tue', snippets: counts[2] },
      { name: 'Wed', snippets: counts[3] },
      { name: 'Thu', snippets: counts[4] },
      { name: 'Fri', snippets: counts[5] },
      { name: 'Sat', snippets: counts[6] },
      { name: 'Sun', snippets: counts[0] },
    ];
  }, [snippets]);

  const topLanguages = React.useMemo(() => {
    const langCounts: Record<string, number> = {};
    snippets.forEach(s => { langCounts[s.language] = (langCounts[s.language] || 0) + 1; });
    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
    return Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count], index) => ({
        name,
        value: snippets.length > 0 ? Math.round((count / snippets.length) * 100) : 0,
        count,
        color: colors[index % colors.length]
      }));
  }, [snippets]);

  const recentSnippets = React.useMemo(() => {
    return [...snippets]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 4)
      .map(s => ({
        id: s._id, title: s.title, language: s.language,
        time: new Date(s.createdAt || Date.now()).toLocaleDateString(),
        icon: Code, color: 'text-blue-500', bg: 'bg-blue-50'
      }));
  }, [snippets]);

  const recentActivity = React.useMemo(() => {
    const activities = [
      ...snippets.map(s => ({ id: s._id, action: 'Created snippet', target: s.title, time: s.createdAt, type: 'create' })),
      ...snippets.filter(s => favoriteSnippetIds?.includes(s._id)).map(s => ({ id: s._id + '_fav', action: 'Favorited snippet', target: s.title, time: s.updatedAt || s.createdAt, type: 'favorite' })),
      ...collections.map(c => ({ id: c._id, action: 'Created collection', target: c.name, time: c.createdAt, type: 'collection' }))
    ];
    return activities
      .sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime())
      .slice(0, 4)
      .map(a => ({ ...a, timeStr: new Date(a.time || Date.now()).toLocaleDateString() }));
  }, [snippets, collections]);

  const getActivityData = () => activityData; // We just use the calculated data for all ranges for now

  const totalSnippets = snippets.length;
  const favoritesCount = favoriteSnippetIds?.length || 0;
  const collectionsCount = collections.length;
  const activityScore = (totalSnippets * 10) + (favoritesCount * 5) + (collectionsCount * 15);

  const userStatus = user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown';

  const stats = [
    { label: 'Total Snippets', value: totalSnippets, trend: '+1 new', icon: Code, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
    { label: 'Favorites', value: favoritesCount, trend: userStatus, icon: Star, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    { label: 'Collections', value: collectionsCount, trend: 'Active', icon: Bookmark, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
    { label: 'Activity Score', value: activityScore, trend: 'Growing', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "Developer"} <Sparkles className="inline-block text-yellow-400 w-6 h-6 ml-1" />
            </h1>
            <p className="text-gray-500 text-lg">Here's what's happening with your code snippets today.</p>
          </div>
        </div>
        <Link to="/snippets/new">
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Snippet</span>
          </button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-5 rounded-2xl bg-white border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          
          {/* Activity Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Activity</h2>
              <select 
                value={activityRange}
                onChange={(e) => setActivityRange(e.target.value)}
                className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="This Week">This Week</option>
                <option value="Last Week">Last Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getActivityData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSnippets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#8b5cf6', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="snippets" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSnippets)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Snippets */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Snippets</h2>
              <Link to="/snippets" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentSnippets.map((snippet) => (
                <div key={snippet.id} className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-purple-100 hover:bg-purple-50/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${snippet.bg} ${snippet.color}`}>
                      <snippet.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{snippet.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-slate-500">{snippet.language}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-xs text-slate-400">{snippet.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-purple-600 rounded-md hover:bg-white transition-colors" title="Copy code">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-purple-600 rounded-md hover:bg-white transition-colors" title="More">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Sidebar Widgets Area */}
        <motion.div variants={itemVariants} className="space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            
            <h2 className="text-lg font-bold mb-4 relative z-10">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/snippets/new')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                <Plus className="w-6 h-6 mb-2 text-purple-300" />
                <span className="text-xs font-medium">New Snippet</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateModalOpen(true)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                <Folder className="w-6 h-6 mb-2 text-blue-300" />
                <span className="text-xs font-medium">New Collection</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/share')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                <Share2 className="w-6 h-6 mb-2 text-emerald-300" />
                <span className="text-xs font-medium">Share</span>
              </motion.button>
            </div>
          </div>

          {/* Top Languages */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Top Languages</h2>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topLanguages}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {topLanguages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-slate-900">{topLanguages.length}</span>
                  <span className="block text-xs font-medium text-slate-500">Languages</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></span>
                  <span className="text-sm font-medium text-slate-700">{lang.name}</span>
                  <span className="text-xs text-slate-400 ml-auto">{lang.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                    activity.type === 'create' ? 'bg-purple-500' : activity.type === 'favorite' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}>
                    {activity.type === 'create' ? <Plus className="w-3 h-3 text-white" /> : activity.type === 'favorite' ? <Star className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-slate-100 bg-slate-50/50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{activity.action}</span>
                    </div>
                    <div className="text-slate-600 text-sm mb-2">{activity.target}</div>
                    <div className="text-xs font-medium text-slate-400">{activity.timeStr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      <CreateCollectionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreateCollection} 
      />
    </motion.div>
  );
};
