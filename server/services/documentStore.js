const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Document = require('../models/Document');

const dataDir = path.join(__dirname, '..', 'data');
const documentsFile = path.join(dataDir, 'documents.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(documentsFile)) {
    fs.writeFileSync(documentsFile, '[]', 'utf8');
  }
}

function readDocuments() {
  ensureStore();

  try {
    const raw = fs.readFileSync(documentsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    return [];
  }
}

function writeDocuments(documents) {
  ensureStore();
  fs.writeFileSync(documentsFile, JSON.stringify(documents, null, 2), 'utf8');
}

async function createDocument({ userId, userName, userEmail, docType, language, answers, content }) {
  const normalizedEmail = String(userEmail || '').trim().toLowerCase();

  if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
    const document = new Document({
      userId: String(userId),
      userName: String(userName || '').trim(),
      userEmail: normalizedEmail,
      docType: String(docType || '').trim(),
      language: String(language || '').trim(),
      answers: answers || {},
      content: String(content || '')
    });
    await document.save();
    return {
      id: String(document._id),
      userId: document.userId,
      userName: document.userName,
      userEmail: document.userEmail,
      docType: document.docType,
      language: document.language,
      answers: document.answers,
      content: document.content,
      createdAt: document.createdAt
    };
  }

  const documents = readDocuments();
  const nextId = documents.length ? Math.max(...documents.map((document) => Number(document.id || document._id || 0))) + 1 : 1;
  const document = {
    id: nextId,
    userId: String(userId),
    userName: String(userName || '').trim(),
    userEmail: normalizedEmail,
    docType: String(docType || '').trim(),
    language: String(language || '').trim(),
    answers: answers || {},
    content: String(content || ''),
    createdAt: new Date().toISOString()
  };
  documents.push(document);
  writeDocuments(documents);
  return document;
}

module.exports = {
  createDocument
};
