const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const credencialesRouter = require('./routes/credenciales.routes.js');
require('dotenv').config();
const pool = require('./db/mongo');
const cors = require('cors');
const port = process.env.PORT;

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/v1/credenciales', credencialesRouter);

app.listen(port, ()=>{
    console.log('listening at port http://localhost:${port}');
})


