const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const mongoose = require('mongoose');

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]', 'utf8');
  }
}

function readUsers() {
  ensureStore();

  try {
    const raw = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  ensureStore();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

async function findUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  // If mongoose is connected, use MongoDB
  if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
    const user = await User.findOne({ email: normalizedEmail }).lean();
    if (!user) return null;
    return { id: String(user._id), name: user.name, email: user.email, password: user.password };
  }

  // Fallback to file store
  const users = readUsers();
  const u = users.find((usr) => String(usr.email || '').trim().toLowerCase() === normalizedEmail);
  if (!u) return null;
  return { id: String(u.id), name: u.name, email: u.email, password: u.password };
}

async function findUserById(id) {
  if (!id) return null;
  // If mongoose is connected, use MongoDB
  if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
    const user = await User.findById(id).lean();
    if (!user) return null;
    return { id: String(user._id), name: user.name, email: user.email, password: user.password };
  }

  // Fallback to file store (compare as strings)
  const users = readUsers();
  const u = users.find((usr) => String(usr.id) === String(id));
  if (!u) return null;
  return { id: String(u.id), name: u.name, email: u.email, password: u.password };
}

async function createUser({ name, email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  // If mongoose is connected, use MongoDB
  if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
    const user = new User({ name: String(name || '').trim(), email: normalizedEmail, password });
    await user.save();
    return { id: String(user._id), name: user.name, email: user.email, password: user.password };
  }

  // Fallback to file store
  const users = readUsers();
  const nextId = users.length ? Math.max(...users.map((user) => Number(user.id || user._id || 0))) + 1 : 1;
  const user = {
    id: nextId,
    name: String(name || '').trim(),
    email: normalizedEmail,
    password
  };
  users.push(user);
  writeUsers(users);
  return { id: String(user.id), name: user.name, email: user.email, password: user.password };
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
