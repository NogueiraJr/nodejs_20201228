'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

//Modelo irá atender o LOG do Novo Sistema.

const schema = new Schema({
    // o MonboDb com o Mongoose cria um _id automaticamente aqui como chave geral
    customer: {
        type: _Schema.Types.ObjectId,
        ref: 'Log'
    },
    number: {
        type: String,
        required: true,
    },
    //Data da gravação do LOG
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    //Status do LOG
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    //Alterações registradas no LOG
    items: [{
        //Informação anterior
        old: {
            type: _Schema.Types.ObjectId,
            ref: 'Old'
        },
        //Informação nova
        new: {
            type: _Schema.Types.ObjectId,
            ref: 'New'
        },
        //Referência de controle
        ref: {
            type: Number,
            required: true,
            default: 1
        },
    }],
});

export default model('Log', schema);
//
