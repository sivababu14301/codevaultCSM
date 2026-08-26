import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, PlusCircle, FolderTree, Search, Share2, Repeat } from 'lucide-react';

const workflowSteps = [
  {
    step: 1,
    title: 'Create an Account',
    desc: 'Register and securely login to your personal CodeVault workspace.',
    icon: <UserPlus className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: 2,
    title: 'Create a Snippet',
    desc: 'Add title, programming language, description, code, tags, category, and visibility settings.',
    icon: <PlusCircle className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    step: 3,
    title: 'Organize',
    desc: 'Add snippets to Collections like folders to keep your projects neatly separated.',
    icon: <FolderTree className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    step: 4,
    title: 'Search & Manage',
    desc: 'Search, filter, edit, favorite, copy, and manage your growing snippet library.',
    icon: <Search className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600'
  },
  {
    step: 5,
    title: 'Share',
    desc: 'Make a snippet Public and share it with friends using a secure share link.',
    icon: <Share2 className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-600'
  },
  {
    step: 6,
    title: 'Reuse',
    desc: 'View, copy, or save useful public snippets into your own workspace for the future.',
    icon: <Repeat className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-600'
  }
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Code Journey
          </h2>
          <p className="text-lg text-slate-600">
            Follow these simple steps to build and manage your personal code library.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {workflowSteps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Center Icon/Number */}
                  <div className={`md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr ${item.color} text-white shadow-lg z-10 mb-6 md:mb-0`}>
                    {item.icon}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'justify-start md:pl-16' : 'justify-end md:pr-16'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 w-full md:max-w-md group">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-slate-400">STEP {item.step}</span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{item.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
