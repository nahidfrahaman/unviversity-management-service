import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getStudent);
router.delete('/:id', StudentController.deletStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
