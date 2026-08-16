import { z } from 'zod';

export const createCategorySchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        iconUrl: z.string().url('Must be a valid URL'),
    }),
});

export const updateCategorySchema = z.object({
    body: z.object({
        name: z.string().optional(),
        iconUrl: z.string().url('Must be a valid URL').optional(),
    }),
    params: z.object({
        id: z.string().min(1, 'Category ID is required'),
    })
});

export const getCategorySchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Category ID is required'),
    })
});
