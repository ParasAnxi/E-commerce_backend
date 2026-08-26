import express from 'express';
import {
    addToCart,
    getMyCarts,
    updateCartItem,
    removeFromCart
} from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { addToCartSchema, updateCartItemSchema, removeFromCartSchema } from '../schemas/cart.schema';

const router = express.Router();

router.use(authenticate);

router.route('/')
    .get(getMyCarts)
    .post(validate(addToCartSchema), addToCart);

router.route('/:productId')
    .put(validate(updateCartItemSchema), updateCartItem)
    .delete(validate(removeFromCartSchema), removeFromCart);

export default router;
