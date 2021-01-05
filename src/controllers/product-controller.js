'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator');

exports.get = (req, res, next) => {
    // Product.find({_id: 'ID'});
    // Product.find({description: 'description...'});
    Product
        .find({ active: true }, 'title description slug price')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao consultar produtos',
                data: e
            });
        })
        ;
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            active: true,
            slug: req.params.slug
        }, 'title description slug price')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao consultar produtos',
                data: e
            });
        })
        ;
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao consultar produtos',
                data: e
            });
        })
        ;
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            active: true,
            tags: req.params.tag
        }, 'title description slug price')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao consultar produtos',
                data: e
            });
        })
        ;
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

    var product = new Product(req.body);
    //ou...
    //var product = new Product();
    //product.title = req.body.title;
    //product.title = req.body.etc..

    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({ message: 'Produto atualizado com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        //.findOneAndRemove(req.params.id)
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto removido com sucesso' });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                data: e
            });
        });
};
