import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentZodValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentZodValidation.updatedAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
