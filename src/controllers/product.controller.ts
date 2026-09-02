import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/product.model';


// Create new product || route /api/products || Private
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error?.message || 'Failed to create product', error });
    }
};


// Get all products || GET /api/products || Public
export const getProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const filter: any = {};
        if (req.query.martId) {
            filter.martId = req.query.martId;
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const products = await Product.find(filter)
            .populate('martId', 'name logo')
            .populate('category', 'name iconUrl')
            .skip(skip)
            .limit(limit);
            
        const total = await Product.countDocuments(filter);

        res.status(200).json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get single product by ID or slug || GET / api/products/:id || Public
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const product = await Product.findOne(query)
            .populate('martId', 'name logo')
            .populate('category', 'name iconUrl');
            
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a product by ID or slug || PUT /api/products/:id || Private
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const product = await Product.findOneAndUpdate(
            query,
            req.body,
            { new: true, runValidators: true }
        );

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a proudct by ID or slug || DELETE /api/products/:id || private
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const product = await Product.findOneAndDelete(query);

        if (product) {
            res.status(200).json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
