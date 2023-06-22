import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getFaculty);
router.delete('/:id', FacultyController.deletFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.upadeteUserFacultyZodSchema),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
