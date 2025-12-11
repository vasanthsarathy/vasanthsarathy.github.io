const fs = require('fs');
const path = require('path');

module.exports = function() {
  const artDir = path.join(__dirname, '../../src/assets/img/art/legally-drawn/img');

  try {
    const files = fs.readdirSync(artDir);
    const jpgFiles = files
      .filter(file => file.endsWith('.jpg'))
      .sort()
      .map(file => ({
        filename: file,
        name: file.replace('.jpg', ''),
        thumb: `/assets/img/art/legally-drawn/thumbs/${file}`,
        full: `/assets/img/art/legally-drawn/img/${file}`
      }));

    return jpgFiles;
  } catch (error) {
    console.error('Error reading art directory:', error);
    return [];
  }
};
