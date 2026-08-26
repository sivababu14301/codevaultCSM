const express = require('express');
const router = express.Router();
const {
  getCommunitySnippets,
  incrementView,
  incrementShare,
  reportSnippet
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/snippets')
  .get(protect, getCommunitySnippets);

router.route('/snippets/:id/view')
  .post(protect, incrementView);

router.route('/snippets/:id/share')
  .post(protect, incrementShare);

router.route('/snippets/:id/report')
  .post(protect, reportSnippet);

module.exports = router;
