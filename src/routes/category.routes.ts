import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/category.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/category.schema';

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(authenticate, validate(createCategorySchema), createCategory);

router.route('/:id')
    .get(validate(getCategorySchema), getCategoryById)
    .put(authenticate, validate(updateCategorySchema), updateCategory)
    .delete(validate(getCategorySchema), authenticate, deleteCategory);

export default router;
