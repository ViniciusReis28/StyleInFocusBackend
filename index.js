const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const camisasRoutes = require('./routes/camisasRoutes');
const usersRoutes = require('./routes/usersRoutes');
const freteRoutes = require('./routes/freteRoutes'); 
const comentarioRouter = require('./routes/comentarioRouter');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/camisas', camisasRoutes);  // Usando as rotas de camisas
app.use('/users', usersRoutes);  // Usando as rotas de usuários
app.use('/frete', freteRoutes);
app.use('/api/roupas', comentarioRouter);


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
