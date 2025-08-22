const fs = require('fs-extra');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
const ideasPath = path.join(dataDir, 'ideas.json');

async function getIdeas() {
  await fs.ensureDir(dataDir);
  await fs.ensureFile(ideasPath);
  
  try {
    const data = await fs.readJson(ideasPath);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function saveIdeas(ideas) {
  await fs.ensureDir(dataDir);
  await fs.writeJson(ideasPath, ideas, { spaces: 2 });
}

async function getIdeaById(id) {
  const ideas = await getIdeas();
  return ideas.find(idea => idea.id === id);
}

module.exports = {
  getIdeas,
  saveIdeas,
  getIdeaById,
  dataDir,
  ideasPath
};