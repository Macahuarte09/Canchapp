const express = require('express');
const router = express.Router();
const { getReservas, getReservasByUsuario, createReserva, cancelarReserva } = require('../controllers/reservasController');

router.get('/', getReservas);
router.get('/usuario/:id', getReservasByUsuario);
router.post('/', createReserva);
router.put('/cancelar/:id', cancelarReserva);

module.exports = router;