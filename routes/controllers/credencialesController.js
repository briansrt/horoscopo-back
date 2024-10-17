const fs = require('fs/promises');
const path = require('path');
const pool  = require('../../db/mongo');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');

//---------------Login---------------------

const validateCredentials = async (req, res) => {
    const datos = req.body;
    //console.log("LOGIN: ", datos);
    const hashedPassword = CryptoJS.SHA256(datos.password, process.env.CODE_SECRET_DATA).toString();
    console.log("PASSS: ", hashedPassword);
    try{
      const users =  await pool.db('horoscopo').collection('users').find().toArray()
      console.log("USERS: ", users);
      const login =  await pool.db('horoscopo').collection('users').findOne({ nombre: datos.username, pass: hashedPassword });
      if (login) {
        // Obtener la fecha y hora actual en formato Bogotá
        const currentDateTime = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        // Almacenar en la colección log_login
        await pool.db('horoscopo').collection('log_login').insertOne({ nombre: datos.username, role: login.role, date: currentDateTime });
        res.json({ status: "Bienvenido", user: datos.email, role: login.role});
      } else {
        res.json({ status: "ErrorCredenciales" });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
  };

  const changePassword = async (req, res) => {
    const datos = req.body;
    const hashedNewPassword = CryptoJS.SHA256(datos.newPassword, process.env.CODE_SECRET_DATA).toString();
    const hashedOldPassword = CryptoJS.SHA256(datos.oldPassword, process.env.CODE_SECRET_DATA).toString();
    console.log("Nueva Contraseña",hashedNewPassword);
    console.log("contraseña actual",hashedOldPassword);

    try {
        const user = await pool.db('horoscopo').collection('users').findOne({ nombre: datos.username, pass: hashedOldPassword });

        if (user) {
            await pool.db('horoscopo').collection('users').updateOne(
                { nombre: datos.username, pass: hashedOldPassword },
                { $set: { pass: hashedNewPassword } }
            );
            res.status(200).json({ message: 'Contraseña cambiada con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};


const createUser = async (req, res) => {
    const datos = req.body;
    const hashedPassword = CryptoJS.SHA256(datos.password, process.env.CODE_SECRET_DATA).toString();
    console.log("Contraseña",hashedPassword);
    try {
        const userFind = await pool.db('horoscopo').collection('users').findOne({ nombre: datos.username });
        if (userFind) {
            res.status(409).json({ message: `El usuario ${datos.username} ya está creado` });
        } else {
            await pool.db('horoscopo').collection('users').insertOne({ nombre: datos.username, pass: hashedPassword, role: datos.role });
            res.status(201).json({ message: `Usuario creado exitosamente como ${datos.role}` });
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};


module.exports = { validateCredentials, changePassword, createUser };

