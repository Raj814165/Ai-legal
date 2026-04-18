const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const documentStore = require('../services/documentStore');

router.post('/', requireAuth, async (req, res) => {
  try {
    const { docType, language, content, answers, title } = req.body;
    const saved = await documentStore.saveDocument({ userId: req.user.id, docType, language, content, answers, title });
    res.json({ ok: true, document: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const docs = await documentStore.listByUser(req.user.id);
    res.json({ ok: true, documents: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await documentStore.getById(req.user.id, req.params.id);
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
