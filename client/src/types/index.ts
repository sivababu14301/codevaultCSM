export interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  status?: 'active' | 'suspended';
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
  pinnedSnippets?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicProfile {
  _id: string;
  name: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  skills?: string[];
  createdAt: string;
  stats: {
    totalSnippets: number;
    totalViews: number;
    totalShares: number;
    totalLikes: number;
  };
}

export interface Snippet {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  category: string;
  categoryId?: string;
  isPublic: boolean;
  author: User | string;
  currentVersion?: number;
  favoritesCount: number;
  sharesCount: number;
  isFavorited?: boolean;
  viewsCount: number;
  forksCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetVersion {
  _id: string;
  snippetId: string;
  versionNumber: number;
  title: string;
  description: string;
  code: string;
  language: string;
  changeDescription: string;
  updatedBy: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  _id: string;
  userId: string;
  snippetId: Snippet;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  _id: string;
  snippetId: string;
  reportedBy: User | string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  count: number;
}

export interface Collection {
  _id: string;
  name: string;
  description?: string;
  snippets: Snippet[] | string[];
  user: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query?: string;
  search?: string;
  language?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'views' | 'title';
  page?: number;
  limit?: number;
  visibility?: 'all' | 'public' | 'private';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
