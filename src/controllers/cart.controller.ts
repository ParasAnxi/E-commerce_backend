import { Request, Response } from 'express';
import { Cart } from '../models/cart.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Add to Cart || POST /api/cart || Private
export const addToCart = async (req: AuthRequest, res: Response) => {
    try {
        const { martId, productId, quantity } = req.body;
        const customerId = req.user!._id;

        let cart = await Cart.findOne({ customerId, martId });

        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity } as any);
            }
            cart = await cart.save();
        } else {
            cart = await Cart.create({
                customerId,
                martId,
                items: [{ productId, quantity }],
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get Customer Carts || GET /api/cart || Private
export const getMyCarts = async (req: AuthRequest, res: Response) => {
    try {
        const customerId = req.user!._id;
        const carts = await Cart.find({ customerId })
            .populate('martId', 'name logo')
            .populate('items.productId', 'name price images');

        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update Cart Item || PUT /api/cart/:productId || Private
export const updateCartItem = async (req: AuthRequest, res: Response) => {
    try {
        const { quantity } = req.body;
        const customerId = req.user!._id;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ customerId, "items.productId": productId });
        
        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json(cart);
            }
        }
        
        res.status(404).json({ message: 'Item not found in any cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Remove from Cart || DELETE /api/cart/:productId || Private
export const removeFromCart = async (req: AuthRequest, res: Response) => {
    try {
        const customerId = req.user!._id;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ customerId, "items.productId": productId });

        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId) as any;
            
            // If cart is empty after removing, maybe delete the cart
            if (cart.items.length === 0) {
                await Cart.findByIdAndDelete(cart._id);
                return res.status(200).json({ message: 'Cart deleted as it is empty' });
            } else {
                await cart.save();
                return res.status(200).json(cart);
            }
        }

        res.status(404).json({ message: 'Item not found in cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
