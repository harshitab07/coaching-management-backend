import express from "express";
import { registerController, loginController, forgotPasswordController } from '../controllers/authController.js';
import { adminAccess, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// For signup --> POST method
router.post('/register', registerController);

// For login --> POST method
router.post('/login', loginController);

// forgot password
router.post('/forgot-password', forgotPasswordController);

// protected admin auth route
router.get('/admin-auth', requireSignIn, adminAccess, (req, res) => {
    res.status(200).send({success: true})
});

export default router;