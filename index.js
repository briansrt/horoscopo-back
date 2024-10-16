const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const credencialesRouter = require('./routes/credenciales.routes.js');
const { connectToDatabase, client } = require('./db/mongo.js');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/v1/credenciales', credencialesRouter);

// Connect to MongoDB before handling requests
let isConnected = false;

async function connectToMongo() {
  if (!isConnected) {
    try {
      await connectToDatabase();
      isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
}

// Middleware to ensure database connection before processing requests
app.use(async (req, res, next) => {
  await connectToMongo();
  next();
});

// Graceful shutdown (this won't work in Vercel's serverless environment, but keep it for local development)
if (process.env.NODE_ENV !== 'production') {
  process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  });
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Export the Express app for Vercel
module.exports = app;


