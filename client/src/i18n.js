import { useLanguage } from './contexts/LanguageContext'

const translations = {
  en: {
    brand: { title: 'Cit Legal Studio', subtitle: 'Drafts, complaints, notices, and filings' },
    nav: { features: 'Features', templates: 'Templates', process: 'Process', dashboard: 'Dashboard', login: 'Login', signup: 'Sign Up', assistant_status: 'AI assisted legal drafting' },
          logout: 'Logout',
    hero: {
      kicker: 'Legal drafting workspace for everyday cases',
      title: 'Build serious legal documents with a calmer, guided flow.',
      subtitle: 'Create notices, complaints, affidavits, RTI applications, FIR drafts, and court-ready text in a workspace that feels more like a studio than a form dump.',
      open_workspace: 'Open Workspace',
      start_drafting: 'Start Drafting',
      sign_in: 'Sign In'
    },
    dashboard: { kicker: 'Studio', title: 'Templates & Tools', subtitle: 'Open a template to start drafting or use the assistant and workspace tools to build, preview, and export documents.', start_rti: 'Start RTI', open_chat: 'Open Chat', card: { template: 'Template', open: 'Open' } },
    generator: { document_builder: 'Document Builder', language_label: 'Language', english: 'English', hindi: 'Hindi', generate_document: 'Generate Document', generating: 'Generating…', not_found_title: 'Document type not found', not_found_desc: 'Choose one of the supported legal document templates from the dashboard.' },
    preview: { live_preview: 'Live Preview', download_pdf: 'Download PDF', no_document: 'No document yet. Fill details and click Generate.' },
    chat: { assistant: 'Assistant', title: 'Chat drafting assistant', subtitle: 'Ask questions, refine facts, or get help converting answers into a draft.', welcome: 'Hello — I can help you create a formal legal document. Which template would you like to use?', ai_acknowledge: 'Thanks — I have noted this and will draft the document accordingly.' },
    sidebar: { workspace: 'Workspace', doc_badge: 'DOC' },
    landing: { ready: 'Ready to try it', cta: 'Go to Dashboard', create_account: 'Create Account' }
  },
  hi: {
    brand: { title: 'सिट लीगल स्टूडियो', subtitle: 'ड्राफ्ट, शिकायतें, नोटिस और दाखिले' },
    nav: { features: 'विशेषताएँ', templates: 'टेम्प्लेट', process: 'प्रक्रिया', dashboard: 'डैशबोर्ड', login: 'लॉगिन', signup: 'साइन अप', assistant_status: 'एआई सहायक कानूनी ड्राफ्टिंग' },
          logout: 'लॉग आउट',
    hero: {
      kicker: 'दैनिक मामलों के लिए कानूनी ड्राफ्टिंग कार्यक्षेत्र',
      title: 'सहज, मार्गदर्शित प्रवाह के साथ गंभीर कानूनी दस्तावेज़ बनाएं।',
      subtitle: 'नोटिस, शिकायतें, हलफनामे, RTI आवेदन, FIR ड्राफ्ट और कोर्ट-रेडी टेक्स्ट बनायें — स्टूडियो जैसा अनुभव।',
      open_workspace: 'वर्कस्पेस खोलें',
      start_drafting: 'ड्राफ्ट शुरू करें',
      sign_in: 'साइन इन'
    },
    dashboard: { kicker: 'स्टूडियो', title: 'टेम्पलेट और टूल्स', subtitle: 'ड्राफ्टिंग शुरू करने के लिए एक टेम्पलेट खोलें या सहायक और वर्कस्पेस टूल्स का उपयोग करें।', start_rti: 'RTI शुरू करें', open_chat: 'चैट खोलें', card: { template: 'टेम्पलेट', open: 'खोलें' } },
    generator: { document_builder: 'दस्तावेज़ बिल्डर', language_label: 'भाषा', english: 'अंग्रेज़ी', hindi: 'हिन्दी', generate_document: 'दस्तावेज़ जनरेट करें', generating: 'जनरेट हो रहा है…', not_found_title: 'दस्तावेज़ प्रकार नहीं मिला', not_found_desc: 'डैशबोर्ड से समर्थित टेम्पलेट चुनें।' },
    preview: { live_preview: 'लाइव प्रीव्यू', download_pdf: 'PDF डाउनलोड करें', no_document: 'कोई दस्तावेज़ नहीं। विवरण भरें और Generate पर क्लिक करें।' },
    chat: { assistant: 'सहायक', title: 'चैट ड्राफ्टिंग सहायक', subtitle: 'प्रश्न पूछें, तथ्य सुधारें, या उत्तरों को ड्राफ्ट में बदलने में मदद लें।', welcome: 'नमस्ते — मैं एक औपचारिक कानूनी दस्तावेज़ बनाने में आपकी मदद कर सकता/सकती हूँ। आप किस टेम्पलेट का उपयोग करना चाहेंगे?', ai_acknowledge: 'धन्यवाद — मैंने इसे नोट कर लिया है और दस्तावेज़ तैयार कर दूँगा/दूंगी।' },
    sidebar: { workspace: 'वर्कस्पेस', doc_badge: 'दस्त.' },
    landing: { ready: 'अब कोशिश करें', cta: 'डैशबोर्ड पर जाएँ', create_account: 'खाता बनाएं' }
  }
}

export function useTranslation() {
  const { language } = useLanguage()
  const t = (key) => {
    if (!key) return ''
    const parts = key.split('.')
    let node = translations[language] || translations.en
    for (const p of parts) {
      node = node?.[p]
      if (node === undefined) return key
    }
    return typeof node === 'string' ? node : key
  }
  return { t, language }
}

export default translations
