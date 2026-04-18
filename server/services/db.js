const mongoose = require('mongoose');
const dns = require('dns').promises;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hckgg';
  const dbName = process.env.MONGODB_DB_NAME || undefined;
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    ...(dbName ? { dbName } : {})
  };
  try {
    if (uri.startsWith('mongodb+srv://')) {
      const hostPart = uri.replace(/^mongodb\+srv:\/\//, '').split('/')[0].split('?')[0];
      const host = hostPart.includes('@') ? hostPart.split('@')[1] : hostPart;
      const srvName = `_mongodb._tcp.${host}`;
      try {
        const records = await dns.resolveSrv(srvName);
        console.log('SRV records resolved for', host, records);
      } catch (err) {
        console.error(`SRV DNS lookup failed for ${host}:`, err && err.message ? err.message : err);
        console.error('Possible causes: local DNS blocking, VPN/firewall, or no internet connection.');
        if (process.env.MONGODB_FALLBACK === 'true') {
          const fallback = process.env.MONGODB_FALLBACK_URI || 'mongodb://127.0.0.1:27017/hckgg';
          console.log('Attempting fallback MongoDB URI:', fallback);
          await mongoose.connect(fallback, connectionOptions);
          console.log(`Connected to fallback MongoDB database: ${mongoose.connection.name}`);
          return;
        }
        throw err;
      }
    }

    console.log('Attempting mongoose.connect to', uri);
    await mongoose.connect(uri, connectionOptions);
    console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('Failed to start server', err);
    console.error('Hints:');
    console.error('- If using mongodb+srv, ensure SRV DNS lookups are allowed from your network.');
    console.error("- Option: get the 'Standard connection string' (mongodb://...) from Atlas and set it as MONGODB_URI.");
    console.error("- Set MONGODB_DB_NAME to the database name you want to see in MongoDB Compass, for example 'hckgg'.");
    console.error("- For local development, set MONGODB_FALLBACK=true and MONGODB_FALLBACK_URI='mongodb://127.0.0.1:27017/hckgg'.");
    throw err;
  }
}

module.exports = { connectDB, mongoose };
