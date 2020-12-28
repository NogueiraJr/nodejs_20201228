'use strict' //Força a screver código JS com mais qualidade

//Importando os pacotes necessários para a Aplicação
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000'); //process.env.PORT é do AZURE
app.set('port', port);

const server = http.createServer(app);

//Rodando a aplicação
server.listen(port); //Ouvindo a Porta da Aplicação
server.on('error', onError); //Tratando o erro ocorrido no Server.
server.on('listening', onListening); //Debug
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

//Tratando erros do/no Servidor HTTP
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    //https://nodejs.org/api/errors.html#errors_error_syscall
    switch (error.code) {
        case 'EACCES':
            console.log('[' + bind + '] Permission denied');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.log('[' + bind + '] Address already in use');
            process.exit(1);
            break;

        case 'ECONNREFUSED':
            console.log('[' + bind + '] Connection refused');
            process.exit(1);
            break;

        default:
            break;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

