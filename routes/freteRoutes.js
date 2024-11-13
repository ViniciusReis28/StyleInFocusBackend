const express = require('express');
const freteController = require('../controllers/freteController'); // Importando o controller de frete
const router = express.Router();

// Rota para calcular o frete
router.post('/calcular-frete', freteController.calcularFrete);

module.exports = router;