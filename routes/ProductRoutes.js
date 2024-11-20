import express from 'express';
import { getProductModel } from '../controllers/ProductController.js';

const router =express.Router();

router.get('/product', getProductModel)

export default router;