const User = require('../models/User');

function normalize(user) {
  if (!user) return null;
  return { id: String(user._id), name: user.name, email: user.email, password: user.password };
}

async function findUserByEmail(email) {
  if (!email) return null;
  const clean = String(email || '').trim().toLowerCase();
  const user = await User.findOne({ email: clean }).exec();
  return normalize(user);
}

async function findUserById(id) {
  if (!id) return null;
  try {
    const user = await User.findById(id).exec();
    return normalize(user);
  } catch (err) {
    return null;
  }
}

async function createUser({ name, email, password }) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const user = new User({ name: String(name || '').trim(), email: cleanEmail, password });
  const saved = await user.save();
  return normalize(saved);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
