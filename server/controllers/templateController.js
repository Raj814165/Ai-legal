const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'templates');

function listTemplates() {
  return fs.readdirSync(templatesDir).filter((f) => f.endsWith('.txt'));
}

function getTemplate(docType, language = 'en') {
  const filename = `${docType}_${language}.txt`;
  const filePath = path.join(templatesDir, filename);
  if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8');

  // fallback to English template when requested language not available
  const fallback = path.join(templatesDir, `${docType}_en.txt`);
  if (fs.existsSync(fallback)) return fs.readFileSync(fallback, 'utf8');

  throw new Error('Template not found');
}

module.exports = { listTemplates, getTemplate };
