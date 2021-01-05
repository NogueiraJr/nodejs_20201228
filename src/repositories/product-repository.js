'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title price slug');

}

exports.getBySlug = (slug) => {
    return Product
        .findOne({
            active: true,
            slug: slug
        }, 'title price slug');

}

exports.getById = (id) => {
    return Product
        .findById(id, 'title price slug');

}

exports.getByTag = (tag) => {
    return Product
        .find({
            active: true,
            tags: tag
        }, 'title description slug price');

}

exports.create = (data) => {
    var product = new Product(data);
    //ou...
    //var product = new Product();
    //product.title = req.body.title;
    //product.title = req.body.etc..

    return product.save();

}

exports.put = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                price: data.price
            }
        });

}

exports.delete = (id) => {
    return Product
        //.findOneAndRemove(req.params.id)
        .findOneAndRemove(id);
}