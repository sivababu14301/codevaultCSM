import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SaaSNavbar } from '../../components/common/SaaSNavbar';
import { CTASection } from '../../components/landing/CTASection';
import { Footer } from '../../components/landing/Footer';
import { FileText, FolderOpen, Bookmark, MessageSquare, CheckCircle2 } from 'lucide-react';
export const WhyCodeVaultPage: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const SectionWrapper = ({ children, id }: { children: React.ReactNode, id?: string }) => (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );

  const comparisons = [
    {
      title: 'Notepad & Text Files',
      icon: FileText,
      drawbacks: ['No syntax highlighting', 'Hard to search', 'Easily lost or deleted', 'No categorization'],
      color: 'bg-rose-50 text-rose-600',
      border: 'border-rose-100'
    },
    {
      title: 'Random Folders',
      icon: FolderOpen,
      drawbacks: ['Cluttered file system', 'No version history', 'Hard to share', 'No tags'],
      color: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100'
    },
    {
      title: 'Browser Bookmarks',
      icon: Bookmark,
      drawbacks: ['Link rot (dead links)', 'Requires internet', 'Cannot edit the code', 'Cluttered lists'],
      color: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100'
    },
    {
      title: 'Chat Messages',
      icon: MessageSquare,
      drawbacks: ['Lost in history', 'Poor formatting', 'Not searchable later', 'No organization'],
      color: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100'
    }
  ];

  const benefits = [
    'Centralized code library',
    'Fast search',
    'Organized collections',
    'Secure storage',
    'Public/private visibility',
    'Easy sharing',
    'Reusable snippets',
    'Version history'
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      {/* SaaS Navbar */}
      <SaaSNavbar
        onLoginClick={() => navigate('/login')}
        onGetStartedClick={() => navigate('/register')}
      />

      <div className="flex-grow">
        {/* Header Section */}
        <SectionWrapper>
          <div className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                Why CodeVault?
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Stop losing your best code in random places. Start building a personal, organized, and secure library.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Comparison Section */}
        <SectionWrapper>
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">The Old Way</h2>
                <p className="text-lg text-slate-600">Where good code goes to be forgotten.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {comparisons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className={`bg-white rounded-2xl p-6 border ${item.border} shadow-sm`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">{item.title}</h3>
                      <ul className="space-y-3">
                        {item.drawbacks.map((drawback, i) => (
                          <li key={i} className="flex items-start text-slate-600 text-sm">
                            <span className="mr-2 text-slate-400 mt-0.5">•</span>
                            {drawback}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* The Solution Section */}
        <SectionWrapper>
          <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl pointer-events-none" />
             
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold mb-6">The CodeVault Way</h2>
                 <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                   Everything you need to save, organize, find, and share your reusable code in one place.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                 {benefits.map((benefit, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.05 }}
                     className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-3"
                   >
                     <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                     <span className="font-medium">{benefit}</span>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </SectionWrapper>
      </div>

      {/* Call to Action Section */}
      <SectionWrapper>
        <CTASection />
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WhyCodeVaultPage;
