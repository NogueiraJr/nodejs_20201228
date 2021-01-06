'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository');
const { request } = require('express');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);

    } catch (e) {
        res.status(400).send(e);
    }
}

exports.post = (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 5, 'O Título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 10, 'A Descrição deve conter pelo menos 10 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
}

exports.put = (req, res, next) => {
    repository
        .put(req.params.id, req.body)
        .then(x => {
            res.status(200).send({ message: 'Produto atualizado com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto',
                data: e
            });
        });
}

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto removido com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                data: e
            });
        });
}

