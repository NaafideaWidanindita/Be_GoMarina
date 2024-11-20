import express from 'express';
import { getRoleModel } from '../controllers/RoleController.js';

const router =express.Router();

router.get('/role', getRoleModel)

export default router;