import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        martId: z.string().min(1, 'martId is required'),
        name: z.string().min(1, 'Name is required'),
        weight: z.string().min(1, 'Weight is required'),
        price: z.number().min(0, 'Price must be a positive number'),
        originalPrice: z.number().min(0, 'Original price must be a positive number'),
        discountPercentage: z.number().min(0).max(100).optional(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().min(0).optional(),
        brand: z.string().min(1, 'Brand is required'),
        type: z.string().min(1, 'Type is required'),
        description: z.string().min(1, 'Description is required'),
        imageUrl: z.string().url('Must be a valid URL'),
        categoryId: z.string().min(1, 'categoryId is required'),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        martId: z.string().optional(),
        name: z.string().optional(),
        weight: z.string().optional(),
        price: z.number().min(0).optional(),
        originalPrice: z.number().min(0).optional(),
        discountPercentage: z.number().min(0).max(100).optional(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().min(0).optional(),
        brand: z.string().optional(),
        type: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().url('Must be a valid URL').optional(),
        categoryId: z.string().optional(),
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
