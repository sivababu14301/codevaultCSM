import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Share2, 
  ArrowUpRight,
  Sparkles,
  FileCode,
  Paintbrush,
  Library,
  Lock,
  Copy
} from 'lucide-react';

export interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  accentColor: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'monaco-editor',
    icon: FileCode,
    title: 'Monaco Code Editor',
    description: 'Write code with a powerful editor built on the same core as VS Code.',
    accentColor: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'syntax-highlighting',
    icon: Paintbrush,
    title: 'Syntax Highlighting',
    description: 'Automatic code syntax highlighting supporting 50+ programming languages.',
    accentColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'smart-search',
    icon: Search,
    title: 'Smart Search & Filters',
    description: 'Instantly locate any snippet by language, category tags, or function names.',
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'collections',
    icon: Library,
    title: 'Collections',
    description: 'Group code snippets into custom collections for specific projects or topics.',
    accentColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'public-private',
    icon: Lock,
    title: 'Public & Private Snippets',
    description: 'Keep your proprietary code secure, or share open-source snippets with everyone.',
    accentColor: 'from-rose-500 to-purple-600',
  },
  {
    id: 'share-snippets',
    icon: Share2,
    title: 'Share Snippets',
    description: 'Share secure URLs with friends and teammates to access your code.',
    accentColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'copy-code',
    icon: Copy,
    title: 'One-Click Copy',
    description: 'Copy snippets directly to your clipboard to reuse them effortlessly.',
    accentColor: 'from-fuchsia-500 to-pink-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/60 relative overflow-hidden border-t border-slate-100">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs sm:text-sm font-semibold shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Built For Modern Developers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Manage Your Code
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A complete set of tools to save, organize, and reuse your personal code library.
          </motion.p>
        </div>

        {/* 8 Premium Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES_DATA.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm shadow-slate-900/5 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Purple Accent Highlight Line on Hover (Top Border Glow) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Lucide Icon Container with Purple Hover Transition */}
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:scale-110 shadow-sm group-hover:shadow-md group-hover:shadow-purple-500/30 transition-all duration-300">
                      <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:rotate-3" />
                    </div>

                    {/* Badge Pill */}
                    {feature.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-700 transition-colors">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-900 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Card Action Link / Micro-interaction Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">Explore feature</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;
