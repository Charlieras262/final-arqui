const express = require('express');
const router = express.Router();
const controller = require('../controllers/solicitud.controller');

router.get('/', controller.getSolicitudes);
router.get('/:username', controller.getSolicitud);
router.post('/crear', controller.postSolicitud);
router.post('/procesar', controller.procesarSolicitud);
router.get('/mostrar/:id', controller.mostrarEstadoSolicitud);

module.exports = router;