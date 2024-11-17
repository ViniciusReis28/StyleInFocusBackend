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

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/camisas', camisasRoutes);  // Usando as rotas de camisas
app.use('/users', usersRoutes);  // Usando as rotas de usuários
app.use('/frete', freteRoutes);
app.use('/api/roupas', comentarioRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'seu-segredo',      // Chave secreta para assinatura do ID da sessão
    resave: false,              // Impede que a sessão seja salva em cada requisição, mesmo sem alterações
    saveUninitialized: false,   // Não salva sessões não modificadas
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // Sessão dura 1 dia (24 horas)
    }
}));

// Configuração de arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '/frontend/paginas/login/uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar o usuário no banco de dados
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        // Verifica se o usuário existe
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        // Verificar se a senha fornecida é correta
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secretaChave', // Sua chave secreta
            { expiresIn: '1h' } // Expiração do token em 1 hora
        );

        // Retornar o token como resposta
        res.status(200).json({ message: 'Usuário autenticado', token });
    } catch (err) {
        console.error('Erro ao processar o login:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota padrão para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/login.html')); // Redireciona para login.html
});
// Usar as rotas de autenticação
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
