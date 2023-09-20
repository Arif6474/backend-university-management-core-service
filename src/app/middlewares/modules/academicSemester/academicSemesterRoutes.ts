import express from 'express';
import { AcademicSemesterController } from './academicSemesterController';
import validateRequest from '../../validateRequest';
import { AcademicSemesterValidation } from './AcademicSemester.Validation';
const router = express.Router();
router.get(
  '/',
  AcademicSemesterController.getAllSemester
);
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertIntoDB
);

export const AcademicSemesterRoutes = router;
