const fs = require('fs/promises');
const path = require('path');
const pool  = require('../../db/mongo');

const getAllSignos = async (req, res)=>{
    try{
        const signos =  await pool.db('horoscopo').collection('signos').find().toArray()        
        if (signos) {
            console.log("signos encontrados", signos)
          res.status(200).json({ message: 'Se consiguieron los signos' });
        } else {
            res.status(404).json({ message: 'No se consiguieron los signos' });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
      }
}

const getOneSigno = async (req, res) => {
    const signo = req.params.signo; 
    console.log("Signo recibido:", signo);

    try {
        const signoFound = await pool.db('horoscopo').collection('signos').findOne({ nombre: signo });
        if (signoFound) {
            console.log("Signo encontrado en la base de datos:", signoFound);
            res.status(200).json({ message: signoFound.texto });
        } else {
            res.status(404).json({ message: 'No se consiguieron los signos' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
};

const updateSigno = async (req, res)=>{
    const dato = req.params.signoEditar;
    const {textoEditar} = req.body;

    try {
        const signo = await pool.db('horoscopo').collection('signos').findOne({ nombre: dato });

        if (signo) {
            await pool.db('horoscopo').collection('signos').updateOne(
                { nombre: dato },
                { $set: { texto: textoEditar } }
            );
            res.status(200).json({ message: 'Texto cambiado con éxito' });
        } else {
            res.status(404).json({ message: 'Signo no encontrado' });
        }
    } catch (error) {
        console.error('Error al cambiar el signo:', error);
        res.status(500).json({ message: 'Error al cambiar el signo' });
    }
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}