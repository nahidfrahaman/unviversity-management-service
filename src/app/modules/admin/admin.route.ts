import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deletAdmin);
router.get('/', AdminController.getAllAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.upadeteUserAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
