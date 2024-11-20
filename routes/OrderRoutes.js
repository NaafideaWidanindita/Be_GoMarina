import express from 'express';
import { getOrderModel } from '../controllers/OrderController.js';

const router =express.Router();

router.get('/order', getOrderModel)

export default router;