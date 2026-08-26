import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SaaSNavbar } from '../../components/common/SaaSNavbar';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { CTASection } from '../../components/landing/CTASection';
import { Footer } from '../../components/landing/Footer';

export const FeaturesPage: React.FC = () => {
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-500 selection:text-white">
      {/* SaaS Navbar */}
      <SaaSNavbar
        onLoginClick={() => navigate('/login')}
        onGetStartedClick={() => navigate('/register')}
      />

      {/* Features Section */}
      <div className="pt-16">
        <SectionWrapper>
          <FeaturesSection />
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

export default FeaturesPage;
