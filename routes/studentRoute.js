import express from 'express';
import { createStudentController, getAllStudentsController, getStudentController, getStudentFeesController,getLeftStudentsController,getActiveStudentsController,getCompletedStudentsController, updateStudentController, updateStudentFeesController, deleteStudentController } from '../controllers/studentController.js';

const router = express.Router();

// for creating student
router.post('/create-student', createStudentController);

// get all students
router.get('/get-students', getAllStudentsController);
router.get('/left-students', getLeftStudentsController);
router.get('/completed-students', getCompletedStudentsController);
router.get('/active-students', getActiveStudentsController);

// get single student
router.get('/get-student/:id', getStudentController);

// get single student fees
router.get('/get-student-fees/:id', getStudentFeesController);

// update student
router.post('/update-student', updateStudentController);
router.post('/update-student-fees', updateStudentFeesController);

// delete student
router.post('/delete-student', deleteStudentController);


export default router;