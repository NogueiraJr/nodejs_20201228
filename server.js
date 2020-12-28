'use strict'

//Importando os
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = 3000; // Em produção tem de ser uma porta que esteja livre.
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

//Criando as rotas
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.1'
    });
});

app.use('/', route);

//Ouvir a porta
server.listen(port);
console.log('API rodando na porta ' + port);