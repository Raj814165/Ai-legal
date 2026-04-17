// Minimal translation mapping for static UI/document labels
const mappings = {
  en: {
    'Date': 'Date'
  },
  hi: {
    'Date': 'तिथि'
  }
}

function t(key, lang='en'){
  return mappings[lang] && mappings[lang][key] ? mappings[lang][key] : key;
}

module.exports = { t }
