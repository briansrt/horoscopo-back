const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI
//const uri = 'mongodb+srv://pocketuxdev:IwzOP4OGwzfoL8vz@cluster0.8wfjjdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let client;
let clientPromise;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!client) {
  client = new MongoClient(uri, {
    ssl: true,  // Habilita SSL
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect();
}

module.exports = clientPromise;