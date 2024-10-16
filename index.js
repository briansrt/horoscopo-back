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

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});


