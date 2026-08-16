"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        iconUrl: zod_1.z.string().url('Must be a valid URL'),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        iconUrl: zod_1.z.string().url('Must be a valid URL').optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Category ID is required'),
    })
});
exports.getCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Category ID is required'),
    })
});
