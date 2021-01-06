'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conectar Banco de Dados
mongoose.connect('mongodb://usrapi:UserApi123@192.168.15.7:27017');

//Carregar os Modelos
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregando as rotas aqui
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/products-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
