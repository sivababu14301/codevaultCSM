import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SaaSNavbar } from '../../components/common/SaaSNavbar';
import { Hero } from '../../components/landing/Hero';
import { CTASection } from '../../components/landing/CTASection';
import { Footer } from '../../components/landing/Footer';
import { Code2, Search, Share2, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      {/* SaaS Navbar */}
      <SaaSNavbar
        onLoginClick={() => navigate('/login')}
        onGetStartedClick={() => navigate('/register')}
      />

      <div className="flex-grow">
        {/* Hero Section */}
        <div id="home">
          <Hero
            onGetStartedClick={() => navigate('/register')}
          />
        </div>

        {/* Short Feature Overview */}
        <SectionWrapper>
          <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Ultimate Code Workspace</h2>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
                Stop losing your code in random files. CodeVault provides everything you need to organize your snippets.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Write & Save', desc: 'Powerful Monaco editor with syntax highlighting.', icon: <Code2 className="w-8 h-8" /> },
                  { title: 'Find Instantly', desc: 'Smart search through your private collections.', icon: <Search className="w-8 h-8" /> },
                  { title: 'Share Easily', desc: 'Create secure links for your snippets.', icon: <Share2 className="w-8 h-8" /> }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <button 
                  onClick={() => navigate('/features')} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-purple-600 hover:border-purple-200 transition-colors shadow-sm"
                >
                  <span>Explore all features</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* Short How-It-Works Preview */}
        <SectionWrapper>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">How It Works</h2>
              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                A streamlined workflow designed to keep your code perfectly organized and instantly accessible.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">1</div>
                  <span className="font-semibold text-slate-700">Save</span>
                </div>
                <div className="hidden md:block w-16 h-0.5 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">2</div>
                  <span className="font-semibold text-slate-700">Organize</span>
                </div>
                <div className="hidden md:block w-16 h-0.5 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">3</div>
                  <span className="font-semibold text-slate-700">Reuse</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/how-it-works')} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition-colors"
              >
                <span>See the full workflow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
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

export default HomePage;
