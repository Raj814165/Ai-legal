const express = require('express');
const router = express.Router();
const { generateDocument } = require('../controllers/generateController');
const { requireAuth } = require('../middleware/auth');
const documentStore = require('../services/documentStore');

router.post('/', requireAuth, async (req, res) => {
  try {
    const { docType, language, answers } = req.body;
    const result = await generateDocument({ docType, language, answers });

    // persist generated document for the user
    try {
      const saved = await documentStore.saveDocument({
        userId: req.user.id,
        docType,
        language,
        content: result,
        answers,
        title: docType
      });
      return res.json({ ok: true, document: result, saved });
    } catch (saveErr) {
      console.error('Document save failed:', saveErr);
      // still return generated document even if save fails
      return res.json({ ok: true, document: result, saved: null, saveError: saveErr.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
