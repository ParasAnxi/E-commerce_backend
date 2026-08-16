"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMart = exports.updateMart = exports.getMartById = exports.getMarts = exports.createMart = void 0;
const mart_model_1 = require("../models/mart.model");
// Create new mart || POST /api/marts || Private
const createMart = async (req, res) => {
    try {
        const mart = await mart_model_1.Mart.create(req.body);
        res.status(201).json(mart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createMart = createMart;
// Get all marts || GET /api/marts || Public
const getMarts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const marts = await mart_model_1.Mart.find().skip(skip).limit(limit);
        const total = await mart_model_1.Mart.countDocuments();
        res.status(200).json({
            marts,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getMarts = getMarts;
// Get single mart by ID || GET /api/marts/:id || Public
const getMartById = async (req, res) => {
    try {
        const mart = await mart_model_1.Mart.findById(req.params.id);
        if (mart) {
            res.status(200).json(mart);
        }
        else {
            res.status(404).json({ message: 'Mart not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getMartById = getMartById;
// Update a mart || PUT /api/marts/:id || Private
const updateMart = async (req, res) => {
    try {
        const mart = await mart_model_1.Mart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (mart) {
            res.status(200).json(mart);
        }
        else {
            res.status(404).json({ message: 'Mart not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateMart = updateMart;
// Delete a mart || DELETE /api/marts/:id || Private
const deleteMart = async (req, res) => {
    try {
        const mart = await mart_model_1.Mart.findByIdAndDelete(req.params.id);
        if (mart) {
            res.status(200).json({ message: 'Mart removed' });
        }
        else {
            res.status(404).json({ message: 'Mart not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.deleteMart = deleteMart;
