import express from 'express';
import { AcademicSemesterRoutes } from '../middlewares/modules/academicSemester/academicSemesterRoutes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
