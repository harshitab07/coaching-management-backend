import express from 'express';
import { createStudentController, filterStudentsController, getAllStudentsController, getStudentController, getStudentFeesController } from '../controllers/studentController.js';

const router = express.Router();

// for creating student
router.post('/create-student', createStudentController);

// get all students
router.get('/get-students', getAllStudentsController);

// get single student
router.get('/get-student/:id', getStudentController);

// get single student fees
router.get('/get-student-fees/:id', getStudentFeesController);

// filter students
router.post('/filter-students', filterStudentsController);

export default router;