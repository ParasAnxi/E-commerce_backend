import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(authenticate, validate(createProductSchema), createProduct);

router.route('/:id')
    .get(validate(getProductSchema), getProductById)
    .put(authenticate, validate(updateProductSchema), updateProduct)
    .delete(validate(getProductSchema), authenticate, deleteProduct);

export default router;
