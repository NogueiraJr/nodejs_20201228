'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            active: true,
            slug: slug
        }, 'title price slug');
    return res;
}

exports.getById = async (id) => {
    const res = await Product
        .findById(id, 'title price slug');
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            active: true,
            tags: tag
        }, 'title description slug price');
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.put = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                price: data.price
            }
        });
}

exports.delete = async (id) => {
    await Product
        .findOneAndRemove(id);
}