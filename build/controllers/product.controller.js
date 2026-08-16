"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
// Create new product || route /api/products || Private
const createProduct = async (req, res) => {
    try {
        const product = await product_model_1.Product.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createProduct = createProduct;
// Get all products || GET /api/products || Public
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const products = await product_model_1.Product.find().skip(skip).limit(limit);
        const total = await product_model_1.Product.countDocuments();
        res.status(200).json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getProducts = getProducts;
// Get single product by ID || GET / api/products/:id || Public
const getProductById = async (req, res) => {
    try {
        const product = await product_model_1.Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getProductById = getProductById;
// Update a product || PUT /api/products/:id || Private
const updateProduct = async (req, res) => {
    try {
        const product = await product_model_1.Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateProduct = updateProduct;
// Delete a proudct || DELETE /api/products/:id || private
const deleteProduct = async (req, res) => {
    try {
        const product = await product_model_1.Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ message: 'Product removed' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.deleteProduct = deleteProduct;
