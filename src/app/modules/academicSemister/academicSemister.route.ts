import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemisterValidation } from './academicSemister.validation';

const router = express.Router();
router.post(
  '/create-academicSemister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createAcademicSemister
);
router.patch(
  '/:id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemisterController.updateSemister
);
router.delete('/:id', AcademicSemisterController.deleteSemister);
router.get('/:id', AcademicSemisterController.getSingleSemister);
router.get('/', AcademicSemisterController.getAcademicSemisters);

export const AcademicSemisterRoutes = router;
