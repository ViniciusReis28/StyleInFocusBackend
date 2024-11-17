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

// Rota padrão para a página inicial ou outras páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/'));  // Redireciona para a página de login
});
// Usar as rotas de autenticação
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
