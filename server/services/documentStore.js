const Document = require('../models/Document');

function normalize(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    user: String(doc.user),
    docType: doc.docType,
    language: doc.language,
    title: doc.title,
    content: doc.content,
    answers: doc.answers,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
}

async function saveDocument({ userId, docType, language, title, content, answers }) {
  const doc = new Document({ user: userId, docType, language, title: title || '', content, answers });
  const saved = await doc.save();
  return normalize(saved);
}

async function listByUser(userId) {
  const docs = await Document.find({ user: userId }).sort({ createdAt: -1 }).exec();
  return docs.map(normalize);
}

async function getById(userId, id) {
  const doc = await Document.findOne({ _id: id, user: userId }).exec();
  return normalize(doc);
}

module.exports = { saveDocument, listByUser, getById };
