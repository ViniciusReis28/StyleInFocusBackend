const camisasModel = require('../models/camisasModel');

const getCamisas = (req, res) => {
    camisasModel.getAllCamisas()
        .then(results => res.json(results))
        .catch(err => {
            console.error('Erro ao buscar camisas:', err);
            res.status(500).json({ message: 'Erro ao buscar camisas' });
        });
};

const addCamisa = (req, res) => {
    const { nome, descricao, cor, img } = req.body;
    camisasModel.addCamisa(nome, descricao, cor, img)
        .then(() => res.status(201).json({ message: 'Camisa inserida com sucesso' }))
        .catch(err => {
            console.error('Erro ao inserir camisa:', err);
            res.status(500).json({ message: 'Erro ao inserir camisa' });
        });
};

const getCamisaById = async (req, res) => {
    const id = parseInt(req.params.id);  // Pegando o ID da URL
    try {
        const camisa = await camisasModel.getCamisaById(id);  // Usando o model para buscar a camisa pelo ID
        if (camisa) {
            res.json(camisa);  // Se encontrar a camisa, retorna ela
        } else {
            res.status(404).json({ message: 'Camisa não encontrada' });  // Caso não encontre a camisa
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar camisa' });  // Caso ocorra algum erro
    }
};




module.exports = {
    getCamisas,
    addCamisa,
    getCamisaById
};
