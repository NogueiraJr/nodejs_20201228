//Cliente
'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // o MonboDb com o Mongoose cria um _id automaticamente aqui como chave geral
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Customer', schema);
