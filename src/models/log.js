'use strict'

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

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
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        old: {
            type: _Schema.Types.ObjectId,
            ref: 'Old'
        },
        new: {
            type: _Schema.Types.ObjectId,
            ref: 'New'
        },
        ref: {
            type: Number,
            required: true,
            default: 1
        },
    }],
});

export default model('Log', schema);
//
