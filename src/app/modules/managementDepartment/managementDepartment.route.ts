import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.get('/:id', ManagementDepartmentController.getSingleManagement);
router.get('/', ManagementDepartmentController.getAllMangement);
router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDeparmentZodSchema
  ),
  ManagementDepartmentController.createMangement
);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDeparmentZodSchema
  ),
  ManagementDepartmentController.updateManagement
);
router.delete('/:id', ManagementDepartmentController.deleteManagement);
export const ManagementDepratmentRoutes = router;
