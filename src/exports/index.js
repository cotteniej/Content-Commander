const fs = require('fs-extra');
const path = require('path');
const configUtil = require('../config');

// Export formats
const formats = {
  markdown: require('./markdown'),
  html: require('./html'),
  text: require('./text')
};

// Get the export directory
function getExportDir() {
  return path.join(process.cwd(), configUtil.get('export.outputDir', 'exports'));
}

// Export content idea with outline
async function exportIdea(idea, outline, format = 'markdown') {
  // Create exports directory if it doesn't exist
  const exportDir = getExportDir();
  await fs.ensureDir(exportDir);
  
  // Get the appropriate formatter
  const formatter = formats[format.toLowerCase()] || formats.markdown;
  
  // Format the content
  const content = formatter.format(idea, outline);
  
  // Create a filename
  const filename = idea.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const extension = formatter.extension;
  const fullPath = path.join(exportDir, `${filename}-${idea.id}.${extension}`);
  
  // Write the file
  await fs.writeFile(fullPath, content, 'utf8');
  
  return fullPath;
}

module.exports = {
  exportIdea,
  getExportDir,
  formats
};