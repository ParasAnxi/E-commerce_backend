import express from 'express';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from '../controllers/wishlist.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.route('/')
    .get(getWishlist)
    .post(addToWishlist);

router.route('/:productId')
    .delete(removeFromWishlist);

export default router;
