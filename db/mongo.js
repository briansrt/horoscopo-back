const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI
//const uri = 'mongodb+srv://pocketuxdev:IwzOP4OGwzfoL8vz@cluster0.8wfjjdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 5000,
});

let dbConnection;

const connectToDatabase = async () => {
  if (dbConnection) return dbConnection;
  
  try {
    const connection = await client.connect();
    dbConnection = connection.db('horoscopo');
    console.log('Connected to MongoDB');
    return dbConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};


module.exports = { connectToDatabase, client };