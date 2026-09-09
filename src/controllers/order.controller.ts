import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { AuthRequest } from '../middleware/auth.middleware';
import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpayInstance: any = null;
const getRazorpay = () => {
    if (!razorpayInstance) {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "test_key",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
        });
    }
    return razorpayInstance;
};

// Place Order || POST /api/orders || Private (Customer)
export const placeOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { martId, items, shippingAddress, paymentMethod } = req.body;
        const customerId = req.user!._id;
        const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        const order = await Order.create({
            customerId,
            martId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        if (paymentMethod === 'razorpay') {
            const options = {
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                receipt: order._id.toString(),
            };
            const rzp = getRazorpay();
            const razorpayOrder = await rzp.orders.create(options);
            
            order.razorpayOrderId = razorpayOrder.id;
            await order.save();

            return res.status(201).json({ order, razorpayOrder });
        }

        res.status(201).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Verify Payment || POST /api/orders/verify || Private
export const verifyPayment = async (req: AuthRequest, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret")
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await Order.findByIdAndUpdate(order_id, {
                paymentStatus: "paid",
                status: "confirmed",
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
            });
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            await Order.findByIdAndUpdate(order_id, {
                paymentStatus: "failed",
            });
            return res.status(400).json({ message: "Invalid signature, payment failed" });
        }
    } catch (error) {
        console.error(error);
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

// Get All Orders || GET /api/orders/all || Private (Admin)
export const getAllOrders = async (req: AuthRequest, res: Response) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'name email phone')
            .populate('martId', 'name logo')
            .populate('items.productId', 'name images')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
