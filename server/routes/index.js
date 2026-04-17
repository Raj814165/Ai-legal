const express = require('express');
const router = express.Router();

const genRouter = require('./generate');
const authRouter = require('./auth');

router.use('/generate', genRouter);
router.use('/auth', authRouter);

module.exports = router;
