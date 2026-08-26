import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        martId: z.string().min(1, 'martId is required'),
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        category: z.string().min(1, 'categoryId is required'),
        price: z.number().min(0, 'Price must be a positive number'),
        stock: z.number().min(0, 'Stock must be non-negative'),
        images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image is required'),
        isAvailable: z.boolean().optional(),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        price: z.number().min(0).optional(),
        stock: z.number().min(0).optional(),
        images: z.array(z.string().url('Must be a valid URL')).optional(),
        isAvailable: z.boolean().optional(),
    }),
    params: z.object({
        id: z.string().min(1, 'Product ID is required'),
    })
});

export const getProductSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Product ID is required'),
    })
});
