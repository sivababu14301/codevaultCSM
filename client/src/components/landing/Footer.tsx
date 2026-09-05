import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Left - Logo & Description */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              CodeVault
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The ultimate snippet manager for developers. Store, organize, and instantly retrieve your reusable code snippets securely.
            </p>
          </div>

          {/* Right - Product Links Only */}
          <div className="min-w-[200px]">
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/features" className="hover:text-purple-400 transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-purple-400 transition-colors">How It Works</Link></li>
              <li><Link to="/why-codevault" className="hover:text-purple-400 transition-colors">Why CodeVault</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-sm gap-2">
          <p>© 2026 CodeVault. All Rights Reserved.</p>
          <p className="text-slate-500 text-[12px] font-normal">Developed by SIVAPRASANTH B</p>
        </div>
      </div>
    </footer>
  );
};
