import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SaaSNavbarProps {
  /** Logo text main part (default: "Code") */
  brandNamePrefix?: string;
  /** Logo text highlighted part (default: "Vault") */
  brandNameSuffix?: string;
  /** Custom navigation links */
  navItems?: NavItem[];
  /** Callback for Login button click */
  onLoginClick?: () => void;
  /** Callback for Get Started button click */
  onGetStartedClick?: () => void;
  /** URL for Login link (if onLoginClick is not provided) */
  loginUrl?: string;
  /** URL for Get Started link (if onGetStartedClick is not provided) */
  getStartedUrl?: string;
  /** Extra container className */
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Why CodeVault', href: '/why-codevault' },
];

export const SaaSNavbar: React.FC<SaaSNavbarProps> = ({
  brandNamePrefix = 'Code',
  brandNameSuffix = 'Vault',
  navItems = DEFAULT_NAV_ITEMS,
  onLoginClick,
  onGetStartedClick,
  loginUrl = '/login',
  getStartedUrl = '/register',
  className = '',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: shouldReduceMotion ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-100 py-3'
          : 'bg-white border-b border-slate-100/80 py-4.5'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300"
            >
              {/* Logo icon with </> */}
              <span className="font-mono font-bold text-lg tracking-tighter leading-none select-none">
                &lt;/&gt;
              </span>
            </motion.div>
            <div className="flex flex-col justify-center ml-1">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                {brandNamePrefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  {brandNameSuffix}
                </span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">
                Code Snippet Manager
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full select-none ${
                    isActive
                      ? 'text-purple-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {/* Hover capsule background animation */}
                  {isHovered && !isActive && (
                    <motion.span
                      className="absolute inset-0 bg-slate-200/50 rounded-full -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  {/* Active highlight background pill animation */}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/70 -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name}
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-purple-100 text-purple-700">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Login Button (Outlined) */}
            {onLoginClick ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLoginClick}
                className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50/50 rounded-xl transition-all duration-200 shadow-sm"
              >
                Login
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(loginUrl)}
                className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50/50 rounded-xl transition-all duration-200 shadow-sm text-center"
              >
                Login
              </motion.button>
            )}

            {/* Get Started Button (Purple Gradient) */}
            {onGetStartedClick ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGetStartedClick}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(getStartedUrl)}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 flex items-center gap-2 group text-center"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Links */}
              <div className="space-y-1">
                {navItems.map((item, i) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={item.href}
                        onClick={handleNavClick}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                {onLoginClick ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLoginClick();
                    }}
                    className="w-full py-3 text-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-purple-600 hover:text-purple-600 rounded-xl transition-all shadow-sm"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(loginUrl);
                    }}
                    className="w-full py-3 text-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-purple-600 hover:text-purple-600 rounded-xl transition-all shadow-sm block text-center"
                  >
                    Login
                  </button>
                )}

                {onGetStartedClick ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onGetStartedClick();
                    }}
                    className="w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-xl shadow-md shadow-purple-500/25 flex items-center justify-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(getStartedUrl);
                    }}
                    className="w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-xl shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 block text-center"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default SaaSNavbar;

