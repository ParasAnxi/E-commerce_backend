import { z } from 'zod';
import { addressZodSchema } from './auth.schema';

export const createMartSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        logo: z.string().url('Must be a valid URL').optional(),
        banner: z.string().url('Must be a valid URL').optional(),
        address: addressZodSchema,
    }),
});

export const updateMartSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        logo: z.string().url('Must be a valid URL').optional(),
        banner: z.string().url('Must be a valid URL').optional(),
        address: addressZodSchema.optional(),
        isOpen: z.boolean().optional(),
        isApproved: z.boolean().optional(),
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
