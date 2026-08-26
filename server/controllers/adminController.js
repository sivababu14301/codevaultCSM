const User = require('../models/User');
const Snippet = require('../models/Snippet');
const Category = require('../models/Category');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle block/unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin' || user.email.toLowerCase() === 'codevaultadmin@gmail.com') {
      return res.status(403).json({ message: 'Cannot block an admin account' });
    }

    user.status = user.status === 'suspended' ? 'active' : 'suspended';
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin' || user.email.toLowerCase() === 'codevaultadmin@gmail.com') {
      return res.status(403).json({ message: 'Cannot delete an admin account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- Snippet Management ---
const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({}).populate('author', 'name email').sort({ createdAt: -1 });
    
    // Map to admin snippet format
    const mappedSnippets = snippets.map(s => ({
      id: s._id,
      title: s.title,
      description: s.description || '',
      code: s.code || '',
      tags: s.tags || [],
      language: s.language,
      category: s.category,
      author: s.author ? s.author.name : 'Unknown User',
      authorEmail: s.author ? s.author.email : '',
      views: s.viewsCount,
      likes: s.favoritesCount,
      createdAt: s.createdAt,
      status: s.isPublic ? 'public' : 'private'
    }));

    res.json(mappedSnippets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const moderateSnippet = async (req, res) => {
  try {
    const { status } = req.body;
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Example logic: map public/private/hidden
    if (status === 'public') snippet.isPublic = true;
    else if (status === 'private') snippet.isPublic = false;
    
    await snippet.save();
    res.json({ message: 'Snippet status updated', snippet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteSnippetAdmin = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Snippet removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- Category Management ---
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    
    // get snippet counts per category
    const categoriesWithCounts = await Promise.all(categories.map(async (c) => {
      const count = await Snippet.countDocuments({ 
        $or: [{ categoryId: c._id }, { category: c.name }] 
      });
      return {
        id: c._id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        iconName: c.iconName,
        color: c.color,
        bgColor: c.bgColor,
        totalSnippets: count,
        status: c.status || 'active',
        isDefault: c.isDefault,
        createdAt: c.createdAt
      };
    }));

    res.json(categoriesWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description, iconName, color, bgColor, status } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await Category.create({
      name, slug: generatedSlug, description, iconName, color, bgColor, status: status || 'active'
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (category.isDefault) {
      return res.status(403).json({ message: 'This is a default CodeVault category. It cannot be permanently deleted.' });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- Analytics ---
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalSnippets = await Snippet.countDocuments({});
    const publicSnippets = await Snippet.countDocuments({ isPublic: true });
    const privateSnippets = await Snippet.countDocuments({ isPublic: false });
    const totalCategories = await Category.countDocuments({});

    // Recent Users
    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(10).select('-password');
    
    const mappedRecentUsers = recentUsers.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      joinedAt: u.createdAt,
      avatar: u.avatarUrl,
      snippets: 0 // Will need to map separately or ignore for recent table
    }));

    // Recent Snippets
    const recentSnippets = await Snippet.find({}).populate('author', 'name').sort({ createdAt: -1 }).limit(10);
    const mappedRecentSnippets = recentSnippets.map(s => ({
      id: s._id,
      title: s.title,
      language: s.language,
      category: s.category,
      author: s.author ? s.author.name : 'Unknown',
      views: s.viewsCount,
      likes: s.favoritesCount,
      createdAt: s.createdAt,
      status: s.isPublic ? 'public' : 'private'
    }));

    // Generate basic language distribution
    const languageStats = await Snippet.aggregate([
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // For dashboard growth (real database aggregations)
    const userGrowthAgg = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      }
    ]);
    const snippetGrowthAgg = await Snippet.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          snippets: { $sum: 1 }
        }
      }
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userGrowth = months.map((name, index) => {
      const match = userGrowthAgg.find(u => u._id === index + 1);
      return { name, users: match ? match.users : 0 };
    });
    const snippetGrowth = months.map((name, index) => {
      const match = snippetGrowthAgg.find(s => s._id === index + 1);
      return { name, snippets: match ? match.snippets : 0 };
    });

    const mostShared = await Snippet.find({ isPublic: true })
      .sort({ sharesCount: -1 })
      .limit(5)
      .select('title language sharesCount favoritesCount');

    const mostViewed = await Snippet.find({ isPublic: true })
      .sort({ viewsCount: -1 })
      .limit(5)
      .select('title language viewsCount favoritesCount');

    res.json({
      stats: {
        totalUsers,
        usersChange: 0,
        totalSnippets,
        snippetsChange: 0,
        totalCategories,
        categoriesChange: 0,
        totalReports: 0,
        reportsChange: 0,
        publicSnippets,
        privateSnippets
      },
      recentUsers: mappedRecentUsers,
      recentSnippets: mappedRecentSnippets,
      userGrowth,
      snippetGrowth,
      categoryStats: languageStats.map((s, i) => ({ 
        name: s._id, 
        count: s.count, 
        color: ['#F7DF1E', '#3178C6', '#3776AB', '#61DAFB', '#94A3B8'][i] || '#94A3B8'
      })),
      mostShared: mostShared.map(s => ({
        name: s.title,
        language: s.language,
        shares: s.sharesCount,
        likes: s.favoritesCount
      })),
      mostViewed: mostViewed.map(s => ({
        name: s.title,
        language: s.language,
        views: s.viewsCount,
        likes: s.favoritesCount
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMostSharedReport = async (req, res) => {
  try {
    const snippets = await Snippet.find({})
      .sort({ sharesCount: -1 })
      .limit(5)
      .select('title sharesCount');

    // The frontend chart expects shareCount, so we map it.
    // If it doesn't exist or is falsy, treat as 0.
    const result = snippets.map(s => ({
      title: s.title,
      shareCount: s.sharesCount || 0
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  deleteUser,
  getAllSnippets,
  moderateSnippet,
  deleteSnippetAdmin,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAnalytics,
  getMostSharedReport
};
