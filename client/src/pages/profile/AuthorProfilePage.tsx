import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Link as LinkIcon, Calendar, Code2, Layers, Eye, Share2, Heart } from 'lucide-react';
import { userService } from '../../services/userService';
import { PublicProfile, Snippet } from '../../types';
import { PublicSnippetCard } from '../../components/community/PublicSnippetCard';

export const AuthorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [profileData, snippetsData] = await Promise.all([
          userService.getAuthorProfile(id),
          userService.getAuthorSnippets(id)
        ]);
        setProfile(profileData);
        setSnippets(snippetsData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
        <p className="text-slate-500 mb-6">{error || "This user doesn't exist or has been removed."}</p>
        <button
          onClick={() => navigate('/community')}
          className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
        >
          Back to Community
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar - Profile Info */}
        <div className="lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sticky top-8"
          >
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-purple-700">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
              {profile.username && (
                <p className="text-slate-500 font-medium">@{profile.username}</p>
              )}
            </div>

            {profile.bio && (
              <div className="mb-6 pb-6 border-b border-slate-100">
                <p className="text-slate-700 text-sm leading-relaxed">{profile.bio}</p>
              </div>
            )}

            <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
              {profile.location && (
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline truncate">
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <Code2 className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{profile.stats.totalSnippets}</div>
                <div className="text-xs text-slate-500 font-medium">Public Snippets</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <Eye className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{profile.stats.totalViews}</div>
                <div className="text-xs text-slate-500 font-medium">Total Views</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <Heart className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{profile.stats.totalLikes}</div>
                <div className="text-xs text-slate-500 font-medium">Total Likes</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <Share2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{profile.stats.totalShares}</div>
                <div className="text-xs text-slate-500 font-medium">Total Shares</div>
              </div>
            </div>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills & Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg border border-purple-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Content - Snippets */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-600" />
              Public Snippets
            </h2>
            <div className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
              {snippets.length}
            </div>
          </div>

          {snippets.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {snippets.map(snippet => (
                <PublicSnippetCard key={snippet._id} snippet={snippet} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No public snippets yet</h3>
              <p className="text-slate-500 text-sm">
                {profile.name} hasn't published any public snippets.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};
