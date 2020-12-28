'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Rota criada
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.3'
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

app.use('/', route); //Rota atribuida ao App
app.use('/create', create);

module.exports = app;
