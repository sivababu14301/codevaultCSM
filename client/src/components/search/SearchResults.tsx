import React from 'react';
import SnippetResultCard, { SnippetResult } from './SnippetResultCard';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResultsProps {
  results: SnippetResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {results.map((snippet) => (
          <motion.div
            key={snippet.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <SnippetResultCard snippet={snippet} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
