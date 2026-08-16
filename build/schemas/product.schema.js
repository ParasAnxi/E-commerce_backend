"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        martId: zod_1.z.string().min(1, 'martId is required'),
        name: zod_1.z.string().min(1, 'Name is required'),
        weight: zod_1.z.string().min(1, 'Weight is required'),
        price: zod_1.z.number().min(0, 'Price must be a positive number'),
        originalPrice: zod_1.z.number().min(0, 'Original price must be a positive number'),
        discountPercentage: zod_1.z.number().min(0).max(100).optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviews: zod_1.z.number().min(0).optional(),
        brand: zod_1.z.string().min(1, 'Brand is required'),
        type: zod_1.z.string().min(1, 'Type is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        imageUrl: zod_1.z.string().url('Must be a valid URL'),
        categoryId: zod_1.z.string().min(1, 'categoryId is required'),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        martId: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        weight: zod_1.z.string().optional(),
        price: zod_1.z.number().min(0).optional(),
        originalPrice: zod_1.z.number().min(0).optional(),
        discountPercentage: zod_1.z.number().min(0).max(100).optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviews: zod_1.z.number().min(0).optional(),
        brand: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().url('Must be a valid URL').optional(),
        categoryId: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Product ID is required'),
    })
});
exports.getProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Product ID is required'),
    })
});
