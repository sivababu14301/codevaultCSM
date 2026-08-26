import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Copy, 
  Check, 
  Code2, 
  Search,
  Heart,
  Share2,
  FileText
} from 'lucide-react';

export interface HeroProps {
  onGetStartedClick?: () => void;
  getStartedUrl?: string;
  loginUrl?: string;
  className?: string;
}

// Sample snippet to display in the laptop mockup code editor
const DEMO_CODE = `//  CodeVault Snippet Manager
import { useState, useEffect } from 'react';
import { CodeSnippet, VaultEngine } from '@codevault/core';

export function useSnippetVault(userId: string) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncVault() {
      const vault = new VaultEngine({ userId, encrypted: true });
      const data = await vault.fetchOrganizedSnippets();
      setSnippets(data);
      setLoading(false);
    }
    syncVault();
  }, [userId]);

  return { snippets, loading, count: snippets.length };
}
`;


export const Hero: React.FC<HeroProps> = ({
  onGetStartedClick,
  getStartedUrl = '/register',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'typescript' | 'react'>('typescript');
  const [viewMode, setViewMode] = useState<'realistic' | 'interactive'>('realistic');
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(DEMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Symmetrically Balanced Tech Badges with Zero Overlap
  const techBadges = [
    {
      name: 'React',
      icon: '⚛️',
      color: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-600',
      shadow: 'shadow-cyan-500/10',
      position: '-top-8 -left-8 sm:-top-10 sm:-left-12',
      floatDelay: 0,
    },
    {
      name: 'JavaScript',
      icon: '⚡',
      color: 'from-amber-500/10 to-yellow-500/10 border-yellow-500/30 text-amber-600',
      shadow: 'shadow-yellow-500/10',
      position: '-top-8 -right-8 sm:-top-10 sm:-right-12',
      floatDelay: 0.6,
    },
    {
      name: 'Python',
      icon: '🐍',
      color: 'from-blue-500/10 to-emerald-500/10 border-blue-500/30 text-blue-600',
      shadow: 'shadow-blue-500/10',
      position: 'top-1/3 -left-10 sm:top-1/3 sm:-left-16',
      floatDelay: 1.2,
    },
    {
      name: 'C++',
      icon: '⚙️',
      color: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/30 text-indigo-600',
      shadow: 'shadow-indigo-500/10',
      position: 'top-1/3 -right-10 sm:top-1/3 sm:-right-16',
      floatDelay: 1.8,
    },
    {
      name: 'Java',
      icon: '☕',
      color: 'from-orange-500/10 to-rose-500/10 border-orange-500/30 text-orange-600',
      shadow: 'shadow-orange-500/10',
      position: '-bottom-8 right-6 sm:-bottom-10 sm:right-10',
      floatDelay: 2.4,
    },
  ];

  return (
    <section className={`relative overflow-hidden bg-white pt-4 pb-12 lg:pt-8 lg:pb-16 ${className}`}>
      {/* Soft Ambient Background Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/50 via-indigo-200/40 to-blue-200/30 blur-3xl rounded-full opacity-70" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/40 via-cyan-100/40 to-purple-100/50 blur-3xl rounded-full opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT SIDE CONTENT ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-5 text-center lg:text-left"
          >
            {/* Small Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs sm:text-sm font-medium shadow-sm"
            >
              <Sparkles className={`w-4 h-4 text-purple-600 ${!shouldReduceMotion ? 'animate-pulse' : ''}`} />
              <span>A smarter way to organize code</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Organize Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 inline-block pb-2">
                Code.
              </span>
              <br />
              Build Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 inline-block pb-2">
                Library.
              </span>
            </motion.h1>

            {/* Short Description */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              CodeVault helps developers save, organize, search, reuse, and securely share their code snippets in one centralized workspace.
            </motion.p>

            {/* Two Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Button 1: Get Started Free (Purple Gradient) */}
              {onGetStartedClick ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onGetStartedClick}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              ) : (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={getStartedUrl}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all duration-200 flex items-center justify-center gap-2.5 group text-center"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.a>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Secure Storage
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Fast Search
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Easy Organization
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Public & Private Sharing
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT SIDE VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative mt-6 lg:mt-0 flex flex-col items-center justify-center"
          >
            {/* Outer Container for Image Mockup */}
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-6 lg:mt-0 flex justify-center">
              <motion.img 
                src="/laptop-hero.png" 
                alt="CodeVault on MacBook" 
                className="w-full h-auto object-contain scale-100 sm:scale-105 mix-blend-multiply"
                style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: shouldReduceMotion ? 0 : [-6, 6, -6] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeOut" },
                  x: { duration: 0.8, ease: "easeOut" },
                  y: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } 
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
