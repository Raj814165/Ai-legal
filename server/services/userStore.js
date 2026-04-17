const User = require('../models/User');

async function findUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).lean();
  if (!user) return null;
  return { id: String(user._id), name: user.name, email: user.email, password: user.password };
}

async function findUserById(id) {
  if (!id) return null;
  const user = await User.findById(id).lean();
  if (!user) return null;
  return { id: String(user._id), name: user.name, email: user.email, password: user.password };
}

async function createUser({ name, email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = new User({ name: String(name || '').trim(), email: normalizedEmail, password });
  await user.save();
  return { id: String(user._id), name: user.name, email: user.email, password: user.password };
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
