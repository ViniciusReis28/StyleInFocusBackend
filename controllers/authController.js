const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/authModel');

// Chave secreta diretamente no código
const SECRET = 'chaveSuperSecretaParaJWT';

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;

        if (userModel.findByEmail(email)) {
            return res.status(400).json({ message: 'Usuário já existe!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.save({ email, password: hashedPassword });

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = userModel.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
};
