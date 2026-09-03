import { Request, Response } from 'express';
import { Wishlist } from '../models/wishlist.model';

import { AuthRequest } from '../middleware/auth.middleware';

// GET /api/wishlists
export const getWishlist = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const customerId = req.user?._id;

        if (!customerId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        let wishlist = await Wishlist.findOne({ customerId }).populate('items');

        if (!wishlist) {
            wishlist = await Wishlist.create({ customerId, items: [] });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// POST /api/wishlists
export const addToWishlist = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const customerId = req.user?._id;
        const { productId } = req.body;

        if (!customerId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let wishlist = await Wishlist.findOne({ customerId });

        if (!wishlist) {
            wishlist = await Wishlist.create({ customerId, items: [productId] });
        } else {
            if (!wishlist.items.includes(productId)) {
                wishlist.items.push(productId);
                await wishlist.save();
            }
        }

        await wishlist.populate('items');
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// DELETE /api/wishlists/:productId
export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const customerId = req.user?._id;
        const productId = req.params.productId;

        if (!customerId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const wishlist = await Wishlist.findOne({ customerId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.items = wishlist.items.filter((id) => id.toString() !== productId);
        await wishlist.save();
        await wishlist.populate('items');

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
