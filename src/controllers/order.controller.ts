import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Place Order || POST /api/orders || Private (Customer)
export const placeOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { martId, items, shippingAddress, paymentMethod } = req.body;
        const customerId = req.user!._id;

        // Calculate total amount (In a real app, verify prices from DB!)
        const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        const order = await Order.create({
            customerId,
            martId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get My Orders || GET /api/orders/myorders || Private (Customer)
export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        const customerId = req.user!._id;
        const orders = await Order.find({ customerId })
            .populate('martId', 'name logo')
            .populate('items.productId', 'name images')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get Mart Orders || GET /api/orders/mart/:martId || Private (MartOwner/Admin)
export const getMartOrders = async (req: AuthRequest, res: Response) => {
    try {
        const orders = await Order.find({ martId: req.params.martId })
            .populate('customerId', 'name email phone')
            .populate('items.productId', 'name images')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update Order Status || PUT /api/orders/:id/status || Private
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update Payment Status || PUT /api/orders/:id/payment || Private
export const updatePaymentStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { paymentStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus },
            { new: true, runValidators: true }
        );

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
