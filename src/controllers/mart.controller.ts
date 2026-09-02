import { Request, Response } from 'express';
import { Mart } from '../models/mart.model';


// Create new mart || POST /api/marts || Private
export const createMart = async (req: Request, res: Response) => {
    try {
        const mart = await Mart.create(req.body);
        res.status(201).json(mart);
    } catch (error: any) {
        res.status(400).json({ message: error?.message || 'Failed to create mart', error });
    }
};


// Get all marts || GET /api/marts || Public
export const getMarts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const marts = await Mart.find().populate('ownerId', 'name email').skip(skip).limit(limit);
        const total = await Mart.countDocuments();

        res.status(200).json({
            marts,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get single mart by ID || GET /api/marts/:id || Public
export const getMartById = async (req: Request, res: Response) => {
    try {
        const mart = await Mart.findById(req.params.id).populate('ownerId', 'name email');
        if (mart) {
            res.status(200).json(mart);
        } else {
            res.status(404).json({ message: 'Mart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a mart || PUT /api/marts/:id || Private
export const updateMart = async (req: Request, res: Response) => {
    try {
        const mart = await Mart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (mart) {
            res.status(200).json(mart);
        } else {
            res.status(404).json({ message: 'Mart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a mart || DELETE /api/marts/:id || Private
export const deleteMart = async (req: Request, res: Response) => {
    try {
        const mart = await Mart.findByIdAndDelete(req.params.id);

        if (mart) {
            res.status(200).json({ message: 'Mart removed' });
        } else {
            res.status(404).json({ message: 'Mart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
