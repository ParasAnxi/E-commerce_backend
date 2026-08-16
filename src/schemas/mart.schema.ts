import { z } from 'zod';

export const createMartSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().min(0).optional(),
        deliveryTime: z.string().min(1, 'Delivery time is required'),
        isFreeDelivery: z.boolean(),
        minOrderFreeDelivery: z.number().min(0).optional(),
        imageUrl: z.string().url('Must be a valid URL'),
        address: z.string().optional(),
    }),
});

export const updateMartSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().min(0).optional(),
        deliveryTime: z.string().optional(),
        isFreeDelivery: z.boolean().optional(),
        minOrderFreeDelivery: z.number().min(0).optional(),
        imageUrl: z.string().url('Must be a valid URL').optional(),
        address: z.string().optional(),
    }),
    params: z.object({
        id: z.string().min(1, 'Mart ID is required'),
    })
});

export const getMartSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Mart ID is required'),
    })
});
