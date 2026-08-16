"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMartSchema = exports.updateMartSchema = exports.createMartSchema = void 0;
const zod_1 = require("zod");
exports.createMartSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviews: zod_1.z.number().min(0).optional(),
        deliveryTime: zod_1.z.string().min(1, 'Delivery time is required'),
        isFreeDelivery: zod_1.z.boolean(),
        minOrderFreeDelivery: zod_1.z.number().min(0).optional(),
        imageUrl: zod_1.z.string().url('Must be a valid URL'),
        address: zod_1.z.string().optional(),
    }),
});
exports.updateMartSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        reviews: zod_1.z.number().min(0).optional(),
        deliveryTime: zod_1.z.string().optional(),
        isFreeDelivery: zod_1.z.boolean().optional(),
        minOrderFreeDelivery: zod_1.z.number().min(0).optional(),
        imageUrl: zod_1.z.string().url('Must be a valid URL').optional(),
        address: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Mart ID is required'),
    })
});
exports.getMartSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Mart ID is required'),
    })
});
