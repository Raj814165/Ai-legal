const mongoose = require('mongoose');

const { Schema } = mongoose;

const documentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  docType: { type: String, required: true },
  language: { type: String, required: true },
  title: { type: String },
  content: { type: String, required: true },
  answers: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
