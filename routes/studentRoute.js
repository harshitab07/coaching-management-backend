import express from 'express';
import { adminAccess, requireSignIn } from '../middlewares/authMiddleware.js';
import { createStudentController, filterStudentsController, getAllStudentsController, getStudentController } from '../controllers/studentController.js';

const router = express.Router();

// for creating student
router.post('/create-student', adminAccess, createStudentController);

// get all students
router.get('/get-students', adminAccess, getAllStudentsController);

// get single student
router.get('/get-student/:id', adminAccess, getStudentController);

// filter students
router.post('/filter-students', adminAccess, filterStudentsController);

export default router;