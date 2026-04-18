const promptEngine = require('../services/promptEngine');
const { createDocument } = require('../services/documentStore');

async function generateDocument({ user, docType, language, answers }) {
  const structured = await promptEngine.extractStructured({ docType, language, answers });
  const filled = promptEngine.fillTemplate({ docType, language, data: structured });
  const savedDocument = await createDocument({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    docType,
    language,
    answers: structured,
    content: filled
  });

  return { content: filled, savedDocument };
}

module.exports = { generateDocument };
