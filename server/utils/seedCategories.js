const Category = require('../models/Category');

const defaultCategories = [
  // Programming Languages
  { name: 'C', slug: 'c', description: 'C programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#555555', bgColor: '#F3F4F6' },
  { name: 'C++', slug: 'cpp', description: 'C++ programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#f34b7d', bgColor: '#FCE7F3' },
  { name: 'Java', slug: 'java', description: 'Java programming language snippets', type: 'programming-language', isDefault: true, iconName: 'Coffee', color: '#b07219', bgColor: '#FEF3C7' },
  { name: 'Python', slug: 'python', description: 'Python programming language snippets', type: 'programming-language', isDefault: true, iconName: 'TerminalSquare', color: '#3572A5', bgColor: '#DBEAFE' },
  { name: 'JavaScript', slug: 'javascript', description: 'JavaScript programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileJson', color: '#f1e05a', bgColor: '#FEF9C3' },
  { name: 'TypeScript', slug: 'typescript', description: 'TypeScript programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode2', color: '#3178c6', bgColor: '#DBEAFE' },
  { name: 'C#', slug: 'csharp', description: 'C# programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#178600', bgColor: '#D1FAE5' },
  { name: 'Go', slug: 'go', description: 'Go programming language snippets', type: 'programming-language', isDefault: true, iconName: 'Terminal', color: '#00ADD8', bgColor: '#CCFBF1' },
  { name: 'PHP', slug: 'php', description: 'PHP programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#4F5D95', bgColor: '#E0E7FF' },
  { name: 'Ruby', slug: 'ruby', description: 'Ruby programming language snippets', type: 'programming-language', isDefault: true, iconName: 'Gem', color: '#701516', bgColor: '#FEE2E2' },
  { name: 'Kotlin', slug: 'kotlin', description: 'Kotlin programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#A97BFF', bgColor: '#F3E8FF' },
  { name: 'Swift', slug: 'swift', description: 'Swift programming language snippets', type: 'programming-language', isDefault: true, iconName: 'Smartphone', color: '#F05138', bgColor: '#FFEDD5' },
  { name: 'Rust', slug: 'rust', description: 'Rust programming language snippets', type: 'programming-language', isDefault: true, iconName: 'Cog', color: '#dea584', bgColor: '#FFEDD5' },
  { name: 'Dart', slug: 'dart', description: 'Dart programming language snippets', type: 'programming-language', isDefault: true, iconName: 'FileCode', color: '#00B4AB', bgColor: '#CCFBF1' },

  // Web Technologies
  { name: 'HTML', slug: 'html', description: 'HTML snippets', type: 'web-technology', isDefault: true, iconName: 'Globe', color: '#e34c26', bgColor: '#FFEDD5' },
  { name: 'CSS', slug: 'css', description: 'CSS snippets', type: 'web-technology', isDefault: true, iconName: 'Palette', color: '#563d7c', bgColor: '#F3E8FF' },
  { name: 'React', slug: 'react', description: 'React snippets', type: 'web-technology', isDefault: true, iconName: 'Atom', color: '#61dafb', bgColor: '#E0F2FE' },
  { name: 'Node.js', slug: 'nodejs', description: 'Node.js snippets', type: 'web-technology', isDefault: true, iconName: 'Server', color: '#026e00', bgColor: '#DCFCE7' },
  { name: 'Express.js', slug: 'express', description: 'Express.js snippets', type: 'web-technology', isDefault: true, iconName: 'Server', color: '#000000', bgColor: '#F3F4F6' },
  { name: 'Next.js', slug: 'nextjs', description: 'Next.js snippets', type: 'web-technology', isDefault: true, iconName: 'Globe', color: '#000000', bgColor: '#F3F4F6' },
  { name: 'Vue.js', slug: 'vuejs', description: 'Vue.js snippets', type: 'web-technology', isDefault: true, iconName: 'Globe', color: '#41b883', bgColor: '#D1FAE5' },
  { name: 'Angular', slug: 'angular', description: 'Angular snippets', type: 'web-technology', isDefault: true, iconName: 'Globe', color: '#dd1b16', bgColor: '#FEE2E2' },

  // Database
  { name: 'MySQL', slug: 'mysql', description: 'MySQL snippets', type: 'database', isDefault: true, iconName: 'Database', color: '#4479A1', bgColor: '#E0F2FE' },
  { name: 'PostgreSQL', slug: 'postgresql', description: 'PostgreSQL snippets', type: 'database', isDefault: true, iconName: 'Database', color: '#336791', bgColor: '#E0F2FE' },
  { name: 'MongoDB', slug: 'mongodb', description: 'MongoDB snippets', type: 'database', isDefault: true, iconName: 'Database', color: '#47A248', bgColor: '#DCFCE7' },
  { name: 'SQLite', slug: 'sqlite', description: 'SQLite snippets', type: 'database', isDefault: true, iconName: 'Database', color: '#003B57', bgColor: '#E0F2FE' },

  // Other
  { name: 'SQL', slug: 'sql', description: 'SQL snippets', type: 'other', isDefault: true, iconName: 'Database', color: '#e38c00', bgColor: '#FEF3C7' },
  { name: 'Bash', slug: 'bash', description: 'Bash scripts and commands', type: 'other', isDefault: true, iconName: 'Terminal', color: '#89e051', bgColor: '#DCFCE7' },
  { name: 'Git', slug: 'git', description: 'Git commands and snippets', type: 'other', isDefault: true, iconName: 'GitBranch', color: '#F05032', bgColor: '#FFEDD5' },
  { name: 'Docker', slug: 'docker', description: 'Dockerfiles and commands', type: 'other', isDefault: true, iconName: 'Box', color: '#2496ED', bgColor: '#E0F2FE' },
];

const seedCategories = async () => {
  try {
    for (const catData of defaultCategories) {
      const existing = await Category.findOne({ slug: catData.slug });
      if (!existing) {
        await Category.create(catData);
      } else {
        // optionally update it to ensure it's marked as default
        if (!existing.isDefault) {
          existing.isDefault = true;
          existing.type = catData.type;
          await existing.save();
        }
      }
    }
    console.log('Built-in categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

module.exports = seedCategories;
