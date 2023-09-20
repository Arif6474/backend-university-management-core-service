import { AcademicSemester } from '@prisma/client';
import { Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemesterService";
import sendResponse from "../../../../shared/sendResponse";
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import pick from '../../../../shared/pick';

const insertIntoDB = catchAsync(async (req: Request , res: Response)=>{
    const result = await AcademicSemesterService.insertIntoDB(req.body)
    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Semester is created successfully",
        data: result
    })
})
const getAllSemester = catchAsync(async (req: Request , res: Response)=>{
    const filters = pick(req.query, ['searchTerm', 'code', 'startMonth', 'endMonth']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    
    const result = await AcademicSemesterService.getAllSemester(filters, options)
    sendResponse<AcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "Academic Semester is fetched successfully",
        meta: result.meta,
        data: result.data
    })
})
 
export const AcademicSemesterController = {
    insertIntoDB,
    getAllSemester
}