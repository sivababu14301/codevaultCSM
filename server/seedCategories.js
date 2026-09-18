const mongoose = require('mongoose');
require('dotenv').config();

const languages = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C', 'C++', 'HTML', 'CSS', 'SQL', 'JSON', 'Markdown'];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codevault').then(async () => {
  const Category = require('./models/Category');
  for (const lang of languages) {
    const exists = await Category.findOne({ name: new RegExp('^' + lang + '$', 'i') });
    if (!exists) {
      await Category.create({ name: lang, slug: lang.toLowerCase().replace(/[^a-z0-9]+/g, '-'), description: lang, status: 'active', type: 'language' });
      console.log('Added ' + lang);
    } else {
      console.log('Exists ' + lang);
    }
  }
  console.log('Seeding complete!');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
