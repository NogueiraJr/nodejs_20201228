'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

//Modelo irá atender o Arquivo Morto do Cadastro do Cliente.

const schema = new Schema({
    // o MonboDb com o Mongoose cria um _id automaticamente aqui como chave geral
    customer: {
        type: _Schema.Types.ObjectId,
        ref: 'Log'
    },
    id: {
        type: Number,
        required: true,
    },
    //Último usuário dono do Cliente.
    usuarioId: {
        type: Number,
        required: true,
    },
    //Nome do Cliente
    nome: {
        type: String,
        required: true
    },
    //Celular do Cliente
    celular: {
        type: String,
        required: true
    },
    //Email do Cliente
    email: {
        type: String,
        required: true
    },
});

export default model('Client', schema);
//
