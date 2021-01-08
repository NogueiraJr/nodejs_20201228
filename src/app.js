'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conectar Banco de Dados
mongoose.connect(config.connectionString);

//Carregar os Modelos
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregando as rotas aqui
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;
