'use strict'

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository');
const { request } = require('express');

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
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

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 5, 'O Título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 10, 'A Descrição deve conter pelo menos 10 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Produto cadastrado com sucesso' });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({ message: 'Produto removido com sucesso' });
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.put(req.params.id, req.body)
        res.status(200).send({ message: 'Produto atualizado com sucesso' });
    } catch (e) {
        res.status(400).send(e);
    }
}
