import { Request, Response } from 'express';
import { Category } from '../models/category.model';

// Create new category || POST /api/categories || Private
export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all categories || GET /api/categories || Public
export const getCategories = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const categories = await Category.find().skip(skip).limit(limit);
        const total = await Category.countDocuments();

        res.status(200).json({
            categories,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get single category by ID || GET /api/categories/:id || Public
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a category || PUT /api/categories/:id || Private
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a category || DELETE /api/categories/:id || Private
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (category) {
            res.status(200).json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
