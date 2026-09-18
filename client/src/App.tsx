import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnippetProvider } from './context/SnippetContext';
import { ToastProvider } from './components/ui/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { CollectionProvider } from './context/CollectionContext';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Components
import { Unauthorized } from './pages/auth/Unauthorized';
import { NotFound } from './pages/error/NotFound';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

// Pages
import { HomePage } from './pages/landing/HomePage';
import { FeaturesPage } from './pages/landing/FeaturesPage';
import { HowItWorksPage } from './pages/landing/HowItWorksPage';
import { WhyCodeVaultPage } from './pages/landing/WhyCodeVaultPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AllSnippetsPage } from './pages/snippets/AllSnippetsPage';
import { AddSnippetPage } from './pages/snippets/AddSnippetPage';
import { EditSnippetPage } from './pages/snippets/EditSnippetPage';
import { ViewSnippetPage } from './pages/snippets/ViewSnippetPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { SnippetManagement } from './pages/admin/SnippetManagement';
import { CategoryManagement } from './pages/admin/CategoryManagement';
import { ReportsAnalytics } from './pages/admin/ReportsAnalytics';
import { AdminPreferencesPage } from './pages/admin/AdminPreferencesPage';
import { CollectionsPage } from './pages/collections/CollectionsPage';
import { CollectionDetailsPage } from './pages/collections/CollectionDetailsPage';
import { FavoritesPage } from './pages/favorites/FavoritesPage';
import { SharePage } from './pages/share/SharePage';
import { ExportPage } from './pages/export/ExportPage';
import { CopyCodePage } from './pages/copy/CopyCodePage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { CategoriesPage } from './pages/categories/CategoriesPage';
import { CategoryDetailsPage } from './pages/categories/CategoryDetailsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { PublicSharedSnippetPage } from './pages/share/PublicSharedSnippetPage';
import { CommunityPage } from './pages/community/CommunityPage';
import { AuthorProfilePage } from './pages/profile/AuthorProfilePage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <SnippetProvider>
            <CollectionProvider>
              <BrowserRouter>
              <Routes>
                {/* Public Marketing Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/why-codevault" element={<WhyCodeVaultPage />} />

            {/* Public Shared Snippet Route */}
            <Route path="/s/:id" element={<PublicSharedSnippetPage />} />

            {/* Auth Routes with Main Layout */}
            <Route element={<MainLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<Navigate to="/reset-password" replace />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            </Route>

            {/* Dashboard & App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/snippets" element={<AllSnippetsPage />} />
                <Route path="/snippets/new" element={<AddSnippetPage />} />
                <Route path="/snippets/edit/:id" element={<EditSnippetPage />} />
                <Route path="/snippets/:id" element={<ViewSnippetPage />} />
                <Route path="/search" element={<AllSnippetsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:categoryName" element={<CategoryDetailsPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:id" element={<CollectionDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/share" element={<SharePage />} />
                <Route path="/export" element={<ExportPage />} />
                <Route path="/copy" element={<CopyCodePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/user/:id" element={<AuthorProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/admin/snippets" element={<SnippetManagement />} />
                <Route path="/admin/categories" element={<CategoryManagement />} />
                <Route path="/admin/reports" element={<ReportsAnalytics />} />
                <Route path="/admin/security" element={<SettingsPage />} />
                <Route path="/admin/settings" element={<AdminPreferencesPage />} />
              </Route>
            </Route>

            {/* Error Pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/403" element={<Unauthorized />} />

              {/* Catch-all Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
            </CollectionProvider>
          </SnippetProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

