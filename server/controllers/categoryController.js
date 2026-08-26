const Category = require('../models/Category');
const Snippet = require('../models/Snippet');

const getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: 'active' }).sort({ name: 1 });
    
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
        snippetCount: count
      };
    }));

    res.json(categoriesWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPublicCategories
};
