const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Private/Admin
exports.createNotification = async (req, res) => {
  try {
    const { recipient, title, message } = req.body;

    if (!recipient || !title || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const notification = new Notification({
      recipient,
      title,
      message,
      sender: req.user._id,
      readBy: [],
    });

    const createdNotification = await notification.save();

    res.status(201).json(createdNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating notification' });
  }
};

// @desc    Get all notifications sent by admins (for Admin History)
// @route   GET /api/notifications/admin
// @access  Private/Admin
exports.getAdminNotifications = async (req, res) => {
  try {
    // Optionally we could populate sender or recipient if needed.
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .populate('sender', 'username email');

    // Manually map recipient data if it's a specific user ObjectId
    const populatedNotifications = await Promise.all(
      notifications.map(async (n) => {
        let recipientObj = null;
        if (n.recipient !== 'ALL') {
          recipientObj = await User.findById(n.recipient).select('username email');
        }
        return {
          ...n.toObject(),
          recipientData: recipientObj || 'ALL',
        };
      })
    );

    res.json(populatedNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching admin notifications' });
  }
};

// @desc    Get notifications for the logged-in user
// @route   GET /api/notifications
// @access  Private
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { recipient: 'ALL' },
        { recipient: req.user._id.toString() }
      ]
    }).sort({ createdAt: -1 });

    // Format them for the frontend, checking if this user has read them
    const formattedNotifications = notifications.map(n => ({
      _id: n._id,
      title: n.title,
      message: n.message,
      createdAt: n.createdAt,
      isRead: n.readBy.includes(req.user._id),
      sender: n.sender,
      type: n.recipient === 'ALL' ? 'system' : 'personal'
    }));

    res.json(formattedNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching user notifications' });
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Add user ID to readBy array if not already present
    if (!notification.readBy.includes(req.user._id)) {
      notification.readBy.push(req.user._id);
      await notification.save();
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error marking notification as read' });
  }
};
