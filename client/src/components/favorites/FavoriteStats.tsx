import React from 'react';
import { Star, Code2, Activity, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoriteStatsProps {
  totalFavorites: number;
  topLanguage: string;
  recentlyAdded: number;
  totalCategories: number;
}

export const FavoriteStats: React.FC<FavoriteStatsProps> = ({ 
  totalFavorites, 
  topLanguage, 
  recentlyAdded, 
  totalCategories 
}) => {
  const stats = [
    {
      label: 'Total Favorites',
      value: totalFavorites.toString(),
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Top Language',
      value: topLanguage || 'N/A',
      icon: <Code2 className="h-6 w-6 text-[#3B82F6]" />,
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      label: 'Recently Added',
      value: recentlyAdded.toString(),
      icon: <Activity className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-50',
    },
    {
      label: 'Categories',
      value: totalCategories.toString(),
      icon: <Hash className="h-6 w-6 text-[#6D5DF6]" />,
      bgColor: 'bg-[#6D5DF6]/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
