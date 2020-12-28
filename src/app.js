'use strict'

const express = require('express');

const app = express();
const router = express.Router();

//Rota criada
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.3'
    });
});
app.use('/', route); //Rota atribuida ao App

module.exports = app;
