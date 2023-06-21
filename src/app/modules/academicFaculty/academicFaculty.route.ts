import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academicFaculty',
  validateRequest(AcademicFacultyZodValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyZodValidation.updatedAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
