const express = require('express');
const router = express.Router();
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  addSnippetToCollection,
  removeSnippetFromCollection
} = require('../controllers/collectionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCollections)
  .post(protect, createCollection);

router.route('/:id')
  .put(protect, updateCollection)
  .delete(protect, deleteCollection);

router.route('/:id/snippets/:snippetId')
  .post(protect, addSnippetToCollection)
  .delete(protect, removeSnippetFromCollection);

module.exports = router;
