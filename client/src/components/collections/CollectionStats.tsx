import React from 'react';
import { FolderHeart, Hash, Clock, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface CollectionStatsProps {
  totalCollections: number;
  totalSnippets: number;
}

export const CollectionStats: React.FC<CollectionStatsProps> = ({ totalCollections, totalSnippets }) => {
  const stats = [
    {
      title: 'Total Collections',
      value: totalCollections,
      icon: <FolderHeart className="h-6 w-6 text-[#6D5DF6]" />,
      bgColor: 'bg-[#6D5DF6]/10',
    },
    {
      title: 'Total Snippets',
      value: totalSnippets,
      icon: <Hash className="h-6 w-6 text-[#3B82F6]" />,
      bgColor: 'bg-[#3B82F6]/10',
    },
    {
      title: 'Recently Active',
      value: '2',
      icon: <Clock className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Categories Used',
      value: '4',
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      bgColor: 'bg-orange-500/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
