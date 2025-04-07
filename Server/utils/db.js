const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

let db;

async function connectDB() {
    await client.connect();
    db = client.db('DOAN_NT106');
    console.log('✅ MongoDB connected');
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
