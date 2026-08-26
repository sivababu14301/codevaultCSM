const express = require('express');
const router = express.Router();
const { 
  getAllUsers, blockUser, deleteUser,
  getAllSnippets, moderateSnippet, deleteSnippetAdmin,
  getAllCategories, createCategory, updateCategory, deleteCategory,
  getAnalytics, getMostSharedReport
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Analytics Route
router.get('/analytics', protect, admin, getAnalytics);
router.get('/reports/most-shared', protect, admin, getMostSharedReport);

// User Management Routes
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/block', protect, admin, blockUser);
router.delete('/users/:id', protect, admin, deleteUser);

// Snippet Management Routes
router.get('/snippets', protect, admin, getAllSnippets);
router.put('/snippets/:id/status', protect, admin, moderateSnippet);
router.delete('/snippets/:id', protect, admin, deleteSnippetAdmin);

// Category Management Routes
router.get('/categories', protect, admin, getAllCategories);
router.post('/categories', protect, admin, createCategory);
router.put('/categories/:id', protect, admin, updateCategory);
router.delete('/categories/:id', protect, admin, deleteCategory);

module.exports = router;
