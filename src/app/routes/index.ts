import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagementDepratmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  { path: '/academicSemister/', route: AcademicSemisterRoutes },
  {
    path: '/academicFaculty/',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartment/',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students/',
    route: StudentRoutes,
  },
  {
    path: '/faculties/',
    route: FacultyRoutes,
  },
  {
    path: '/management-departments/',
    route: ManagementDepratmentRoutes,
  },
  {
    path: '/admins/',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
