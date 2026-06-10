const express = require('express');
const router = express.Router();
const { getCanchas, createCancha, updateCancha, deleteCancha } = require('../controllers/canchasController');

router.get('/', getCanchas);
router.post('/', createCancha);
router.put('/:id', updateCancha);
router.delete('/:id', deleteCancha);

module.exports = router;