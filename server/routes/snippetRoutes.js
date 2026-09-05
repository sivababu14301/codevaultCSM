const express = require('express');
const router = express.Router();
const {
  getSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippetVersions,
  restoreSnippetVersion,
  duplicateSnippet,
  getSharedSnippet
} = require('../controllers/snippetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/shared/:id')
  .get(getSharedSnippet);

router.route('/')
  .get(protect, getSnippets)
  .post(protect, createSnippet);

router.route('/:id')
  .get(protect, getSnippetById)
  .put(protect, updateSnippet)
  .delete(protect, deleteSnippet);

router.route('/:id/duplicate')
  .post(protect, duplicateSnippet);

router.route('/:id/versions')
  .get(protect, getSnippetVersions);

router.route('/:id/versions/:versionId/restore')
  .post(protect, restoreSnippetVersion);

module.exports = router;
