const db = require('../config/database');

const getAllCamisas = async () => {
    const result = await db.query('SELECT * FROM camisas');
    return result.rows;
};

const addCamisa = async (nome, descricao, cor, img) => {
    await db.query(
        `INSERT INTO camisas (nome, descricao, cor, img) VALUES ($1, $2, $3, $4)`,
        [nome, descricao, cor, img]
    );
};

const getCamisaById = async (id) => {
    const result = await db.query('SELECT * FROM camisas WHERE id = $1', [id]);
    return result.rows[0];  // Retorna apenas uma camisa, ou undefined se não encontrada
};



module.exports = {
    getAllCamisas,
    addCamisa,
    getCamisaById
};
