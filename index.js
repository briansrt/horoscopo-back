const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const credencialesRouter = require('./routes/credenciales.routes.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/v1/credenciales', credencialesRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });
  
  // For local development
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  }
  
  module.exports = app;