const mongoose = require('mongoose');

const { Schema } = mongoose;

const documentSchema = new Schema({
  userId: { type: String, required: true, index: true },
  userName: { type: String, trim: true, default: '' },
  userEmail: { type: String, trim: true, lowercase: true, default: '' },
  docType: { type: String, required: true, trim: true, index: true },
  language: { type: String, required: true, enum: ['en', 'hi'] },
  answers: { type: Schema.Types.Mixed, default: {} },
  content: { type: String, required: true }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
