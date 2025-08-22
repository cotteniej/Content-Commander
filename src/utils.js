const fs = require('fs-extra');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'ideas.json');

async function getIdeas() {
  await fs.ensureDir(path.dirname(dataPath));

  if (await fs.pathExists(dataPath)) {
    const txt = await fs.readFile(dataPath, 'utf8');
    if (txt.trim()) {
      try {
        const ideas = JSON.parse(txt);
        return Array.isArray(ideas) ? ideas : [];
      } catch (_) {
        return [];
      }
    }
  }
  return [];
}

module.exports = { getIdeas, dataPath };
