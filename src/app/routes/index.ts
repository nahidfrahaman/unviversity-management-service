import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
