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
