const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const camisasRoutes = require('./routes/camisasRoutes');
const usersRoutes = require('./routes/usersRoutes');
const freteRoutes = require('./routes/freteRoutes');
const comentarioRouter = require('./routes/comentarioRouter');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const session = require('express-session');
const client = require('./config/database');
const jwt = require('jsonwebtoken');
const User = require('./models/authModel');
const bcrypt = require('bcrypt');

const app = express();

// Configuração CORS
const corsOptions = {
    origin: 'https://styleinfocus.netlify.app', // Ajuste para o domínio correto
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With'
};

app.use(cors(corsOptions));  // Certifique-se de usar o CORS primeiro
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de sessão
app.use(session({
    secret: 'seu-segredo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // 1 dia
    }
}));

// Rota de login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secretaChave',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Usuário autenticado', token });
    } catch (err) {
        console.error('Erro ao processar o login:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Outras rotas...
app.use('/api/auth', authRoutes);

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));

// Inicializando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
