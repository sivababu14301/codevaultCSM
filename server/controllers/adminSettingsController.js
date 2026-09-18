const Setting = require('../models/Setting');

// @desc    Get Admin Settings
// @route   GET /api/admin/settings
// @access  Private/Admin
const getAdminSettings = async (req, res) => {
  try {
    const settings = await Setting.find({});
    // Default fallbacks
    let defaultLanguage = 'javascript';
    let defaultTheme = 'light';
    
    const langSetting = settings.find(s => s.key === 'defaultProgrammingLanguage');
    const themeSetting = settings.find(s => s.key === 'defaultTheme');
    
    if (langSetting) {
      defaultLanguage = langSetting.value;
    } else {
      await Setting.create({ key: 'defaultProgrammingLanguage', value: 'javascript' });
    }

    if (themeSetting) {
      defaultTheme = themeSetting.value;
    } else {
      await Setting.create({ key: 'defaultTheme', value: 'light' });
    }

    res.json({
      defaultProgrammingLanguage: defaultLanguage,
      defaultTheme: defaultTheme
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update Admin Settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
const updateAdminSettings = async (req, res) => {
  try {
    const { defaultProgrammingLanguage, defaultTheme } = req.body;

    if (defaultProgrammingLanguage) {
      const langSetting = await Setting.findOne({ key: 'defaultProgrammingLanguage' });
      if (langSetting) {
        langSetting.value = defaultProgrammingLanguage;
        langSetting.markModified('value');
        await langSetting.save();
      } else {
        await Setting.create({ key: 'defaultProgrammingLanguage', value: defaultProgrammingLanguage });
      }
    }

    if (defaultTheme) {
      const themeSetting = await Setting.findOne({ key: 'defaultTheme' });
      if (themeSetting) {
        themeSetting.value = defaultTheme;
        themeSetting.markModified('value');
        await themeSetting.save();
      } else {
        await Setting.create({ key: 'defaultTheme', value: defaultTheme });
      }
    }

    res.json({
      message: 'Settings updated successfully',
      settings: {
        defaultProgrammingLanguage,
        defaultTheme
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAdminSettings,
  updateAdminSettings
};
