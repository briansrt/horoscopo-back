const express = require('express');
const router = express.Router();
const { validateCredentials, changePassword, createUser } = require('./controllers/credencialesController');

router.post('/login', validateCredentials);
router.patch('/change-password', changePassword);  // Nueva ruta para cambiar contraseña
router.post('/create-user', createUser); // Nueva ruta para crear usuario


module.exports = router;
