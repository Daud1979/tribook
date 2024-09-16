// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index.js');
const adminControllers = require('../controllers/admin.js');
// Router funciona igual que el "app" para crear los endpoints. Nos permite definir un conjunto arbitrario de rutas
router.get('/', indexControllers.getApartments);
router.get('/apartment/:idApartment', indexControllers.getApartmentById);
router.get('/apartment/:idApartment/edit', adminControllers.getEditAparmentForm);
router.get('/apartment/:idApartment/estado', adminControllers.getEstadoAparmentForm);
router.post('/apartment/search',indexControllers.postSearch);
// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;