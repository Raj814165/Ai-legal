const promptEngine = require('../services/promptEngine');

async function generateDocument({ docType, language, answers }) {
  // 1. Extract structured data via prompt engine
  const structured = await promptEngine.extractStructured({ docType, language, answers });
  // 2. Fill template
  const filled = promptEngine.fillTemplate({ docType, language, data: structured });
  return filled;
}

module.exports = { generateDocument };
