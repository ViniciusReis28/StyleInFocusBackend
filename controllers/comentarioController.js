const ComentarioModel = require('../models/comentarioModel');

const ComentarioController = {
    // Adicionar um comentário
    adicionarComentario: async (req, res) => {
        const { roupaId } = req.params; // Pega o ID da roupa da URL
        const { nome, email, comentario, titulocomentario, recomenda} = req.body; // Pega os dados do corpo da requisição

        try {
            const novoComentario = await ComentarioModel.adicionarComentario(roupaId, nome, email, comentario, titulocomentario, recomenda);
            res.status(201).json({ message: "Comentário adicionado com sucesso", comentario: novoComentario });
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            res.status(500).json({ message: "Erro ao adicionar comentário" });
        }
    },

    // Buscar comentários por roupa
    buscarComentariosPorRoupa: async (req, res) => {
        const { roupaId } = req.params;

        try {
            const comentarios = await ComentarioModel.buscarComentariosPorRoupa(roupaId);
            res.status(200).json(comentarios);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
            res.status(500).json({ message: "Erro ao buscar comentários" });
        }
    }
};

module.exports = ComentarioController;