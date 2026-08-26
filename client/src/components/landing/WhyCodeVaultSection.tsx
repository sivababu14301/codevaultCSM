import React from 'react';
import { motion } from 'framer-motion';
import { Lock, FolderTree, Search, Share2 } from 'lucide-react';

const reasons = [
  {
    icon: Lock,
    title: 'Secure',
    description: "Protect your snippets with secure authentication, JWT-based sessions, bcrypt password hashing, and protected routes.",
    color: 'text-rose-600',
    bgColor: 'bg-rose-50'
  },
  {
    icon: FolderTree,
    title: 'Organized',
    description: "Keep your code structured using collections, categories, tags, and favorites.",
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Search,
    title: 'Easy to Find',
    description: "Quickly find your snippets using search, language filters, category filters, tags, and sorting.",
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    icon: Share2,
    title: 'Shareable',
    description: "Choose public or private visibility and share public snippets with friends using shareable links.",
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export const WhyCodeVaultSection: React.FC = () => {
  return (
    <section id="why-codevault" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why CodeVault?
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to save, organize, find, and share your reusable code in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-full ${reason.bgColor} ${reason.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {reason.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCodeVaultSection;
