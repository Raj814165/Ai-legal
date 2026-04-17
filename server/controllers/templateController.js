const fs = require('fs');
const path = require('path');

function listTemplates(){
  const dir = path.join(__dirname, '..', 'templates');
  return fs.readdirSync(dir).filter(f=>f.endsWith('.txt'));
}

module.exports = { listTemplates };
