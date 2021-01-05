'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

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

exports.post = (req, res, next) => {

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
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
};
