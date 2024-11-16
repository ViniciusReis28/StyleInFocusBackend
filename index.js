const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

// Importação de rotas
const camisasRoutes = require('./routes/camisasRoutes');
const usersRoutes = require('./routes/usersRoutes');
const freteRoutes = require('./routes/freteRoutes'); 
const comentarioRouter = require('./routes/comentarioRouter');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware CORS
app.use(cors({
    origin: 'https://styleinfocus.netlify.app',  // Permite requisições apenas desse domínio
    methods: ['GET', 'POST'],                   // Permite apenas métodos GET e POST
    allowedHeaders: ['Content-Type'],           // Permite o cabeçalho Content-Type
}));

// Middleware de parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sessão
app.use(session({
    secret: 'seu-segredo',          // Chave secreta para assinatura do ID da sessão
    resave: false,                  // Impede que a sessão seja salva em cada requisição, mesmo sem alterações
    saveUninitialized: false,       // Não salva sessões não modificadas
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // Sessão dura 1 dia
}));

// Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '/frontend/paginas/login/uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));

// Rotas
app.use('/auth', authRoutes);         // Prefixo para autenticação
app.use('/camisas', camisasRoutes);   // Prefixo para camisas
app.use('/users', usersRoutes);       // Prefixo para usuários
app.use('/frete', freteRoutes);       // Prefixo para frete
app.use('/api/roupas', comentarioRouter); // Prefixo para comentários

// Rota padrão para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html')); // Certifique-se de que este arquivo existe
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
