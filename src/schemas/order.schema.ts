import { z } from 'zod';
import { addressZodSchema } from './auth.schema';

export const placeOrderSchema = z.object({
    body: z.object({
        martId: z.string().min(1, 'martId is required'),
        shippingAddress: addressZodSchema,
        paymentMethod: z.enum(['card', 'cod', 'upi', 'wallet']),
    }),
});

export const updateOrderStatusSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "confirmed", "processing", "out_for_delivery", "delivered", "cancelled"]),
    }),
    params: z.object({
        id: z.string().min(1, 'Order ID is required'),
    })
});

export const updatePaymentStatusSchema = z.object({
    body: z.object({
        paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
    }),
    params: z.object({
        id: z.string().min(1, 'Order ID is required'),
    })
});

export const getOrderSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Order ID is required'),
    })
});
