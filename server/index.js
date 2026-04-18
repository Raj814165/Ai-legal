require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { connectDB } = require('./services/db');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/api', routes);

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error('Warning: DB connection failed, continuing with fallback store.', err && err.message ? err.message : err);
  }

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
