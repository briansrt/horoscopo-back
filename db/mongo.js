const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI
//const uri = 'mongodb+srv://pocketuxdev:IwzOP4OGwzfoL8vz@cluster0.8wfjjdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client = null;
let dbConnection = null;

const connectToDatabase = async () => {
  if (dbConnection) return dbConnection;

  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Optimize connection pool settings for serverless
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 120000, // 2 minutes
      connectTimeoutMS: 5000,
    });
  }

  try {
    await client.connect();
    dbConnection = client.db('horoscopo');
    console.log('Connected to MongoDB');
    return dbConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};


module.exports = { connectToDatabase };