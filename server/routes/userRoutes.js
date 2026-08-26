const express = require('express');
const router = express.Router();
const { getAuthorProfile, getAuthorSnippets, togglePinSnippet } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes for user profiles
router.get('/:id', getAuthorProfile);
router.get('/:id/snippets', getAuthorSnippets);

// Protected routes
router.post('/pin/:id', protect, togglePinSnippet);

module.exports = router;
