import { useContext } from 'react';
import { SnippetContext } from '../context/SnippetContext';

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error('useSnippets must be used within a SnippetProvider');
  }
  return context;
};
