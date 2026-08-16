"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
// Create new category || POST /api/categories || Private
const createCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.create(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createCategory = createCategory;
// Get all categories || GET /api/categories || Public
const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const categories = await category_model_1.Category.find().skip(skip).limit(limit);
        const total = await category_model_1.Category.countDocuments();
        res.status(200).json({
            categories,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getCategories = getCategories;
// Get single category by ID || GET /api/categories/:id || Public
const getCategoryById = async (req, res) => {
    try {
        const category = await category_model_1.Category.findById(req.params.id);
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getCategoryById = getCategoryById;
// Update a category || PUT /api/categories/:id || Private
const updateCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateCategory = updateCategory;
// Delete a category || DELETE /api/categories/:id || Private
const deleteCategory = async (req, res) => {
    try {
        const category = await category_model_1.Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.status(200).json({ message: 'Category removed' });
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.deleteCategory = deleteCategory;
