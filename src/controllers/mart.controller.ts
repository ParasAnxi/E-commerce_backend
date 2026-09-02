import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Mart } from '../models/mart.model';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Create new mart (Apply for Mart) || POST /api/marts || Private
export const createMart = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const ownerId = authReq.user?._id || req.body.ownerId;

        if (!ownerId) {
            return res.status(400).json({ message: 'Owner ID is required to apply for a mart' });
        }

        const martData = {
            ...req.body,
            ownerId,
            isApproved: false,
        };

        const mart = await Mart.create(martData);

        if (authReq.user && authReq.user.role === 'customer') {
            await User.findByIdAndUpdate(authReq.user._id, { role: 'martOwner' });
        }

        res.status(201).json(mart);
    } catch (error: any) {
        res.status(400).json({ message: error?.message || 'Failed to create mart', error });
    }
};

// Get current user's mart || GET /api/marts/my-mart || Private
export const getMyMart = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?._id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const mart = await Mart.findOne({ ownerId: userId }).populate('ownerId', 'name email');
        if (mart) {
            res.status(200).json(mart);
        } else {
            res.status(404).json({ message: 'No mart found for this owner' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all marts (with filtering by isApproved / ownerId) || GET /api/marts || Public
export const getMarts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const filter: any = {};

        if (req.query.isApproved !== undefined) {
            filter.isApproved = req.query.isApproved === 'true';
        }

        if (req.query.ownerId) {
            filter.ownerId = req.query.ownerId;
        }

        const marts = await Mart.find(filter).populate('ownerId', 'name email').skip(skip).limit(limit);
        const total = await Mart.countDocuments(filter);

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

// Get single mart by ID or slug || GET /api/marts/:id || Public
export const getMartById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const mart = await Mart.findOne(query).populate('ownerId', 'name email');
        if (mart) {
            res.status(200).json(mart);
        } else {
            res.status(404).json({ message: 'Mart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a mart by ID or slug || PUT /api/marts/:id || Private
export const updateMart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const mart = await Mart.findOneAndUpdate(
            query,
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

// Delete a mart by ID or slug || DELETE /api/marts/:id || Private
export const deleteMart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const query = mongoose.Types.ObjectId.isValid(id) 
            ? { _id: id } 
            : { slug: id };
        const mart = await Mart.findOneAndDelete(query);

        if (mart) {
            res.status(200).json({ message: 'Mart removed' });
        } else {
            res.status(404).json({ message: 'Mart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
