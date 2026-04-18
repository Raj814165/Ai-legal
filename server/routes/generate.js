const express = require('express');
const router = express.Router();
const { generateDocument } = require('../controllers/generateController');
const { requireAuth } = require('../middleware/auth');

router.post('/', requireAuth, async (req, res) => {
  try {
    const { docType, language, answers } = req.body;
    const result = await generateDocument({ user: req.user, docType, language, answers });
    res.json({ ok: true, document: result.content, savedDocument: result.savedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
