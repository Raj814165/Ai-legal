const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/userStore');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.user = { id: user.id, name: user.name, email: user.email };
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
