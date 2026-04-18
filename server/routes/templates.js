const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', (req, res) => {
  try {
    const templates = templateController.listTemplates();
    res.json({ ok: true, templates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/:docType/:lang', (req, res) => {
  try {
    const { docType, lang } = req.params;
    const content = templateController.getTemplate(docType, lang);
    res.json({ ok: true, content });
  } catch (err) {
    console.error(err);
    res.status(404).json({ ok: false, error: err.message });
  }
});

module.exports = router;
