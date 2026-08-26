import { z } from 'zod';

export const addToCartSchema = z.object({
    body: z.object({
        martId: z.string().min(1, 'martId is required'),
        productId: z.string().min(1, 'productId is required'),
        quantity: z.number().min(1, 'quantity must be at least 1'),
    }),
});

export const updateCartItemSchema = z.object({
    body: z.object({
        quantity: z.number().min(1, 'quantity must be at least 1'),
    }),
    params: z.object({
        productId: z.string().min(1, 'productId is required'),
    })
});

export const removeFromCartSchema = z.object({
    params: z.object({
        productId: z.string().min(1, 'productId is required'),
    })
});
