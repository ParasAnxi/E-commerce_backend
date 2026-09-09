import express from 'express';
import {
    placeOrder,
    verifyPayment,
    getMyOrders,
    getMartOrders,
    getAllOrders,
    updateOrderStatus,
    updatePaymentStatus
} from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { placeOrderSchema, updateOrderStatusSchema, updatePaymentStatusSchema } from '../schemas/order.schema';

const router = express.Router();

router.use(authenticate);

router.route('/')
    .post(validate(placeOrderSchema), placeOrder);

router.route('/verify')
    .post(verifyPayment);

router.route('/myorders')
    .get(getMyOrders);

router.route('/all')
    .get(getAllOrders);

router.route('/mart/:martId')
    .get(getMartOrders);

router.route('/:id/status')
    .put(validate(updateOrderStatusSchema), updateOrderStatus);

router.route('/:id/payment')
    .put(validate(updatePaymentStatusSchema), updatePaymentStatus);

export default router;
