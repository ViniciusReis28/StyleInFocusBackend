// backend/routers/comentarioRouter.js
const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/comentarioController');

// Rota para adicionar um comentário
router.post('/:roupaId/comentarios', ComentarioController.adicionarComentario);

// Rota para buscar todos os comentários de uma peça de roupa
router.get('/:roupaId/comentarios', ComentarioController.buscarComentariosPorRoupa);

module.exports = router;
