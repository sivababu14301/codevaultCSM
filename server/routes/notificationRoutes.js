const express = require('express');
const router = express.Router();
const { 
  createNotification, 
  getAdminNotifications, 
  getUserNotifications, 
  markAsRead 
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// User routes
router.route('/')
  .get(protect, getUserNotifications)
  .post(protect, admin, createNotification);

router.route('/:id/read')
  .put(protect, markAsRead);

// Admin routes
router.route('/admin/all')
  .get(protect, admin, getAdminNotifications);

module.exports = router;
