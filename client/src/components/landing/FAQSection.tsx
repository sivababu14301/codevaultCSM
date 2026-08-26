import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is CodeVault?",
    answer: "CodeVault is a code snippet manager designed for students and developers. It helps you save, organize, tag, and instantly retrieve your frequently used code blocks."
  },
  {
    question: "How do I create a snippet?",
    answer: "Once logged in, click the 'New Snippet' button. You can paste your code, select the programming language, give it a title, add a description, and assign tags."
  },
  {
    question: "Can I organize snippets into collections?",
    answer: "Yes, you can create custom collections to group related snippets together, making it easier to manage code for specific projects or topics."
  },
  {
    question: "Can I make snippets public or private?",
    answer: "Absolutely. By default, your snippets are private. However, you can toggle their visibility to public if you want to share them with others."
  },
  {
    question: "Can I share snippets with friends?",
    answer: "Yes! If you set a snippet to public, you can copy its URL and share it with friends, classmates, or teammates so they can view and copy the code."
  },
  {
    question: "Which programming languages are supported?",
    answer: "CodeVault supports syntax highlighting for over 50+ programming languages, including JavaScript, TypeScript, Python, Java, C++, Go, and Rust."
  },
  {
    question: "Is my code secure?",
    answer: "Yes, security is a priority. Your private snippets remain securely stored in the database and are only accessible when you are logged into your account."
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
