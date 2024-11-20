import express from 'express';
import { getKontenModel } from '../controllers/KontenController.js';

const router =express.Router();

router.get('/konten', getKontenModel)

export default router;