const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { supportedDocTypes } = require('../config/documentTypes');

const templates = Object.fromEntries(
  supportedDocTypes.map((docType) => [
    docType,
    {
      en: fs.readFileSync(path.join(__dirname, '..', 'templates', `${docType}_en.txt`), 'utf8'),
      hi: fs.readFileSync(path.join(__dirname, '..', 'templates', `${docType}_hi.txt`), 'utf8')
    }
  ])
);

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function extractStructured({ docType, language, answers }) {
  if (!openai) return answers;

  const prompt = `Extract structured data for ${docType} in ${language}.\nInput:\n${JSON.stringify(answers)}`;
  const resp = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    max_output_tokens: 800
  });

  try {
    const text = resp.output_text || resp.output[0].content[0].text;
    return JSON.parse(text);
  } catch (e) {
    return answers;
  }
}

function fillTemplate({ docType, language, data }) {
  const tpl = templates[docType] && templates[docType][language];
  if (!tpl) throw new Error('Template not found');

  const mergedData = {
    date: new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date()),
    ...data
  };

  let out = tpl;
  Object.keys(mergedData).forEach((key) => {
    const re = new RegExp(`\\[\\[${key}\\]\\]`, 'g');
    out = out.replace(re, mergedData[key] || '');
  });

  out = out.replace(/\[\[[^\]]+\]\]/g, '');
  return out;
}

module.exports = { extractStructured, fillTemplate };
