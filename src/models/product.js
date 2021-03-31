'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // o MonboDb com o Mongoose cria um _id automaticamente aqui como chave geral
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: { // compor o nome do produto para uma URL (único), ex.: pao de queijo => pao-de-queijo
        type: String,
        required: [true, 'O Slug é obrigatório neste contexto!'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true,
    }]

});

module.exports = mongoose.model('Product', schema);
