const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../services/userStore');

function buildToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '7d' }
  );
}

function sanitizeUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

async function signup(req, res) {
  const { name, email, password } = req.body;
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPassword = String(password || '');

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  if (cleanPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  const existing = await findUserByEmail(cleanEmail);
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(cleanPassword, 10);
  const user = await createUser({ name: cleanName, email: cleanEmail, password: hashedPassword });
  const token = buildToken(user);

  return res.json({ token, user: sanitizeUser(user) });
}

async function login(req, res) {
  const { email, password } = req.body;
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPassword = String(password || '');
  const user = await findUserByEmail(cleanEmail);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(cleanPassword, user.password);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = buildToken(user);
  return res.json({ token, user: sanitizeUser(user) });
}

function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { signup, login, me };
