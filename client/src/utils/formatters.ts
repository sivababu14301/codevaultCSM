export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

export const getLanguageBadgeColor = (language: string): string => {
  const lang = language.toLowerCase();
  switch (lang) {
    case 'typescript':
    case 'ts':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'javascript':
    case 'js':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'python':
    case 'py':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case 'react':
    case 'jsx':
    case 'tsx':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'html':
    case 'css':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    case 'go':
    case 'golang':
      return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
    case 'rust':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    default:
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  }
};
