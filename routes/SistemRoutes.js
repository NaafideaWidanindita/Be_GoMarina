import express from 'express';
import { getFeedbackModel } from '../controllers/SistemController.js';

const router =express.Router();

router.get('/feedback', getFeedbackModel)

export default router;