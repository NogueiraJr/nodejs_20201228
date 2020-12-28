'use strict'

//Importando os
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = normalizePort(process.env.PORT || '3000'); //process.env.PORT é do AZURE
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

//Criando as rotas
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.2'
    });
});

app.use('/', route);

//Ouvir a porta
server.listen(port);
console.log('API rodando na porta ' + port);

//Normalizar a porta do server
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}