const express = require('express');
const router = express.Router();

const genRouter = require('./generate');
const authRouter = require('./auth');
const docsRouter = require('./documents');
const templatesRouter = require('./templates');

router.use('/generate', genRouter);
router.use('/auth', authRouter);
router.use('/documents', docsRouter);
router.use('/templates', templatesRouter);

module.exports = router;
