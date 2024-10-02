const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const credencialesRouter = require('./routes/credenciales.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors({
    origin: 'https://horoscopo-front.vercel.app', // Especifica tu dominio frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true
}))
app.use('/v1/signos', router);
app.use('/v1/credenciales', credencialesRouter);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})


