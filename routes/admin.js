// Rutas de administrador

// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// importar todos los controladores de controllers/admin.js

// Crear primer endpoint de administrador que es el que nos permite mostrar un formulario para añadir un nuevo apartamento
const adminControllers = require('../controllers/admin.js');
router.get('/', adminControllers.getApartmentAdmin);
router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm);
router.post('/apartment/new-apartment', adminControllers.postNewApartment);
router.get('/apartment/:idApartment/edit', adminControllers.getEditAparmentForm);
router.get('/apartment/:idApartment/estado', adminControllers.getEstadoAparmentForm);
router.post('/apartment/edit-apartment', adminControllers.postEditApartment);
module.exports = router;