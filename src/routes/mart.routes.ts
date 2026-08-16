import express from 'express';
import {
    createMart,
    getMarts,
    getMartById,
    updateMart,
    deleteMart,
} from '../controllers/mart.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createMartSchema, updateMartSchema, getMartSchema } from '../schemas/mart.schema';

const router = express.Router();

router.route('/')
    .get(getMarts)
    .post(authenticate, validate(createMartSchema), createMart);

router.route('/:id')
    .get(validate(getMartSchema), getMartById)
    .put(authenticate, validate(updateMartSchema), updateMart)
    .delete(validate(getMartSchema), authenticate, deleteMart);

export default router;
