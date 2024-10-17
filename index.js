const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/signos.routes.js');
const credencialesRouter = require('./routes/credenciales.routes.js');
const port = process.env.PORT;

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/v1/credenciales', credencialesRouter);

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.get('/v1/credenciales/login', (req, res) => {
    res.send('¡Hola, login!');
});

app.listen(port, ()=>{
    console.log(`listening at port http://localhost:${port}`);
})
