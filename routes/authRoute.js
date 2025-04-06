import express from "express";
import { registerController, loginController, forgotPasswordController } from '../controllers/authController.js';

const router = express.Router();

// For signup --> POST method
router.post('/register', registerController);

// For login --> POST method
router.post('/login', loginController);

// forgot password
router.post('/forgot-password', forgotPasswordController);

export default router;